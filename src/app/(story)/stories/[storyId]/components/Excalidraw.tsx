"use client";
import React, { useEffect, useState, useTransition } from "react";
import {
  Button,
  Flex,
  IconButton,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { Excalidraw, exportToCanvas } from "@excalidraw/excalidraw";
import { FaAngleRight } from "react-icons/fa6";
import {
  BinaryFileData,
  DataURL,
  ExcalidrawImperativeAPI,
} from "@excalidraw/excalidraw/types/types";
import {
  ExcalidrawElement,
  FileId,
} from "@excalidraw/excalidraw/types/element/types";
import PreviewModal from "./PreviewModal";
import CustomDrawer from "./DrawerCom";
import { BiMenu } from "react-icons/bi";
import axios from "axios";
import { finalSubmit, getSlideEditData, saveSlide } from "@/actions/story";
import { Image, Story, User } from "@/types/user.types";
import SubmitModal from "./SubmitModal";
import { COLOR } from "@/types/colors";
import ComparisonModal from "./CompareModal";
import { useRouter } from "next/navigation";
import ProductTourModal from "./ProductTourModal";
import useWriterInstruction from "@/hooks/useWriterIns";
import { useMediaQuery } from "@chakra-ui/react";
interface excalidrawProps {
  data: Image[];
  self: User;
  story: Story;
  completedSlide: Image[];
  pageNo?: Number;
}
type Dimension = {
  h: number;
  w: number;
};
// Dimensions for the different chars
type Dimensions = {
  DCOVER: Dimension;
  TALLCHAR: Dimension;
  SQUARE: Dimension;
  TALLCHAR2: Dimension;
  TALLCHAR3: Dimension;
  FAIRY: Dimension;
};

const dim: Dimensions = {
  DCOVER: { h: 540, w: 1080 },
  TALLCHAR: { h: 350, w: 150 },
  SQUARE: { h: 150, w: 150 },
  TALLCHAR2: { h: 350, w: 200 },
  TALLCHAR3: { h: 350, w: 250 },
  FAIRY: { h: 150, w: 200 },
};

const getDim = (d: keyof Dimensions): Dimension => {
  return dim[d];
};
const getPos = (d: string) => {
  return d === "BACKGROUND" ? { x: 0, y: 0 } : { x: 500, y: 100 };
};

// function to convert img to base64 for displaying in excalidraw
const getImageBase64 = async (imageUrl: string): Promise<string | null> => {
  try {
    const response = await axios.get(imageUrl, {
      responseType: "arraybuffer",
    });
    const binaryData = Buffer.from(response.data, "binary").toString("base64");
    return `data:${response.headers["content-type"]};base64,${binaryData}`;
  } catch (error) {
    console.error("Error fetching image:", error);
    return null;
  }
};

export default function ExacalidrawEditor({
  data,
  self,
  story,
  completedSlide,
}: excalidrawProps) {
  // single media query with no options
  const [isLargerThan800] = useMediaQuery("(min-width: 800px)");
  const [images, setImages] = useState<Image[]>(data);
  useEffect(() => {
    setImages(data);
  }, [data]);
  const [pageNo, setPageNo] = useState<number>(
    Number(data[0]?.pageNoInUserMadeStory)
  );

  const modal = useWriterInstruction();
  useEffect(() => {
    modal.onOpen();
  }, []);
  useEffect(() => {
    setPageNo(Number(data[0]?.pageNoInUserMadeStory));
  }, [data]);
  const [binaryData, setBinaryData] = useState({});
  const [elementData, setElementData] = useState<readonly ExcalidrawElement[]>(
    []
  );
  const [excalidrawAPI, setExcalidrawAPI] =
    useState<ExcalidrawImperativeAPI | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isSubmitting, startSubmitting] = useTransition();
  const [isGoingToNext, startGoingToNext] = useTransition();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();
  const {
    isOpen: isProductTourModalOpen,
    onOpen: onProductTourModalOpen,
    onClose: onProductTourModalClose,
  } = useDisclosure();
  const {
    isOpen: isSubmitModalOpen,
    onOpen: onSubmitModalOpen,
    onClose: onSubmitModalClose,
  } = useDisclosure();
  // comparison modal controls
  const {
    isOpen: isComparisonModalOpen,
    onOpen: onComparisonModalOpen,
    onClose: onComparisonModalClose,
  } = useDisclosure();
  // use router
  const router = useRouter();
  // convert excalidraw image to blob from canvas
  const base64ToBlob = (base64Data: string, contentType: string) => {
    const byteString = window.atob(base64Data.split(",")[1]);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    return new Blob([int8Array], { type: contentType });
  };

  const formData = new FormData();
  // Save the slide in the database
  const getExport = async () => {
    if (excalidrawAPI && elementData.length !== 0) {
      startGoingToNext(async () => {
        // export utility from excalidraw
        const canvas = await exportToCanvas({
          elements: elementData,
          files: binaryData,
          appState: { exportWithDarkMode: false },
          exportPadding: 0,
          maxWidthOrHeight: 1500,
        });

        const imageBlob = base64ToBlob(canvas.toDataURL(), "image/png");
        // upload the output of excalidraw to the cloudinary
        formData.append("file", imageBlob);
        formData.append("upload_preset", "beamsworld");
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/dars7qqwz/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await res.json();
        // save the slide in the database
        await saveSlide({
          elementData: JSON.stringify(elementData),
          storyId: String(story.id),
          url: data.secure_url,
          pageNo,
        });
      });
      // clear the screen
      excalidrawAPI.resetScene();
      // clear history for new students
      excalidrawAPI.history.clear();
    }
  };
  // handle preview
  const handlePrevClick = (url: any, index: number) => {
    onModalOpen();
    setCurrentIndex(index);
  };
  // Function to handle adding an image to the Excalidraw editor
  const handleImageClick = async (img: any, imageId: string) => {
    // get base64
    const dataUrl = await getImageBase64(img.url);
    if (excalidrawAPI) {
      if (img.isCoverPage) {
        // if cover, clear all the prev and set next bg
        excalidrawAPI.resetScene();
        excalidrawAPI.history.clear();
        const newFile: BinaryFileData[] = [
          {
            mimeType: "image/jpeg",
            id: img.id as FileId, // Type assertion
            dataURL: dataUrl as DataURL,
            created: Date.now(),
            lastRetrieved: Date.now(),
          },
        ];

        // Add the new file to Excalidraw
        excalidrawAPI.addFiles(newFile);
        setBinaryData(newFile);
        const newCoverElement: ExcalidrawElement = {
          id: img.id,
          type: "image",
          x: 0,
          y: 0,
          width: 1080,
          height: 540,
          angle: 0,
          strokeColor: "transparent",
          backgroundColor: "transparent",
          fillStyle: "solid",
          strokeWidth: 1,
          strokeStyle: "solid",
          roughness: 0,
          opacity: 100,
          groupIds: [],
          frameId: null,
          roundness: { type: 1, value: 0 },
          seed: 1759716444,
          version: 1,
          versionNonce: 496998482,
          isDeleted: false,
          boundElements: null,
          updated: 1704521891309,
          link: null,
          locked: true,
          status: "pending",
          fileId: img.id as FileId,
          scale: [1, 1],
        };
        const currentElements = excalidrawAPI.getSceneElements();
        const updatedElements: readonly ExcalidrawElement[] = [
          ...currentElements,
          newCoverElement,
        ];
        excalidrawAPI.updateScene({ elements: updatedElements });
        setElementData(updatedElements);
        // add the user name on the cover
        const newText2Element: ExcalidrawElement = {
          id: "A0RmMu2nGUiq495T5XVKL",
          type: "text",
          x: 270.51849365234375,
          y: 480.8564796447754,
          width: 607.2958984375,
          height: 60.3,
          angle: 0,
          strokeColor: "#1e1e1e",
          backgroundColor: "#fff",
          fillStyle: "solid",
          strokeWidth: 2,
          strokeStyle: "solid",
          roughness: 1,
          opacity: 100,
          groupIds: [],
          frameId: null,
          roundness: null,
          seed: 426369724,
          version: 51,
          versionNonce: 470166716,
          isDeleted: false,
          boundElements: null,
          updated: 1704523721041,
          link: null,
          locked: true,
          text: `${self?.firstName} ${self?.lastName}`,
          fontSize: 36,
          fontFamily: 2,
          textAlign: "center",
          verticalAlign: "top",
          baseline: 31,
          containerId: null,
          originalText: `${self?.firstName} ${self?.lastName} `,
          lineHeight: 1.24 as any,
        };

        const current3Elements = excalidrawAPI.getSceneElements();
        const updated3Elements: readonly ExcalidrawElement[] = [
          ...current3Elements,
          newText2Element,
        ];
        excalidrawAPI.updateScene({ elements: updated3Elements });
        setElementData(updatedElements);
      } else {
        const currentElements = excalidrawAPI.getSceneElements();
        const newElement: ExcalidrawElement = {
          id: img.id,
          type: "image",
          x: getPos(img.imageType).x,
          y: getPos(img.imageType).y,
          width: getDim(img.dim).w,
          height: getDim(img.dim).h,
          angle: 0,
          strokeColor: "transparent",
          backgroundColor: "transparent",
          fillStyle: "solid",
          strokeWidth: 1,
          strokeStyle: "solid",
          roughness: 0,
          opacity: 100,
          groupIds: [],
          frameId: null,
          roundness: {
            type: 1,
            value: 0,
          },
          seed: Math.floor(Math.random() * 2 ** 31),
          version: 1,
          versionNonce: Math.floor(Math.random() * 2 ** 31),
          isDeleted: false,
          boundElements: null,
          updated: new Date().getTime(),
          link: null,
          locked: img.imageType === "BACKGROUND" ? true : false,
          status: "pending",
          fileId: img.id as FileId,
          scale: [1, 1],
        };

        const updatedElements = [...currentElements, newElement];
        excalidrawAPI.updateScene({ elements: updatedElements });
        setElementData(updatedElements);
        const newFile: BinaryFileData[] = [
          {
            mimeType: "image/jpeg",
            id: img.id as FileId, // Type assertion
            dataURL: dataUrl as DataURL,
            created: Date.now(),
            lastRetrieved: Date.now(),
          },
        ];
        // Add the new file to Excalidraw
        excalidrawAPI.addFiles(newFile);
        setBinaryData(excalidrawAPI.getFiles());
      }
    }
  };
  const handlePreviewImageClick = (index: number) => {
    setCurrentIndex(index);
    onModalOpen();
  };
  // handle edit
  const handleEditClick = async (id: string, pageNoInUserMadeStory: number) => {
    setPageNo(pageNoInUserMadeStory);
    try {
      const { images, editData } = await getSlideEditData({
        id,
        pageNoInUserMadeStory,
        storyId: story.id as string,
      });
      setImages(images as Image[]);
      // Parse and validate element data
      let ele: ExcalidrawElement[] = [];
      if (editData?.elementData) {
        const parsedData = JSON.parse(editData.elementData);
        if (
          Array.isArray(parsedData) &&
          parsedData.every((item) => typeof item === "object")
        ) {
          ele = parsedData as ExcalidrawElement[];
        } else {
          return;
        }
      } else {
        return;
      }

      // Update Excalidraw scene with elements
      if (excalidrawAPI) {
        excalidrawAPI.updateScene({ elements: ele });
        setElementData(ele);
      }

      // Generate and add binary data for images
      const newBinaryData: BinaryFileData[] = [];
      for (const img of images) {
        const dataUrl = await getImageBase64(img.url);
        if (dataUrl) {
          const fileData: BinaryFileData = {
            mimeType: "image/jpeg",
            id: img.id as FileId,
            dataURL: dataUrl as DataURL,
            created: Date.now(),
            lastRetrieved: Date.now(),
          };
          newBinaryData.push(fileData);

          if (excalidrawAPI) {
            excalidrawAPI.addFiles([fileData]);
          }
        }
      }
      setBinaryData(newBinaryData);
    } catch (error) {
      console.error("Error in handleEditClick:", error);
    }
  };

  // useEffect(() => {
  //   // Autosave every 10 seconds
  //   const autoSave = async () => {
  //     if (excalidrawAPI && elementData.length !== 0) {
  //       const canvas = await exportToCanvas({
  //         elements: elementData,
  //         files: binaryData,
  //         appState: { exportWithDarkMode: false },
  //         exportPadding: 0,
  //         maxWidthOrHeight: 1000,
  //       });
  //       formData.append("file", canvas.toDataURL());
  //       formData.append("upload_preset", "beamsworld"); // Replace with your Cloudinary upload presets

  //       const res = await fetch(
  //         "https://api.cloudinary.com/v1_1/dars7qqwz/image/upload",
  //         {
  //           method: "POST",
  //           body: formData,
  //         }
  //       );
  //       const data = await res.json();

  //       const body = {
  //         elementData: JSON.stringify(elementData),
  //         storyId: story.id as string,
  //         url: data.secure_url as string,
  //         pageNo,
  //       };

  //       startAutoSave(() => {
  //         autoSaveSlide(body);
  //       });
  //     }
  //   };
  //   autoSave();
  // }, [elementData, binaryData, excalidrawAPI, pageNo, story.id]);

  // submit modal
  const handleSubmitModal = () => {
    onSubmitModalOpen();
  };

  // handle final submit
  const handleFinalSubmit = () => {
    startSubmitting(() => {
      finalSubmit(story.id as string);
    });
  };
  return isLargerThan800 ? (
    <>
      <Flex
        flexDirection={"column"}
        justifyContent={"center"}
        h={"85vh"}
        m={"10px"}
        border={"1px solid gray"}
      >
        {/*Excalidraw from the npm*/}
        <Excalidraw
          initialData={{
            elements: elementData,
            files: binaryData,
          }}
          onChange={(
            elements: readonly ExcalidrawElement[],
            appdata,
            binary
          ) => {
            setBinaryData(binary);
            setElementData(elements);
          }}
          excalidrawAPI={(api) => setExcalidrawAPI(api)}
        >
          <IconButton
            _hover={{}}
            aria-label=""
            rounded="full"
            p={"2px"}
            w={"50px"}
            h={"50px"}
            bg="#704FE6"
            color={"#FAFAFA"}
            position={"absolute"}
            top={["60px", "60px", "10px"]}
            zIndex={10}
            left={["0px", "10px"]}
            icon={<BiMenu w={"24px"} />}
            onClick={onOpen}
          />
        </Excalidraw>
        <Button
          position="absolute"
          top="140px"
          right="25px"
          zIndex={10}
          _hover={{}}
          bg={COLOR.PURPLE_LIGHT}
          color={"white"}
          onClick={onComparisonModalOpen}
        >
          View Original
        </Button>
        <IconButton
          _hover={{}}
          position="absolute"
          bottom="150px"
          right="25px"
          zIndex={10}
          aria-label="Set"
          rounded="full"
          bg="#704FE6"
          color={"#FAFAFA"}
          isLoading={isGoingToNext}
          icon={<FaAngleRight />}
          onClick={getExport}
        />
      </Flex>
      <Flex flexDirection={"column"} justifyContent={"center"}>
        {Number(story.pageCount) === completedSlide.length && (
          <Button
            _hover={{}}
            mx={"auto"}
            h="35px"
            color={"#151515"}
            bg={"#FFD25D"}
            fontWeight={500}
            fontSize={["16px", "18px"]}
            rounded={"8px"}
            onClick={handleSubmitModal}
          >
            Submit
          </Button>
        )}

        <Text textAlign={"center"}>
          {" "}
          {pageNo === 0 ? "Cover" : `Slide ${pageNo}`}
        </Text>
      </Flex>
      {/*Drawer showing all the images, background, edit, preview*/}
      <CustomDrawer
        data={images}
        isOpen={isOpen}
        handlePrevClick={handlePrevClick}
        onClose={onClose}
        completedSlide={completedSlide}
        handleImageClick={handleImageClick}
        handleEditClick={handleEditClick}
        PageNo={pageNo}
      />
      {/*Preview Modal showing all the done slides*/}
      <PreviewModal
        story={story}
        completedSlide={completedSlide}
        isOpen={isModalOpen}
        onClose={onModalClose}
        currentIndex={currentIndex}
      />{" "}
      {/*Product Tour Modal*/}
      <ProductTourModal
        isOpen={isProductTourModalOpen}
        onClose={onProductTourModalClose}
      />{" "}
      {/*Comparison Modal*/}
      <ComparisonModal
        isOpen={isComparisonModalOpen}
        onClose={onComparisonModalClose}
        currentIndex={pageNo}
        completedSlide={completedSlide}
      />
      {/*Final submit*/}
      <SubmitModal
        handleFinalSubmit={handleFinalSubmit}
        isOpen={isSubmitModalOpen}
        onClose={onSubmitModalClose}
        isLoading={isSubmitting}
      />
    </>
  ) : (
    <>
      <Flex
        h={"100vh"}
        justifyContent={"center"}
        alignItems={"center"}
        w={"full"}
      >
        <Text fontSize={"28px"} fontWeight={"bold"}>
          Please use Tablet/Laptop or Desktop
        </Text>
      </Flex>
    </>
  );
}
