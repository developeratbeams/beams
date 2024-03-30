import { Container, Flex, Image, Text } from "@chakra-ui/react";

import React from "react";

export default function Product({ data }: { data: any }) {
  return (
    <Flex
      direction={"column"}
      h={"100vh"}
      w={"full"}
      justifyContent={"center"}
      alignItems={"center"}
      gap={"60px"}
      p={"10px"}
      id="product"
    >
      <Flex
        w={"full"}
        bg={"#F2F1EB"}
        py={"10px"}
        rounded={"10px"}
        direction={"column"}
      >
        <Container
          maxW={"3xl"}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"flex-start"}
          gap={"20px"}
          py={"10px"}
        >
          <Text fontWeight={700} fontSize={["20px", "26px"]}>
            THE PRODUCT
          </Text>
          <Image w={"full"} src={data.productImage} alt="product" />
          <Flex
            py={"10px"}
            fontSize={["16px", "18px"]}
            direction={"column"}
            gap={"20px"}
          >
            <Text fontWeight={500}>{data.product}</Text>
          </Flex>
        </Container>
      </Flex>
    </Flex>
  );
}
