// layout for the products
import Footer from "@/components/Footer";
import { getAuther } from "@/libs/getAuther";
import { User } from "@/types/user.types";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import Loader from "@/components/Loader";
import NavBar from "@/components/NavBar/NavBar";
import { Flex, Spacer } from "@chakra-ui/react";
import { COLOR } from "@/types/colors";
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const self = await getAuther();
  if (!self?.onBoarding) redirect("/get-started");
  return (
    <Flex
      h={"100vh"}
      overflowY={"scroll"}
      bg={COLOR.YELLOW}
      direction={"column"}
    >
      {/* Navbar  */}
      <NavBar data={self as User} />

      <Suspense fallback={<Loader />}>{children}</Suspense>
      <Spacer />
      <Footer />
    </Flex>
  );
}
