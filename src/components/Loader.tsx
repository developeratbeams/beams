import { Flex, Image, Spinner } from "@chakra-ui/react";
import React from "react";

export default function Loader() {
  return (
    <Flex
      w={"full"}
      h={"100vh"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Spinner />
    </Flex>
  );
}
