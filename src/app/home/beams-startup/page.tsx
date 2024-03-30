// landing page for the startup with the tree
import { getAuther } from "@/libs/getAuther";
import { COLOR } from "@/types/colors";
import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import React from "react";
import Tree from "./tree";
export default async function BeamsStartUp() {
  const self = await getAuther();

  return (
    <Flex
      h={"92vh"}
      w={"full"}
      bgImage={"/startup/startup.png"}
      bgPosition={"center"}
      bgSize={"cover"}
      direction={"column"}
    >
      <Flex
        flexDirection={"column"}
        w={"100%"}
        justifyContent={"center"}
        gap={["20px", "30px"]}
      >
        <VStack py={"15px"}>
          <Text
            color={"white"}
            fontWeight={700}
            fontSize={["20px", "40px"]}
            textAlign={"center"}
          >
            Spark Innovation in
            <Box as="span" color={COLOR.PINK}>
              {" "}
              Beams Startup Universe
            </Box>{" "}
          </Text>
          <Text
            color={"white"}
            textAlign={"center"}
            fontSize={["14px", "20px"]}
            fontWeight={500}
          >
            Hi {self?.firstName}, ready to explore startups transforming the
            world with 6 magical materials?
          </Text>
        </VStack>{" "}
      </Flex>
      <Flex w={"full"} justifyContent={"center"}>
        <Tree />
      </Flex>
    </Flex>
  );
}
