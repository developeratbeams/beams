import { COLOR } from "@/types/colors";
import { Box, Flex, Image, Text } from "@chakra-ui/react";

import React from "react";

export default function StartUp({ data }: { data: any }) {
  return (
    <Flex
      direction={"column"}
      h={"100vh"}
      w={"full"}
      justifyContent={"center"}
      alignItems={"center"}
      p={"10px"}
      id="startup"
      display={["flex", "none"]}
      gap={"15px"}
    >
      <Text
        color={COLOR.PINK}
        fontWeight={700}
        lineHeight={"25px"}
        fontSize={["20px", "26px"]}
      >
        {data.headingBrief}
      </Text>
      <Flex gap={"40px"} direction={["column", "row"]}>
        <Flex flex={2} gap={"5px"} direction={"column"}>
          <Image
            mx={["auto", "0"]}
            src={data.founderImg}
            w={"180px"}
            alt="Beams"
          />
          <Flex
            fontWeight={500}
            textAlign={["center", "center"]}
            direction={"column"}
          >
            <a href={data.linkedIn}>
              {" "}
              <Text textDecoration={"underline"} color={COLOR.PINK}>
                {data.founder}{" "}
              </Text>
            </a>
            <Text>CEO, {data.details.split(" ")[0]}</Text>
          </Flex>
        </Flex>
        <Flex
          bg={"white"}
          borderLeft={"1px solid black"}
          borderRight={"1px solid black"}
          direction={"column"}
          flex={6}
          p={"10px"}
          gap={"14px"}
          h={"fit-content"}
          fontWeight={600}
        >
          <Text>{data?.details}</Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
