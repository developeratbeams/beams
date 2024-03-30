// spot the differences 
import React from "react";
import {
  isSpotTheDifferenceAttempt,
  getSpotTheDifferenceById,
} from "@/libs/spot-the-difference-services";

import { getAuther } from "@/libs/getAuther";
import Client from "./_components/client";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  // get the spot the differnce by id
  const std = await getSpotTheDifferenceById(params.id);
  // check whether the user has attempted
  const attempt = await isSpotTheDifferenceAttempt(params.id);
  // get user details
  const self = await getAuther();
  // invalid id
  if (!std) notFound();
  return (
    <>
      <Client self={self!} attempt={attempt!} std={std!} id={params.id} />
    </>
  );
}
