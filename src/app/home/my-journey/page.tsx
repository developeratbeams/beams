// my journey page, show activity in a module

import MyActivity from "@/components/activity/MyActivity";
import { getModuleAttempt } from "@/libs/module-service";
import { COLOR } from "@/types/colors";
import { Flex, Text } from "@chakra-ui/react";
import React from "react";

export default async function Page() {
  // get the module attempt for a particular module
  const moduleActivity = await getModuleAttempt(
    "23390cb6-5f5e-41d1-b637-ad9e42d179c5"
  );
  return (
    <Flex w={"full"} direction={"column"} bg={COLOR.YELLOW}>
      {/* UI for the activity reusable component */}
      <MyActivity moduleActivity={moduleActivity} />
    </Flex>
  );
}
