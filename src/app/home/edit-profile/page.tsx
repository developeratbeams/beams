// Edit profile and view
import { getSelf } from "@/libs/auth-service";
import { Container, Flex, Image } from "@chakra-ui/react";
import React from "react";
import Form from "./components/Form";
import { User } from "@/types/user.types";
import { getCloudUrl } from "@/libs/other-services";

export default async function Page() {
  // gte user
  const self = await getSelf();
  const cloudUrl = await getCloudUrl();
  return (
    <Flex w="full">
      <Flex flex={4} p={"20px"}>
        <Container
          maxW={"md"}
          alignItems={"center"}
          display={"flex"}
          flexDirection={"column"}
          gap={"24px"}
        >
          {/* Form to handle edit */}
          <Form self={self as User} cloudUrl={cloudUrl} />
        </Container>
      </Flex>
      <Flex flex={4} display={["none", "none", "flex"]}>
        <Image src="/assets/profile-edit.png" alt="beams" />
      </Flex>
    </Flex>
  );
}
