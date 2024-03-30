import { COLOR } from "@/types/colors";
import { Container, Flex, Text } from "@chakra-ui/react";
import React from "react";
import ActivityModule from "./ActivityModule";
import { ModuleAttempt } from "@/types/user.types";
interface MyActivityProps {
  moduleActivity?: ModuleAttempt;
}
export default function MyActivity({ moduleActivity }: MyActivityProps) {
  return (
    <Flex w={"full"} direction={"column"} bg={COLOR.YELLOW} py={"20px"}>
      <Text textAlign={"center"} fontWeight={700} fontSize={["26px", "36px"]}>
        MY JOURNEY
      </Text>
      <Container
        display={"flex"}
        maxW="6xl"
        flexDirection={"column"}
        gap={"40px"}
        pb={"40px"}
      >
        <ActivityModule
          moduleActivity={moduleActivity}
          productName="Introduction"
          moduleId="j"
          index={1}
        />
        <ActivityModule
          moduleActivity={moduleActivity}
          productName="Beams Reels"
          moduleId="j"
          index={2}
        />
        <ActivityModule
          moduleActivity={moduleActivity}
          productName="Beams Storyland"
          moduleId="j"
          index={3}
        />
        <ActivityModule
          moduleActivity={moduleActivity}
          productName="Beams Quizland"
          moduleId="j"
          index={4}
        />
        <ActivityModule
          moduleActivity={moduleActivity}
          productName="Beams Jigsaw"
          moduleId="j"
          index={5}
        />
        <ActivityModule
          moduleActivity={moduleActivity}
          productName="Beams Writer"
          moduleId="j"
          index={6}
        />
        <ActivityModule
          moduleActivity={moduleActivity}
          productName="Beams Timeline"
          moduleId="j"
          index={7}
        />{" "}
        <ActivityModule
          productName="Beams Startup Universe"
          moduleId="j"
          moduleActivity={moduleActivity}
          index={8}
        />
        <ActivityModule
          productName="Beams Leader"
          moduleId="j"
          moduleActivity={moduleActivity}
          index={9}
        />
      </Container>
    </Flex>
  );
}
