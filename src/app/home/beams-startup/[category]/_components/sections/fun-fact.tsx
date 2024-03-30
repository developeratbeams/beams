import { COLOR } from "@/types/colors";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
interface Props {
  [key: string]: {
    heading: string;
    headingBrief: string;
    homeImage: string;
    companyUrl: string;
    linkedIn: string;
    details: string;
    funfact: string;
    product: string;
    productImage: string;
    result: string;
    resultImage: string;
  };
}
export default function FunFact({ data }: { data: any }) {
  return (
    <Flex
      direction={"column"}
      h={"100vh"}
      w={"full"}
      justifyContent={"center"}
      alignItems={"center"}
      gap={"120px"}
      p={"10px"}
    >
      <Flex direction={"column"} gap={"16px"} display={["none", "flex"]}>
        <Text
          display={"flex"}
          flex={6}
          color={COLOR.PINK}
          fontWeight={700}
          fontSize={["20px", "26px"]}
        >
          {data.headingBrief}: {data.details.split(" ")[0]}
        </Text>

        <Flex gap={"20px"} direction={["column", "row"]}>
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
              <Text>
                CEO,{" "}
                <a href={data.companyUrl}>
                  <Box
                    as="span"
                    textDecoration={"underline"}
                    color={COLOR.PINK}
                  >
                    {data.details.split(" ")[0]}
                  </Box>{" "}
                </a>{" "}
              </Text>
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
            <Text>{data.details}</Text>{" "}
          </Flex>
        </Flex>
      </Flex>
      <Flex
        bg={
          "linear-gradient(90deg, rgba(230,79,142,1) 20%, rgba(255,255,255,1) 20%, rgba(255,255,255,1) 59%, rgba(230,79,142,1) 59%)"
        }
        p={"15px"}
        rounded={"10px"}
      >
        <Flex
          rounded={"10px"}
          direction={"column"}
          gap={"10px"}
          bg={"white"}
          p={"20px"}
        >
          <Text fontWeight={700} fontSize={["20px", "26px"]}>
            FUN FACT
          </Text>
          <Text fontWeight={400} fontSize={["16px", "18px"]}>
            {data.funfact}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
