import { COLOR } from "@/types/colors";
import { ModuleAttempt } from "@/types/user.types";
import { Flex, IconButton, Spacer, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { FaCheck } from "react-icons/fa6";
import { MdArrowForwardIos } from "react-icons/md";

interface ActivityModuleProps {
  productName: string;
  index: number;
  moduleActivity: ModuleAttempt | undefined;
  moduleId: string;
}

const urls: string[] = [
  "/home",
  "/home/reel",
  "/home/flipbook",
  "/quiz",
  "/home/jigsaw",
  "/stories",
  "/home/beams-timeline",
  "/home/beams-startup",
  "/home/beams-leader",
];

export default function ActivityModule({
  productName,
  index,
  moduleActivity,
}: ActivityModuleProps) {
  const isCompleted = index <= Number(moduleActivity?.noOfProductsDone);
  const isNext = index === Number(moduleActivity?.noOfProductsDone) + 1;

  const getIcon = () => {
    if (isCompleted) {
      return (
        <Flex
          w={"30px"}
          h={"30px"}
          rounded={"full"}
          justifyContent={"center"}
          alignItems={"center"}
          bg={COLOR.ORANGE}
          color={"white"}
        >
          <FaCheck />
        </Flex>
      );
    } else {
      const borderColor = isNext ? COLOR.ORANGE : "none";
      return (
        <Flex
          w={"30px"}
          h={"30px"}
          rounded={"full"}
          justifyContent={"center"}
          alignItems={"center"}
          bg={"white"}
          color={isNext ? COLOR.ORANGE : "gray"}
          border={`1px solid ${borderColor}`}
        >
          {index}
        </Flex>
      );
    }
  };

  const renderNextButton = () => (
    <IconButton
      _hover={{}}
      bg={isNext ? "white" : COLOR.ORANGE}
      color={isNext ? COLOR.ORANGE : "white"}
      size={"sm"}
      rounded={"full"}
      aria-label="next"
      icon={<MdArrowForwardIos />}
    />
  );

  const renderDefaultButton = () => (
    <IconButton
      _hover={{}}
      bg={isCompleted ? COLOR.ORANGE : "white"}
      color={isCompleted ? "white" : "gray"}
      size={"sm"}
      rounded={"full"}
      aria-label="next"
      icon={<MdArrowForwardIos />}
    />
  );

  return (
    <Link
      href={
        isCompleted || isNext ? urls[Number(index) - 1] : "#module-activity"
      }
      passHref
    >
      <Flex w={"full"} alignItems={"center"} id="module-activity">
        <Flex
          direction={"row"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={"20px"}
        >
          {getIcon()}
          <Text
            fontSize={["16px", "20px"]}
            fontWeight={isCompleted || isNext ? 600 : 400}
          >
            {productName}
          </Text>
        </Flex>
        <Spacer />
        {isNext ? renderNextButton() : renderDefaultButton()}
      </Flex>{" "}
    </Link>
  );
}
