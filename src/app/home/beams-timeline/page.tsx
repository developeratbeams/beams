// timeline landing page
import { saveModuleActivity } from "@/actions/module";
import { getAuther } from "@/libs/getAuther";
import { COLOR } from "@/types/colors";
import {
  Box,
  Button,
  Container,
  Flex,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

export default async function BeamsTimeLine() {
  // get self
  const self = await getAuther();
  // save the view
  await saveModuleActivity("23390cb6-5f5e-41d1-b637-ad9e42d179c5", "TIMELINE");
  return (
    <Flex
      h={"92vh"}
      w={"full"}
      bgImage={"/timeline/timelinebg.png"}
      bgPosition={"center"}
      bgSize={"cover"}
      direction={"column"}
      p={["20px"]}
    >
      <Flex
        flexDirection={"column"}
        w={"100%"}
        justifyContent={"center"}
        gap={["20px", "20px"]}
      >
        <VStack>
          <Text
            color={"black"}
            fontWeight={700}
            fontSize={["20px", "40px"]}
            textAlign={"center"}
          >
            Explore Inventions through
            <Box as="span" color={COLOR.ORANGERED}>
              {" "}
              Beams Timeline
            </Box>{" "}
          </Text>
          <Text
            color={"black"}
            textAlign={"center"}
            fontSize={["14px", "20px"]}
            fontWeight={500}
          >
            Hi {self?.firstName}, ready to journey through the evolution of 6
            magical materials?
          </Text>
        </VStack>
        <Container maxW={"3xl"} centerContent display={"flex"} gap={"25px"}>
          <Image
            h={["250px", "350px"]}
            src="/timeline/timeline.png"
            alt="beams timeline"
          />
          <Link href={`/home/beams-timeline/sf`}>
            <Button
              _hover={{}}
              bg={COLOR.ORANGERED}
              w={"280px"}
              color={"white"}
            >
              Start
            </Button>
          </Link>
        </Container>
      </Flex>
    </Flex>
  );
}
