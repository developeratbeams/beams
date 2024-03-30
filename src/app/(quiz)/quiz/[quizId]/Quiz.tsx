"use client";
// quiz
import React, { useState, useEffect } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import TrueFalse from "./components/TrueFalse";
import FillUpShort from "./components/FillUpShort";
import FillUpLong from "./components/FillUpLong";
import { Question, QuizAttempt } from "@/types/user.types";
import { COLOR } from "@/types/colors";
import Mcq from "./components/Mcq";
import { QUESTION_TYPE, STATUS } from "@/types/constants";
import Report from "./Report";
import useHalfModal from "@/hooks/useHalfQuizModal";
import { useSearchParams } from "next/navigation";
import { nanoid } from "nanoid";
import { User } from "@prisma/client";
interface AttemptResponse {
  attempt: QuizAttempt;
}
interface QuizProps {
  questions: Question[];
  reviewBody: AttemptResponse;
  user: User;
}

interface CommonProps {
  attemptId?: string;
  handleNextQuestion: () => void;
  finsihStatus: Boolean;
  totalQuestions?: number;
  currentQuestionIndex?: number;
}
export default function Quiz({ questions, reviewBody, user }: QuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [attemptId, setAttemptId] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const halfWayModal = useHalfModal();
  const path = useSearchParams().get("attemptId");
  useEffect(() => {
    setCurrentQuestionIndex(0);
    setFinsihStatus(false);
  }, [path]);
  useEffect(() => {
    if (questions?.length > 10 && currentQuestionIndex === questions.length / 2)
      halfWayModal.onOpen();
  }, [currentQuestionIndex]);
  const [finsihStatus, setFinsihStatus] = useState(false);
  const handleNextQuestion = () => {
    !halfWayModal.isOpen &&
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };
  useEffect(() => {
    const id = searchParams.get("attemptId");
    if (id) {
      setAttemptId(id as string);
    } else {
      const nano = nanoid(7);
      setAttemptId(nano as string);
    }
  }, [questions]);

  const renderNextQuestion = () => {
    const question = questions[currentQuestionIndex];
    const commonProps: CommonProps = {
      handleNextQuestion,
      finsihStatus,
      totalQuestions: Number(questions?.length),
      currentQuestionIndex,
      attemptId: String(attemptId),
    };

    if (reviewBody.attempt)
      return <Report user={user} attempt={reviewBody.attempt} />;

    return (
      attemptId && (
        <Flex
          alignItems={"center"}
          justifyContent={"center"}
          h={"100vh"}
          py={"10px"}
          flexDirection={"column"}
          bg={COLOR.YELLOW}
        >
          <Box h={"5vh"} p={"5px"} />

          {renderQuestionContent(question, commonProps)}
          <Text fontWeight={700} h={"5vh"} justifyContent={"center"} p={"5px"}>
            {!reviewBody.attempt &&
              `${currentQuestionIndex + 1} OF ${questions?.length}`}
          </Text>
        </Flex>
      )
    );
  };

  const renderQuestionContent = (
    question: Question,
    commonProps: CommonProps
  ) => {
    switch (question?.questionType as QUESTION_TYPE) {
      case "MCQ":
        return <Mcq question={question} {...commonProps} />;
      case "TRUEFALSE":
        return <TrueFalse question={question} {...commonProps} />;
      case "FILLUPLONG":
        return <FillUpLong question={question} {...commonProps} />;
      case "FILLUPSHORT":
        return <FillUpShort question={question} {...commonProps} />;
      default:
        return null;
    }
  };

  useEffect(() => {
    let intervalId: string | number | NodeJS.Timeout | undefined;
    if (currentQuestionIndex < questions.length) {
      intervalId = setInterval(() => {}, 1000);
    } else {
      setFinsihStatus(true);
    }
    if (!questions[currentQuestionIndex + 1]) {
      setFinsihStatus(true);
    }
    return () => clearInterval(intervalId);
  }, [currentQuestionIndex, questions, questions.length]);
  return renderNextQuestion();
}
