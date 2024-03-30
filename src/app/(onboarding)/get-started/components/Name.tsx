import useWelcomeModal from "@/hooks/useWelcomeModal";
import { Flex, Input, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Quicksand } from "next/font/google";
import React, { useEffect } from "react";
const quickSand = Quicksand({ subsets: ["latin"] });

const MotionFlex = motion(Flex);
interface Form {
  firstName: String;
  lastName: String;
  gender: String;
  grade: String;
  username: string;
  schoolName: String;
  favouriteSubject: String[];
  day: string;
  month: string;
  year: string;
}
interface FormProps {
  form: Form;
  handleChange: (name: string, value: string) => void;
}
export default function Name({ handleChange, form }: FormProps) {
  const variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };
  const welcomeModal = useWelcomeModal();
  useEffect(() => {
    const getData = async () => {
      welcomeModal.onOpen();
    };
    getData();
  }, []);
  return (
    <MotionFlex
      w={"full"}
      gap={"30px"}
      direction={"column"}
      className={quickSand.className}
      initial="hidden"
      animate="visible"
      variants={variants}
      transition={{ duration: 0.5 }}
    >
      <Text fontSize={["24px", "36px"]} fontWeight={700}>
        Enter your Name
      </Text>
      <Input
        _focusVisible={{
          borderBottom: "2px solid gray",
        }}
        value={form.firstName as string}
        name="firstName"
        w={"80%"}
        onChange={(e) => handleChange("firstName", e.target.value)}
        variant={"flushed"}
        color={"gray"}
        fontWeight={600}
        placeholder="First name"
      />
      <Input
        value={form.lastName as string}
        name="lastName"
        onChange={(e) => handleChange("lastName", e.target.value)}
        _focusVisible={{
          borderBottom: "2px solid gray",
        }}
        w={"80%"}
        variant={"flushed"}
        color={"gray"}
        fontWeight={600}
        placeholder="Last name"
      />
    </MotionFlex>
  );
}
