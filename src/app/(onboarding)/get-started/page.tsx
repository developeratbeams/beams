import React from "react";
import OnBoarding from "./onboarding";
import { onBoardingDone } from "@/libs/auth-service";
import { redirect } from "next/navigation";

export default async function Page() {
  // check if onboarding done or not
  const onBoarding = await onBoardingDone();
  // redirect to home, if already done
  if (!onBoarding) redirect("/products");
  // onboarding
  return <OnBoarding />;
}
