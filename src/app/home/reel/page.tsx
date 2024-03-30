//reels pages
import { saveModuleActivity } from "@/actions/module";
import AnimatedButton from "@/components/AnimatedButton";
import { getAuther } from "@/libs/getAuther";
import { COLOR } from "@/types/colors";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { Quicksand } from "next/font/google";
import React from "react";
const quicksand = Quicksand({ subsets: ["latin"] });
export default async function Page() {
  const self = await getAuther();
  //save the atttempt in the database
  await saveModuleActivity("23390cb6-5f5e-41d1-b637-ad9e42d179c5", "REEL");
  return (
    <Flex
      h={"100vh"}
      bgSize={"contain"}
      w={"full"}
      direction={"column"}
      gap={["20px", "10px"]}
      className={quicksand.className}
      bgImage={"assets/reel.png"}
      bgPosition={["", "center"]}
      backgroundSize={"cover"}
      overflow={"hidden"}
    >
      <Flex
        mt={["8vh", "0"]}
        h={"full"}
        w={"full"}
        alignItems={"center"}
        direction={"column"}
        gap={"10px"}
        textAlign={"center"}
        px={"20px"}
      >
        <Text fontSize={["26px", "36px"]} lineHeight={1.3} fontWeight={700}>
          Ignite Your Imagination With{" "}
          <Box as="span" color={COLOR.ORANGE}>
            Beams Reels{" "}
          </Box>
        </Text>
        <Text fontSize={["18px", "20px"]} fontWeight={500}>
          Hi {self?.firstName}, meet 6 magical materials that are changing the
          world.
        </Text>
        <Box mt={"20px"}>
          <video
            style={{
              display: "flex",
              width: "42rem",
              border: `1px solid ${COLOR.ORANGE} `,
              borderRadius: "10px",
            }}
            width="300"
            height="240"
            controls
          >
            <source
              src="https://res.cloudinary.com/drlyyxqh9/video/upload/v1710333197/reels/xggw2n69o4hh2qrwqpgg.mp4"
              type="video/mp4"
            />
          </video>
        </Box>
        {/* Animated button common for all the products */}
        <AnimatedButton
          text="Continue Your Adventure"
          href={"/home/flipbook"}
          bg={COLOR.ORANGE}
        />
      </Flex>
    </Flex>
  );
}
