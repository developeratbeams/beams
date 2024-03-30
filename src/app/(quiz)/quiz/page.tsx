// landing page
import { getAuther } from "@/libs/getAuther";
import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Quicksand } from "next/font/google";
import React from "react";
import { COLOR } from "@/types/colors";
import { getAllQuizes } from "@/libs/quiz-service";
import { notFound } from "next/navigation";
import Link from "next/link";
import NavBar from "@/components/NavBar/NavBar";
const quicksand = Quicksand({
  subsets: ["latin"],
});

export default async function Page() {
  const self = await getAuther();
  const quizes = await getAllQuizes();
  if (!quizes) notFound();

  return (
    <Flex
      direction={"column"}
      bg={COLOR.YELLOW}
      h={"100vh"}
      overflowY={"scroll"}
    >
      <NavBar data={self} />
      <Flex
        flexDirection={"column"}
        gap={"20px"}
        maxW={"full"}
        className={quicksand.className}
        h={["full", "fit-content", "100vh"]}
        alignItems={"center"}
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
              Get Smarter in{" "}
              <Box as={"span"} color={COLOR.PURPLE_LIGHT}>
                Beams Quizland
              </Box>
            </Text>
            <Text
              color={"#151515"}
              textAlign={"center"}
              fontSize={["14px", "20px"]}
              fontWeight={500}
            >
              Hi {self?.firstName}, are you ready to get smarter?
            </Text>
          </VStack>
        </Flex>
        <Flex
          bg={"white"}
          mx={"20px"}
          h={["290px", "300px"]}
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
            <Text
              pt="10px"
              fontSize={["18px", "24px"]}
              fontWeight={600}
              color={"#151515"}
              mt={"10px"}
            >
              WHAT YOU NEED TO KNOW
            </Text>
            <HStack
              fontSize={["14px", "20px"]}
              fontWeight={500}
              alignItems={"flex-start"}
            >
              <Text>1. </Text>
              <Text>
                Each question is a chance to earn 10 dazzling points. Get it
                right, and the points are yours! If you miss it, no worries –
                you won&apos;t lose any points.
              </Text>
            </HStack>
            <HStack
              fontSize={["14px", "20px"]}
              fontWeight={500}
              alignItems={"flex-start"}
            >
              <Text>2. </Text>
              <Text>
                Make sure you have a stable internet connection so your quiz
                adventure doesn&apos;t have any unexpected pauses or hiccups.
              </Text>
            </HStack>
            <HStack
              fontSize={["14px", "20px"]}
              fontWeight={500}
              alignItems={"flex-start"}
            >
              <Text>3. </Text>
              <Text>
                Once you start, there&apos;s no going back. Each question is a
                step forward on this exciting path.
              </Text>
            </HStack>
            <HStack
              fontSize={["14px", "20px"]}
              fontWeight={500}
              alignItems={"flex-start"}
            >
              <Text>4. </Text>
              <Text>
                Stay alert! The questions come in different formats – from
                multiple choice to true/false and more.
              </Text>
            </HStack>
            <HStack
              fontSize={["14px", "20px"]}
              fontWeight={500}
              alignItems={"flex-start"}
            >
              <Text>5. </Text>
              <Text>
                Keep your wits about you and be prepared to get smarter.
              </Text>
            </HStack>
            <HStack
              fontSize={["14px", "20px"]}
              fontWeight={500}
              alignItems={"flex-start"}
            >
              <Text>6. </Text>
              <Text>
                You will have 20 or 25 seconds to answer each question. Keep an
                eye on the clock ticking; it&apos;s part of the excitement!
              </Text>
            </HStack>
            <HStack
              fontSize={["14px", "20px"]}
              fontWeight={500}
              alignItems={"flex-start"}
            >
              <Text>7. </Text>
              <Text>
                Read each question carefully and think before you answer.
                Remember, each choice could lead you to victory!
              </Text>
            </HStack>
            <HStack
              fontSize={["14px", "20px"]}
              fontWeight={500}
              alignItems={"flex-start"}
            >
              <Text>8. </Text>
              <Text>
                Click on the arrow at the bottom to go to the next question.
              </Text>
            </HStack>
            <HStack
              fontSize={["14px", "20px"]}
              fontWeight={500}
              alignItems={"flex-start"}
              mb={"15px"}
            >
              <Text>9. </Text>
              <Text>See your score at the end of the quiz.</Text>
            </HStack>
          </Flex>{" "}
        </Flex>

        <Link href={`/quiz/${quizes[0].id}`}>
          {" "}
          <Button
            _hover={{}}
            mt={"20px"}
            fontSize={["18px", "24px"]}
            w={["150px", "350px"]}
            color={"white"}
            bg={COLOR.PURPLE_LIGHT}
          >
            Start
          </Button>
        </Link>
        <Image
          position={["unset", "unset", "absolute"]}
          bottom={"0"}
          m={"auto"}
          left={["40%", "40%", "20px"]}
          h={["280px", "350px"]}
          src="/assets/quizreward/quiz.png"
          alt="beams"
        />
      </Flex>
    </Flex>
  );
}
