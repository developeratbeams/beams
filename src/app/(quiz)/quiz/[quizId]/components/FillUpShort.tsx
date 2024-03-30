import {
  Box,
  Button,
  Container,
  Flex,
  IconButton,
  Image,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { Quicksand } from "next/font/google";
import React, { useCallback, useEffect, useState } from "react";
import CountdownTimer from "./timer/Timer";
import { Question, QuestionSavingProps } from "@/types/user.types";
import { saveQuestionAnswer } from "@/actions/quiz";
import { MdArrowForwardIos } from "react-icons/md";
import { COLOR } from "@/types/colors";
const quicksand = Quicksand({ subsets: ["latin"] });
interface McqProps {
  question: Question;
  handleNextQuestion: () => void;
  finsihStatus: Boolean;
  totalQuestions?: number;
  currentQuestionIndex?: number;
  attemptId?: string;
}
export default function FillUpShort({
  question,
  handleNextQuestion,
  finsihStatus,
  totalQuestions,
  currentQuestionIndex,
  attemptId,
}: McqProps) {
  const [seletedOption, setSelectedOption] = useState<string>("");
  const [timeTaken, setTimeTaken] = useState(0);

  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeTaken((prevTime) => prevTime + 1);
    }, 1000);
    if (Number(question?.timeLimit) - timeTaken === 0) handleSubmit();
    return () => clearInterval(timer);
  }, [timeTaken]);

  const handleSubmit = useCallback(() => {
    if (!(currentQuestionIndex === Number(totalQuestions) - 1)) {
      handleNextQuestion();
    }
    const body: QuestionSavingProps = {
      questionId: String(question?.id),
      isCorrect: seletedOption === question.correctAns,
      marksScored: seletedOption === question.correctAns ? 10 : 0,
      timeTaken: timeTaken,
      answer: seletedOption,
      quizId: String(question?.quizId),
      status: Boolean(finsihStatus),
      attemptId: String(attemptId),
    };
    saveQuestionAnswer(body);
  }, [
    handleNextQuestion,
    question,
    seletedOption,
    timeTaken,
    finsihStatus,
    question.timeLimit,
    currentQuestionIndex,
    totalQuestions,
  ]);

  return (
    <Flex
      h={"90vh"}
      flexDirection={"column"}
      bg={"white"}
      w={"full"}
      className={quicksand.className}
    >
      <Container
        maxW={"4xl"}
        position={"relative"}
        display={"flex"}
        justifyContent={["center", "center", "flex-end"]}
        p={"10px"}
      >
        <CountdownTimer
          key={question?.questionNo as number}
          seconds={question?.timeLimit as number}
        />{" "}
      </Container>
      <Container
        mt={["0", "0", "-35px"]}
        display={"flex"}
        flexDirection={"column"}
        gap={"20px"}
        p={"10px"}
        maxW={"2xl"}
      >
        {question?.imageUrls && (
          <Image
            rounded={"12px"}
            w={"full"}
            h={["250px", "250px", "280px"]}
            src={question?.imageUrls[0]?.url}
            alt="beams"
          />
        )}
        <Text fontWeight={700} fontSize={["18px", "25px"]}>
          {question?.questionText}{" "}
        </Text>
        <Flex>
          <Input
            fontWeight={700}
            color={"gray"}
            _focusVisible={{
              borderBottom: "2px solid gray",
            }}
            type="text"
            onChange={(e: any) => setSelectedOption(e.target.value)}
            p={"10px"}
            variant={"flushed"}
            placeholder="Type your answer here"
          />
        </Flex>
      </Container>
      <Container
        maxW={"4xl"}
        position={"relative"}
        display={"flex"}
        justifyContent={"flex-end"}
        p={"10px"}
      >
        {currentQuestionIndex === Number(totalQuestions) - 1 ? (
          <Button
            _hover={{}}
            color={"black"}
            bg={COLOR.YELLOW}
            _disabled={{
              bg: COLOR.LIGHT_GRAY,
            }}
            onClick={handleSubmit}
            isDisabled={!seletedOption.trim()}
            isLoading={loading}
          >
            Submit
          </Button>
        ) : (
          <IconButton
            _hover={{}}
            aria-label="submit"
            onClick={handleSubmit}
            icon={<MdArrowForwardIos />}
            bg={COLOR.YELLOW}
            _disabled={{
              bg: COLOR.LIGHT_GRAY,
            }}
            isDisabled={!seletedOption.trim()}
          />
        )}{" "}
      </Container>{" "}
    </Flex>
  );
}
