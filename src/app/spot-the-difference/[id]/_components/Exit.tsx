// exit modal
import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
} from "@chakra-ui/react";

import { COLOR } from "@/types/colors";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export default function ExitModal({ isOpen, onClose }: ModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size={"md"}>
      <ModalOverlay />
      <ModalContent mx="20px">
        <ModalHeader fontWeight={700}>Wait a Minute! 🛑</ModalHeader>
        <ModalCloseButton />
        <ModalBody
          w={"full"}
          display={"flex"}
          flexDirection={"column"}
          gap={"15px"}
        >
          <Text>
            Are you sure you want to leave? You might need to restart.{" "}
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button _hover={{}} colorScheme="gray" variant={"outline"} mr={3}>
            Quit
          </Button>
          <Button
            _hover={{}}
            onClick={onClose}
            color={"white"}
            bg={COLOR.ORANGE}
            variant="ghost"
          >
            Continue
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
