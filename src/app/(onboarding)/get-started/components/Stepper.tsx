import { COLOR } from "@/types/colors";
import { Box, Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
const steps = [1, 2, 3, 4, 5, 6, 7];
interface Props {
  slideNo: number;
}

export default function CustomeStepper({ slideNo }: Props) {
  const [slide, setSlide] = useState(slideNo);

  useEffect(() => {
    setSlide(slideNo);
  }, [slideNo]);

  // Function to determine the color of each step
  const getStepColor = (index: number) => {
    if (index < slideNo) return COLOR.YELLOW;
    if (index === slideNo) return "black";
    return "#D9D9D9"; // Future steps
  };

  return (
    <Flex
      flexDirection={"column"}
      w={"full"}
      display={["none", "none", "flex"]}
      gap={"10px"}
      justifyContent={"flex-start"}
    >
      <Flex w={"full"} gap={"10px"}>
        {steps.map((step, index) => (
          <Box
            key={index}
            h={"4px"}
            rounded={"full"}
            w={"100px"}
            bg={getStepColor(index)}
          />
        ))}
      </Flex>
      <Text fontWeight={500}>
        {slideNo + 1} of {steps.length}
      </Text>
    </Flex>
  );
}
