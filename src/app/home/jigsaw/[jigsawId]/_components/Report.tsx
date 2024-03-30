"use client";
// Shows report for the already submited attempts
import { COLOR } from "@/types/colors";
import { JigSawAttempt } from "@/types/user.types";
import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import AnimatedButton from "@/components/AnimatedButton";
import Lottie from "react-lottie";
import animationData from "../../../../../../public/jigsaw/confetti.json";
import { useRouter } from "next/navigation";

interface ReportProps {
  attempt: JigSawAttempt;
}
interface scoreprops {
  [key: string]: number;
}
const score: scoreprops = {
  HARD: 900,
  MEDIUM: 600,
  EASY: 300,
};
const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
export default function Report({ attempt }: ReportProps) {
  const router = useRouter();
  const renderReportCard = (quit: boolean) => {
    if (quit)
      return (
        <RankCard
          difficulty={attempt.difficulty}
          image={"/jigsaw/jigsaw-quit.png"}
          bottomMessage="Good Attempt!"
          subMessage="Every jigsaw piece you’ve placed shows your thinking ability."
          quit={quit}
        />
      );

    return (
      <RankCard
        difficulty={attempt.difficulty}
        image={"/jigsaw/jigsaw-solved.png"}
        bottomMessage="Ta-Da, You're a Jigsaw Master!"
        subMessage="Stay awesome and keep spreading that dazzling smile!"
        quit={quit}
      />
    );
  };

  return (
    <>
      <Flex
        alignItems="center"
        justifyContent="center"
        h="92vh"
        py="10px"
        flexDirection="column"
        gap={"20px"}
      >
        {renderReportCard(attempt?.quit as boolean)}
        {!attempt?.quit && (
          <Box position={"absolute"} zIndex={-1}>
            <Lottie options={defaultOptions} />
          </Box>
        )}
        <Flex flexDirection={["column", "row"]} gap={"10px"}>
          <AnimatedButton
            href="/stories"
            bg={COLOR.GREEN}
            text=" Continue Your Adventure"
          />
          <Button
            _hover={{}}
            bg={"transparent"}
            border={`1px solid ${COLOR.ORANGE}`}
            onClick={() =>
              router.push(`/home/jigsaw/${attempt?.jigSawId}?tryAgain=true`)
            }
          >
            Try Again
          </Button>
        </Flex>
      </Flex>{" "}
    </>
  );
}

const RankCard = ({
  bottomMessage,
  image,
  difficulty,
  quit,
  subMessage,
}: any) => {
  const beams = score[difficulty];
  return (
    <Flex
      textAlign={"center"}
      flexDirection={"column"}
      gap={"10px"}
      justifyContent={"center"}
    >
      {!quit ? (
        <Text fontWeight={700} fontSize={["28px", "40px"]} color={COLOR.GREEN}>
          You have got {beams} Beams!
        </Text>
      ) : (
        <Text fontWeight={700} fontSize={["28px", "40px"]} color={COLOR.GREEN}>
          Not finished? No worries!
        </Text>
      )}
      <Image
        mx={"auto"}
        h={"auto"}
        w={quit ? "350px" : "300px"}
        src={image}
        alt="beams"
      />
      <Text fontWeight={700} fontSize={["18px", "24px"]}>
        {bottomMessage}
      </Text>
      <Text fontWeight={400} color={"gray"}>
        {subMessage}
      </Text>
    </Flex>
  );
};
