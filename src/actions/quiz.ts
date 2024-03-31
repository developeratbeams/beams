"use server";

/**
 * Saves the answer to a question in a quiz attempt.
 * @param questionId - The ID of the question.
 * @param isCorrect - Indicates whether the answer is correct or not.
 * @param imageUrl - The URL of the image associated with the answer.
 * @param vedioUrl - The URL of the video associated with the answer.
 * @param audioUrl - The URL of the audio associated with the answer.
 * @param marksScored - The marks scored for the answer.
 * @param timeTaken - The time taken to answer the question.
 * @param answer - The answer provided by the user.
 * @param quizId - The ID of the quiz.
 * @param status - The status of the quiz attempt.
 * @param attemptId - The ID of the quiz attempt.
 * @returns A promise that resolves to a string indicating the success of the operation, or null if the operation fails.
 */
import { getAuther } from "@/libs/auth-service";
import { db } from "@/libs/db";
import { QuestionSavingProps } from "@/types/user.types";
import { revalidatePath } from "next/cache";
import { saveModuleActivity } from "./module";
import { sendEmailBrevo } from "./brewo";

export const saveQuestionAnswer = async ({
  questionId,
  isCorrect,
  imageUrl,
  vedioUrl,
  audioUrl,
  marksScored,
  timeTaken,
  answer,
  quizId,
  status,
  attemptId,
}: QuestionSavingProps): Promise<string | null> => {
  const self = await getAuther();
  if (!self) return null;

  const attempted = await db.quizAttempt.findFirst({
    where: {
      quizId,
      userId: self?.id,
      attemptId,
    },
  });

  if (attempted) {
    // save answer to the question.
    await db.answerToQuestion.create({
      data: {
        questionId: questionId,
        isCorrect: isCorrect,
        imageUrl: imageUrl,
        answer: answer,
        vedioUrl: vedioUrl,
        audioUrl: audioUrl,
        marksScored: marksScored,
        timeTaken: timeTaken,
        userId: String(self?.id),
        quizId,
        quizAttemptId: String(attempted?.id),
      },
    });
    // update the quiz attempt.
    await db.quizAttempt.updateMany({
      where: {
        quizId,
        userId: self?.id,
        attemptId,
      },
      data: {
        noOfCorrectAnswers: Number(
          isCorrect
            ? attempted?.noOfCorrectAnswers + 1
            : attempted?.noOfCorrectAnswers
        ),
        noOfIncorrectAnswers: Number(
          !isCorrect
            ? attempted?.noOfIncorrectAnswers + 1
            : attempted?.noOfIncorrectAnswers
        ),
        noOfQuestionsAttempted: Number(attempted?.noOfQuestionsAttempted + 1),
        timeTaken: Number(attempted?.timeTaken + timeTaken),
        score: Number(attempted?.score + marksScored),
        status: Boolean(attempted.noOfQuestionsAttempted === 19)
          ? "DISABLED"
          : "ACTIVE",
      },
    });

    if (Boolean(attempted.noOfQuestionsAttempted === 19)) {
      const moduleAttempt = await db.moduleAttempt.findFirst({
        where: {
          moduleId: "23390cb6-5f5e-41d1-b637-ad9e42d179c5",
          userId: self?.id,
        },
      });
      if (!moduleAttempt?.products.some((prod) => prod === "QUIZ")) {
        await db.user.update({
          where: {
            id: self?.id,
          },
          data: {
            totalScore:
              Number(self?.totalScore) + attempted.score + marksScored,
          },
        });
      }

      await saveModuleActivity("23390cb6-5f5e-41d1-b637-ad9e42d179c5", "QUIZ");
      revalidatePath(`/quiz/${quizId}?attemptId=${attemptId}`);
      const user = await db.user.findUnique({
        where: { id: self?.id },
        select: { email: true, firstName: true, lastName: true },
      });
      const payload = {
        sender: {
          email: "innbrieff@gmail.com",
          name: "Beams",
        },
        subject: "I got it.",
        templateId: 4,
        params: {
          greeting: "This is my default greeting",
          headline: "This is my default headline",
        },
        messageVersions: [
          {
            to: [
              {
                email: user?.email,
                name: `${user?.firstName} ${user?.lastName}`,
              },
            ],
            params: {
              firstName: user?.firstName,
              beams: Number(self?.totalScore) + attempted.score + marksScored,
              quizName: "Magical Materials Quiz",
            },
            subject: `Quiz Mastered! 🚀 What's Next?`,
          },
        ],
      };
      await sendEmailBrevo({ payload });
    }
  } else {
    // create fresh attempt for the user based on quiz and attempt Id
    const freshAttempt = await db.quizAttempt.create({
      data: {
        noOfCorrectAnswers: Number(isCorrect ? 1 : 0),
        noOfIncorrectAnswers: Number(!isCorrect ? 1 : 0),
        noOfQuestionsAttempted: 1,
        timeTaken: Number(timeTaken),
        score: Number(marksScored),
        attemptId,
        status: "ACTIVE",
        User: {
          connect: {
            id: self?.id,
          },
        },
        Quiz: {
          connect: {
            id: quizId,
          },
        },
      },
    });
    //save ans
    await db.answerToQuestion.create({
      data: {
        questionId: questionId,
        isCorrect: isCorrect,
        imageUrl: imageUrl,
        answer: answer,
        vedioUrl: vedioUrl,
        audioUrl: audioUrl,
        marksScored: marksScored,
        timeTaken: timeTaken,
        userId: String(self?.id),
        quizId,
        quizAttemptId: String(freshAttempt?.id),
      },
    });
  }

  return "saved";
};
