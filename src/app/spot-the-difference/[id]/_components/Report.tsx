"use client";
//  report , after user submits
import { COLOR } from "@/types/colors";
import { Button, Flex, Image, Text, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { SpotTheDifference, SpotTheDifferenceAttempt } from "@prisma/client";
import ResultModal from "./ResultModal";
import NavBar from "@/components/NavBar/NavBar";
import { User } from "@/types/user.types";
import { useRouter } from "next/navigation";

interface ReportProps {
  attempt: SpotTheDifferenceAttempt;
  std: SpotTheDifference;
  user: User;
}

export default function Report({ attempt, std, user }: ReportProps) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const router = useRouter();
  return (
    <>
      <NavBar data={user} />
      <Flex
        alignItems="center"
        justifyContent="center"
        h="92vh"
        py="10px"
        flexDirection="column"
        gap={"20px"}
      >
        <RankCard
          image={"/jigsaw/jigsaw-solved.png"}
          bottomMessage="Congratulations, Detective Supreme!"
          subMessage="Your keen eye is unmatched. Keep shining and share your brilliance!"
        />
        <Flex
          gap={"10px"}
          justifyContent={"center"}
          flexWrap={"wrap"}
          alignItems={"center"}
        >
          <Button
            _hover={{}}
            bg={COLOR.ORANGE}
            onClick={() => onOpen()}
            color={"white"}
          >
            View The Differences
          </Button>
          <Button
            _hover={{}}
            bg={"transparent"}
            border={`1px solid ${COLOR.ORANGE}`}
          >
            Return Home
          </Button>
          <Button
            _hover={{}}
            bg={"transparent"}
            border={`1px solid ${COLOR.ORANGE}`}
            onClick={() =>
              router.push(
                `/spot-the-difference/${attempt.spotTheDifferenceId}?try-again=true`
              )
            }
          >
            Try Again
          </Button>
        </Flex>
      </Flex>{" "}
      {/* Result modal*/}
      <ResultModal
        image1Url="/game/original.png"
        image2Url="/game/original.png"
        differences={std.differences}
        foundDifferences={attempt.spottedDifferences as number[]}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
}

const RankCard = ({
  bottomMessage,
  image,

  quit,
  subMessage,
}: any) => {
  return (
    <Flex
      textAlign={"center"}
      flexDirection={"column"}
      gap={"10px"}
      justifyContent={"center"}
    >
      <Text fontWeight={700} fontSize={["28px", "40px"]} color={COLOR.ORANGE}>
        You have got 100 Beams!
      </Text>

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
