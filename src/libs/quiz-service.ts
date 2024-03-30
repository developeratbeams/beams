import { Question, Quiz, QuizAttempt } from "@/types/user.types";
import { getAuther } from "./getAuther";
import { db } from "./db";
interface QuizQuestionsResponse {
  questions: Question[];
  startTime: number;
  startScore: number;
}

export const getQuizQuestions = async (
  quizId: string,
  attemptId: string
): Promise<QuizQuestionsResponse | null> => {
  const self = await getAuther();
  if (!self || !self.id) {
    return null;
  }

  const attempted = await db.quizAttempt.findFirst({
    where: {
      quizId,
      attemptId,
      userId: self.id,
    },
  });

  var questions: Question[] = [];
  var startTime = 0;
  var startScore = 0;
  if (attempted?.status === "DISABLED") {
    questions = await db.question.findMany({
      where: {
        quizId: quizId,
      },
      include: {
        imageUrls: {
          select: {
            url: true,
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 1,
        },
      },
      orderBy: {
        questionNo: "asc",
      },
    });
  } else {
    if (attempted) {
      questions = await db.question.findMany({
        where: {
          quizId: quizId,
        },
        include: {
          imageUrls: {
            select: {
              url: true,
            },
          },
        },
        orderBy: {
          questionNo: "asc",
        },
        skip: attempted?.noOfQuestionsAttempted,
      });
      startTime = attempted?.timeTaken;
      startScore = attempted?.score;
    } else {
      questions = await db.question.findMany({
        where: {
          quizId: quizId,
        },
        include: {
          imageUrls: {
            select: {
              url: true,
            },
            orderBy: {
              createdAt: "desc",
            },
            take: 1,
          },
        },
        orderBy: {
          questionNo: "asc",
        },
      });
    }
  }
  return {
    questions,
    startTime,
    startScore,
  };
};

export const getAllQuizes = async (): Promise<Quiz[] | undefined | null> => {
  try {
    const quizes = await db.quiz.findMany({});
    if (!quizes) return null;
    return quizes as Quiz[];
  } catch (error) {
    throw error;
  }
};

export const getQuizByID = async (quizId: string): Promise<Quiz | null> => {
  try {
    const quiz = await db.quiz.findUnique({
      where: {
        id: quizId,
      },
      include: {
        quizThumbnail: {
          select: {
            url: true,
          },
        },
      },
    });

    if (quiz) return quiz as Quiz;
    else return null;
  } catch (error) {
    throw error;
  }
};

interface AttemptResponse {
  attempt: QuizAttempt;
}
export const getQuizAttemptOfUser = async (
  quizId: string,
  attemptId: string
): Promise<AttemptResponse | undefined | null> => {
  try {
    const self = await getAuther();
    let attempt;
    if (attemptId) {
      attempt = await db.quizAttempt.findFirst({
        where: {
          quizId,
          userId: self?.id,
          attemptId,
          status: "DISABLED",
        },
        include: {
          answersToQuiz: {
            include: {
              Question: true,
            },
          },
        },
      });
    } else {
      attempt = await db.quizAttempt.findFirst({
        where: {
          quizId,
          userId: self?.id,
          status: "DISABLED",
        },
        include: {
          answersToQuiz: {
            include: {
              Question: true,
            },
          },
        },
        orderBy: {
          createdAt: "asc",
        },
      });
    }

    return { attempt } as unknown as AttemptResponse;
  } catch (error) {
    console.log(error);
  }
};

export const getQuizLeaders = async (
  quizId: string
): Promise<QuizAttempt[] | undefined | null> => {
  try {
    const leaders = await db.quizAttempt.findMany({
      where: {
        quizId,
      },
      include: {
        User: true,
      },
      orderBy: [
        {
          score: "desc",
        },
        {
          timeTaken: "asc",
        },
      ],
    });
    if (!leaders) return null;

    return leaders as QuizAttempt[];
  } catch (error) {}
};
