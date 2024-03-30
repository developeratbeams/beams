// shows user submitted and all the differnce
import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Image,
  Flex,
  Box,
  Container,
  ModalCloseButton,
} from "@chakra-ui/react";
import { FaCheck } from "react-icons/fa6";

interface Difference {
  no: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  image1Url: string;
  image2Url: string;
  differences: any;
  foundDifferences: number[];
  // Assuming foundDifferences is an array of `no` values that user has identified
}

export default function ResultModal({
  isOpen,
  onClose,
  image1Url,
  image2Url,
  differences,
  foundDifferences,
}: ModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      size={["3xl", "3xl"]}
      motionPreset="slideInTop"
    >
      <ModalOverlay />
      <ModalContent mx="20px">
        <ModalCloseButton
          position={"absolute"}
          zIndex={100}
          bg={"white"}
          rounded={"full"}
        />
        <ModalBody>
          <Container
            display="flex"
            maxW="5xl"
            justifyContent="center"
            gap="30px"
            flex={6}
            alignItems="center"
            flexDirection={["column", "column", "row"]}
          >
            {/* Image 1 shows all differences */}
            <Box position="relative">
              <Image
                src={image1Url}
                w="full"
                h={["25vh", "25vh", "400px"]}
                alt="Image 1"
                objectFit="contain"
              />
              {differences?.map((difference: Difference) => (
                <Box
                  key={difference.no}
                  style={{
                    position: "absolute",
                    left: `${difference.x}%`,
                    top: `${difference.y}%`,
                    width: `${difference.width}px`,
                    height: `${difference.height}px`,
                    boxSizing: "border-box",
                    zIndex: 10,
                  }}
                  rounded="full"
                  aria-label="Difference"
                >
                  <Flex
                    justifyContent="center"
                    alignItems="center"
                    rounded="full"
                    h={["10px", "20px"]}
                    w={["10px", "20px"]}
                    bg="#01D230"
                    boxShadow="10px gray"
                  >
                    <FaCheck color="white" />
                  </Flex>
                </Box>
              ))}
            </Box>
            {/* Image 2 shows only differences found by the user */}
            <Box position="relative">
              <Image
                src={image2Url}
                w="full"
                h={["25vh", "25vh", "400px"]}
                alt="Image 2"
                objectFit="contain"
              />
              {differences
                .filter((difference: { no: number }) =>
                  foundDifferences.includes(difference.no)
                )
                .map((difference: Difference) => (
                  <Box
                    key={difference.no}
                    style={{
                      position: "absolute",
                      left: `${difference.x}%`,
                      top: `${difference.y}%`,
                      width: `${difference.width}%`,
                      height: `${difference.height}%`,
                      boxSizing: "border-box",
                      zIndex: 10,
                    }}
                    rounded="full"
                    aria-label="Found Difference"
                  >
                    <Flex
                      justifyContent="center"
                      alignItems="center"
                      rounded="full"
                      h={["10px", "20px"]}
                      w={["10px", "20px"]}
                      bg="#01D230"
                      boxShadow="10px gray"
                    >
                      <FaCheck color="white" />
                    </Flex>
                  </Box>
                ))}
            </Box>
          </Container>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
