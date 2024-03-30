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
  Flex,
} from "@chakra-ui/react";
import { AiFillCloseCircle } from "react-icons/ai";
import { Quicksand } from "next/font/google";
const quicksand = Quicksand({ subsets: ["latin"] });
function ProductTourModal({ isOpen, onClose }: any) {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size={"5xl"}>
        <ModalOverlay
          sx={{
            bg: "white",
          }}
        />
        <ModalContent className={quicksand.className} mx={"10px"} my={"auto"}>
          <ModalCloseButton color={"gray"}>
            <AiFillCloseCircle size={"30px"} />
          </ModalCloseButton>
          <ModalHeader textAlign={"center"}>Product Tour</ModalHeader>
          <ModalBody>
            <Flex w={"full"} justifyContent={"center"}>
              <video controls>
                <source
                  src="https://res.cloudinary.com/drlyyxqh9/video/upload/v1711041130/product_tour_-_kqg5np.mp4"
                  type="video/mp4"
                />
              </video>
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

export default ProductTourModal;
