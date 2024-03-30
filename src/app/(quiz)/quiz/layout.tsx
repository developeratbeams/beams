// layout
import Loader from "@/components/Loader";
import { getAuther } from "@/libs/getAuther";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Beams Quizland",
  description: "NextGen Learning Plateform",
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const self = await getAuther();
  return (
    <>
      <Suspense fallback={<Loader />}>{children}</Suspense>
    </>
  );
}
