// content showing component
import { useEffect, useRef } from "react";
import { Box, Flex } from "@chakra-ui/react";
import Landing from "./sections/landing";
import FunFact from "./sections/fun-fact";
import Product from "./sections/product";
import Result from "./sections/result";
import { COLOR } from "@/types/colors";
import StartUp from "./sections/startup";
import { data } from "./data";
interface Props {
  handleSectionChange: (section: string) => void;
  product: string;
}
export default function Content({ handleSectionChange, product }: Props) {
  // all the section tracks
  const sectionsRef = {
    "#intro": useRef(null),
    "#funfact": useRef(null),
    "#startup": useRef(null),
    "#product": useRef(null),
    "#result": useRef(null),
  };
  // track the section in the vp and chnage the stripped nav
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const currentSection = `#${entry.target.id}`;
            handleSectionChange(currentSection as string);
            window.location.hash = `${currentSection}`;
          }
        });
      },
      { threshold: 0.7 }
    );
    Object.values(sectionsRef).forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => {
      observer.disconnect();
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);

  return (
    <Flex w={"full"} direction={"column"} gap={["10px", "150px"]}>
      <Box
        id="intro"
        ref={sectionsRef["#intro"]}
        mb={["-10px", "-130px"]}
        mx={"auto"}
      >
        {" "}
        <Box
          color={"white"}
          p={"10px"}
          rounded={"10px"}
          w={"fit-content"}
          px={"30px"}
          fontWeight={"bold"}
          bg={COLOR.PINK}
        >
          {product}
        </Box>
      </Box>
      <Landing data={data[product]} />
      <Box
        display={["flex", "none"]}
        id="startup"
        ref={sectionsRef["#funfact"]}
      >
        <StartUp data={data[product]} />
      </Box>
      <div id="funfact" ref={sectionsRef["#startup"]}>
        <FunFact data={data[product]} />
      </div>

      <div id="product" ref={sectionsRef["#product"]}>
        <Product data={data[product]} />
      </div>
      <div id="result" ref={sectionsRef["#result"]}>
        <Result data={data[product]} />
      </div>
    </Flex>
  );
}
