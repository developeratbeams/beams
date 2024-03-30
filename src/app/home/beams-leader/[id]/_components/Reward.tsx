"use client";
// submission screen
import { COLOR } from "@/types/colors";
import { Button, Flex, Image, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";

import AnimatedButton from "@/components/AnimatedButton";
import { useRouter } from "next/navigation";
import { nanoid } from "nanoid";
import useCompleteModuleModal from "@/hooks/useCompleteModule";

export default function Report() {
  const router = useRouter();
  const modal = useCompleteModuleModal();
  useEffect(() => {
    const getData = async () => {
      modal.onOpen();
    };
    getData();
  }, []);

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
        <RankCard
          image={"/leader/reward.png"}
          bottomMessage="Woohoo, You're a LEADER in the making!"
          subMessage="We're reviewing your answers, and you'll get the results by email soon."
        />
        <Flex
          gap={"10px"}
          justifyContent={"center"}
          flexWrap={"wrap"}
          alignItems={"center"}
        >
          <AnimatedButton
            text={"Explore More"}
            bg={COLOR.BROWN}
            href={"/home"}
          />
          <Button
            _hover={{}}
            bg={"transparent"}
            border={`1px solid ${COLOR.ORANGE}`}
            onClick={() =>
              router.push(`/home/beams-leader/leader-1?attemptId=${nanoid()}`)
            }
          >
            Try Again
          </Button>
        </Flex>
      </Flex>
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
      <Text fontWeight={500} color={"gray"}>
        {subMessage}
      </Text>
    </Flex>
  );
};
