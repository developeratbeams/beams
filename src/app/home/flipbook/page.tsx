//Flip book landing page
import { getAuther } from "@/libs/getAuther";
import { COLOR } from "@/types/colors";
import { Box, Flex, Text } from "@chakra-ui/react";
import { Quicksand } from "next/font/google";
import React from "react";
import { saveModuleActivity } from "@/actions/module";
import FlipBook from "./components/FlipBook";
import AnimatedButton from "@/components/AnimatedButton";

const quicksand = Quicksand({ subsets: ["latin"] });
export default async function Page() {
  const self = await getAuther();
  // save the view
  saveModuleActivity("23390cb6-5f5e-41d1-b637-ad9e42d179c5", "FLIPBOOK");
  return (
    <Flex
      bgSize={"contain"}
      w={"full"}
      direction={"column"}
      gap={["50px", "10px"]}
      className={quicksand.className}
      pb={"40px"}
      zIndex={10}
    >
      <Flex
        justifyContent={"center"}
        w={"full"}
        alignItems={"center"}
        direction={"column"}
        gap={"10px"}
        textAlign={"center"}
        px={"20px"}
      >
        <Text fontSize={["26px", "36px"]} fontWeight={700}>
          Discover Magic In{" "}
          <Box as="span" color={COLOR.BLUE}>
            Beams Storysland{" "}
          </Box>
        </Text>
        <Text fontSize={["18px", "20px"]} fontWeight={500}>
          Hi {self?.firstName}, Are you ready to discover magic in this
          interactive story?
        </Text>

        <FlipBook />
        <AnimatedButton
          text="Continue Your Adventure"
          bg={COLOR.BLUE}
          href="/quiz"
        />
      </Flex>
    </Flex>
  );
}
