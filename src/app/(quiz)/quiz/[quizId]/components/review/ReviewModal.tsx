import React, { useState } from "react";
import {
  Text,
  Container,
  Flex,
  Button,
  IconButton,
  HStack,
  VStack,
  Spacer,
} from "@chakra-ui/react";

import { Question, QuizAttempt } from "@/types/user.types";
import { AiFillCloseCircle } from "react-icons/ai";
import { COLOR } from "@/types/colors";
import TrueFalse from "./questiontypes/TrueFalse";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import Mcq from "./questiontypes/Mcq";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
}

const ReviewModal = ({ isOpen, onClose, data }: ReviewModalProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const questionType = (
    questionType: string,
    data: QuizAttempt,
    correctAns: string
  ) => {
    switch (questionType) {
      case "TRUEFALSE":
        return (
          <TrueFalse
            data={data}
            correctAns={correctAns}
            currentQuestionIndex={currentQuestionIndex}
          />
        );
      default:
        return (
          <Mcq
            attempt={data}
            correctAns={correctAns}
            currentQuestionIndex={currentQuestionIndex}
          />
        );
    }
  };
  return (
    <Flex
      position={"absolute"}
      zIndex={1}
      display={isOpen ? "block" : "none"}
      h={"100vh"}
      w={"full"}
      bg={COLOR.YELLOW}
    >
      <Flex
        w={"full"}
        justifyContent={"space-between"}
        alignItems={"center"}
        h={"7vh"}
      >
        <Text px={"10px"} fontWeight={700} fontSize={["16px", "20px"]}>
          Answer Review
        </Text>
        <IconButton
          _hover={{}}
          bg={"inherit"}
          color={"#999696"}
          m={"10px"}
          aria-label="clode"
          onClick={() => onClose()}
          icon={<AiFillCloseCircle />}
        />
      </Flex>
      <Flex w={"full"} bg={"white"}>
        <Container
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          maxW={"4xl"}
          justifyContent={"center"}
          h={"85vh"}
          bg={"white"}
          py={"15px"}
          px={"10px"}
        >
          <Flex
            gap={"40px"}
            mt={"50px"}
            flex={7}
            w={"full"}
            direction={"column"}
          >
            <Text fontWeight={700} fontSize={["16px", "24px"]}>
              {data.answersToQuiz[currentQuestionIndex].Question.questionText}{" "}
            </Text>
            <Flex w={"full"} justifyContent={"center"}>
              {questionType(
                data.answersToQuiz[currentQuestionIndex].Question
                  .questionType as string,
                data,
                data.answersToQuiz[currentQuestionIndex].Question
                  .correctAns as string
              )}{" "}
            </Flex>
            {data.answersToQuiz[currentQuestionIndex]?.Question
              .explaination && (
              <Flex
                w={"full"}
                direction={"column"}
                gap={"10px"}
                fontWeight={400}
                fontSize={["16px", "18px"]}
              >
                <Text fontWeight={700} fontSize={["14px", "20px"]}>
                  EXPLANATION
                </Text>
                <Text>
                  {
                    data.answersToQuiz[currentQuestionIndex]?.Question
                      .explaination
                  }
                </Text>
              </Flex>
            )}
          </Flex>
          <Flex flex={1} w={"full"}>
            <IconButton
              _hover={{}}
              onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
              display={currentQuestionIndex === 0 ? "none" : "flex"}
              aria-label="next"
              bg={"transparent"}
              color={"black"}
              icon={<MdArrowBackIos />}
            />
            <Spacer />
            <IconButton
              _hover={{}}
              onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
              display={
                currentQuestionIndex === data.answersToQuiz.length - 1
                  ? "none"
                  : "flex"
              }
              aria-label="next"
              bg={"transparent"}
              color={"black"}
              icon={<MdArrowForwardIos />}
            />
          </Flex>
        </Container>
      </Flex>
      <Flex
        w={"full"}
        justifyContent={"center"}
        h={"7vh"}
        alignItems={"center"}
      >
        <Text>
          {currentQuestionIndex + 1} OF {data.answersToQuiz.length}
        </Text>
      </Flex>
    </Flex>
  );
};

export default ReviewModal;
