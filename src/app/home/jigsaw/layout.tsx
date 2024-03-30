// layout for the jigsaw
import Footer from "@/components/Footer";
import { getAuther } from "@/libs/getAuther";
import { User } from "@/types/user.types";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import Loader from "@/components/Loader";
import NavBar from "@/components/NavBar/NavBar";
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const self = await getAuther();
  if (!self?.onBoarding) redirect("/get-started");
  return (
    <>
      <NavBar data={self as User} />
      <Suspense fallback={<Loader />}>{children}</Suspense>
      <Footer />
    </>
  );
}
