// page for the leader based on the id, for the differnet modules,
// data used is not saved in the databse ,as there is not admin dasboard to enter these
import { Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import Questions from "./_components/Questions";
import Report from "./_components/Reward";
import { isAttempted } from "@/libs/leader-services";
const data = [
  {
    qNo: 1,
    question: `<p><strong>Q1. </strong><span>It’s a very cold winter in a city named Cooloba. Children, adults, and older people are freezing because there is a shortage of electricity to run heaters.</span></p><p> <br></p><p><span>You are given the responsibility to find a solution to this problem by using one of these magical materials; metamaterials, aerogel, piezoelectric materials, self-healing materials, graphene, and quantum dots.</span></p><p> <br></p><p> <span>Which material would you use and why? How would you use the material to prevent people from freezing?</span></p>`,
    imageUrl: "/leader/q1.webp",
    charCount: 400,
  },
  {
    qNo: 2,
    question:
      "<p><strong>Q2. </strong>There are 10 bridges in Cooloba. Six of the main bridges have small cracks making it dangerous for cars to drive on the bridge. 10,000 cars use the bridges every day.</p><p><br></p><p>You can fix this problem by using magical materials like metamaterials, aerogel, piezoelectric materials, self-healing materials, graphene, or quantum dots.</p><p><br></p><p>Describe the magical material you would use to fix the problem and explain why you selected that material.</p>",
    imageUrl: "/leader/q2.webp",
    charCount: 400,
  },
  {
    qNo: 3,
    question:
      "<p><strong>Q3. </strong>You are the Mayor of Cooloba. You have a lot of power and responsibility towards the people.</p><p><br></p><p>Cooloba has the money to fix only one of the problems listed above; finding a solution to stop people from freezing OR repairing the damaged bridges.</p><p><br></p><p>Which problem would you fix and why would you chose to fix that problem and not the other problem?</p><p><br></p><p>How would you feel about not being able to fix the other problem?</p>",
    charCount: 1600,
    imageUrl: "/leader/q3.webp",
  },
];
interface PageProps {
  params: {
    id: string;
  };
  searchParams: {
    attemptId: string;
  };
}
// Use the defined interface in your function signature
export default async function Page({
  params: { id },
  searchParams: { attemptId },
}: PageProps) {
  const attempt = await isAttempted(attemptId);

  if (!!attempt) return <Report />;
  return (
    <Flex
      bgImage={"/leader/cover-main.png"}
      bgPosition={"center"}
      position={"absolute"}
      top={"0"}
      w={"full"}
      h={"100vh"}
      overflowY={"scroll"}
    >
      <Flex w={"full"} h={"fit-content"} rounded={"10px"} m={"30px"}>
        <Questions data={data} />
      </Flex>
    </Flex>
  );
}
