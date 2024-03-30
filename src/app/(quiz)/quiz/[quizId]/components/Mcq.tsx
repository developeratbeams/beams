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
import React, { useCallback, useEffect, useRef, useState } from "react";
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
export default function Mcq({
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
    if (Number(question?.timeLimit) - timeTaken === 0) {
      clearInterval(timer);
      setTimeTaken(0);
      handleSubmit();
    }
    return () => clearInterval(timer);
  }, [timeTaken]);
  useEffect(() => {
    setSelectedOption("");
    setTimeTaken(0);
  }, [question.id]);
  const handleSubmit = useCallback(() => {
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
    if (!(currentQuestionIndex === Number(totalQuestions) - 1)) {
      handleNextQuestion();
    } else {
      setLoading(true);
    }
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
        w={"full"}
      >
        {question?.imageUrls && (
          <Image
            rounded={"12px"}
            objectFit={"contain"}
            h={["250px", "250px", "300px"]}
            src={question?.imageUrls[0].url}
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
          gap={"20px"}
        >
          <Flex flexDirection={"row"} w={"full"} gap={["20px", "30px"]}>
            <Box
              bg={
                seletedOption === question?.optionOne ? COLOR.PURPLE_LIGHT : ""
              }
              color={seletedOption === question?.optionOne ? "white" : "black"}
              onClick={() => setSelectedOption(question?.optionOne as string)}
              borderRadius={"12px"}
              fontWeight={450}
              p={"10px"}
              border={"1px solid gray"}
              w={["200px", "300px", "320px"]}
              cursor={"pointer"}
            >
              {question?.optionOne}
            </Box>
            <Box
              bg={
                seletedOption === question?.optionTwo ? COLOR.PURPLE_LIGHT : ""
              }
              color={seletedOption === question?.optionTwo ? "white" : "black"}
              onClick={() => setSelectedOption(question?.optionTwo as string)}
              borderRadius={"12px"}
              fontWeight={450}
              p={"10px"}
              border={"1px solid gray"}
              w={["200px", "300px", "320px"]}
              cursor={"pointer"}
            >
              {question?.optionTwo}
            </Box>
          </Flex>{" "}
          <Flex flexDirection={"row"} gap={["20px", "30px"]}>
            <Box
              color={
                seletedOption === question?.optionThree ? "white" : "black"
              }
              bg={
                seletedOption === question?.optionThree
                  ? COLOR.PURPLE_LIGHT
                  : ""
              }
              onClick={() => setSelectedOption(question?.optionThree as string)}
              borderRadius={"12px"}
              fontWeight={450}
              p={"10px"}
              border={"1px solid gray"}
              w={["200px", "300px", "320px"]}
              cursor={"pointer"}
            >
              {question?.optionThree}
            </Box>
            <Box
              bg={
                seletedOption === question?.optionFour ? COLOR.PURPLE_LIGHT : ""
              }
              color={seletedOption === question?.optionFour ? "white" : "black"}
              onClick={() => setSelectedOption(question?.optionFour as string)}
              borderRadius={"12px"}
              fontWeight={450}
              p={"10px"}
              border={"1px solid gray"}
              w={["200px", "300px", "320px"]}
              cursor={"pointer"}
            >
              {question?.optionFour}
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
            bottom={["2vh", "0vh", "4vh"]}
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
            position={["unset", "unset", "absolute"]}
            bottom={["2vh", "0vh", "4vh"]}
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
