import { COLOR } from "@/types/colors";
import { Box, Container, Flex, Image, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

export default function Result({ data }: { data: any }) {
  return (
    <Flex
      direction={"column"}
      h={"100vh"}
      w={"full"}
      justifyContent={"center"}
      alignItems={"center"}
      gap={"60px"}
      p={"10px"}
      id="result"
    >
      <Flex w={"full"} py={"10px"} bg={COLOR.PINK} direction={"column"}>
        <Container
          maxW={"3xl"}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"flex-start"}
        >
          <Text
            fontWeight={700}
            fontSize={["20px", "26px"]}
            color={"white"}
            py={"10px"}
          >
            THE RESULT
          </Text>
          <Image w={"full"} src={data?.resultImage} alt="product" />

          <Text
            mt={"10px"}
            fontWeight={450}
            py={"10px"}
            color={"white"}
            fontSize={["16px", "18px"]}
          >
            {data.result}
          </Text>
        </Container>
      </Flex>
    </Flex>
  );
}
