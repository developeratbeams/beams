// shows all the modules, home screen for a modules
import MyActivity from "@/components/activity/MyActivity";
import { getAuther } from "@/libs/getAuther";
import { getModuleAttempt } from "@/libs/module-service";
import { COLOR } from "@/types/colors";
import { Box, Container, Flex, Text, VStack } from "@chakra-ui/react";
import { Quicksand } from "next/font/google";
import { redirect } from "next/navigation";
const quicksand = Quicksand({ subsets: ["latin"] });
export default async function Home() {
  const self = await getAuther();
  if (!self) redirect("/");
  // get the module attempt for showing activity
  const moduleActivity = await getModuleAttempt(
    "23390cb6-5f5e-41d1-b637-ad9e42d179c5"
  );

  return (
    <Flex direction={"column"} gap={"10px"}>
      <Text textAlign={"center"} fontWeight={700} fontSize={["26px", "30px"]}>
        INTRODUCTION
      </Text>
      <Container
        display={"flex"}
        maxW={"6xl"}
        gap={"50px"}
        flexDirection={"column"}
        className={quicksand.className}
        mb={"50px"}
      >
        <Text
          mx={"auto"}
          textAlign={"center"}
          fontSize={["26px", "36px"]}
          fontWeight={700}
          color={COLOR.ORANGE}
          mb={"-20px"}
        >
          The Magical Materials of the Future
        </Text>
        <Box mx={"auto"}>
          {/* Intro vedio */}
          <video
            style={{
              display: "flex",
              width: "42rem",
              borderRadius: "10px",
            }}
            width="300"
            height="240"
            controls
          >
            <source
              src="https://res.cloudinary.com/drlyyxqh9/video/upload/v1705593583/introductionvideos/yubgmghaq1sxcofrt6ql.mp4"
              type="video/mp4"
            />
          </video>
        </Box>
        <VStack
          mt="10px"
          justifyContent={"flex-start"}
          alignItems={"flex-start"}
        >
          <Text fontSize={["16px", "24px"]} fontWeight={600}>
            Overview
          </Text>
          <Text fontWeight={400} fontSize={["15px", "20px"]}>
            Embark on a journey to &apos;The Magical Materials of the
            Future&apos;! Discover revolutionary materials transforming our
            world, from ultra-light aerogels to self-healing fabrics. Dive into
            their science, marvel at their capabilities, and explore their
            everyday applications.
          </Text>
        </VStack>
        <VStack justifyContent={"flex-start"} alignItems={"flex-start"}>
          <Text fontSize={["16px", "24px"]} fontWeight={600}>
            Why now?
          </Text>
          <Text fontWeight={400} fontSize={["15px", "20px"]}>
            Why explore these materials now? The answer lies in their potential
            to solve critical global challenges. Learn how these advanced
            materials offer solutions for environmental sustainability, enhance
            tech innovation, and redefine the boundaries of science and
            engineering.
          </Text>
        </VStack>
        <VStack justifyContent={"flex-start"} alignItems={"flex-start"}>
          <Text fontSize={["16px", "24px"]} fontWeight={600}>
            Skills Acquired
          </Text>
          <Flex flexWrap={"wrap"} flexShrink={"initial"} gap={"10px"}>
            <Text
              fontWeight={400}
              p={"6px 39px"}
              borderRadius={"100px"}
              bg={"#DEC8FE"}
            >
              Critical thinking
            </Text>{" "}
            <Text
              fontWeight={400}
              p={"6px 39px"}
              borderRadius={"100px"}
              bg={"#FDD3C0"}
            >
              Creative Vision
            </Text>{" "}
            <Text
              fontWeight={400}
              p={"6px 39px"}
              borderRadius={"100px"}
              bg={"#FFF3A8"}
            >
              Problem-Solving
            </Text>{" "}
          </Flex>
        </VStack>
      </Container>
      {/* Activyt tracker */}
      <MyActivity moduleActivity={moduleActivity} />
    </Flex>
  );
}
