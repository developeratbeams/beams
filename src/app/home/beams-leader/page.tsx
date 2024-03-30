// landing page for the leader
import { getAuther } from "@/libs/getAuther";
import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Quicksand } from "next/font/google";
import React from "react";
import { COLOR } from "@/types/colors";
import { getAllQuizes } from "@/libs/quiz-service";
import { notFound } from "next/navigation";
import Link from "next/link";
const quicksand = Quicksand({
  subsets: ["latin"],
});

export default async function Page() {
  const self = await getAuther();
  const quizes = await getAllQuizes();
  if (!quizes) notFound();

  return (
    <>
      <Flex
        flexDirection={"column"}
        gap={"20px"}
        maxW={"full"}
        className={quicksand.className}
        h={"92vh"}
        bgImage={"/leader/cover-main.png"}
        alignItems={"center"}
        bgPosition={"center"}
      >
        <Flex
          flexDirection={"column"}
          w={"100%"}
          justifyContent={"center"}
          gap={["20px", "30px"]}
        >
          <VStack py={"15px"}>
            <Text
              fontWeight={700}
              color={"#151515"}
              fontSize={["20px", "40px"]}
              textAlign={"center"}
            >
              Challenge Your Intellect with{" "}
              <Box as={"span"} color={COLOR.BROWN}>
                Beams Leader
              </Box>
            </Text>
            <Text
              color={"#151515"}
              textAlign={"center"}
              fontSize={["14px", "20px"]}
              fontWeight={500}
            >
              Hi {self?.firstName}, ready to elevate your leadership skills?
            </Text>
          </VStack>
        </Flex>
        <Flex
          bg={"white"}
          mx={"20px"}
          h={["290px", "280px"]}
          maxW={"4xl"}
          flexDirection={"column"}
          gap={"10px"}
          borderRadius={"12px"}
          px={"4px"}
          py={"10px"}
        >
          <Flex
            gap={"12px"}
            borderRadius={"12px"}
            overflow={"scroll"}
            overflowX={"scroll"}
            flexDirection={"column"}
            px={"20px"}
          >
            <HStack
              fontSize={["14px", "20px"]}
              fontWeight={500}
              alignItems={"flex-start"}
            >
              <Text>1. </Text>
              <Text>
                Two thought-provoking questions will be asked. Your analytical
                skills are key here.
              </Text>
            </HStack>
            <HStack
              fontSize={["14px", "20px"]}
              fontWeight={500}
              alignItems={"flex-start"}
            >
              <Text>2. </Text>
              <Text>
                Respond thoughtfully and creatively. There are no right or wrong
                answers.
              </Text>
            </HStack>
            <HStack
              fontSize={["14px", "20px"]}
              fontWeight={500}
              alignItems={"flex-start"}
            >
              <Text>3. </Text>
              <Text>
                Stand out with your answers for a chance at a special surprise!
              </Text>
            </HStack>
            <HStack
              fontSize={["14px", "20px"]}
              fontWeight={500}
              alignItems={"flex-start"}
            >
              <Text>4. </Text>
              <Text>
                Earn points for participating and even more for top answers.
              </Text>
            </HStack>
            <HStack
              fontSize={["14px", "20px"]}
              fontWeight={500}
              alignItems={"flex-start"}
            >
              <Text>5. </Text>
              <Text>
                Remember, if you go back, you can&apos;t resume where you left
                off.
              </Text>
            </HStack>
            <HStack
              fontSize={["14px", "20px"]}
              fontWeight={500}
              alignItems={"flex-start"}
            >
              <Text>6. </Text>
              <Text>
                Check your email for notifications about your awarded beams.
              </Text>
            </HStack>
          </Flex>{" "}
        </Flex>

        <Link href={`/home/beams-leader/leader-1`}>
          {" "}
          <Button
            _hover={{}}
            mt={"20px"}
            fontSize={["18px", "24px"]}
            w={["150px", "350px"]}
            color={"white"}
            bg={COLOR.BROWN}
          >
            Start
          </Button>
        </Link>
      </Flex>
    </>
  );
}

//
//
//
//
//
//
