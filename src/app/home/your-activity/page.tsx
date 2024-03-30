import { getSelf } from "@/libs/auth-service";
import { db } from "@/libs/db";
import { COLOR } from "@/types/colors";
import {
  Avatar,
  Box,
  CircularProgress,
  CircularProgressLabel,
  Container,
  Flex,
  Spacer,
  Text,
} from "@chakra-ui/react";
import React from "react";

export default async function Page() {
  // Get user
  const self = await getSelf();
  // Get quiz attempt score
  const quiz = await db.quizAttempt.findFirst({
    where: {
      userId: self?.id,
    },
    orderBy: {
      createdAt: "asc",
    },
    take: 1,
    select: {
      score: true,
    },
  });
  // Get jigsaw attempt score
  const jigsaw = await db.jigSawAttempt.findFirst({
    where: {
      userId: self?.id,
    },
    orderBy: {
      createdAt: "asc",
    },

    take: 1,
    select: {
      difficulty: true,
    },
  });
  let jigsawScore = 0;
  // get the module attempt
  const moduleAttempt = await db.moduleAttempt.findFirst({
    where: {
      userId: self?.id,
      moduleId: "23390cb6-5f5e-41d1-b637-ad9e42d179c5",
    },
  });
  const products = moduleAttempt?.products;
  // check if the product is done by the user
  const checkDone = (product: string) => {
    return products?.some((prod) => prod === product);
  };
  //  Score calculation for the jigsaw
  if (jigsaw?.difficulty === "EASY") jigsawScore = 300;
  else if (jigsaw?.difficulty === "MEDIUM") jigsawScore = 600;
  else if (jigsaw?.difficulty === "HARD") jigsawScore = 900;
  else jigsawScore = 0;
  let quizScore = quiz?.score ? quiz?.score : 0;
  return (
    <Flex w={"full"} direction={"column"} gap={"30px"} mb={"100px"}>
      <Flex
        w="full"
        direction={["column", "row"]}
        gap={"20px"}
        justifyContent={"center"}
        textAlign={["center", "left"]}
        alignItems={"center"}
        bgImage={"/assets/my-activity.png"}
        py={["100px", "40px"]}
        borderBottomRadius={["50px", "0"]}
        color={"white"}
      >
        <Avatar
          h={"150px"}
          w={"150px"}
          zIndex={1}
          src={self?.profilePictureUrls?.[0]?.url}
        />

        <Flex direction={"column"} justifyContent={"center"}>
          <Text fontWeight={700} fontSize={["16px", "24px"]}>
            {self?.firstName} {self?.lastName}
          </Text>
          <Text>{self?.School?.nameOfSchool}</Text>
          <Text>{self?.grade}</Text>
        </Flex>
      </Flex>
      {/* Showing total score */}
      <Flex
        mt={["-90px", "0"]}
        w={"full"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <ActivityBox totalScore={self?.totalScore as number} />
      </Flex>

      <Container
        gap={"30px"}
        display={"flex"}
        flexDirection={"column"}
        maxW={"3xl"}
        py={"20px"}
      >
        <Text fontWeight={600} fontSize={["18px", "24px"]}>
          YOUR BEAMS
        </Text>
        {/* show reel score if viewed */}
        {checkDone("REEL") && (
          <Beams
            productName="Beams Reels"
            bg={COLOR.ORANGE}
            totalScore={20 as number}
          />
        )}
        {/* Show flipbook score if viewed */}
        {checkDone("FLIPBOOK") && (
          <Beams
            productName="Beams Storyland"
            bg={COLOR.BLUE}
            totalScore={100 as number}
          />
        )}
        {/* Show quiz score */}
        <Beams
          productName="Beams Quiz"
          bg={COLOR.PURPLE_LIGHT}
          totalScore={quizScore as number}
        />
        {/* show jigsaw score */}
        <Beams
          productName="Beams Jigsaw"
          bg={COLOR.GREEN}
          totalScore={jigsawScore as number}
        />
        {/*Show writer score if done */}
        {checkDone("WRITER") && (
          <Beams
            productName="Beams Writer"
            bg={COLOR.PURPLE_LIGHT}
            totalScore={200 as number}
          />
        )}

        {/*Show timeline score if done */}
        {checkDone("TIMELINE") && (
          <Beams
            productName="Beams Timeline"
            bg={COLOR.ORANGERED}
            totalScore={50 as number}
          />
        )}

        {/*Show startup score if done */}
        {checkDone("STARTUP") && (
          <Beams
            productName="Beams Startup Universe"
            bg={COLOR.PINK}
            totalScore={50 as number}
          />
        )}
      </Container>
    </Flex>
  );
}

interface ActivityBoxProps {
  totalScore: number;
}
const ActivityBox = ({ totalScore }: ActivityBoxProps) => {
  return (
    <Flex
      h={"300px"}
      w={["80%", "300px"]}
      gap={"30px"}
      borderRadius={"50px"}
      p={"20px"}
      bg={"#FFFFFF"}
      direction={"column"}
      boxShadow={"rgba(17, 12, 46, 0.15) 0px 48px 100px 0px"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Flex direction={"column"} gap={"5px"}>
        <Text fontWeight={600} fontSize={["18px", "24px"]}>
          Your Activity
        </Text>
        <Text fontWeight={600} fontSize={["16px", "18px"]} color={"#999696"}>
          {totalScore} since last week
        </Text>
      </Flex>

      <CircularProgress value={totalScore / 5} color="gray" size={20}>
        <CircularProgressLabel>
          <Text fontWeight={600} fontSize={["16px", "20px"]}>
            {totalScore}
          </Text>
        </CircularProgressLabel>
      </CircularProgress>
    </Flex>
  );
};
interface BeamBoxProps {
  totalScore: number;
  productName: string;
  bg: string;
}

const Beams = ({ totalScore, productName, bg }: BeamBoxProps) => {
  return (
    <Flex w={"full"} direction={"row"} gap={"30px"} alignItems={"center"}>
      <Box bg={bg} w={"40px"} h="40px" rounded={"full"} />
      <Text fontWeight={500} fontSize={["16px", "18px"]}>
        {productName}
      </Text>
      <Spacer />
      <Text fontWeight={500} fontSize={["16px", "18px"]}>
        {totalScore}
      </Text>
    </Flex>
  );
};
