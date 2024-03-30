"use client";
import { Button, Container, Flex, HStack, Image, Text } from "@chakra-ui/react";
import Link from "next/link";
import React, { useState } from "react";
interface InstructionsProps {
  storyId: String;
}
export default function Instructions({ storyId }: InstructionsProps) {
  const [text, setText] = useState<boolean>(true);
  return (
    <Flex
      flexDirection={"column"}
      gap={["10px", "20px"]}
      maxW={"full"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      {text ? <TextBox /> : <VideoBox />}
      <Flex
        w={"full"}
        justifyContent={"space-between"}
        alignItems={"flex-start"}
        flexDirection={["column", "row"]}
      >
        <Image src="/assets/story-instructions-1.png" alt="beams" />
        <HStack py={"20px"} gap={"20px"}>
          <Link href={`/stories/${storyId}`}>
            {" "}
            <Button _hover={{}} fontWeight={600} bg="#FFD25D" color={"#151515"}>
              Start Writing
            </Button>
          </Link>

          <Button
            _hover={{}}
            onClick={() => {
              setText(!text);
            }}
            fontWeight={600}
            bg="#D1D0D0"
            color={"#151515"}
          >
            Watch Tutorial
          </Button>
        </HStack>
        <Image src="/assets/story-instructions-2.png" alt="beams" />
      </Flex>
    </Flex>
  );
}

const VideoBox = () => {
  return (
    <Container maxW="3xl" h={["165px", "375px"]}>
      <video width="100%" height="100%" controls>
        <source src="your-video-file.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </Container>
  );
};

const TextBox = () => {
  return (
    <Flex
      bg={"white"}
      mx={"20px"}
      h={["290px", "300px"]}
      maxW={"4xl"}
      flexDirection={"column"}
      gap={"10px"}
      borderRadius={"12px"}
      px={"4px"}
      py={"10px"}
    >
      <Flex
        gap={"12px"}
        borderRadius={"12px"}
        overflow={"scroll"}
        overflowX={"scroll"}
        flexDirection={"column"}
        px={"20px"}
      >
        <Text
          pt="10px"
          fontSize={["18px", "24px"]}
          fontWeight={600}
          color={"#151515"}
          mt={"10px"}
        >
          What you need to know.
        </Text>
        <HStack
          fontSize={["14px", "20px"]}
          fontWeight={500}
          alignItems={"flex-start"}
        >
          <Text>1. </Text>
          <Text>
            Each question is a chance to earn 10 dazzling points. Get it right,
            and the points are yours! If you miss it, no worries – you
            won&apos;t lose any points.
          </Text>
        </HStack>
        <HStack
          fontSize={["14px", "20px"]}
          fontWeight={500}
          alignItems={"flex-start"}
        >
          <Text>2. </Text>
          <Text>
            Make sure you&apos;re connected to a strong and stable internet
            signal. This way, your quiz adventure won&apos;t have any unexpected
            pauses or hiccups.
          </Text>
        </HStack>
        <HStack
          fontSize={["14px", "20px"]}
          fontWeight={500}
          alignItems={"flex-start"}
        >
          <Text>3. </Text>
          <Text>
            Once you start, there&apos;s no going back. Each question is a step
            forward on this exciting path, so make sure you&apos;re ready before
            you begin.
          </Text>
        </HStack>
        <HStack
          fontSize={["14px", "20px"]}
          fontWeight={500}
          alignItems={"flex-start"}
        >
          <Text>4. </Text>
          <Text>
            Stay alert! The questions come in different formats – from multiple
            choices to true/false and more. Keep your wits about you and be
            ready for anything.
          </Text>
        </HStack>
        <HStack
          fontSize={["14px", "20px"]}
          fontWeight={500}
          alignItems={"flex-start"}
        >
          <Text>5. </Text>
          <Text>
            And here&apos;s the zinger – you&apos;ve got 60 seconds per
            question. Watch the clock tick; it&apos;s part of the excitement!
            Ready to beat the buzzer?
          </Text>
        </HStack>
        <HStack
          fontSize={["14px", "20px"]}
          fontWeight={500}
          alignItems={"flex-start"}
        >
          <Text>6. </Text>
          <Text>
            Read each question carefully and think before you answer. Remember,
            each choice could lead you to victory!
          </Text>
        </HStack>
        <HStack
          fontSize={["14px", "20px"]}
          fontWeight={500}
          alignItems={"flex-start"}
        >
          <Text>7. </Text>
          <Text>
            When you&apos;re ready to begin, press the &quot;Start Quiz&quot;
            button. Your quiz adventure awaits!
          </Text>
        </HStack>
      </Flex>{" "}
    </Flex>
  );
};
