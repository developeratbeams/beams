import React from "react";
import { motion } from "framer-motion";
import {
  Box,
  Container,
  Flex,
  IconButton,
  Image,
  Text,
} from "@chakra-ui/react";
import { COLOR } from "@/types/colors";
import { User } from "@/types/user.types";
import { MdArrowForwardIos } from "react-icons/md";
import { Quicksand } from "next/font/google";
import Link from "next/link";

const quickland = Quicksand({ subsets: ["latin"] });
const MotionFlex = motion(Flex);
const MotionText = motion(Text);
const MotionImage = motion(Image);
const MotionContainer = motion(Container);

interface StartProps {
  handleChange: () => void;
  self: User;
}

export default function Start({ handleChange, self }: StartProps) {
  return (
    <MotionFlex
      h={"100vh"}
      w="full"
      justifyContent={"center"}
      alignItems={"center"}
      direction={["column", "row"]}
      className={quickland.className}
      gap={["10px", "10px"]}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Flex
        flex={[3, 4]}
        alignItems={["center", "flex-end"]}
        justifyContent={"center"}
        h={"full"}
        direction={"column"}
        gap={"0px"}
        w={["full"]}
      >
        <MotionFlex
          w={["full", "auto"]}
          justifyContent={"flex-end"}
          alignItems={"flex-end"}
          mb={"-30px"}
          mr={"15px"}
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
        >
          <Text
            bg={COLOR.YELLOW}
            p={"15px"}
            rounded={"10px"}
            fontSize={["16px", "18px"]}
            fontWeight={600}
          >
            Hello {self?.firstName}
          </Text>
        </MotionFlex>
        <MotionImage
          h={["200px", "440px"]}
          src="/assets/start-onboarding-astro.png"
          alt="beams"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.7, type: "spring" }}
        />
      </Flex>
      <Flex
        flex={[5, 4]}
        h={"full"}
        display={"flex"}
        flexDirection={"column"}
        maxW={"full"}
        gap={"20px"}
        justifyContent={["flex-start", "center"]}
        p={"20px"}
      >
        <MotionContainer
          display={"flex"}
          flexDirection={"column"}
          maxW={"38rem"}
          gap={"30px"}
          bg={"white"}
          p={"20px"}
          rounded={"10px"}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
        >
          <MotionText
            fontSize={["24px", "38px"]}
            fontWeight={700}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              delay: 0.8,
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
          >
            Welcome to the{" "}
            <Box as="span" color={COLOR.ORANGE}>
              Beams World!
            </Box>{" "}
          </MotionText>
          <Text>
            Before you step into the wondrous world of Beams, let&apos;s take a
            moment to discover the amazing features waiting for you!
          </Text>
          <Flex w={"full"} justifyContent={"space-between"} gap={"10px"}>
            <Link href={"/home"}>
              <Text
                fontWeight={400}
                fontSize={["16px", "18px"]}
                cursor={"pointer"}
              >
                Skip
              </Text>{" "}
            </Link>
            <IconButton
              _hover={{}}
              color={"white"}
              bg={COLOR.ORANGE}
              onClick={handleChange}
              rounded={"full"}
              aria-label="next"
              icon={<MdArrowForwardIos />}
            />
          </Flex>
        </MotionContainer>
      </Flex>
    </MotionFlex>
  );
}
