/**
 * Landing page for the !logged in users.
*/

"use client";
import Footer from "@/components/Footer";
import { COLOR } from "@/types/colors";
import { Button, Flex, Image, Text } from "@chakra-ui/react";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

export default function Page() {
  return (
    <>
      <Flex w="full" p={"10px"} justifyContent={"space-between"}>
        <Link href={"/"}>
          <Image p={"10px"} src="/assets/favicon.png" w={"90px"} alt="beams" />
        </Link>
        {/* show button if not logged in */}
        <SignedOut>
          <Flex gap={"10px"}>
            <Link href={"/sign-in"}>
              <Button
                _hover={{}}
                bg={COLOR.ORANGE}
                w={["100px", "150px"]}
                color={"white"}
              >
                Login
              </Button>
            </Link>
            <Link href={"/sign-up"}>
              <Button
                _hover={{}}
                w={["100px", "150px"]}
                variant={"outline"}
                border={` 1px solid ${COLOR.ORANGE}`}
                color={COLOR.ORANGE}
              >
                Sign Up
              </Button>
            </Link>
          </Flex>
        </SignedOut>
        {/* If logged in show the button */}
        <SignedIn>
          <Link href={"/products"}>
            {" "}
            <Button _hover={{}} bg={COLOR.ORANGE} color={"white"}>
              Get Started
            </Button>
          </Link>
        </SignedIn>
      </Flex>
      <Flex
        w={"full"}
        direction={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={"20px"}
      >
        <Flex
          w={"full"}
          h={["65vh", "82vh"]}
          bgImage={
            "https://www.beams.world/static/media/hero-bg.3013edb7ad08efa78be4.webp"
          }
          bgPosition={"top"}
          justifyContent={"center"}
          bgSize={"cover"}
          alignItems={"center"}
        >
          <Text fontWeight={500} fontSize={["30px", "48px"]}>
            Welcome to Beams
          </Text>
          {/* <Button onClick={async () => await sendEmailBrevo()}>
            Send Mail
          </Button> */}
        </Flex>
      </Flex>
      <Footer />
    </>
  );
}
