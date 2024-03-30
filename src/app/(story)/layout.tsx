import Footer from "@/components/Footer";
import Loader from "@/components/Loader";
import NavBar from "@/components/NavBar/NavBar";
import { getAuther } from "@/libs/getAuther";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Beams Storyland",
  description: "NextGen Learning Plateform",
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  // get users
  const self = await getAuther();
  return (
    <>
      {/*Navbar*/}
      <NavBar data={self} />
      <Suspense fallback={<Loader />}>{children}</Suspense>
    </>
  );
}
