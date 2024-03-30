// jigsaw landing page
import { getAuther } from "@/libs/getAuther";
import { Box, Button, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import { Quicksand } from "next/font/google";
import React from "react";
import { COLOR } from "@/types/colors";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllJigSaw } from "@/libs/jigsaw-service";
const quicksand = Quicksand({
  subsets: ["latin"],
});

export default async function Page() {
  const self = await getAuther();
  // get all the jigsaw
  const jigsaws = await getAllJigSaw();
  if (!jigsaws) notFound();

  return (
    <>
      <Flex
        flexDirection={"column"}
        gap={"20px"}
        maxW={"full"}
        className={quicksand.className}
        h={"92vh"}
        alignItems={"center"}
        bgImage={"/jigsaw/jigsaw.png"}
        bgRepeat={"no-repeat"}
        bgPosition={["bottom", "left"]}
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
              color={"#151515"}
              fontSize={["20px", "40px"]}
              textAlign={"center"}
            >
              Unravel fun with{" "}
              <Box as={"span"} color={COLOR.GREEN}>
                Beams Jigsaw
              </Box>
            </Text>
            <Text
              color={"#151515"}
              textAlign={"center"}
              fontSize={["14px", "20px"]}
              fontWeight={500}
            >
              Hi {self?.firstName}, Are you ready to level up your thinking?
            </Text>
          </VStack>
        </Flex>
        <Flex
          bg={"white"}
          mx={"20px"}
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
                Observe the original image closely – it&apos;s your roadmap to
                solving the puzzle.
              </Text>
            </HStack>
            <HStack
              fontSize={["14px", "20px"]}
              fontWeight={500}
              alignItems={"flex-start"}
            >
              <Text>2. </Text>
              <Text>
                Choose a difficulty level: more challenge, more points!{" "}
              </Text>
            </HStack>
            <HStack
              fontSize={["14px", "20px"]}
              fontWeight={500}
              alignItems={"flex-start"}
            >
              <Text>3. </Text>
              <Text>
                Keep in mind, if you go back, you can&apos;t resume from where
                you left off.
              </Text>
            </HStack>
            <HStack
              fontSize={["14px", "20px"]}
              fontWeight={500}
              alignItems={"flex-start"}
            >
              <Text>4. </Text>
              <Text>
                Enjoy at your own pace – no time limits here, just endless fun.
              </Text>
            </HStack>
            <HStack
              fontSize={["14px", "20px"]}
              fontWeight={500}
              alignItems={"flex-start"}
            >
              <Text>5. </Text>
              <Text>Remember, quitting means leaving those points behind.</Text>
            </HStack>
            <HStack
              fontSize={["14px", "20px"]}
              fontWeight={500}
              alignItems={"flex-start"}
            >
              <Text>6. </Text>
              <Text>
                Ready for the challenge? Press &apos;Start&apos; and let the
                magic and points accumulate!
              </Text>
            </HStack>
          </Flex>{" "}
        </Flex>

        <Link href={`/home/jigsaw/${jigsaws[0].id}`}>
          {" "}
          <Button
            _hover={{}}
            mt={"20px"}
            fontSize={["18px", "24px"]}
            w={["150px", "350px"]}
            color={"white"}
            bg={COLOR.GREEN}
          >
            Start
          </Button>
        </Link>
      </Flex>
    </>
  );
}

// .
