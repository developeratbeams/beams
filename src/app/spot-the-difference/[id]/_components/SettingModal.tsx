// setting modal
import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  Flex,
  Switch,
  useDisclosure,
  Image,
} from "@chakra-ui/react";

import { MdArrowForwardIos } from "react-icons/md";
import RulesModal from "./RulesModal";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export default function SettingModal({ isOpen, onClose }: ModalProps) {
  const {
    isOpen: isRulesModalOpen,
    onClose: onRulesModalClose,
    onOpen: onRulesModalOpen,
  } = useDisclosure();
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size={"xs"}>
      <ModalOverlay />
      <ModalContent mx="20px">
        <ModalHeader fontWeight={700} textAlign={"center"}>
          Settings
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
          <Flex
            w={"full"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Flex gap={"10px"} alignItems={"center"}>
              <Image src="/std/music.svg" alt="beams" />

              <Text>Music</Text>
            </Flex>

            <Switch colorScheme="orange" id="email-alerts" />
          </Flex>
          <Flex
            w={"full"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Flex gap={"10px"} alignItems={"center"}>
              <Image src="/std/rules.svg" alt="beams" />
              <Text>Game rules</Text>
            </Flex>
            <MdArrowForwardIos onClick={() => onRulesModalOpen()} />
          </Flex>
        </ModalBody>
      </ModalContent>
      {/*Rules modal*/}
      <RulesModal isOpen={isRulesModalOpen} onClose={onRulesModalClose} />
    </Modal>
  );
}
