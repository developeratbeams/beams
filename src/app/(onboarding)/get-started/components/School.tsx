import { Flex, Input, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Quicksand } from "next/font/google";
import React from "react";
const MotionFlex = motion(Flex);
const quickSand = Quicksand({ subsets: ["latin"] });
interface Form {
  firstName: String;
  lastName: String;
  gender: String;
  grade: String;
  schoolName: String;
  favouriteSubject: String[];
  day: string;
  month: string;
  year: string;
  username: string;
}
interface FormProps {
  form: Form;
  handleChange: (name: string, value: string) => void;
}
export default function SchoolName({ handleChange, form }: FormProps) {
  const variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };
  
  return (
    <MotionFlex
      w={"full"}
      gap={"20px"}
      direction={"column"}
      className={quickSand.className}
      initial="hidden"
      animate="visible"
      variants={variants}
      transition={{ duration: 0.5 }}
    >
      <Text fontSize={["24px", "36px"]} fontWeight={700}>
        What is the name of your school?
      </Text>
      <Input
        value={form.schoolName as string}
        onChange={(e: any) => handleChange("schoolName", e.target.value)}
        _focusVisible={{
          borderBottom: "2px solid gray",
        }}
        variant={"flushed"}
        color={"gray"}
        fontWeight={600}
        placeholder="School name"
      />
    </MotionFlex>
  );
}
