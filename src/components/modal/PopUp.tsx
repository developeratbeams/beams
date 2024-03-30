import React, { useEffect } from "react";
import { Box, Button, Container, Flex, Image, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { COLOR } from "@/types/colors";

interface ModalProps {
  isOpen?: boolean;
  title: string;
  onClose: () => void;
  subHeading: string;
  imageUrl: string;
  buttonText: string;
}

export const PopUp = ({
  isOpen,
  title,
  subHeading,
  imageUrl,
  buttonText,
  onClose,
}: ModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const modalVariants = {
    hidden: {
      opacity: 0,
      y: "100%",
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        type: "spring",
        damping: 15,
      },
    },
  };

  return (
    <Box
      position={"fixed"}
      top={0}
      left={0}
      right={0}
      bottom={0}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      zIndex={11}
      sx={{
        bg: "white",
      }}
    >
      <motion.div
        className="modal-overlay"
        initial="hidden"
        animate={isOpen ? "visible" : "hidden"}
        variants={modalVariants}
        style={{ margin: "auto" }}
      >
        <Container
          p={"10px"}
          bg={"white"}
          maxW={"1xl"}
          borderRadius={"10px"}
          boxShadow={"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"}
          maxHeight="100vh"
          overflowY="auto"
        >
          <Container
            py={"20px"}
            display={"flex"}
            centerContent
            flexDirection={"column"}
            textAlign={"center"}
            gap={"20px"}
          >
            <Image src={imageUrl!} h={"300px"} alt="beams" />
            <Text fontSize={["18px", "24px"]} fontWeight={700}>
              {title}
            </Text>
            <Text>{subHeading}</Text>
            <Button
              w={["200px", "300px"]}
              bg={COLOR.ORANGE}
              _hover={{}}
              color={"white"}
              onClick={onClose}
            >
              {buttonText}
            </Button>
          </Container>
        </Container>
      </motion.div>
    </Box>
  );
};
