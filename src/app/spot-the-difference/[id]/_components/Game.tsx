"use client";
import React, { useState, useTransition } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Image,
  useDisclosure,
} from "@chakra-ui/react";
import NavBar from "./NavBar";
import { COLOR } from "@/types/colors";
import { FaCheck } from "react-icons/fa6";
import KnowledgeModal from "./KnowledgeModal";
import SubmitModal from "./SubmitButton";
import { saveAttemptSpotTheDifference } from "@/actions/spotthedifference";

interface ImageDifferencesProps {
  image1Url: string;
  image2Url: string;
  differences: any;
  id: string;
}

// interface ClickPosition {
//   x: number;
//   y: number;
// }

const ImageDifferences: React.FC<ImageDifferencesProps> = ({
  image1Url,
  image2Url,
  differences,
  id,
}) => {
  const [foundDifferences, setFoundDifferences] = useState<number[]>([]);
  // when user submits and it shows vedio, images and text about the image used in the spot the diifernce
  const {
    isOpen: isKnowledgeModalOpen,
    onClose: onKnowledgeModalClose,
    onOpen: onKnowledgeModalOpen,
  } = useDisclosure();
  // submit modal
  const {
    isOpen: isSubmitModalOpen,
    onClose: onSubmitModalClose,
    onOpen: onSubmitModalOpen,
  } = useDisclosure();
  // loader for the saving using usetransition hook
  const [saving, startSaving] = useTransition();
  // checks is valid click
  const markDifferenceFound = (no: number) => {
    if (!foundDifferences.includes(no)) {
      setFoundDifferences((prev) => [...prev, no]);
    }
  };

  // handles click of user on image
  const handleImageClick = (
    e: React.MouseEvent<HTMLDivElement>,
    imageNumber: number
  ) => {
    e.stopPropagation();

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    let isWithinDifference = false;
    differences.forEach((difference: any) => {
      if (
        x >= difference.x &&
        x <= difference.x + (difference.width / rect.width) * 100 &&
        y >= difference.y &&
        y <= difference.y + (difference.height / rect.height) * 100
      ) {
        markDifferenceFound(difference.no);
        isWithinDifference = true;
      }
    });
  };

  // final submit
  const handleSubmit = () => {
    try {
      const body = {
        id,
        spottedDifferences: foundDifferences,
      };
      // saving attempt to database
      startSaving(() => {
        saveAttemptSpotTheDifference(body).then(() => {
          onKnowledgeModalOpen();
        });
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {/*Custom navigation for this, showing different icons*/}
      <NavBar found={foundDifferences.length} total={differences.length} />
      <Container
        display="flex"
        maxW="5xl"
        justifyContent="center"
        gap="30px"
        flex={6}
        alignItems="center"
        flexDirection={["column", "column", "row"]}
      >
        {/*Shows the two images*/}
        {[image1Url, image2Url].map((url, index) => (
          <Box
            key={index}
            position="relative"
            onClick={(e) => handleImageClick(e, index)}
          >
            <Image
              src={url}
              w={"full"}
              h={["35vh", "35vh", "500px"]}
              alt={`Image ${index + 1}`}
              objectFit="contain"
            />
            {/*Place the boxes at specified  position*/}
            {differences.map((difference: any) => (
              <Box
                key={difference.no}
                onClick={(e) => {
                  e.stopPropagation();
                  markDifferenceFound(difference.no);
                }}
                style={{
                  position: "absolute",
                  left: `${difference.x}%`,
                  top: `${difference.y}%`,
                  width: `${difference.width}%`,
                  height: `${difference.height}%`,

                  boxSizing: "border-box",
                  zIndex: 10,
                }}
                rounded={"full"}
                aria-label="Difference"
              >
                {foundDifferences.includes(difference.no) && (
                  <Flex
                    justifyContent={"center"}
                    alignItems={"center"}
                    rounded={"full"}
                    h={"20px"}
                    w={"20px"}
                    bg={"#01D230"}
                    boxShadow={"10px gray"}
                  >
                    <FaCheck color="white" />
                  </Flex>
                )}
              </Box>
            ))}
          </Box>
        ))}
      </Container>
      {/*Submit Button*/}
      <Flex mt={"30px"} w={"full"} justifyContent={"center"}>
        <Button
          w={["150px", "250px"]}
          _hover={{}}
          _active={{}}
          bg={COLOR.ORANGE}
          color={"white"}
          onClick={() => onSubmitModalOpen()}
        >
          Submit
        </Button>
      </Flex>
      {/*Knowledge Modal*/}
      <KnowledgeModal
        id={id}
        isOpen={isKnowledgeModalOpen}
        onClose={onKnowledgeModalClose}
      />
      {/*Submit Modal*/}
      <SubmitModal
        loading={saving}
        onClick={handleSubmit}
        isOpen={isSubmitModalOpen}
        onClose={onSubmitModalClose}
      />
    </>
  );
};

export default ImageDifferences;
