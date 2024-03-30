import { Button, Flex, HStack, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { FiCheck } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
interface TrueFalseProps {
  attempt: any;
  correctAns: string;
  currentQuestionIndex: number;
}
export default function Mcq({
  attempt,
  correctAns,
  currentQuestionIndex,
}: TrueFalseProps) {
  const attemptedAnswer = attempt?.answersToQuiz[currentQuestionIndex]?.answer;
  useEffect(() => {}, [currentQuestionIndex]);
  return (
    <Flex w={"full"} direction={["column", "row"]} gap={"30px"}>
      <Flex direction={"column"} gap={"20px"}>
        <Text fontWeight={700} fontSize={["14px", "16px"]} color={"#999696"}>
          YOUR ANSWER
        </Text>
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
      </Flex>{" "}
      <Flex direction={"column"} gap={"20px"}>
        <Text
          mr="20px"
          fontWeight={700}
          fontSize={["14px", "16px"]}
          color={"#999696"}
        >
          CORRECT ANSWER
        </Text>
        <HStack p={"10px"} rounded={"10px"} w={"fit-content"} bg={"#41CA70"}>
          <Text color={"white"}>{correctAns}</Text>
          <FiCheck color="white" />
        </HStack>
      </Flex>
    </Flex>
  );
}
