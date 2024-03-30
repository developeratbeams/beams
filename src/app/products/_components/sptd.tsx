// Lists all the spot the differences
import { Flex, Image, Text } from "@chakra-ui/react";
import { SpotTheDifference } from "@prisma/client";
import Link from "next/link";
import React from "react";
interface StdProps {
  stds: SpotTheDifference[];
}
export default function SpotTheDifferences({ stds }: StdProps) {
  return (
    <Flex flexWrap={"wrap"} gap={"30px"}>
      {stds.map((std: SpotTheDifference) => (
        <Link key={std.id} href={`spot-the-difference/${std.id}`}>
          <Flex key={std.id} direction={"column"} gap={"10px"}>
            <Image src={"/std/std.png"} alt="beams" />
            <Text
              textAlign={"center"}
              fontWeight={500}
              fontSize={["16px", "18px"]}
            >
              The AI Artist
            </Text>
          </Flex>
        </Link>
      ))}
    </Flex>
  );
}
