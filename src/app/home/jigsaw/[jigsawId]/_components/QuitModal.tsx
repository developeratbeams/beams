//Quit modal
import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  Image,
  Text,
  ModalHeader,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import { COLOR } from "@/types/colors";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onQuit: () => void;
  loading: boolean;
}
export default function QuitModal({
  isOpen,
  onClose,
  onQuit,
  loading,
}: ModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      size={"md"}
      motionPreset={"slideInTop"}
    >
      <ModalOverlay />
      <ModalContent mx="20px">
        <ModalHeader fontWeight={700}>Almost There!</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text fontWeight={400}>
            Are you sure to quit the jigsaw now? You&apos;ll miss the chance to
            earn points.
          </Text>
        </ModalBody>

        <ModalFooter>
          <Button
            _hover={{}}
            onClick={onQuit}
            colorScheme="gray"
            variant={"outline"}
            mr={3}
            isLoading={loading}
          >
            Quit
          </Button>
          <Button
            _hover={{}}
            onClick={onClose}
            color={"white"}
            bg={COLOR.GREEN}
            variant="ghost"
          >
            Keep Going
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
