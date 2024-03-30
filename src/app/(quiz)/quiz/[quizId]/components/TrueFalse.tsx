import {
  Box,
  Button,
  Container,
  Flex,
  IconButton,
  Image,
  Text,
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
export default function TrueFalse({
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
  useEffect(() => {
    setSelectedOption("");
    setTimeTaken(0);
  }, [question.id]);
  const handleSubmit = useCallback(() => {
    if (!(currentQuestionIndex === Number(totalQuestions) - 1)) {
      handleNextQuestion();
    } else {
      setLoading(true);
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
  }, [handleNextQuestion, question, seletedOption, timeTaken, finsihStatus]);

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
        gap={"24px"}
        p={"10px"}
        maxW={"2xl"}
      >
        {question?.imageUrls && (
          <Image
            objectFit={"contain"}
            rounded={"12px"}
            h={["250px", "250px", "280px"]}
            src={question?.imageUrls[0]?.url}
            alt="beams"
          />
        )}
        <Text fontWeight={500} lineHeight={1.2} fontSize={["18px", "25px"]}>
          {question?.questionText}{" "}
        </Text>
        <Flex
          textAlign={"center"}
          w={"full"}
          flexDirection={"column"}
          gap={"12px"}
        >
          <Flex
            flexDirection={"row"}
            justifyContent={"center"}
            w={"full"}
            gap={["20px", "30px"]}
            mt={"12px"}
          >
            <Box
              border={seletedOption === "TRUE" ? "1px solid black" : "none"}
              color="white"
              onClick={() => setSelectedOption("TRUE" as string)}
              borderRadius={"12px"}
              fontWeight={700}
              p={"10px"}
              bg={"green.600"}
              w={["200px", "200px"]}
              fontSize={"18px"}
              cursor={"pointer"}
            >
              True
            </Box>
            <Box
              border={seletedOption === "FALSE" ? "1px solid black" : "none"}
              onClick={() => setSelectedOption("FALSE" as string)}
              borderRadius={"12px"}
              fontWeight={700}
              p={"10px"}
              w={["200px", "200px"]}
              color={"white"}
              bg={"red.500"}
              fontSize={"18px"}
              cursor={"pointer"}
            >
              False
            </Box>
          </Flex>{" "}
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
            position={["unset", "unset", "absolute"]}
            bottom={["2vh", "2vh", "4vh"]}
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
      </Container>
    </Flex>
  );
}
