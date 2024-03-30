import { Flex, IconButton, Select, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Quicksand } from "next/font/google";
import React from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
const MotionFlex = motion(Flex);
const quickSand = Quicksand({ subsets: ["latin"] });

interface Form {
  firstName: string;
  lastName: string;
  gender: string;
  username: string;
  grade: string;
  schoolName: string;
  favouriteSubject: string[];
  dateOfBirth?: Date;
}

interface Props {
  form: Form;
  handleChange: (name: string, value: Date) => void;
}

const variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export default function Dob({ form, handleChange }: Props) {
  const years = [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <MotionFlex
      className={quickSand.className}
      w={"full"}
      gap={"30px"}
      direction={"column"}
      initial="hidden"
      animate="visible"
      justifyContent={"center"}
      variants={variants}
      transition={{ duration: 0.5 }}
      key={"y"}
    >
      <Text fontSize={["24px", "36px"]} fontWeight={700}>
        Enter Your Date Of Birth
      </Text>
      <ReactDatePicker
        renderCustomHeader={({
          date,
          changeYear,
          changeMonth,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <Flex
            py={"4px"}
            bg={"white"}
            w={"full"}
            justifyContent={"center"}
            gap={"10px"}
          >
            <IconButton
              aria-label="button"
              bg={"white"}
              _hover={{}}
              onClick={decreaseMonth}
              disabled={prevMonthButtonDisabled}
              icon={<MdArrowBackIos />}
            />

            <Select
              value={date.getFullYear()}
              onChange={({ target: { value } }) => changeYear(Number(value))}
            >
              {years.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>

            <Select
              value={months[date.getMonth()]}
              onChange={({ target: { value } }) =>
                changeMonth(months.indexOf(value))
              }
            >
              {months.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>

            <IconButton
              aria-label="button"
              bg={"white"}
              _hover={{}}
              onClick={increaseMonth}
              disabled={nextMonthButtonDisabled}
              icon={<MdArrowForwardIos />}
            />
          </Flex>
        )}
        selected={form.dateOfBirth}
        onChange={(date) => handleChange("dateOfBirth", date as Date)}
      />
    </MotionFlex>
  );
}
