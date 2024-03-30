// Layout for the sign in and sign out pages. Both share the same.
import { Image } from "@chakra-ui/react";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Link href={"/"}>
        <Image
          src="/assets/favicon.png"
          alt="beams"
          w={"90px"}
          position={"absolute"}
          top={"10px"}
          left={"10px"}
        />{" "}
      </Link>
      {children}
    </>
  );
}
