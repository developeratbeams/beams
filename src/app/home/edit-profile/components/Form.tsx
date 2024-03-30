"use client";
//  form to handle view and edit
import { COLOR } from "@/types/colors";
import { User } from "@/types/user.types";
import {
  Box,
  Button,
  Flex,
  IconButton,
  Input,
  Select,
  Text,
  useToast,
} from "@chakra-ui/react";
import "./style.css";
import React, { useRef, useState, useTransition } from "react";
import { format, parseISO } from "date-fns";
import { changeProfileImage, changeUserDetails } from "@/actions/user";
import { GENDER } from "@/types/constants";
import { HiPencil } from "react-icons/hi2";
import { useRouter } from "next/navigation";
import ReactDatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
interface FormProps {
  self: User;
  cloudUrl: string;
}

interface UserDetails {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: "MALE" | "FEMALE" | "BISEXUAL" | "TRANSGENDER" | "PREFER_NOT_TO_SAY";
  grade: string;
  schoolName: string;
}

export default function Form({ self, cloudUrl }: FormProps) {
  const toast = useToast({ position: "top" });

  const router = useRouter();
  // form
  const [formData, setFormData] = useState({
    firstName: self?.firstName,
    lastName: self?.lastName,
    gender: self?.gender,
    grade: self?.grade,
    dateOfBirth: self?.dateOfBirth,
    schoolName: self?.School?.nameOfSchool,
  });
  // dob year to be shown
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
  // hook for edit details
  const [isSavingDetails, startSavingDetails] = useTransition();
  // hooks for profile image change
  const [isChangingImage, startChangingImage] = useTransition();

  const fileInputRef = useRef<any>(null);
  const handleFileInputClick = () => {
    if (fileInputRef) {
      fileInputRef?.current.click();
    }
  };
  const handleDateChange = (date: Date) => {
    setFormData({ ...formData, dateOfBirth: date });
  };

  // profile picture change func
  const handleFileChange = async (event: any) => {
    // get the file
    const file = event.target.files[0];
    if (file) {
      // Initialize FormData
      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "upload_preset",
        `${process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD}`
      );

      try {
        // upload to the cloudinary
        const res = await fetch(cloudUrl, {
          method: "POST",
          body: formData,
        });
        const data = await res.json();

        if (data.secure_url) {
          // if success , save the url to the databse
          startChangingImage(() => {
            changeProfileImage(data.secure_url)
              .then((res) =>
                toast({ title: res, status: "success", isClosable: true })
              )
              .catch(() =>
                toast({
                  title: "Please Try Again",
                  status: "error",
                  isClosable: true,
                })
              );
          });
        } else {
          console.error("Cloudinary upload failed:", data);
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };
  // validation msgs
  const validationMessages = {
    firstName: "Please enter your first name.",
    lastName: "Please enter your last name.",
    gender: "Please select your gender.",
    grade: "Please select your grade.",
    dateOfBirth: "Please select a valid date of birth between 2009 and 2017.",
    schoolName: "Please enter your school name.",
  };
  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string;
  }>({});
  const validateForm = () => {
    const errors: { [key: string]: string } = {};

    // Validate first name
    if (!formData.firstName) {
      errors.firstName = validationMessages.firstName;
    }

    // Validate last name
    if (!formData.lastName) {
      errors.lastName = validationMessages.lastName;
    }

    // Validate gender
    if (!formData.gender) {
      errors.gender = validationMessages.gender;
    }

    // Validate grade
    if (!formData.grade) {
      errors.grade = validationMessages.grade;
    }

    // Validate school name
    if (!formData.schoolName) {
      errors.schoolName = validationMessages.schoolName;
    }

    setValidationErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    let { name, value } = e.target;
    if (name === "dateOfBirth" && value) {
      value = format(parseISO(value + "T00:00:00"), "yyyy-MM-dd'T'HH:mm:ss");
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateForm();
  };
  // edit detals func handler
  const handleSubmit = () => {
    const isValid = validateForm();
    console.log(isValid);
    if (!isValid) {
      return;
    }
    // payload
    const body: UserDetails = {
      firstName: formData.firstName as string,
      lastName: formData.lastName as string,
      dateOfBirth: formData.dateOfBirth as unknown as Date,
      gender: formData.gender as GENDER,
      grade: formData.grade as string,
      schoolName: formData.schoolName as string,
    };
    // save
    startSavingDetails(() => {
      changeUserDetails(body)
        .then((data) =>
          toast({ title: data, status: "success", isClosable: true })
        )
        .catch(() =>
          toast({
            title: "Please Try Again",
            status: "error",
            isClosable: true,
          })
        );
    });
  };

  return (
    <>
      {" "}
      <Flex
        w={"full"}
        alignItems={"center"}
        display={"flex"}
        flexDirection={"column"}
        gap={"24px"}
      >
        <Flex direction={"column"}>
          <Flex
            w={"200px"}
            h={"200px"}
            rounded={"full"}
            bgImage={self?.profilePictureUrls?.[0]?.url}
            bgSize={"cover"}
            bgRepeat={"no-repeat"}
            bgPosition={"top"}
            justifyContent={"flex-end"}
            alignItems={"flex-end"}
            position={"relative"}
            border={`1px solid ${COLOR.YELLOW}`}
          >
            <IconButton
              _hover={{}}
              position={"absolute"}
              bottom={"-5px"}
              right={"14px"}
              isLoading={isChangingImage}
              aria-label="Add photo"
              bg={"gray.300"}
              rounded={"full"}
              ml={"-30px"}
              color={"black"}
              icon={<HiPencil />}
              onClick={handleFileInputClick}
            />
          </Flex>
          <Input
            ref={fileInputRef}
            type="file"
            hidden
            onChange={handleFileChange}
          />{" "}
        </Flex>

        <Flex gap={"10px"} direction={"column"} w={"full"}>
          <Text fontSize={["16px", "18px"]} fontWeight={500} color={"gray.600"}>
            Email{" "}
            <Box as={"span"} color={"gray"}>
              *
            </Box>
          </Text>
          <Input
            variant={"flushed"}
            color={"black"}
            _disabled={{
              color: "black",
            }}
            type="text"
            value={self?.email}
            isDisabled
          />
        </Flex>
        <Flex gap={"10px"} direction={"column"} w={"full"}>
          <Text fontSize={["16px", "18px"]} fontWeight={500} color={"gray.600"}>
            First Name{" "}
            <Box as={"span"} color={"gray"}>
              *
            </Box>
          </Text>
          <Input
            isRequired
            type="text"
            variant={"flushed"}
            name="firstName"
            onChange={handleChange}
            value={formData?.firstName}
          />
          {validationErrors.firstName && (
            <Text mt={"-4px"} fontSize={["14px"]} color="red.500">
              {validationErrors.firstName}
            </Text>
          )}
        </Flex>
        <Flex gap={"10px"} direction={"column"} w={"full"}>
          <Text fontSize={["16px", "18px"]} fontWeight={500} color={"gray.600"}>
            Last Name{" "}
            <Box as={"span"} color={"gray"}>
              *
            </Box>
          </Text>
          <Input
            onChange={handleChange}
            type="text"
            variant={"flushed"}
            name="lastName"
            value={formData?.lastName}
          />{" "}
          {validationErrors.lastName && (
            <Text mt={"-4px"} fontSize={["14px"]} color="red.500">
              {validationErrors.lastName}
            </Text>
          )}
        </Flex>
        <Flex gap={"10px"} direction={"column"} w={"full"}>
          <Text fontSize={["16px", "18px"]} fontWeight={500} color={"gray.600"}>
            Gender{" "}
            <Box as={"span"} color={"gray"}>
              *
            </Box>
          </Text>
          <Select
            name="gender"
            onChange={handleChange}
            variant={"flushed"}
            value={formData?.gender ?? "MALE"}
          >
            <option style={{ padding: "5px", marginTop: "6px" }} value={"MALE"}>
              Male
            </option>
            <option
              style={{ padding: "5px", marginTop: "6px" }}
              value={"FEMALE"}
            >
              Female
            </option>
            <option
              style={{ padding: "5px", marginTop: "6px" }}
              value={"TRANSGENDER"}
            >
              Transgender
            </option>
            <option
              style={{ padding: "5px", marginTop: "6px" }}
              value={"BISEXUAL"}
            >
              Bisexual
            </option>
            <option
              style={{ padding: "5px", marginTop: "6px" }}
              value={"PREFER_NOT_TO_SAY"}
            >
              Prefer not to say
            </option>
          </Select>
        </Flex>
        <Flex gap={"10px"} direction={"column"} w={"full"}>
          <Text fontSize={["16px", "18px"]} fontWeight={500} color={"gray.600"}>
            Grade{" "}
            <Box as={"span"} color={"gray"}>
              *
            </Box>
          </Text>
          <Select
            name="grade"
            onChange={handleChange}
            variant={"flushed"}
            value={formData?.grade ?? "GRADE_6"}
          >
            <option
              style={{ padding: "5px", marginTop: "6px" }}
              value={"GRADE 6"}
            >
              Grade 6
            </option>
            <option
              style={{ padding: "5px", marginTop: "6px" }}
              value={"GRADE 7"}
            >
              Grade 7
            </option>
            <option
              style={{ padding: "5px", marginTop: "6px" }}
              value={"GRADE 8"}
            >
              Grade 8
            </option>
            <option
              style={{ padding: "5px", marginTop: "6px" }}
              value={"GRADE 9"}
            >
              Grade 9
            </option>
          </Select>
        </Flex>

        <Flex gap={"10px"} direction={"column"} w={"full"}>
          <Text fontSize={["16px", "18px"]} fontWeight={500} color={"gray.600"}>
            Date Of Birth{" "}
            <Box as={"span"} color={"gray"}>
              *
            </Box>
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
                  onChange={({ target: { value } }) =>
                    changeYear(Number(value))
                  }
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
            selected={formData.dateOfBirth}
            onChange={(date) => handleDateChange(date as Date)}
          />
          {validationErrors.dateOfBirth && (
            <Text mt={"-4px"} fontSize={["14px"]} color="red.500">
              {validationErrors.dateOfBirth}
            </Text>
          )}
        </Flex>
        <Flex gap={"10px"} direction={"column"} w={"full"}>
          <Text fontSize={["16px", "18px"]} fontWeight={500} color={"gray.600"}>
            School Name{" "}
            <Box as={"span"} color={"gray"}>
              *
            </Box>
          </Text>
          <Input
            type="text"
            variant={"flushed"}
            name="schoolName"
            onChange={handleChange}
            value={formData?.schoolName}
          />{" "}
          {validationErrors.schoolName && (
            <Text mt={"-4px"} fontSize={["14px"]} color="red.500">
              {validationErrors.schoolName}
            </Text>
          )}
        </Flex>
      </Flex>
      <Flex justifyContent={"center"} gap={"20px"} mt={"24px"}>
        <Button
          _hover={{}}
          bg={"transparent"}
          border={`1px solid ${COLOR.ORANGE}`}
          onClick={() => router.refresh()}
        >
          Cancel
        </Button>
        <Button
          _hover={{}}
          isLoading={isSavingDetails}
          onClick={handleSubmit}
          bg={COLOR.ORANGE}
          color={"white"}
        >
          Save
        </Button>
      </Flex>
    </>
  );
}
