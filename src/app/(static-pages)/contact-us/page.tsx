import React from "react";
import "./page.css";
import { Flex, Image, Text } from "@chakra-ui/react";
import { BiMailSend } from "react-icons/bi";
import { FaLocationDot } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { COLOR } from "@/types/colors";
import Form from "./Form";

function Contactus() {
  return (
    <>
      <Flex
        w={"full"}
        h={["auto", "100vh"]}
        justifyContent={["flex-start", "center"]}
        gap={"50px"}
        p={"20px"}
        mb={["50px", "0"]}
        direction={["column", "row"]}
      >
        <Flex w={"full"} justifyContent={"center"} alignItems={"center"}>
          <Image
            src="https://www.beams.world/Assets/images/contact-img.webp"
            alt="beams"
          />
        </Flex>
        <Flex
          direction={"column"}
          w={"full"}
          justifyContent={"center"}
          alignItems={"flex-start"}
          gap={"20px"}
        >
          <Text fontWeight={700} fontSize={["26px", "38px"]}>
            CONTACT US
          </Text>
          <Text fontWeight={500} fontSize={["18px", "24px"]}>
            You&apos;ve got questions? We&apos;ve got the answers.
          </Text>
          <Flex gap={"20px"} justifyContent={"center"} alignItems={"center"}>
            <IoMdMail color={COLOR.ORANGE} />{" "}
            <Text fontWeight={500} fontSize={["18px", "24px"]}>
              {" "}
              info@beams.world
            </Text>
          </Flex>
          <Flex gap={"20px"} justifyContent={"center"} alignItems={"center"}>
            <FaLocationDot color={COLOR.ORANGE} />{" "}
            <Text fontWeight={500} fontSize={["18px", "24px"]}>
              San Francisco, USA
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <Form />
    </>
  );
}

export default Contactus;
