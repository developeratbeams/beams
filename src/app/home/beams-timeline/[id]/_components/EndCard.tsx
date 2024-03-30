// end card shown at the end of the tineline
import AnimatedButton from "@/components/AnimatedButton";
import { COLOR } from "@/types/colors";
import { Button, Flex, Image, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React from "react";

export default function EndCard({ onRestart }: { onRestart: () => void }) {
  const router = useRouter();
  return (
    <Flex
      direction={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      w={["350px", "400px"]}
      rounded="10px"
      p={"10px"}
      ml={"50px"}
      id="next"
    >
      <Text fontWeight={500}>
        Great discoveries - you&lsquo;ve made history! 🌟
      </Text>
      <Image src="/timeline/end.png" alt="beams" />

      <AnimatedButton
        text={"Continue Your Adventure"}
        bg={COLOR.ORANGERED}
        href={"/home/beams-startup"}
      />
      <Button
        mt={"10px"}
        _hover={{}}
        onClick={onRestart}
        bg={"black"}
        color={"white"}
      >
        View Again
      </Button>
    </Flex>
  );
}
