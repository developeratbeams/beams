"use client";
// view for the single startup base on the id, the data used is not saved in the database and is not  having any schema.
import { Box, Container, Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import Content from "./_components/content";
import Nav from "./_components/navbar";
import SideDrawer from "./_components/SideDrawer";
import { usePathname } from "next/navigation";

export default function Page({ params }: { params: { category: string } }) {
  // section scrolling controll
  const [section, setSection] = useState<string>("intro");
  const location = usePathname();
  const handleSectionChange = (section: string) => {
    setSection(section);
  };
  return (
    <>
      <Flex
        position={"absolute"}
        zIndex={10}
        top={0}
        bgImage={"/startup/bg.png"}
        bgPosition={"top"}
        objectFit={"cover"}
        h={"100vh"}
        overflow={"hidden"}
        w={"full"}
        overflowY={"scroll"}
        direction={"row"}
      >
        <Flex
          flex={7}
          direction={"column"}
          gap={"30px"}
          justifyContent={"flex-start"}
          alignItems={"flex-start"}
        >
          <Box>
            {/* Drawer showing tree */}
            <SideDrawer />
          </Box>

          <Container maxW={"4xl"}>
            {/* Section showing all the content */}
            <Content
              product={location.split("/")[3] as string}
              handleSectionChange={handleSectionChange}
            />
          </Container>
        </Flex>
        <Flex
          flex={1}
          w={"full"}
          h={"100vh"}
          position={"sticky"}
          zIndex={100}
          top={"0"}
          justifyContent={"flex-end"}
          alignItems={"flex-end"}
        >
          <Nav section={section} />
        </Flex>
      </Flex>{" "}
    </>
  );
}
