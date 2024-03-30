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
import { useRouter } from "next/navigation";
import { useClerk } from "@clerk/nextjs";
import { COLOR } from "@/types/colors";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export default function LogoutModal({ isOpen, onClose }: ModalProps) {
  const router = useRouter();
  const { signOut } = useClerk();
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size={"md"}>
      <ModalOverlay />
      <ModalContent mx="20px">
        <ModalHeader fontWeight={700}>Taking a Break?</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text fontWeight={400}>
            Ready to log out? Don&lsquo;t forget your adventures in Beams! See
            you soon.
          </Text>
        </ModalBody>

        <ModalFooter>
          <Button
            _hover={{}}
            colorScheme="gray"
            variant={"outline"}
            mr={3}
            onClick={() => signOut(() => router.push("/"))}
          >
            Logout
          </Button>
          <Button
            _hover={{}}
            onClick={onClose}
            color={"white"}
            bg={COLOR.ORANGE}
            variant="ghost"
          >
            Stay
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
