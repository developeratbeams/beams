// page for the single jigsaw
import React from "react";
import Jigsaw from "./_components/Jigsaw";
import { Box } from "@chakra-ui/react";
import { getJigSawById, isAttemptedJigSaw } from "@/libs/jigsaw-service";
import { notFound } from "next/navigation";
import Report from "./_components/Report";
import { getAuther } from "@/libs/getAuther";
interface PageProps {
  params: {
    jigsawId: string;
  };
  searchParams: {
    tryAgain: string;
  };
}

export default async function Page({
  params: { jigsawId },
  searchParams: { tryAgain },
}: PageProps) {
  // get jigsaw by id
  const jigsaw = await getJigSawById(jigsawId);
  // if attempted get attempt
  const attempt = await isAttemptedJigSaw(jigsawId);
  const self = await getAuther();
  if (!jigsaw) notFound();
  if (!!attempt && !tryAgain) return <Report attempt={attempt} />;
  return (
    <Box
      position={"absolute"}
      w={"100%"}
      bg={"white"}
      top={"0"}
      zIndex={10}
      h={"100vh"}
      py={"30px"}
    >
      <Jigsaw jigSaw={jigsaw} user={self!} />
    </Box>
  );
}
