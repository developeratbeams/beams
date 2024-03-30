// submit modal
import React, { useState } from "react";
import {
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  HStack,
} from "@chakra-ui/react";
import { AiFillCloseCircle } from "react-icons/ai";
import { Quicksand } from "next/font/google";
const quicksand = Quicksand({
  subsets: ["latin"],
});
function SubmitModal({
  isOpen,
  onClose,
  handleFinalSubmit,
  isLoading,
}: {
  isOpen: boolean;
  onClose: () => void;
  handleFinalSubmit: () => void;
  isLoading: boolean;
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent mx={"30px"} my={"auto"}>
        <ModalCloseButton color={"gray"}>
          <AiFillCloseCircle size={"30px"} />
        </ModalCloseButton>

        <ModalBody className={quicksand.className}>
          <Text py={"10px"} fontSize={["18px", "24px"]} fontWeight={700}>
            Quick Check!
          </Text>
          <Text
            lineHeight={"24px"}
            fontSize={["16px", "18px"]}
            fontWeight={400}
            color={"rgba(21, 21, 21, 1)"}
          >
            Is your story ready for lift-off into Beams World? If so, click
            Submit.
          </Text>
        </ModalBody>
        <ModalFooter>
          {" "}
          <HStack>
            <Button
              _hover={{}}
              bg="#FFD25D"
              color={"#151515"}
              isLoading={isLoading}
              loadingText="Saving"
              w={["54", "106px"]}
              h={["30px", "45px"]}
              onClick={handleFinalSubmit}
            >
              Submit
            </Button>
            <Button
              _hover={{}}
              padding={"10px 5px"}
              variant={"outline"}
              color={"rgba(153, 150, 150, 1)"}
              w={["54", "106px"]}
              h={["30px", "45px"]}
            >
              Cancel
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default SubmitModal;
