import { COLOR } from "@/types/colors";
import { Flex, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";

const MotionFlex = motion(Flex);

interface Form {
  firstName: string;
  lastName: string;
  gender: string;
  grade: string;
  username: string;
  schoolName: string;
  favouriteSubject: string[];
  day: string;
  month: string;
  year: string;
}

interface Props {
  form: Form;
  handleChange: (name: string, value: string) => void;
}

interface GradeButtonProps {
  grade: string;
  selectedGrade: string;
  icon: string;
  handleChange: (name: string, value: string) => void;
}

// GradeButton component for reusable grade buttons
const GradeButton = ({
  grade,
  selectedGrade,
  icon,
  handleChange,
}: GradeButtonProps) => {
  const isSelected = selectedGrade === grade;
  const backgroundColor = isSelected ? COLOR.YELLOW : "white"; // Using a constant yellow color, replace with COLOR.YELLOW if available

  return (
    <Flex
      h={["80px", "120px"]}
      w={["70px", "100px"]}
      onClick={() => handleChange("grade", grade)}
      bg={backgroundColor}
      justifyContent={"center"}
      cursor={"pointer"}
      alignItems={"center"}
      direction={"column"}
      borderRadius={"20px"}
      fontWeight={600}
      fontSize={["12px", "18px"]}
    >
      <Text>{icon}</Text>
      <Text>{grade}</Text>
    </Flex>
  );
};

export default function Grade({ form, handleChange }: Props) {
  const variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  // Array of grade data
  const grades = [
    { grade: "Grade 4", icon: "📘" },
    { grade: "Grade 5", icon: "🧩" },
    { grade: "Grade 6", icon: "🌳" },
    { grade: "Grade 7", icon: "🧭" },
    { grade: "Grade 8", icon: "📔" },
  ];

  return (
    <MotionFlex
      w={"full"}
      gap={"30px"}
      direction={"column"}
      initial="hidden"
      animate="visible"
      variants={variants}
      transition={{ duration: 0.5 }}
    >
      <Text fontSize={["24px", "36px"]} fontWeight={700}>
        Which grade are you in?
      </Text>
      <Flex
        flexWrap={"wrap"}
        justifyContent={"space-evenly"}
        gap={"24px"}
        bg={"#EFEFEF"}
        w={"full"}
        rounded={"10px"}
        py={"20px"}
        px={"20px"}
      >
        {grades.map(({ grade, icon }) => (
          <GradeButton
            key={grade}
            grade={grade}
            selectedGrade={form.grade}
            icon={icon}
            handleChange={handleChange}
          />
        ))}
      </Flex>
    </MotionFlex>
  );
}
