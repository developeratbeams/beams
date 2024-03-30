// layout for the static pages
import { Box } from "@chakra-ui/react";
import Footer from "@/components/Footer";
import { Quicksand } from "next/font/google";
import NavBar from "@/components/NavBar/NavBar";
import { getAuther } from "@/libs/getAuther";
import { Metadata } from "next";
const quicksand = Quicksand({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Beams World",
  description: "NextGen Learning Plateform",
};
export default async function Layout({ children }: { children: React.ReactNode }) {
  const self = await getAuther();
  return (
    <Box className={quicksand.className}>
      <NavBar data={self} />
      {children}
      <Footer />
    </Box>
  );
}
