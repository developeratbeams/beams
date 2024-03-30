import React from "react";
import OnBoarding from "./onboarding";
import { getAuther } from "@/libs/getAuther";
import { notFound } from "next/navigation";

export default async function Page() {
  // get user
  const self = await getAuther();
  if (!self) notFound();
  return <OnBoarding self={self} />;
}
