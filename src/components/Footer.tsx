import { Flex, Image, Spacer, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <Flex
      h={"fit-content"}
      w={"full"}
      alignItems={["flex-start", "center"]}
      direction={"column"}
      bg={"gray.100"}
    >
      <Flex
        w={"full"}
        alignItems={["flex-start", "center"]}
        direction={["column", "row"]}
      >
        <Flex flex={2} p="10px">
          <Link href={"/"}>
            <Image
              p={"10px"}
              src="/assets/favicon.png"
              alt="beams"
              w={"90px"}
            />
          </Link>
        </Flex>
        <Flex
          direction={["column", "row"]}
          flex={6}
          px={"20px"}
          gap={["20px"]}
          w={"full"}
          justifyContent={"space-between"}
        >
          <Link href={"/contact-us"}>
            <Text fontWeight={400} fontSize={["14px", "16px"]}>
              Contact Us
            </Text>
          </Link>
          <Link href={"/terms-and-conditions"}>
            <Text fontWeight={400} fontSize={["14px", "16px"]}>
              Terms of service
            </Text>
          </Link>
          <Link href={"/privacy"}>
            <Text fontWeight={400} fontSize={["14px", "16px"]}>
              Privacy Policy
            </Text>
          </Link>
        </Flex>
      </Flex>
      <Flex
        w={"full"}
        pt={["10px"]}
        pb={"10px"}
        justifyContent={"center"}
        textAlign={"center"}
        direction={["column", "row"]}
      >
        {" "}
        <Text fontWeight={400} fontSize={["14px", "16px"]}>
          © {Number(new Date().getFullYear())} Beams. All Rights Reserved.
        </Text>
      </Flex>
    </Flex>
  );
}
