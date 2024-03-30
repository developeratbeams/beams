import { COLOR } from "@/types/colors";
import { Question, QuizAttempt } from "@/types/user.types";
import { Button, Flex, HStack, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { FiCheck } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
interface TrueFalseProps {
  data: any;
  correctAns: string;
  currentQuestionIndex: number;
}
export default function TrueFalse({
  data,
  correctAns,
  currentQuestionIndex,
}: TrueFalseProps) {
  const attemptedAnswer = data?.answersToQuiz[currentQuestionIndex]?.answer;
  return (
    <Flex w={"full"} direction={"row"} gap={"30px"}>
      <Flex direction={"column"} gap={"20px"}>
        <Text fontWeight={700} fontSize={["14px", "16px"]} color={"#999696"}>
          YOUR ANSWER
        </Text>
        {attemptedAnswer.trim() ? (
          <HStack
            p={"10px"}
            rounded={"10px"}
            w={"fit-content"}
            bg={attemptedAnswer === correctAns ? "#41CA70" : "#F66"}
          >
            <Text mr="20px" color={"white"}>
              {attemptedAnswer}
            </Text>
            {attemptedAnswer === correctAns ? (
              <FiCheck color="white" />
            ) : (
              <IoMdClose color="white" />
            )}
          </HStack>
        ) : (
          <HStack
            p={"10px"}
            rounded={"10px"}
            w={"fit-content"}
            bg={COLOR.PURPLE_LIGHT}
            textAlign={'center'}
          >
            <Text mr="20px" color={"white"}>
              Not attempted
            </Text>
          </HStack>
        )}
      </Flex>{" "}
      <Flex direction={"column"} gap={"20px"}>
        <Text fontWeight={700} fontSize={["14px", "16px"]} color={"#999696"}>
          CORRECT ANSWER
        </Text>
        <HStack p={"10px"} rounded={"10px"} w={"fit-content"} bg="#41CA70">
          <Text mr="20px" color={"white"}>
            {correctAns}
          </Text>
          <FiCheck color="white" />
        </HStack>
      </Flex>
    </Flex>
  );
}
