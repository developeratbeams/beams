import { COLOR } from "@/types/colors";
import { Box, Container, Flex,Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Quicksand } from "next/font/google";
import React, { useState } from "react";
const quickSand = Quicksand({ subsets: ["latin"] });
const MotionFlex = motion(Flex);

interface Form {
  firstName: string;
  lastName: string;
  username: string;
  gender: string;
  grade: string;
  schoolName: string;
  favouriteSubject: string[];
  day: string;
  month: string;
  year: string;
}

interface Props {
  form: Form;
  handleChange: (name: string, value: string | string[]) => void;
}

export default function FavSubject({ form, handleChange }: Props) {
  const variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(
    form.favouriteSubject
  );
  const [list, setList] = useState<boolean>(true);

  const allSubjects = [
    "Art",
    "Maths",
    "Science",
    "Music",
    "Physical Education",
    "Computer Science",
    "Geography",
    "Literature",
    "Technology",
    "Dance",
    "Economics",
    "Other",
  ];

  const toggleSubject = (subject: string) => {
    if (typeof subject === "string") {
      const updatedSubjects = selectedSubjects.includes(subject)
        ? selectedSubjects.filter((s) => s !== subject)
        : [...selectedSubjects, subject];

      handleChange("favouriteSubject", updatedSubjects);
      setSelectedSubjects(updatedSubjects);
    }
  };

  return (
    <MotionFlex
      w={"full"}
      gap={"10px"}
      direction={"column"}
      className={quickSand.className}
      initial="hidden"
      animate="visible"
      variants={variants}
      transition={{ duration: 0.5 }}
    >
      <Text fontSize={["24px", "36px"]} lineHeight={1.2} fontWeight={700}>
        What are your favorite subjects? <br />
        <Box as={"span"} fontSize={["14px", "24px"]} fontWeight={500}>
          {" "}
          (Pick at least 3)
        </Box>
      </Text>

      {list ? (
        <Container
          display={"flex"}
          maxW={"md"}
          flexWrap={"wrap"}
          gap={"24px"}
          bg={"#EFEFEF"}
          rounded={"10px"}
          py={"5px"}
          alignItems={"flex-start"}
          justifyContent={"center"}
        >
          {allSubjects.slice(0, 6).map((subject) => (
            <SubjectCard
              key={subject}
              subject={subject}
              selected={selectedSubjects.includes(subject)}
              onClick={() => toggleSubject(subject)}
            />
          ))}
        </Container>
      ) : (
        <Container
          display={"flex"}
          maxW={"md"}
          flexWrap={"wrap"}
          gap={"24px"}
          bg={"#EFEFEF"}
          rounded={"10px"}
          py={"5px"}
          alignItems={"flex-start"}
          justifyContent={"center"}
        >
          {allSubjects.slice(6).map((subject) => (
            <SubjectCard
              key={subject}
              subject={subject}
              selected={selectedSubjects.includes(subject)}
              onClick={() => toggleSubject(subject)}
            />
          ))}
        </Container>
      )}
      <Flex direction="column" alignItems="center" mb="4">
        <Flex gap="4">
          <Text
            fontSize="30px"
            color={list ? "black" : "gray.400"}
            cursor="pointer"
            onClick={() => setList(true)}
          >
            •
          </Text>
          <Text
            fontSize="30px"
            color={!list ? "black" : "gray.400"}
            cursor="pointer"
            onClick={() => setList(false)}
          >
            •
          </Text>
        </Flex>
      </Flex>
    </MotionFlex>
  );
}

interface SubjectCardProps {
  subject: string;
  selected: boolean;
  onClick: () => void;
}

const SubjectCard: React.FC<SubjectCardProps> = ({
  subject,
  selected,
  onClick,
}) => (
  <Flex
    h={["80px", "100px"]}
    w={["70px", "100px"]}
    cursor={"pointer"}
    bg={selected ? COLOR.YELLOW : "white"}
    justifyContent={"center"}
    alignItems={"center"}
    direction={"column"}
    borderRadius={"20px"}
    gap={"5px"}
    fontWeight={600}
    fontSize={["10px", "16px"]}
    onClick={onClick}
    textAlign={"center"}
  >
    <Text alignItems={"flex-end"} display={"flex"} flex={3}>
      {getSubjectIcon(subject)}
    </Text>
    <Text display={"flex"} flex={5}>
      {subject}
    </Text>
  </Flex>
);

// Function to get subject icon based on the subject name
function getSubjectIcon(subject: string): string {
  switch (subject) {
    case "Art":
      return "🎨";
    case "Maths":
      return "🧮";
    case "Science":
      return "🔬";
    case "Music":
      return "🎵";
    case "Other":
      return "💡";
    case "Physical Education":
      return "🏃";
    case "Computer Science":
      return "💻";
    case "Geography":
      return "🗺️";
    case "Literature":
      return "📚";
    case "Technology":
      return "📚";
    case "Economics":
      return "💰";
    case "Dance":
      return "💃";
    default:
      return "";
  }
}
