//Knowledge modal
import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Image,
  Text,
  ModalHeader,
  ModalFooter,
  Flex,
  IconButton,
} from "@chakra-ui/react";
import { COLOR } from "@/types/colors";
import { User } from "@/types/user.types";
import { MdArrowForwardIos } from "react-icons/md";
import { useRouter } from "next/navigation";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  jigSawId: string;
}
export default function KnowledgeModal({
  isOpen,
  onClose,
  user,
  jigSawId,
}: ModalProps) {
  const router = useRouter();
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      size={["3xl", "2xl"]}
      motionPreset={"slideInTop"}
    >
      <ModalOverlay />
      <ModalContent mx="20px">
        <ModalHeader fontWeight={700}>Hey {user?.firstName},</ModalHeader>
        <ModalBody>
          <Flex direction={"column"} gap={"10px"}>
            <Text fontWeight={400}>
              Did you know GRAPHENE, a single layer of carbon atoms, is
              revolutionizing our world? This wonder material enables fitness
              bands to monitor vital signs like heartbeat, hydration, and oxygen
              levels with incredible accuracy. It doesn&apos;t stop
              there—graphene integrated into smartphone cameras can now detect
              counterfeit drugs and ensure your fruits are at their peak
              freshness.
            </Text>
            <Text fontWeight={400}>
              By leveraging graphene&apos;s exceptional electrical and optical
              properties, these gadgets work by sensing and analyzing the minute
              changes in your environment and body, making advanced health and
              safety features part of everyday life. Welcome to the future,
              powered by graphene!
            </Text>
            <Image
              rounded={"10px"}
              h={"300px"}
              src="https://res.cloudinary.com/drlyyxqh9/image/upload/v1711101714/jigsaw/dalle-2024-03-22-1529-1-65fd56da403f0_jklk3v.webp"
              alt="beams"
            />
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Text
            aria-label="next"
            _hover={{}}
            onClick={() => {
              router.refresh();
              router.push(`/home/jigsaw/${jigSawId}`);
            }}
            p={"10px"}
            fontWeight={600}
            color={"black"}
            rounded={"10px"}
            cursor={"pointer"}
            bg={COLOR.GREEN}
            variant="ghost"
          >
            Next
          </Text>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
