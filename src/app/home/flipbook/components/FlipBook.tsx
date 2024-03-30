"use client";
// embedded flipbook
import { Flex } from "@chakra-ui/react";
import React from "react";
import "./page.css";
export default function FlipBook() {
  return (
    <Flex w={"full"} justifyContent={"center"}>
      <iframe
        style={{}}
        loading="lazy"
        className="canva-embed"
        src={`https://online.fliphtml5.com/zptoc/moyv/`}
        allowFullScreen
      ></iframe>
    </Flex>
  );
}
