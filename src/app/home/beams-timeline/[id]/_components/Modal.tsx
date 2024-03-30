// why it matters modal
import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  Image,
  Text,
  Flex,
} from "@chakra-ui/react";
import { AiFillCloseCircle } from "react-icons/ai";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;

  imageUrl: string;
  content: string;
}
export default function PreviewModal({
  isOpen,
  onClose,
  imageUrl,
  content,
}: ModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      size={"md"}
      motionPreset={"slideInTop"}
    >
      <ModalOverlay
        sx={{
          bg: "white",
        }}
      />
      <ModalContent
        mx="20px"
        p={"0"}
        border={["none", "1px solid gray"]}
        rounded={"20px"}
      >
        <ModalCloseButton bg={"white"}>
          <AiFillCloseCircle size="sm" />
        </ModalCloseButton>
        <ModalBody p={"0"}>
          <Flex direction={"column-reverse"} gap={"20px"} w={"full"}>
            <Flex flex={4} justifyContent={"center"} direction={"column"}>
              <Text
                fontSize={["16px", "20px"]}
                fontWeight={"bold"}
                textAlign={"center"}
              >
                Why it matters?
              </Text>
              <Text
                lineHeight={"28px"}
                fontWeight={450}
                fontSize={["16px", "18px"]}
                p={"10px"}
              >
                {content}
              </Text>
            </Flex>
            <Flex flex={4} w={"full"}>
              <Image
                h={"300px"}
                borderTopRadius={"10px"}
                w={"full"}
                src={imageUrl}
                alt="beams"
              />
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
