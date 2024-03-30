"use client";
import { saveMessage } from "@/actions/contact";
import { COLOR } from "@/types/colors";
import {
  Button,
  Container,
  Flex,
  Input,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import React, { useState, useTransition } from "react";

export default function Form() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [saving, startSaving] = useTransition();
  const toast = useToast({ position: "top" });
  const handleSubmit = () => {
    startSaving(() => {
      saveMessage(name, email, message)
        .then((data) => {
          toast({
            title: data,
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          setName("");
          setEmail("");
          setMessage("");
        })
        .catch((err) =>
          toast({ title: err, status: "error", isClosable: true })
        );
    });
  };
  return (
    <Container
      display={"flex"}
      maxW={"2xl"}
      flexDirection={"column"}
      gap={"40px"}
      w={"full"}
      justifyItems={"center"}
      py={"30px"}
      mb={"40px"}
    >
      <Text textAlign={"center"} fontWeight={700} fontSize={["26px", "30px"]}>
        Have a Query? Message Us
      </Text>
      <Flex direction={["column", "row"]} gap={"20px"}>
        <Input
          isRequired
          color={"black"}
          placeholder="Name *"
          outline={"1px solid #A9A9A9"}
          fontWeight={600}
          _placeholder={{
            color: "gray.600",
            fontWeight: 500,
          }}
          value={name}
          onChange={(e: any) => setName(e.target.value)}
        />
        <Input
          isRequired
          color={"black"}
          outline={"1px solid #A9A9A9"}
          placeholder="E-mail *"
          _placeholder={{
            color: "gray.600",
            fontWeight: 500,
          }}
          value={email}
          onChange={(e: any) => setEmail(e.target.value)}
        />
      </Flex>
      <Flex>
        <Textarea
          value={message}
          outline={"1px solid #A9A9A9"}
          onChange={(e: any) => setMessage(e.target.value)}
          isRequired
          placeholder="Message *"
          _placeholder={{
            color: "gray.600",
            fontWeight: 500,
          }}
          noOfLines={3}
        />
      </Flex>
      <Button
        _hover={{}}
        _disabled={{
          bg: COLOR.ORANGE,
        }}
        mx={"auto"}
        isLoading={saving}
        onClick={handleSubmit}
        isDisabled={!name.trim() || !email.trim() || !message.trim()}
        bg={COLOR.ORANGE}
        color="white"
        w={"300px"}
      >
        Send Message
      </Button>
    </Container>
  );
}
