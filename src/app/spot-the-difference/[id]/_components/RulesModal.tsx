// rules modal
import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
} from "@chakra-ui/react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export default function RulesModal({ isOpen, onClose }: ModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size={"md"}>
      <ModalOverlay />
      <ModalContent mx="20px">
        <ModalHeader fontWeight={700} textAlign={"center"}>
          Game Rules
        </ModalHeader>
        <ModalCloseButton fontSize={"10px"} />

        <ModalBody
          w={"full"}
          display={"flex"}
          flexDirection={"column"}
          gap={"15px"}
          fontWeight={500}
          pt={"10px"}
          pb={"30px"}
        >
          <Text>1. Spot all differences between two images.</Text>
          <Text>2. Click/Tap on differences in either image. </Text>
          <Text>3. Earn points for every correct find. </Text>
          <Text>4. No time limit;focus on accuracy. </Text>
          <Text>5. Submit findings to unlock interesting fact. </Text>
          <Text>6. Try unlimited times; learn at your own pace.</Text>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
