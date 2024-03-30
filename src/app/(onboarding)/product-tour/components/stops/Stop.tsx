import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { COLOR } from "@/types/colors";
import { motion } from "framer-motion";

interface StopProps {
  stopNumber: string;
  title: string;
  description: string;
  highlightText: string;
  additionalText: string;
}

const MotionFlex = motion(Flex);

const Stop = ({
  stopNumber,
  title,
  description,
  highlightText,
  additionalText,
}: StopProps) => {
  return (
    <MotionFlex
      direction={"column"}
      gap={"10px"}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Text fontSize={["24px", "36px"]} fontWeight={700}>
        {stopNumber}
      </Text>
      <Text fontSize={["24px", "36px"]} color={COLOR.ORANGE} fontWeight={700}>
        {title}
      </Text>
      <Text
        fontWeight={500}
        lineHeight={["28px", "34px"]}
        fontSize={["16px", "18px"]}
      >
        {description.split(highlightText)[0]}
        <Box as={"span"} color={COLOR.ORANGE}>
          {highlightText}
        </Box>
        {description.split(highlightText)[1]}
      </Text>
      <Text fontWeight={700} fontSize={["15px", "18px"]}>
        {additionalText}
      </Text>
    </MotionFlex>
  );
};

export default Stop;
