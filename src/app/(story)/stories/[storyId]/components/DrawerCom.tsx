import React, { useEffect, useState } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Container,
  Box,
  Image,
  Text,
  Flex,
} from "@chakra-ui/react";
import { AiFillCloseCircle } from "react-icons/ai";
import { Quicksand } from "next/font/google";
import { Image as ImageType } from "@/types/user.types";
import { COLOR } from "@/types/colors";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/react";
import { BiChevronDown, BiInfoCircle } from "react-icons/bi";
const quicksand = Quicksand({
  subsets: ["latin"],
});
interface GroupedImages {
  [characterType: string]: ImageType[];
}

const groupByCharacterType = (data: ImageType[]) => {
  return data.reduce((acc: any, img: ImageType) => {
    const { characterType } = img;
    if (!acc[characterType!]) {
      acc[characterType!] = [];
    }
    acc[characterType!].push(img);
    return acc;
  }, {});
};
const CustomDrawer = ({
  isOpen,
  onClose,
  completedSlide,
  handlePrevClick,
  handleImageClick,
  handleEditClick,
  data,
  PageNo,
}: {
  isOpen: boolean;
  onClose: () => void;
  completedSlide: ImageType[];
  handlePrevClick: (url: string, index: number) => void;
  handleImageClick: (img: ImageType, imageId: string) => void;
  handleEditClick: (id: string, pageNoInUserMadeStory: number) => void;
  data: ImageType[];
  PageNo: number;
}) => {
  const [currentPageNo, setCurrentPageNo] = useState<number>(PageNo);
  useEffect(() => {
    setCurrentPageNo(PageNo);
  }, [PageNo]);
  const charactersGrouped: GroupedImages = groupByCharacterType(
    data.filter(
      (img: ImageType) => img.imageType === "CHARACTER" && !img.elementData
    )
  );

  const objectsGrouped: GroupedImages = groupByCharacterType(
    data.filter((img: ImageType) => img.imageType === "OBJECT")
  );

  return (
    <Drawer isOpen={isOpen} size={"sm"} placement="left" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent w="full">
        <DrawerCloseButton zIndex={101} opacity={0.5}>
          <AiFillCloseCircle size="25px" color={"gray"} />
        </DrawerCloseButton>
        <DrawerBody
          p="0"
          color={"rgba(21, 21, 21, 1)"}
          fontWeight={500}
          className={quicksand.className}
        >
          <Tabs w="full" variant="unstyled">
            <TabList justifyContent="space-around" mt={"50px"} mb={"20px"}>
              <Tab
                _selected={{ color: "white", bg: "purple.500" }}
                _focus={{ boxShadow: "none" }}
                fontSize={"18px"}
                w={"83px"}
                h={"35px"}
                borderRadius={"8px"}
              >
                IMAGES
              </Tab>
              <Tab
                _selected={{ color: "white", bg: "purple.500" }}
                _focus={{ boxShadow: "none" }}
                fontSize={"18px"}
                w={"106px"}
                h={"35px"}
                borderRadius={"8px"}
              >
                EDIT
              </Tab>
              <Tab
                _selected={{ color: "white", bg: "purple.500" }}
                _focus={{ boxShadow: "none" }}
                fontSize={"18px"}
                w={"83px"}
                h={"35px"}
                borderRadius={"8px"}
              >
                PREVIEW
              </Tab>
            </TabList>
            <TabPanels w="full">
              <TabPanel p="0">
                <Tabs variant="unstyled">
                  <TabList justifyContent="space-around">
                    <Flex direction={"column"} w="full" gap={"20px"}>
                      {/* <Select
                        mt={"10px"}
                        w="50%"
                        ml={"20px"}
                        placeholder="Select slide number"
                        value={selectedPage}
                      >
                        {completedSlide.map((img: ImageType, index: number) => (
                          <option
                            key={index}
                            onClick={() =>
                              handleEditClick(
                                img.id as string,
                                img.pageNoInUserMadeStory as number
                              )
                            }
                            value={img as string}
                          >
                            Slide {index + 1}
                          </option>
                        ))}
                      </Select> */}
                      <Popover>
                        <PopoverTrigger>
                          <Flex
                            w={"250px"}
                            px="20px"
                            border={"1px solid #DDDDDD"}
                            rounded={"10px"}
                            p={"10px"}
                            mx={"20px"}
                          >
                            <Text w={"full"} fontWeight={"bold"}>
                              {currentPageNo === 0
                                ? "Book Cover"
                                : `Slide ${currentPageNo}`}
                            </Text>
                            <BiChevronDown />
                          </Flex>
                        </PopoverTrigger>

                        <PopoverContent
                          w={"250px"}
                          mx={"20px"}
                          overflow={"hidden"}
                        >
                          {" "}
                          <PopoverCloseButton />
                          <PopoverBody w={"full"}>
                            <Flex direction={"column"} gap={"15px"} w={"full"}>
                              {completedSlide.map(
                                (data: any, index: number) => (
                                  <Flex
                                    cursor={"pointer"}
                                    key={index}
                                    onClick={() =>
                                      handleEditClick(
                                        data.id,
                                        data.pageNoInUserMadeStory
                                      )
                                    }
                                  >
                                    {index === 0 ? "Cover" : `Slide ${index}`}
                                  </Flex>
                                )
                              )}
                            </Flex>
                          </PopoverBody>
                        </PopoverContent>
                      </Popover>
                      <Flex
                        direction={"row"}
                        w={"full"}
                        position={"sticky"}
                        top={"0px"}
                      >
                        <Tab
                          _selected={{
                            textDecoration: "underline",
                            textUnderlineOffset: "10px",
                            textDecorationColor: "#704FE6",
                          }}
                          _focus={{ boxShadow: "none" }}
                          fontSize={"16px"}
                          id="bgs"
                        >
                          Background
                        </Tab>
                        <Tab
                          _selected={{
                            textDecoration: "underline",
                            textUnderlineOffset: "10px",
                            textDecorationColor: "#704FE6",
                          }}
                          _focus={{ boxShadow: "none" }}
                          fontSize={"16px"}
                          id="chars"
                        >
                          Characters
                        </Tab>
                        <Tab
                          _selected={{
                            textDecoration: "underline",
                            textUnderlineOffset: "10px",
                            textDecorationColor: "#704FE6",
                          }}
                          _focus={{ boxShadow: "none" }}
                          fontSize={"16px"}
                          id="objs"
                        >
                          Objects
                        </Tab>
                      </Flex>
                    </Flex>
                  </TabList>

                  <TabPanels p="0">
                    <TabPanel p="0">
                      {" "}
                      <Container centerContent>
                        {data.map((img: any, index: number) => (
                          <Box
                            p={"10px"}
                            cursor={"pointer"}
                            key={index}
                            onClick={() => handleImageClick(img, String(index))}
                          >
                            {img.imageType === "BACKGROUND" && (
                              <Image
                                w={"300px"}
                                src={img.url}
                                alt={`Image ${index}`}
                              />
                            )}
                          </Box>
                        ))}{" "}
                      </Container>
                    </TabPanel>
                    <TabPanel p={"0"}>
                      {" "}
                      <Container centerContent>
                        {Object.entries(charactersGrouped).map(
                          ([type, images], index) => (
                            <Box mb={"100px"} key={type + index} w="full">
                              <Flex
                                position={"sticky"}
                                top={"0px"}
                                w={"full"}
                                my="10px"
                                bg={"white"}
                                mt={"15px"}
                              >
                                <Flex
                                  flex={4}
                                  w={"full"}
                                  justifyContent={"center"}
                                  py={"10px"}
                                >
                                  <Text
                                    fontSize={"lg"}
                                    fontWeight={600}
                                    color={COLOR.PURPLE_LIGHT}
                                  >
                                    {type}
                                  </Text>

                                  <Popover trigger="hover">
                                    <PopoverTrigger>
                                      <BiInfoCircle
                                        cursor="pointer"
                                        color={"gray"}
                                      />
                                    </PopoverTrigger>
                                    <PopoverContent>
                                      <PopoverArrow />

                                      <PopoverBody>
                                        Insert only one {type}
                                      </PopoverBody>
                                    </PopoverContent>
                                  </Popover>
                                </Flex>
                              </Flex>
                              <Flex direction={"column"} gap={"20px"}>
                                {images.map(
                                  (img: ImageType, imgIndex: number) => (
                                    <Box
                                      cursor={"pointer"}
                                      py={"5px"}
                                      key={imgIndex}
                                      onClick={() =>
                                        handleImageClick(img, String(imgIndex))
                                      }
                                    >
                                      <Image
                                        mx={"auto"}
                                        h={"250px"}
                                        src={img.url}
                                        alt={`Image ${imgIndex}`}
                                      />
                                    </Box>
                                  )
                                )}
                              </Flex>
                            </Box>
                          )
                        )}
                      </Container>
                    </TabPanel>
                    <TabPanel p="0">
                      <Container centerContent>
                        {Object.entries(objectsGrouped).map(
                          ([type, images], index) => (
                            <Box key={type + index} w="full">
                              <Flex
                                position={"sticky"}
                                top={"0px"}
                                w={"full"}
                                my="10px"
                                bg={"white"}
                                mt={"15px"}
                              >
                                <Flex
                                  flex={4}
                                  w={"full"}
                                  justifyContent={"center"}
                                  py={"10px"}
                                >
                                  <Text
                                    fontSize={"lg"}
                                    fontWeight={600}
                                    color={COLOR.PURPLE_LIGHT}
                                  >
                                    {type}
                                  </Text>

                                  <Popover trigger="hover">
                                    <PopoverTrigger>
                                      <BiInfoCircle
                                        cursor="pointer"
                                        color={"gray"}
                                      />
                                    </PopoverTrigger>
                                    <PopoverContent>
                                      <PopoverArrow />

                                      <PopoverBody>
                                        Insert only one {type}
                                      </PopoverBody>
                                    </PopoverContent>
                                  </Popover>
                                </Flex>
                              </Flex>
                              {images.map(
                                (img: ImageType, imgIndex: number) => (
                                  <Box
                                    cursor={"pointer"}
                                    py={"5px"}
                                    key={imgIndex}
                                    onClick={() =>
                                      handleImageClick(img, String(imgIndex))
                                    }
                                  >
                                    <Image
                                      w={"100px"}
                                      src={img.url}
                                      alt={`Image ${imgIndex}`}
                                      mx={"auto"}
                                    />
                                  </Box>
                                )
                              )}
                            </Box>
                          )
                        )}
                      </Container>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </TabPanel>
              <TabPanel>
                {" "}
                <Text fontSize={"16px"} fontWeight={400}>
                  Choose a slide to edit
                </Text>
                <Container centerContent>
                  {completedSlide.map((data: any, index: number) => (
                    <Box
                      p={"10px"}
                      cursor={"pointer"}
                      key={index}
                      onClick={() =>
                        handleEditClick(data.id, data.pageNoInUserMadeStory)
                      }
                    >
                      <Image
                        w={"300px"}
                        src={data.url}
                        alt={`Image ${index}`}
                      />
                      <Text
                        fontSize={"16px"}
                        fontWeight={400}
                        textAlign={"center"}
                      >
                        {index + 1}
                      </Text>
                    </Box>
                  ))}{" "}
                </Container>
              </TabPanel>
              <TabPanel>
                {" "}
                <Text fontSize={"16px"} fontWeight={400}>
                  Click on the slide to preview
                </Text>
                <Container centerContent>
                  {completedSlide.map((data: any, index: number) => (
                    <Box
                      p={"10px"}
                      cursor={"pointer"}
                      key={index}
                      onClick={() => handlePrevClick(data.url, index)}
                    >
                      <Image
                        w={"300px"}
                        src={data.url}
                        alt={`Image ${index}`}
                      />
                      <Text
                        fontSize={"16px"}
                        fontWeight={400}
                        textAlign={"center"}
                      >
                        {index + 1}
                      </Text>
                    </Box>
                  ))}{" "}
                </Container>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default CustomDrawer;
