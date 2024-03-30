import {
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

import { MdArrowForwardIos } from "react-icons/md";
import { COLOR } from "@/types/colors";
import { saveQuestionAnswer } from "@/actions/quiz";
const quicksand = Quicksand({ subsets: ["latin"] });
interface McqProps {
  question: Question;
  handleNextQuestion: () => void;
  finsihStatus: Boolean;
  totalQuestions?: number;
  currentQuestionIndex?: number;
  attemptId?: string;
}
export default function FillUpLong({
  question,
  handleNextQuestion,
  finsihStatus,
  totalQuestions,
  currentQuestionIndex,
  attemptId,
}: McqProps) {
  const [seletedOption, setSelectedOption] = useState<string>("");
  const [timeTaken, setTimeTaken] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeTaken((prevTime) => prevTime + 1);
    }, 1000);
    if (Number(question?.timeLimit) - timeTaken === 0) handleSubmit();
    return () => clearInterval(timer);
  }, [timeTaken, question?.timeLimit]);

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
  }, [
    handleNextQuestion,
    question,
    seletedOption,
    timeTaken,
    finsihStatus,
    question?.timeLimit,
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
        gap={"24px"}
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
        <Text fontWeight={700} lineHeight={1.2} fontSize={["18px", "25px"]}>
          {question?.questionText}{" "}
        </Text>
        <Flex display={"absolute"}>
          <Textarea
            onChange={(e: any) => {
              setCharCount(e.target.value.length);
              setSelectedOption(e.target.value);
            }}
            p={"4px"}
            fontWeight={700}
            color={"gray"}
            _focusVisible={{
              borderBottom: "2px solid gray",
            }}
            maxLength={50}
            noOfLines={5}
            resize={"none"}
            border={"1px #999696 solid"}
            variant={"flushed"}
            placeholder="Type your answer here"
          />
          <Text mt={"6px"} bottom={"0"} right={"0px"} position={"relative"}>
            {charCount}/50
          </Text>
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
      </Container>
    </Flex>
  );
}
//   <Flex
//       flexDirection={"column"}
//       alignItems={"center"}
//       w={"full"}
//       justifyContent={"center"}
//       h={"85vh"}
//       bg={"white"}
//       className={quicksand.className}
//       py={"15px"}
//       px={"10px"}
//     >
//       <Container
//         h={"100vh"}
//         maxW={"6xl"}
//         display={"flex"}
//         flexDirection={"column"}
//         gap={"20px"}
//       >
// <Flex justifyContent={["center", "flex-end"]}>
//   <CountdownTimer seconds={question?.timeLimit as number} />{" "}
// </Flex>
//         <Container display={"flex"} flexDirection={"column"} gap={"20px"}>
//           <Image
//             h={["150px", "280px"]}
//             w={["270px", "550px"]}
//             src="https://images.unsplash.com/photo-1675458134252-1968ac5ef177?q=80&w=1828&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//             alt="beams"
//           />
//           <Text fontWeight={700} fontSize={["18px", "25px"]}>
//             {question?.questionText}
//           </Text>
//   <Textarea
//     onChange={(e: any) => setSelectedOption(e.target.value)}
//     p={"10px"}
//     border={"1px #999696 solid"}
//     variant={"flushed"}
//     placeholder="Type your answer here"
//   />
//         </Container>
//         <Flex
//           position={["absolute", "inherit"]}
//           bottom={"10vh"}
//           right={"20px"}
//           justify={"flex-end"}
//           justifyContent={"flex-end"}
//         >
//   {currentQuestionIndex === Number(totalQuestions) - 1 ? (
//     <Button _hover={{}}
//       color={"black"}
//       bg={COLOR.YELLOW}
//       _disabled={{
//         bg: COLOR.LIGHT_GRAY,
//       }}
//       onClick={handleSubmit}
//       isDisabled={!seletedOption.trim()}
//     >
//       Submit
//     </Button>
//   ) : (
//     <IconButton _hover={{}}
//       aria-label="submit"
//       onClick={handleSubmit}
//       icon={<MdArrowForwardIos />}
//       bg={COLOR.YELLOW}
//       _disabled={{
//         bg: COLOR.LIGHT_GRAY,
//       }}
//       isDisabled={!seletedOption.trim()}
//     />
//   )}
//         </Flex>
//       </Container>
//     </Flex>
