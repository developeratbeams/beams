"use client";
// card used to show an event
import React from "react";
import { Image, Text, Flex, useDisclosure } from "@chakra-ui/react";

import { COLOR } from "@/types/colors";
import { FaArrowRight } from "react-icons/fa6";
import PreviewModal from "./Modal";

interface CardProps {
  title: string;
  subtitle: string;
  imageUrl: string;
  date: number;
  whyItMatters: string;
  whyItMattersImg: string;
}

const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  imageUrl,
  date,
  whyItMatters,
  whyItMattersImg,
}) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <Flex
      id={String(date)}
      direction={"column"}
      gap={"20px"}
      border={"0.739px solid #969696"}
      borderRadius={" 14.778px;"}
      p={"10px"}
      mx={"20px"}
    >
      {" "}
      <Flex
        w={"full"}
        h={"full"}
        justifyContent={"center"}
        alignItems={"center"}
        direction={"row"}
        gap={"10px"}
        px={"20px"}
      >
        <Flex direction={"column"} gap={"10px"}>
          <Flex direction={"column"} gap={"10px"} px={"10px"}>
            <Text
              textAlign={"center"}
              fontWeight={600}
              fontSize={"20px"}
              color={"black"}
            >
              {date}
            </Text>
            <Text
              textAlign={"center"}
              rounded={"full"}
              px={"10px"}
              py={"5px"}
              bg={COLOR.ORANGERED}
              color={"white"}
              fontWeight={700}
            >
              {title}
            </Text>

            <Text fontSize={"16px"} fontWeight={600}>
              {subtitle}
            </Text>
          </Flex>

          <Flex>
            <Image w={"300px"} src={imageUrl} alt="Aerogel invention" />
          </Flex>

          <Flex w={"full"} justifyContent={"flex-end"}>
            <Flex
              gap={"5px"}
              bg={COLOR.ORANGERED}
              color={"white"}
              justifyContent={"center"}
              alignItems={"center"}
              rounded={"full"}
              fontSize={"16.256px"}
              px={"10px"}
              py={"5px"}
              cursor={"pointer"}
              onClick={onOpen}
            >
              <Text fontWeight={600}>Why it matters</Text>
              <FaArrowRight />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <PreviewModal
        isOpen={isOpen}
        onClose={onClose}
        content={whyItMatters}
        imageUrl={whyItMattersImg}
      />
    </Flex>
  );
};

export default Card;
