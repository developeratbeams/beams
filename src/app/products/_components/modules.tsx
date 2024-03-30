// Lists all the modules in the products page
import { Module } from "@/types/user.types";
import { Flex, Image, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
interface ModulesProps {
  modules: Module[] | any;
}
export default function Modules({ modules }: ModulesProps) {
  if (!modules)
    return (
      <Flex>
        <Text>No Module Published Yet</Text>
      </Flex>
    );
  return (
    <Flex flexWrap={"wrap"} gap={"30px"}>
      {modules.map((module: Module) => (
        <Link key={module.id} href={"/home"}>
          <Flex direction={"column"} gap={"10px"}>
            <Image
              src={module?.moduleThumnailUrls?.[0]?.url ?? "/module.png"}
              alt="beams"
            />
            <Text
              textAlign={"center"}
              fontWeight={500}
              fontSize={["16px", "18px"]}
            >
              {module.title}
            </Text>
          </Flex>{" "}
        </Link>
      ))}
    </Flex>
  );
}
