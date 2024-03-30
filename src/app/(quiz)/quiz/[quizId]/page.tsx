// page for showing up the id
import { getQuizAttemptOfUser, getQuizQuestions } from "@/libs/quiz-service";
import React from "react";
import Quiz from "./Quiz";
import { getAuther } from "@/libs/getAuther";
import { User } from "@prisma/client";
import Report from "./Report";
interface PageProps {
  params: {
    quizId: string;
  };
  searchParams: {
    attemptId: string;
  };
}
export default async function Page({
  params: { quizId },
  searchParams: { attemptId },
}: PageProps) {
  const { questions }: any = await getQuizQuestions(quizId, attemptId);
  const { attempt }: any = await getQuizAttemptOfUser(quizId, attemptId);
  const self = await getAuther();
  const reviewBody = { attempt };
  if (reviewBody.attempt)
    return <Report user={self as User} attempt={reviewBody.attempt} />;

  return (
    <Quiz questions={questions} user={self as User} reviewBody={reviewBody} />
  );
}
