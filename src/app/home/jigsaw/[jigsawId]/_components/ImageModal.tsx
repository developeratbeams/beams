//Image modal
import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  Image,
} from "@chakra-ui/react";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
}
export default function ImageModal({ isOpen, onClose, imageUrl }: ModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      motionPreset={"slideInLeft"}
      size="xl"
      isCentered
    >
      <ModalOverlay />
      <ModalContent
        mt={"200px"}
        p={"0"}
        rounded={"10px"}
        border="1px solid black"
        mx={["20px"]}
      >
        <ModalCloseButton />
        <ModalBody m={"0"} p={"0"}>
          <Image rounded={"10px"} src={imageUrl} alt="Enlarged beams" />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
