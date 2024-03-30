// Welcome page for the logged in users.Shows all the modules and spot the differences.
import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import Modules from "./_components/modules";
import SpotTheDifferences from "./_components/sptd";
import { COLOR } from "@/types/colors";
import { getAllModules } from "@/libs/module-service";
import { getAllSpotTheDifference } from "@/libs/spot-the-difference-services";
import { SpotTheDifference } from "@prisma/client";
import { getAuther } from "@/libs/getAuther";

export default async function Page() {
  // get all the modules
  const modules = await getAllModules();
  // get all spot the differences
  const stds = await getAllSpotTheDifference();
  // get user details
  const self = await getAuther();
  const currentHour = new Date().getHours();
  let salutation = "Good Morning";
  if (currentHour >= 12 && currentHour < 18) {
    salutation = "Good Afternoon";
  } else if (currentHour >= 18) {
    salutation = "Good Evening";
  }
  return (
    <Flex
      direction={"column"}
      bg={"white"}
      m={"20px"}
      py={"20px"}
      px={["20px", "30px"]}
      rounded={"10px"}
      gap={"40px"}
    >
      <Flex direction={"column"} gap={"0px"}>
        <Text fontWeight={600} fontSize={["18px", "24px"]}>
          {salutation}, {self?.firstName}!
        </Text>
        <Text>
          Just in case no one told you today - you&lsquo;re looking marvelous!
        </Text>
      </Flex>
      <Flex direction={"column"} gap={"20px"}>
        <Text
          display={"flex"}
          w={"fit-content"}
          style={{
            borderBottom: `2px solid ${COLOR.ORANGE}`,
            paddingBottom: "2px",
          }}
          fontWeight={600}
          fontSize={["18px", "24px"]}
        >
          Modules
        </Text>
        {/*Modules*/}
        <Modules modules={modules as any} />
      </Flex>
      <Flex direction={"column"} gap={"20px"}>
        <Text
          display={"flex"}
          w={"fit-content"}
          style={{
            borderBottom: `2px solid ${COLOR.ORANGE}`,
            paddingBottom: "2px",
          }}
          fontWeight={600}
          fontSize={["18px", "24px"]}
        >
          Spot The Differences
        </Text>{" "}
        {/*Spot the differences*/}
        <SpotTheDifferences stds={stds as SpotTheDifference[]} />
      </Flex>
    </Flex>
  );
}
