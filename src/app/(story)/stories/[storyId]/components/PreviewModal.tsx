// preview modal
import React, { useEffect, useState } from "react";
import {
  Box,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Container,
  Flex,
  Heading,
} from "@chakra-ui/react";
import {
  AiFillLeftCircle,
  AiFillRightCircle,
  AiFillCloseCircle,
} from "react-icons/ai";
import { Quicksand } from "next/font/google";
const quicksand = Quicksand({ subsets: ["latin"] });
function PreviewModal({ completedSlide, isOpen, onClose, currentIndex }: any) {
  const [imageIndex, setImageIndex] = useState(currentIndex);
  const nextImage = () => {
    if (imageIndex < completedSlide.length - 1) {
      setImageIndex(imageIndex + 1);
    }
  };

  const prevImage = () => {
    if (imageIndex > 0) {
      setImageIndex(imageIndex - 1);
    }
  };
  useEffect(() => {
    setImageIndex(currentIndex);
  }, [currentIndex]);
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size={"5xl"}>
        <ModalOverlay />
        <ModalContent className={quicksand.className} mx={"10px"} my={"auto"}>
          <ModalHeader
            fontFamily={"Quicksand"}
            textAlign={"center"}
            fontSize={["24px", "56px"]}
            fontWeight={400}
            m={"0px"}
          >
            Preview
          </ModalHeader>
          <ModalCloseButton color={"gray"}>
            <AiFillCloseCircle size={"30px"} />
          </ModalCloseButton>

          <ModalBody>
            <Flex align="center">
              <Box cursor={"pointer"} onClick={prevImage}>
                <AiFillLeftCircle />
              </Box>
              <Container maxW={"6xl"}>
                {!(completedSlide.length === 0) ? (
                  <Image
                    src={completedSlide[imageIndex]?.url}
                    alt={`Canvas ${imageIndex}`}
                  />
                ) : (
                  <Heading
                    fontFamily={"Quicksand"}
                    textAlign={"center"}
                    fontSize={["24px", "56px"]}
                    fontWeight={400}
                  >
                    No Slide Saved
                  </Heading>
                )}{" "}
              </Container>
              <Box cursor={"pointer"} bg={"inherit"} onClick={nextImage}>
                {" "}
                <AiFillRightCircle />
              </Box>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Box h={"45px"} />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default PreviewModal;
