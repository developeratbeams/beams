"use client";
import { Flex, Image, useMediaQuery } from "@chakra-ui/react";
import { SignIn } from "@clerk/nextjs";
import React from "react";

export default function SignInForm() {
  const [isLargerThan800] = useMediaQuery("(min-width: 800px)");
  return (
    <Flex
      gap={"20px"}
      background={{
        lg: "linear-gradient(90deg, rgba(249,246,247,1) 70%, rgba(255,210,93,1) 70%)", // Vertical gradient for mobile
        base: "linear-gradient(0deg, rgba(249,246,247,1) 70%, rgba(255,210,93,1) 70%)", // Horizontal gradient for large screens
      }}
      h={["auto", "100vh"]}
      justifyContent={"center"}
      alignItems={"center"}
      w={"full"}
      direction={["column-reverse", "row"]}
    >
      <Flex flex={5} w={"full"} justifyContent={"center"}>
        <SignIn
          appearance={{
            elements: {
              formButtonPrimary: {
                fontSize: 14,
                textTransform: "none",
                backgroundColor: "#F96F2E",
                "&:hover, &:focus, &:active": {
                  backgroundColor: "#F96F2E",
                },
              },
            },
          }}
        />
      </Flex>
      <Flex
        flex={3}
        flexShrink={"initial"}
        w={"full"}
        mx={"10px"}
        justifyContent={"center"}
      >
        <Image
          mt={["60px", "0"]}
          h={["250px", "550px"]}
          src={
            isLargerThan800 ? "/assets/signin.png" : "/assets/signin-mobile.png"
          }
          alt="beams"
          w={"90%"}
        />
      </Flex>
    </Flex>
  );
}
