// submit modal

import AnimatedButton from "@/components/AnimatedButton";
import { Button, Image, Text, VStack } from "@chakra-ui/react";
import { Quicksand } from "next/font/google";
import React from "react";
const quicksand = Quicksand({
  subsets: ["latin"],
});

export default function SubmitMessage() {
  return (
    <>
      <VStack
        flexDirection={"column"}
        justifyContent={"center"}
        textAlign={"center"}
        maxW={"full"}
        className={quicksand.className}
        justify={"center"}
        p={"20px"}
        gap={"20px"}
      >
        <Image
          h={["230px", "350px"]}
          src="/assets/story-submit.png"
          alt="sumit"
        />
        <Text fontSize={["18px", "32px"]} fontWeight={600}>
          Congratulations, you&apos;re a writer now! Your book will be published
          soon.
        </Text>
        <Text fontSize={["16px", "24px"]} fontWeight={500}>
          Keep exploring, you&apos;re on a roll.
        </Text>
        <AnimatedButton
          text={"Continue Your Adventure"}
          bg={"#FFD25D"}
          href={"/home/beams-timeline"}
        />
      </VStack>
    </>
  );
}
