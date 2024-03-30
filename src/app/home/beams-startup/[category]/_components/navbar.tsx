"use client";
// stripped navigations
import { COLOR } from "@/types/colors";
import { Box, Container, useMediaQuery } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Props {
  section: string;
}
const Nav = ({ section }: Props) => {
  const [isLargerThan450] = useMediaQuery("(min-width: 450px)");
  let sections: String[] = [];
  if (isLargerThan450) {
    sections = ["#intro", "#funfact", "#product", "#result"];
  } else {
    sections = ["#intro", "#funfact", "#startup", "#product", "#result"];
  }

  const [isActive, setIsActive] = useState<string>("#intro");
  const router = useRouter();
  const handleUrl = (index: number) => {
    setIsActive(sections[index] as string);
    router.push(`/home/beams-startup/sf${sections[index]}`);
  };
  useEffect(() => {
    setIsActive(section);
  }, [section]);
  return (
    <Container
      display="flex"
      flexDirection={"column"}
      alignItems="flex-end"
      justifyContent="center"
      h={"100vh"}
      gap={"30px"}
      w={"100%"}
    >
      {sections.map((_, index) => {
        return (
          <Box
            key={index}
            cursor={"pointer"}
            onClick={() => handleUrl(index as number)}
            width={"6px"}
            height={["75px", "100px"]}
            bg={isActive === sections[index] ? COLOR.PINK : "#D9D9D9"}
            borderRadius="md"
          />
        );
      })}
    </Container>
  );
};

export default Nav;
