import { COLOR } from "@/types/colors";
import { Flex, Image, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Quicksand } from "next/font/google";
import React from "react";
const quickSand = Quicksand({ subsets: ["latin"] });
const MotionFlex = motion(Flex);

interface Form {
  firstName: string;
  lastName: string;
  gender: string;
  username: string;
  grade: string;
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

interface GenderOptionProps {
  genderName: string;
  isSelected: boolean;
  imageUrl: string;
  title: string;
  handleChange: (name: string, value: string) => void;
}

// GenderOption component for reusable gender options
const GenderOption = ({
  genderName,
  isSelected,
  imageUrl,
  title,
  handleChange,
}: GenderOptionProps) => {
  const borderColor = isSelected ? `2px solid ${COLOR.YELLOW}` : ""; // Replace #FFFF00 with COLOR.YELLOW if available

  return (
    <Flex
      rounded={"full"}
      alignItems={"center"}
      direction={"column"}
      onClick={() => handleChange("gender", genderName)}
      cursor={"pointer"}
    >
      <Image
        border={borderColor}
        borderRadius={"100%"}
        h={["50px", "100px"]}
        w={["50px", "100px"]}
        src={imageUrl}
        alt={genderName}
      />
      <Text fontWeight={600} fontSize={["16px", "20px"]}>
        {title}
      </Text>
    </Flex>
  );
};

const genderOptions = [
  { title: "Male", name: "MALE", image: "/assets/male.png" },
  { title: "Female", name: "FEMALE", image: "/assets/female.png" },
  {
    title: "Transgender",
    name: "TRANSGENDER",
    image: "/assets/transgender.png",
  },
  { title: "Bisexual", name: "BISEXUAL", image: "/assets/bisexual.png" },
  {
    title: "Prefer not to say",
    name: "PREFER_NOT_TO_SAY",
    image: "/assets/prefernotosay.png",
  },
];

export default function Gender({ handleChange, form }: Props) {
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <MotionFlex
      className={quickSand.className}
      w={"full"}
      gap={"30px"}
      direction={"column"}
      initial="hidden"
      animate="visible"
      variants={variants}
      transition={{ duration: 1 }}
    >
      <Text fontSize={["28px", "36px"]} fontWeight={700}>
        Select Your Gender
      </Text>
      <Flex flexWrap={"wrap"} gap={"20px"} justifyContent={"center"}>
        {genderOptions.map((option) => (
          <GenderOption
            title={option.title}
            key={option.name}
            genderName={option.name}
            isSelected={form.gender === option.name}
            imageUrl={option.image}
            handleChange={handleChange}
          />
        ))}
      </Flex>
    </MotionFlex>
  );
}
