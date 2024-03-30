"use client";
import React from "react";
import {
  HStack,
  IconButton,
  Image,
  Spacer,
  useDisclosure,
} from "@chakra-ui/react";
import { HiMenuAlt3 } from "react-icons/hi";
import ProfileDrawer from "./ProfileDrawer";
import { User } from "@/types/user.types";
import Link from "next/link";
interface NavBarProps {
  data: User | undefined;
}
export default function NavBar({ data }: NavBarProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <HStack zIndex={10} h={"8vh"} bg={"white"}>
        <Link href={"/"}>
          <Image p={"10px"} src="/assets/favicon.png" w={"90px"} alt="beams" />
        </Link>
        <Spacer />

        <IconButton
          _hover={{}}
          aria-label="menu"
          h={"50px"}
          w={"50px"}
          cursor={"pointer"}
          bg={"transparent"}
          onClick={() => {
            onOpen();
          }}
          icon={<HiMenuAlt3 />}
        />
      </HStack>

      <ProfileDrawer
        data={data}
        isOpenDrawer={isOpen}
        onCloseDrawer={onClose}
      />
    </>
  );
}
