"use client";
// shows questons and takes responses
import React, { useEffect, useState, useTransition } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Image,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { z } from "zod";
import { COLOR } from "@/types/colors";
import { saveAttempt } from "@/actions/leader";
import { useSearchParams } from "next/navigation";
import { nanoid } from "nanoid";
interface QuestionsProps {
  data: any;
}

interface FormData {
  [key: string]: string;
}

// Assuming data is static, otherwise you'd generate this dynamically
const createFormSchema = (data: any) => {
  const schemaObject = data.reduce((acc: any, curr: any) => {
    acc[curr.qNo] = z.string().min(1, "Please write your answer");

    return acc;
  }, {} as Record<string, z.ZodString>);
  return z.object(schemaObject);
};

export default function Questions({ data }: QuestionsProps) {
  const [formData, setFormData] = useState<FormData>({});
  const [formErrors, setFormErrors] = useState<FormData>({});
  const [saving, startSaving] = useTransition();
  const toast = useToast({ position: "top", isClosable: true });
  const [attemptId, setAttemptId] = useState<string | null>(null);
  const searchParams = useSearchParams();
  useEffect(() => {
    const id = searchParams.get("attemptId");
    if (id) {
      setAttemptId(id as string);
    } else {
      const nano = nanoid();
      setAttemptId(nano as string);
      // router.replace(`/quiz/${questions[0].quizId}?attemptId=${nano}`);
    }
  }, [data]);
  const handleInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    questionId: string
  ) => {
    setFormData({ ...formData, [questionId]: e.target.value });
  };
  // save the reponse
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formSchema = createFormSchema(data);
    try {
      formSchema.parse(formData);
      startSaving(() =>
        saveAttempt(attemptId as string, formData)
          .then(() => {
            toast({ title: "Saved", status: "success" });
          })
          .catch((err) => {
            toast({ title: err, status: "error" });
          })
      );

      setFormErrors({});
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = error.flatten().fieldErrors;
        const newFormErrors = Object.keys(errors).reduce((acc, key) => {
          acc[key] = errors[key]!.join(", ");
          return acc;
        }, {} as FormData);
        setFormErrors(newFormErrors);
      }
    }
  };

  return (
    attemptId && (
      <Container
        maxW={"5xl"}
        centerContent
        display={"flex"}
        flexDirection={"column"}
        gap={["80px", "100px"]}
        as="form"
        onSubmit={handleSubmit}
      >
        {data.map((question: any, index: number) => (
          <Flex key={index} direction={"column"} gap={["30px", "50px"]}>
            {question.imageUrl && (
              <Image
                mx={"auto"}
                h={["250px", "450px"]}
                src={question.imageUrl}
                alt="beams"
              />
            )}
            <Accordion
              bg={"white"}
              w={"full"}
              border={"none"}
              defaultChecked
              allowMultiple
            >
              <AccordionItem border={"none"}>
                <AccordionButton
                  _hover={{}}
                  display={"flex"}
                  w={"full"}
                  justifyContent={"flex-start"}
                  alignItems={"flex-start"}
                  py={"10px"}
                  px={"20px"}
                >
                  <Flex
                    w={"full"}
                    fontSize={"20px"}
                    textAlign={"left"}
                    py={"10px"}
                  >
                    <div
                      dangerouslySetInnerHTML={{ __html: question.question }}
                    />
                  </Flex>
                  <Flex
                    flex={0}
                    w={"full"}
                    justifyContent={"flex-end"}
                    alignItems={"flex-start"}
                  >
                    <AccordionIcon />
                  </Flex>
                </AccordionButton>

                <AccordionPanel
                  mt={"20px"}
                  border={"none"}
                  p={"0"}
                  position={"inherit"}
                >
                  <Flex alignItems={"flex-end"} borderTop={"1px solid orange"}>
                    <Textarea
                      value={formData[question.qNo]}
                      onChange={(e) => handleInputChange(e, `${question.qNo}`)}
                      w={"100%"}
                      placeholder="Type your answer here"
                      variant={"filled"}
                      bg={"#F3F2F2"}
                      h={"200px"}
                      maxLength={question.charCount}
                      color={"black"}
                      fontWeight={400}
                      resize={"none"}
                      _focus={{ bg: "#F3F2F2", border: "none" }}
                    />
                    <Text zIndex={100} ml={"-70px"} fontSize={"15px"}>
                      {`${formData[question.qNo]?.length ?? 0} / ${
                        question.charCount
                      }`}
                    </Text>
                  </Flex>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>

            <Text color="red.500">{formErrors[question.qNo]}</Text>
          </Flex>
        ))}
        <Button
          mt={["-50px", "-80px"]}
          bg={COLOR.BROWN}
          _hover={{}}
          _focus={{}}
          w={["280px", "300px"]}
          isLoading={saving}
          color={"white"}
          variant={"solid"}
          type="submit"
        >
          Submit
        </Button>
      </Container>
    )
  );
}
