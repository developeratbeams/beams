// navbar
import { Flex, IconButton, Image, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { FaCheck } from "react-icons/fa6";
import SettingModal from "./SettingModal";
import ExitModal from "./Exit";
interface NavProps {
  found: number;
  total: number;
}
export default function NavBar({ found, total }: NavProps) {
  const {
    isOpen: isSettingModalOpen,
    onClose: onSettingModalClose,
    onOpen: onSettingModalOpen,
  } = useDisclosure();
  const {
    isOpen: isExitModalOpen,
    onClose: onExitModalClose,
    onOpen: onExitModalOpen,
  } = useDisclosure();
  return (
    <>
      <Flex
        h={"8vh"}
        w={"full"}
        justifyContent={"space-between"}
        px={"20px"}
        py={"10px"}
        borderBottom={"1px solid #E3E1D9"}
        mb={"10px"}
      >
        <Image
          cursor={"pointer"}
          src="/std/setting.svg"
          alt="beams"
          aria-label="setting"
          onClick={() => onSettingModalOpen()}
        />

        <Flex gap={"10px"} alignItems={"center"}>
          <FaCheck color="green" /> {found}/{total}
        </Flex>
        <IconButton
          bg={"transparent"}
          _hover={{}}
          _active={{}}
          onClick={() => onExitModalOpen()}
          size={"100px"}
          aria-label="close"
          icon={<AiFillCloseCircle />}
        />
      </Flex>
      <SettingModal isOpen={isSettingModalOpen} onClose={onSettingModalClose} />
      <ExitModal isOpen={isExitModalOpen} onClose={onExitModalClose} />
    </>
  );
}
