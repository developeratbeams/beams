// knowledge modal
import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Image,
  Text,
  ModalFooter,
  Flex,
  IconButton,
  Container,
} from "@chakra-ui/react";
import { COLOR } from "@/types/colors";
import { MdArrowForwardIos } from "react-icons/md";
import { useRouter } from "next/navigation";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  id: string;
}
export default function KnowledgeModal({ isOpen, onClose, id }: ModalProps) {
  const router = useRouter();
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={["3xl", "full"]}
      motionPreset={"slideInTop"}
    >
      <ModalOverlay />
      <ModalContent p={0}>
        <ModalBody p={0}>
          <Flex
            direction={"column"}
            gap={"30px"}
            w={"full"}
            alignItems={"center"}
            p={"0"}
            justifyContent={"center"}
          >
            <Image
              mt={"-2px"}
              w="full"
              h={["300px", "400px"]}
              src="/jigsaw/jigsaw-success.png"
              alt="beams"
            />
            <Container maxW={"4xl"}>
              <Text fontWeight={700} px={"50px"} lineHeight={"28px"}>
                Artificial Intelligence now powers creative tools that can
                generate stunning artworks, music, and literature, pushing the
                boundaries of creativity and collaboration between humans and
                machines.
              </Text>
            </Container>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <IconButton
            aria-label="next"
            _hover={{}}
            onClick={() => router.push(`/spot-the-difference/${id}`)}
            color={"white"}
            bg={COLOR.ORANGE}
            variant="ghost"
            icon={<MdArrowForwardIos />}
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
