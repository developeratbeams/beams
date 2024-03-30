"use client";
import { COLOR } from "@/types/colors";
import {
  Box,
  Button,
  Container,
  Flex,
  Image,
  Input,
  SimpleGrid,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState, useTransition } from "react";
import CustomeStepper from "./components/Stepper";
import Name from "./components/Name";
import Gender from "./components/Gender";
import Grade from "./components/Grade";
import FavSubject from "./components/FavSubject";
import Dob from "./components/Dob";
import SchoolName from "./components/School";
import Username from "./components/Username";
import { GENDER } from "@/types/constants";
import { changeUserDetails } from "@/actions/user";
import { savePassCode, userPassAllowed } from "@/actions/pass";
import { BiLock } from "react-icons/bi";
import Link from "next/link";
import useWelcomeModal from "@/hooks/useWelcomeModal";
interface UserDetails {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: "MALE" | "FEMALE" | "BISEXUAL" | "TRANSGENDER" | "PREFER_NOT_TO_SAY";
  grade: string;
  schoolName: string;
  interests: string[];
  username: string;
}
export default function OnBoarding() {
  const [slideNo, setSlideNo] = useState(0);
  const [isSavingDetails, startSavingDetails] = useTransition();
  const [empty, setempty] = useState<boolean>(true);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    username: "",
    grade: "",
    schoolName: "",
    favouriteSubject: [],
    day: "",
    month: "",
    year: "",
    dateOfBirth: new Date(),
  });
  // handle change
  const handleChange = (name: string, value: any) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (slideNo === 0) {
      setempty(!form.firstName.trim() || !form.lastName.trim());
    } else if (slideNo === 1) {
      setempty(!form.username.trim());
    } else if (slideNo === 2) {
      setempty(!form.gender);
    } else if (slideNo === 3) {
      setempty(!form.grade.trim());
    } else if (slideNo === 4) {
      setempty(!(form.favouriteSubject.length >= 3));
    } else if (slideNo === 5) {
      setempty(false);
    } else {
      setempty(!form.schoolName.trim());
    }
  }, [
    slideNo,
    form.firstName,
    form.lastName,
    form.gender,
    form.grade,
    form.favouriteSubject.length,
    form.schoolName,
    form.username,
    form.dateOfBirth,
  ]);
  const handleSubmit = () => {
    const body: UserDetails = {
      firstName: form.firstName as string,
      lastName: form.lastName as string,
      dateOfBirth: form.dateOfBirth as Date,
      gender: form.gender as GENDER,
      grade: form.grade as string,
      schoolName: form.schoolName as string,
      interests: form.favouriteSubject as string[],
      username: form.username as string,
    };

    startSavingDetails(() => {
      changeUserDetails(body);
    });
  };

  const renderComponent = () => {
    switch (slideNo) {
      case 0:
        return <Name form={form} handleChange={handleChange} />;
      case 1:
        return <Username form={form} handleChange={handleChange} />;
      case 2:
        return <Gender form={form} handleChange={handleChange} />;
      case 3:
        return <Grade form={form} handleChange={handleChange} />;
      case 4:
        return <FavSubject form={form} handleChange={handleChange} />;
      case 5:
        return <Dob form={form} handleChange={handleChange} />;
      case 6:
        return <SchoolName form={form} handleChange={handleChange} />;
      default:
        return null;
    }
  };

  const [isAllowed, setIsAllowed] = useState(false);
  
  const [pass, setPass] = useState("");
  const [checking, startChecking] = useTransition();
  const toast = useToast({ position: "top" });
  const handlePasscode = async () => {
    startChecking(async () => {
      savePassCode(pass)
        .then(() => {
          toast({ title: "Success", status: "success" });
          setIsAllowed(true);
        })
        .catch((err) => toast({ title: "Invalid Passode", status: "error" }));
    });
  };

  if (isAllowed)
    return (
      <SimpleGrid
        columns={[1, 1, 2]}
        flexWrap={"wrap-reverse"}
        flexDirection={["row", "row-reverse", "row-reverse"]}
        h={["auto", "100vh"]}
        columnGap={"20px"}
        gridTemplateColumns={{ lg: "2fr 1fr" }}
      >
        <Flex
          h={["30vh", "30vh", "full"]}
          bg={COLOR.YELLOW}
          order={{ base: 1, lg: 2 }}
          justifyContent={"center"}
          alignItems={"center"}
          direction={["row", "column"]}
          gap={"10px"}
        >
          {slideNo === 0 && (
            <Box
              fontWeight={600}
              color={"white"}
              bg={COLOR.PURPLE_LIGHT}
              p={"15px"}
              rounded={"15px"}
              fontSize={["16px", "18px"]}
              wordBreak={"break-all"}
              textAlign={"center"}
            >
              <Text>Hello</Text>
              <Text>
                {form.firstName} {form.lastName}
              </Text>
            </Box>
          )}
          {slideNo === 1 && <Text fontWeight={700}>@{form.username}</Text>}
          <Image
            h={["100%", "300px", "400px"]}
            objectFit={"contain"}
            alt="beams"
            src={`/assets/onboarding/onboarding-${slideNo + 1}.png`}
          />
        </Flex>

        <Container
          display={"flex"}
          maxW={"3xl"}
          h={["65vh", "65vh", "full"]}
          flexDirection={"column"}
          order={{ base: 2, lg: 1 }}
          p={"20px"}
          gap={["20px", "50px"]}
        >
          <Flex flex={[1, 2, 2]} gap={"10px"} h={"full"} direction={"column"}>
            <Image src="/assets/favicon.png" alt="beams" w={"90px"} />
            <CustomeStepper slideNo={slideNo} />
          </Flex>
          <Container
            flex={[7, 6, 6]}
            h="full"
            display={"flex"}
            flexDirection={"column"}
            gap={"50px"}
            maxW={"2xl"}
          >
            {renderComponent()}

            <Flex
              w={"full"}
              justifyContent={["center", "flex-end"]}
              gap={"10px"}
              pb={"30px"}
            >
              {slideNo !== 0 && (
                <Button
                  _hover={{}}
                  onClick={() => setSlideNo(slideNo - 1)}
                  color={"black"}
                  bg={"gray.200"}
                >
                  Back
                </Button>
              )}
              {slideNo === 6 && (
                <Button
                  _hover={{}}
                  onClick={handleSubmit}
                  color={"white"}
                  bg={"black"}
                  isLoading={isSavingDetails}
                  isDisabled={empty}
                >
                  Submit
                </Button>
              )}
              {!(slideNo === 6) && (
                <Button
                  _hover={{}}
                  onClick={() => setSlideNo(slideNo + 1)}
                  color={"white"}
                  bg={"black"}
                  isDisabled={empty}
                >
                  Okay
                </Button>
              )}
            </Flex>
          </Container>
        </Container>
      </SimpleGrid>
    );

  return (
    <Flex direction={"column"} w={"full"} h={"100vh"}>
      <Link href={"/"}>
        <Image
          src="/assets/favicon.png"
          alt="beams"
          w={"90px"}
          position={"absolute"}
          top={"10px"}
          left={"10px"}
        />{" "}
      </Link>
      <Flex
        w={"full"}
        h={"95vh"}
        justifyContent={"center"}
        alignItems={"center"}
        direction={["column-reverse", "row"]}
      >
        <Flex
          flex={4}
          justifyContent={"center"}
          alignItems={["flex-start", "center"]}
        >
          <Container
            display={"flex"}
            flex={4}
            flexDirection={"column"}
            gap={"10px"}
            bg={COLOR.YELLOW}
            p={"20PX"}
            rounded={"20px"}
            maxW={"xl"}
          >
            <Text fontSize={["28px", "38px"]} fontWeight={700}>
              Access Code
            </Text>
            <Text fontWeight={500} fontSize={["18px", "20px"]}>
              Please enter your access code to continue
            </Text>
            <Input
              onChange={(e: any) => setPass(e.target.value)}
              name="passcode"
              p={"10px"}
              placeholder="Passcode"
              variant={"flushed"}
              w={"50%"}
              color={"color"}
              fontWeight={700}
            />
            <Button
              mt={"30px"}
              bg={COLOR.ORANGE}
              _hover={{}}
              w={"fit-content"}
              color={"white"}
              leftIcon={<BiLock />}
              isLoading={checking}
              onClick={handlePasscode}
            >
              Submit
            </Button>
          </Container>
        </Flex>
        <Flex flex={4} justifyContent={"center"} alignItems={"center"}>
          <Image h={"300px"} alt="beams" src="/assets/passcode.png" />
        </Flex>
      </Flex>
    </Flex>
  );
}
