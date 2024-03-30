// submit modal
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
  onClick: () => void;
  loading: boolean;
}
export default function SubmitModal({
  isOpen,
  onClose,
  onClick,
  loading,
}: ModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size={"md"}>
      <ModalOverlay />
      <ModalContent mx="20px">
        <ModalHeader fontWeight={700}>Almost there!</ModalHeader>
        <ModalCloseButton />
        <ModalBody
          w={"full"}
          display={"flex"}
          flexDirection={"column"}
          gap={"15px"}
        >
          <Text>
            Sure you&apos;ve spotted all the differences? Submit to earn beams
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={onClose}
            _hover={{}}
            colorScheme="gray"
            variant={"outline"}
            mr={3}
          >
            Check Again
          </Button>
          <Button
            _hover={{}}
            onClick={onClick}
            color={"white"}
            bg={COLOR.ORANGE}
            variant="ghost"
            isLoading={loading}
          >
            Yes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
