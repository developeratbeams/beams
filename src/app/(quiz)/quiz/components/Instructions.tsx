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
      h={["290px", "350px"]}
      maxW={"4xl"}
      flexDirection={"column"}
      gap={"10px"}
      borderRadius={"12px"}
      px={"4px"}
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
          fontSize={["18px", "24px"]}
          fontWeight={600}
          color={"#151515"}
          mt={"10px"}
        >
          Tips to get you started.
        </Text>
        <HStack
          fontSize={["14px", "20px"]}
          fontWeight={500}
          alignItems={"flex-start"}
        >
          <Text>1. </Text>
          <Text>
            Choose from our library of backgrounds, or upload your own for extra
            flair!
          </Text>
        </HStack>
        <HStack
          fontSize={["14px", "20px"]}
          fontWeight={500}
          alignItems={"flex-start"}
        >
          <Text>2. </Text>
          <Text>
            Insert characters and objects from our image treasure chest, or
            bring in your own!
          </Text>
        </HStack>
        <HStack
          fontSize={["14px", "20px"]}
          fontWeight={500}
          alignItems={"flex-start"}
        >
          <Text>3. </Text>
          <Text>
            Complete the needed number of slides to tell your tale from start to
            finish.
          </Text>
        </HStack>
        <HStack
          fontSize={["14px", "20px"]}
          fontWeight={500}
          alignItems={"flex-start"}
        >
          <Text>4. </Text>
          <Text>
            Craft a dazzling cover with your story&aposs title and your name,
            and don t forget a grand finale end page!
          </Text>
        </HStack>
        <HStack
          fontSize={["14px", "20px"]}
          fontWeight={500}
          alignItems={"flex-start"}
        >
          <Text>5. </Text>
          <Text>
            Your story is auto-saved, so you can return to your tale whenever
            you wish!
          </Text>
        </HStack>
        <HStack
          fontSize={["14px", "20px"]}
          fontWeight={500}
          alignItems={"flex-start"}
        >
          <Text>6. </Text>
          <Text>
            Use your own creativity to make your story uniquely yours!
          </Text>
        </HStack>
        <HStack
          fontSize={["14px", "20px"]}
          fontWeight={500}
          alignItems={"flex-start"}
        >
          <Text>7. </Text>
          <Text>
            Peek at your story before submitting with the Preview button!
          </Text>
        </HStack>
        <HStack
          fontSize={["14px", "20px"]}
          fontWeight={500}
          alignItems={"flex-start"}
        >
          <Text>8. </Text>
          <Text>
            Check out the help center for shortcuts and magical controls.
          </Text>
        </HStack>
        <HStack
          fontSize={["14px", "20px"]}
          fontWeight={500}
          alignItems={"flex-start"}
        >
          <Text>8. </Text>
          <Text>
            For the best experience, use a desktop, laptop, or tablet. On
            mobile, turn your screen sideways for a better view.{" "}
          </Text>
        </HStack>
      </Flex>{" "}
    </Flex>
  );
};
