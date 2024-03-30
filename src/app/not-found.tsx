"use client";
// not found page
import Footer from "@/components/Footer";
import { COLOR } from "@/types/colors";
import { Button, Flex, Image, Spacer, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function NotFound() {
  const router = useRouter();
  return (
    <>
      <Flex
        w={"full"}
        h={"100vh"}
        direction={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={"10px"}
        textAlign={"center"}
      >
        <Flex flex={1} w={"full"} p={"10px"}>
          <Link href={"/home"}>
            <Image src="/assets/favicon.png" alt="beams" w={"90px"} />{" "}
          </Link>
        </Flex>

        <Flex
          flex={7}
          gap={"10px"}
          justifyContent={["flex-start", "flex-start"]}
          alignItems={"center"}
          direction={"column"}
        >
          <Image
            h={["200px", "300px"]}
            w={"auto"}
            src="/assets/notfound/404.png"
            alt="beams"
          />
          <Text px={"20px"} fontWeight={700} fontSize={["20px", "28px"]}>
            Oops! Page not found
          </Text>
          <Text px={"20px"}>
            But don&apos;t be disheartened, sometimes the greatest treasures are
            found in the most unexpected places
          </Text>
          <Button
            _hover={{}}
            mt={"20px"}
            w={["200px", "300px"]}
            bg={COLOR.ORANGE}
            color={"white"}
            onClick={() => router.back()}
          >
            Go Back
          </Button>
        </Flex>
      </Flex>
      <Footer />
    </>
  );
}
