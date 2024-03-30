import { COLOR } from "@/types/colors";
import { Flex, Image, Text } from "@chakra-ui/react";
import { Quicksand } from "next/font/google";
import React from "react";
const quicksand = Quicksand({
  subsets: ["latin"],
});

export default function Landing({ data }: { data: any }) {
  return (
    <Flex
      direction={"column"}
      h={"100vh"}
      w={"full"}
      gap={"40px"}
      className={quicksand.className}
      p={"10px"}
      id="intro"
    >
      <Flex direction={"column"} gap={"10px"}>
        <Text fontWeight={700} fontSize={["20px", "30px"]}>
          {data.heading}
        </Text>
        <Flex w={"full"} gap={"10px"}>
          {/* <Image
            h={["60px", "80px"]}
            w={["60px", "80px"]}
            src={data.homeImage1}
            alt="beams"
          /> */}
          {/* <Text
            display={"flex"}
            flex={6}
            color={COLOR.PINK}
            fontWeight={700}
            fontSize={["20px", "26px"]}
          >
            {data.headingBrief}
          </Text> */}
        </Flex>
      </Flex>

      <Flex
        direction={["column", "row"]}
        gap={"10px"}
        justifyContent={"space-between"}
      >
        <Image
          h={["250px", "350px"]}
          w={["250px", "350px"]}
          src={data.homeImage}
          alt="beams"
        />
      </Flex>
    </Flex>
  );
}
