"use client";
import { COLOR } from "@/types/colors";
import {
  Button,
  Container,
  Flex,
  IconButton,
  Image,
  Text,
} from "@chakra-ui/react";
import { Quicksand } from "next/font/google";
import React, { useEffect, useState } from "react";
import { MdArrowForwardIos } from "react-icons/md";
import Stop from "./components/stops/Stop";
import Start from "./components/stops/Start";
import { User } from "@/types/user.types";
import Link from "next/link";
import useAftergetStartedModal from "@/hooks/useAftergetStartedModal";
import useProductTourModal from "@/hooks/useAfterProductTourModal";
const quickSand = Quicksand({ subsets: ["latin"] });
interface OnBoardingProps {
  self: User;
}
export default function OnBoarding({ self }: OnBoardingProps) {
  const [slideNo, setSlideNo] = useState<number>(0);
  const handleChange = () => {
    setSlideNo(slideNo + 1);
  };
  const modal = useAftergetStartedModal();
  const afterProductTourModal = useProductTourModal();
  useEffect(() => {
    modal.onOpen();
  }, []);
  useEffect(() => {
    if (slideNo === 7) afterProductTourModal.onOpen();
  }, [slideNo]);
  const leftPosition = `calc(${slideNo} * (94vw / 8))`;
  const getStop = (slideNo: number) => {
    switch (slideNo as number) {
      case 0:
        return <Start self={self} handleChange={handleChange} />;
      case 1:
        return (
          <Stop
            stopNumber="Stop 1"
            title="Beams Reels"
            highlightText="Beams Reels"
            description="Embark on your Beams Reels voyage, where each video is a thrilling gateway into a universe of learning. Dive into the depths of knowledge with every exciting reel!"
            additionalText="Simplifies learning and sparks interest in various subjects."
          />
        );
      case 2:
        return (
          <Stop
            stopNumber="Stop 2"
            title=" Beams Storyland"
            highlightText=" Beams Storyland"
            description="Drift into the enchanting realm of Beams Storyland , where every
        interactive tale shines like a star, inviting you on a journey of
        discovery and wonder."
            additionalText="Boosts literacy and creativity through engaging, interactive narratives."
          />
        );
      case 3:
        return (
          <Stop
            stopNumber="Stop 3"
            title=" Beams Writer"
            highlightText="Beams Writer"
            description="Land at Beams Writer , your creative lab for
        storytelling. Here, you can let your imagination soar by writing and
        illustrating your very own tales."
            additionalText="Encourages creative writing and self-expression."
          />
        );
      case 4:
        return (
          <Stop
            stopNumber="Stop 4"
            title="Beams Timeline"
            highlightText="Beams Timeline"
            description="Journey through history on Beams Timeline . Explore how
        technology has grown and see important inventions along the way."
            additionalText="Provides a comprehensive understanding of technological advancements."
          />
        );
      case 5:
        return (
          <Stop
            stopNumber="Stop 5"
            title="Beams Startup Universe"
            description="Enter Beams Startup Universe to explore and interact with the latest
        tech and new entrepreneurial ideas, sparking innovation and offering
        insights into technology's future."
            highlightText="Beams Startup"
            additionalText="Encourages a spirit of innovation and offers a peek into emerging
        technologies."
          />
        );
      case 6:
        return (
          <Stop
            stopNumber="Stop 6"
            title="Beams Quizland"
            highlightText="Beams Quizland"
            description="Embark on a knowledge quest in Beams Quizland . Put your learning to
        the test with captivating quizzes that enhance your skills, all within a
        playful and engaging environment."
            additionalText=" Encourages a spirit of innovation and offers a peek into emerging
        technologies."
          />
        );
      case 7:
        return (
          <Stop
            stopNumber=""
            title="Become a Future Innovator"
            highlightText="Beams"
            description="Your Beams journey awaits! Equip yourself with knowledge and creativity to become tomorrow's innovator and leader. Let's start this amazing adventure!"
            additionalText=" Encourages a spirit of innovation and offers a peek into emerging
        technologies."
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      {" "}
      {slideNo > 0 ? (
        <>
          <Flex
            h={"100vh"}
            className={quickSand.className}
            direction={["column", "column", "row"]}
            gap={["0px", "20px"]}
          >
            <Flex
              flex={[2, 3, 3]}
              justifyContent={"center"}
              alignItems={"flex-end"}
              bgImage={`/assets/onboarding-2-${slideNo}.png`}
              bgSize={"cover"}
              objectFit={"cover"}
              bgRepeat={"no-repeat"}
              bgPosition={"center"}
            />

            <Container
              display={"flex"}
              maxW={"4xl"}
              flex={[3, 5, 5]}
              flexDirection={"column"}
            >
              <Flex
                direction={"column"}
                h={"full"}
                p={"10px"}
                flex={[1, 2, 2]}
                w={"full"}
                justifyContent={"flex-start"}
                alignItems={"flex-start"}
              >
                <Link href={"/"}>
                  <Image src="/assets/favicon.png" alt="beams" w={"90px"} />
                </Link>
              </Flex>
              <Flex
                flex={[6, 6, 6]}
                direction={"column"}
                gap={"40px"}
                mb={"10px"}
              >
                {getStop(slideNo as number)}
                {slideNo < 7 ? (
                  <Flex
                    w={"full"}
                    justifyContent={"space-between"}
                    gap={"10px"}
                  >
                    <Link href={"/home"}>
                      <Text
                        fontWeight={400}
                        fontSize={["16px", "18px"]}
                        cursor={"pointer"}
                      >
                        Skip
                      </Text>{" "}
                    </Link>
                    <IconButton
                      _hover={{}}
                      onClick={() => setSlideNo(slideNo + 1)}
                      color={"white"}
                      bg={COLOR.ORANGE}
                      aria-label="next"
                      rounded={"full"}
                      icon={<MdArrowForwardIos />}
                    />
                  </Flex>
                ) : (
                  <>
                    <Flex w={"full"} justifyContent={"flex-end"} gap={"10px"}>
                      <Link href={"/products"}>
                        <Button _hover={{}} bg={COLOR.ORANGE} color={"white"}>
                          Start Your Adventure
                        </Button>
                      </Link>
                    </Flex>
                  </>
                )}
              </Flex>
            </Container>
          </Flex>
        </>
      ) : (
        <Start self={self} handleChange={handleChange} />
      )}
      <Image
        position="absolute"
        bottom="0"
        m={"0"}
        p={"0"}
        left={leftPosition}
        h={{ base: "60px", md: "200px" }}
        src="/assets/onboarding-rover.png"
        transition={"left 0.5s ease-out"}
        alt="beams"
      />
    </>
  );
}
