"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import Report from "./Report";
import { SpotTheDifference, SpotTheDifferenceAttempt } from "@prisma/client";
import { User } from "@/types/user.types";
import ImageDifferences from "./Game";
interface clientProps {
  std: SpotTheDifference;
  attempt: SpotTheDifferenceAttempt;
  self: User;
  id: string;
}
export default function Client({ std, attempt, self, id }: clientProps) {
  // check for  try-again params
  const searchParams = useSearchParams();
  const tryAgain = searchParams.get("try-again");
  // if attempted
  if (!!attempt && !tryAgain)
    return <Report user={self!} std={std} attempt={attempt} />;
  // not attempts || attempted && try again
  return (
    <>
      {/*Game component*/}
      <ImageDifferences
        id={id}
        differences={std.differences}
        image1Url="/game/original.png"
        image2Url="/game/original.png"
      />
    </>
  );
}
