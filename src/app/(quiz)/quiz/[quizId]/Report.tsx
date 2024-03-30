"use client";
// report at the end of attempt quiz
import { COLOR } from "@/types/colors";
import { QuizAttempt } from "@/types/user.types";
import { Button, Flex, Image, Text } from "@chakra-ui/react";
import { Quicksand } from "next/font/google";
import React, { useState } from "react";
import ReviewModal from "./components/review/ReviewModal";
import AnimatedButton from "@/components/AnimatedButton";
import { useRouter } from "next/navigation";
import { nanoid } from "nanoid";
import NavBar from "@/components/NavBar/NavBar";
import { User } from "@prisma/client";
const quicksand = Quicksand({
  subsets: ["latin"],
});
interface ReportProps {
  user: User;
  attempt: QuizAttempt;
}

export default function Report({ attempt, user }: ReportProps) {
  const score = attempt.score;
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const handleModal = () => {
    setIsModalOpen(true);
  };

  const renderReportCard = (score: number) => {
    const percentage = (score / 200) * 100;

    if (percentage > 90) {
      return <RankCard score={score} data={data[0]} />;
    } else if (percentage > 80) {
      return <RankCard score={score} data={data[1]} />;
    } else if (percentage > 70) {
      return <RankCard score={score} data={data[2]} />;
    } else if (percentage > 60) {
      return <RankCard score={score} data={data[3]} />;
    } else if (percentage > 50) {
      return <RankCard score={score} data={data[4]} />;
    } else if (percentage > 40) {
      return <RankCard score={score} data={data[5]} />;
    } else if (percentage > 30) {
      return <RankCard score={score} data={data[6]} />;
    } else if (percentage > 20) {
      return <RankCard score={score} data={data[7]} />;
    } else if (percentage > 10) {
      return <RankCard score={score} data={data[8]} />;
    } else percentage >= 0;
    return <RankCard score={score} data={data[9]} />;
  };

  return (
    <>
      <NavBar data={user as any} />
      <ReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data={attempt as QuizAttempt}
      />
      <Flex
        className={quicksand.className}
        alignItems="center"
        justifyContent="center"
        h="100vh"
        py="10px"
        flexDirection="column"
        gap={"20px"}
      >
        {renderReportCard(score as number)}
        <Flex
          flexDirection={["column", "row"]}
          gap={"10px"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Button
            _hover={{}}
            onClick={handleModal}
            border={`1px solid ${COLOR.PURPLE_LIGHT}`}
            bg={"white"}
          >
            Review Answers
          </Button>

          <AnimatedButton
            text={"Continue Your Adventure"}
            bg={COLOR.PURPLE_LIGHT}
            href={"/home/jigsaw"}
          />
          <Button
            _hover={{}}
            bg={"transparent"}
            border={`1px solid ${COLOR.ORANGE}`}
            onClick={() => {
              router.refresh();
              router.replace(`/quiz/${attempt.quizId}?attemptId=${nanoid()}`);
            }}
          >
            Try Again
          </Button>
        </Flex>
      </Flex>{" "}
    </>
  );
}

const RankCard = ({ data, score }: any) => {
  return (
    <Flex
      className={quicksand.className}
      textAlign={"center"}
      flexDirection={"column"}
      gap={"10px"}
      justifyContent={"center"}
    >
      <Text fontSize={["20px", "30px"]}>{data.message}</Text>
      <Text
        fontWeight={700}
        fontSize={["28px", "40px"]}
        color={COLOR.PURPLE_LIGHT}
      >
        You have got {score}/200 Beams!
      </Text>
      <Image
        mx={"auto"}
        h={"auto"}
        w={["220px", "300px"]}
        src={data.rewardImage}
        alt="beams"
      />
    </Flex>
  );
};

const data = [
  {
    message: "Woo Hoo, You're a Quiz Wizard 🎉 ",
    rewardImage: "/assets/quizreward/100.png",
  },
  {
    message: "Almost there! You soared like a quiz comet.🌟🎉 ",
    rewardImage: "/assets/quizreward/90.png",
  },
  {
    message: "Amazing! Nearly Perfect! 🚀",
    rewardImage: "/assets/quizreward/80.png",
    compliment: "Outstanding work! Just a step away from the top.",
  },
  {
    message: "Well Done! Knowledgeable! 🎓",
    rewardImage: "/assets/quizreward/70.png",
    compliment: "Impressive score! You have a solid grip.",
  },
  {
    message: "Good effort!  You're riding the quiz wave.🚀 ",
    rewardImage: "/assets/quizreward/60.png",
    compliment: "A bit more stargazing, and you'll be a quiz star.",
  },
  {
    message: "Nice Try! You're Getting There! 🌈",
    rewardImage: "/assets/quizreward/50.png",
    compliment: "A fair attempt. Keep practicing, and you'll climb higher.",
  },
  {
    message: "Good Start! Room to Grow! 🌱",
    rewardImage: "/assets/quizreward/40.png",
    compliment: "You've shown potential. A bit more study will go a long way.",
  },

  {
    message: "Brave Attempt! Keep Learning! 💪",
    rewardImage: "/assets/quizreward/30.png",
    compliment: "Every quiz is a learning step. Keep exploring and growing.",
  },

  {
    message: "Nice try! You've snagged a few stars. 🌈",
    rewardImage: "/assets/quizreward/20.png",
    compliment: "But hey, even astronauts have bumpy landings.",
  },
  {
    message: "You Tried! On the Right Path! 🛤️",
    rewardImage: "/assets/quizreward/10.png",
    compliment:
      "You're just starting out. Keep going, and you'll see progress.",
  },
  {
    message: "Zero, You discovered new territory.✌️ ",
    rewardImage: "/assets/quizreward/100.png",
    compliment: "Even geniuses slip up. Next time, you'll soar.",
  },
];
