// landing page for story
import { getAuther } from "@/libs/getAuther";
import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Quicksand } from "next/font/google";
import React from "react";
import { COLOR } from "@/types/colors";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getStories } from "@/libs/story-service";
const quicksand = Quicksand({
  subsets: ["latin"],
});

export default async function Page() {
  // get user
  const self = await getAuther();
  // get all stories
  const stories = await getStories();
  // if not found
  if (!stories) notFound();

  return (
    <Flex
      flexDirection={"column"}
      gap={"20px"}
      maxW={"full"}
      className={quicksand.className}
      h={["auto", "92vh"]}
      bg={COLOR.PURPLE_LIGHT}
      alignItems={"center"}
    >
      <Flex
        flexDirection={"column"}
        w={"100%"}
        justifyContent={"center"}
        gap={["20px", "30px"]}
      >
        <VStack py={"15px"}>
          <Text
            fontWeight={700}
            color={"white"}
            fontSize={["20px", "40px"]}
            textAlign={"center"}
          >
            Beam Into{" "}
            <Box as={"span"} color={COLOR.YELLOW}>
              Beams Writer
            </Box>
          </Text>
          <Text
            color={"white"}
            textAlign={"center"}
            fontSize={["14px", "20px"]}
            fontWeight={500}
          >
            Hi {self?.firstName}, are you ready to write an incredible story?
          </Text>
        </VStack>
      </Flex>
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
            WHAT YOU NEED TO KNOW
          </Text>
          <HStack
            fontSize={["14px", "20px"]}
            fontWeight={500}
            alignItems={"flex-start"}
          >
            <Text>1. </Text>
            <Text>
              For the best experience, use a desktop, laptop, or tablet to write
              your story.
            </Text>
          </HStack>
          <HStack
            fontSize={["14px", "20px"]}
            fontWeight={500}
            alignItems={"flex-start"}
          >
            <Text>2. </Text>
            <Text>The story has a cover page and 17 slides.</Text>
          </HStack>
          <HStack
            fontSize={["14px", "20px"]}
            fontWeight={500}
            alignItems={"flex-start"}
          >
            <Text>3. </Text>
            <Text>Each slide has one or more characters.</Text>
          </HStack>{" "}
          <HStack
            fontSize={["14px", "20px"]}
            fontWeight={500}
            alignItems={"flex-start"}
          >
            <Text>4. </Text>
            <Text>Some slides have objects.</Text>
          </HStack>
          <HStack
            fontSize={["14px", "20px"]}
            fontWeight={500}
            alignItems={"flex-start"}
          >
            <Text>5. </Text>
            <Text>
              Look at the slides in the original story to see the characters and
              objects in the slide.{" "}
            </Text>
          </HStack>
          <HStack
            fontSize={["14px", "20px"]}
            fontWeight={500}
            alignItems={"flex-start"}
          >
            <Text>6. </Text>
            <Text>Use your creativity to make your story uniquely yours. </Text>
          </HStack>{" "}
          <HStack
            fontSize={["14px", "20px"]}
            fontWeight={500}
            alignItems={"flex-start"}
            mb={"15px"}
          >
            <Text>7. </Text>
            <Text>
              Peek at your story before submitting it by clicking on the
              &quot;Preview&quot; button.
            </Text>
          </HStack>
        </Flex>{" "}
      </Flex>
      <Link href={`/stories/${stories?.[0]?.id}`}>
        {" "}
        <Button
          _hover={{}}
          fontSize={["18px", "24px"]}
          mt={"20px"}
          w={["150px", "350px"]}
          color={"black"}
          bg={COLOR.YELLOW}
        >
          Start
        </Button>
      </Link>
      <Image
        position={["unset", "absolute"]}
        bottom={"10px"}
        h={"300px"}
        display={["none", "block"]}
        left={"80px"}
        src="/assets/writer/writer-1.png"
        alt="beams"
      />
    </Flex>
  );
}
