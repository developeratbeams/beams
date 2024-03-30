import { checkUsername } from "@/actions/user";
import useWelcomeModal from "@/hooks/useWelcomeModal";
import { Flex, Input, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Quicksand } from "next/font/google";
import React, { useCallback, useEffect, useState } from "react";
const quickSand = Quicksand({ subsets: ["latin"] });
const MotionFlex = motion(Flex);
interface Form {
  firstName: String;
  lastName: String;
  gender: String;
  grade: String;
  schoolName: String;
  favouriteSubject: String[];
  day: string;
  username: string;
  month: string;
  year: string;
}
interface FormProps {
  form: Form;
  handleChange: (name: string, value: string) => void;
}
export default function Username({ handleChange, form }: FormProps) {
  // const welcomeModal = useWelcomeModal();
  // useEffect(() => {
  //   const getData = async () => {
  //     welcomeModal.onOpen();
  //   };
  //   getData();
  // }, []);
  const [alreadyExists, setAlreadyExists] = useState<boolean | null>(false);
  const variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };
  const handleUsername = useCallback(
    (e: any) => {
      const { value } = e.target;
      checkUsername(value).then((data) => {
        setAlreadyExists(data);
      });

      handleChange("username", e.target.value);
    },
    [handleChange]
  );
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
        Pick a username
      </Text>

      <Input
        _focusVisible={{
          borderBottom: "2px solid gray",
        }}
        value={form.username as string}
        name="username"
        w={"80%"}
        onChange={handleUsername}
        variant={"flushed"}
        color={"gray"}
        fontWeight={600}
        placeholder="username"
      />
      {alreadyExists && form.username.trim() ? (
        <Text fontWeight={600} color="red" mt={"-20px"}>
          Username not available, please try another
        </Text>
      ) : (
        form.username.trim() && (
          <Text fontWeight={600} mt={"-20px"} color={"green"}>
            Available
          </Text>
        )
      )}
    </MotionFlex>
  );
}
