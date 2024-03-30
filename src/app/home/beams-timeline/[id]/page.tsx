"use client";
// page for a particular timeline.
// it is a dynamic route so that it fits for the other modules, but developed it after all other products, the data used here is mentioned below as there is not schema for this and is not saved in the databse
import { Box, Flex, IconButton, Text } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import Card from "./_components/Card";
import EndCard from "./_components/EndCard";
import { Quicksand } from "next/font/google";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
import { COLOR } from "@/types/colors";
const quicksand = Quicksand({ subsets: ["latin"] });
//  data used to view in the different tabs
const data = [
  {
    date: 1880,
    title: "PIEZOELECTRICITY",
    img: "https://res.cloudinary.com/drlyyxqh9/image/upload/v1708970649/timeline/Magical%20materials/dhavuea3rqgcuaqdsi1b.webp",
    desc: "Two brothers, Pierre and Jacques Curie, discovered piezoelectricity when they were 21 and 24 years old.",
    whyItMatters:
      "Piezoelectricity helps doctors see tiny things inside our body, creates clean energy, and reduces the amount of fuel used by machines and cars. It can reduce pollution, energy wastage, and global warming.",
    whyItMattersImg:
      "https://res.cloudinary.com/drlyyxqh9/image/upload/v1708970651/timeline/Magical%20materials/oxxuxugok5a9aqi374ra.webp",
  },
  {
    date: 1931,
    title: "AEROGEL",
    img: "https://res.cloudinary.com/drlyyxqh9/image/upload/v1708970651/timeline/Magical%20materials/knmhtmklifoboxvl5f5u.webp",
    desc: "Dr. Samuel Kistler invented Aerogel at the University of the Pacific, the first university in California.",
    whyItMatters:
      "Aerogel can quickly absorb large oil-spills, clean oceans, and help us understand more about the universe. It helps save energy, reduce pollution, and global warming.",

    whyItMattersImg:
      "https://res.cloudinary.com/drlyyxqh9/image/upload/v1708970651/timeline/Magical%20materials/sbiz7rbpoumlmlgjsi7q.webp",
  },
  {
    date: 1981,
    title: "QUANTUM DOT",
    img: "https://res.cloudinary.com/drlyyxqh9/image/upload/v1708970649/timeline/Magical%20materials/vh7875kpvhths671g8dg.webp",
    desc: "Alexei A. Onushchenko and Alexey Ekimov created the first quantum dots by mixing special ingredients in a glass matrix.",
    whyItMatters:
      "Quantum dots light up diseased and cancer cells to help doctors spot diseases early on. They make gadgets and lights vibrant and energy-efficient. Quantum dots are transforming healthcare and energy.",
    whyItMattersImg:
      "https://res.cloudinary.com/drlyyxqh9/image/upload/v1708970652/timeline/Magical%20materials/gntyaibifa1kzvrc7f4g.webp",
  },
  {
    date: 1994,
    title: "METAMATERIALS",
    img: "https://res.cloudinary.com/drlyyxqh9/image/upload/v1708970650/timeline/Magical%20materials/pm5tahjfnz95wwdfnwgr.webp",
    desc: "Sir John Pendry discovered metamaterials in 1994. Metamaterials are not found in nature. They are made in labs by scientists.",
    whyItMatters:
      "Metamaterials can boost wireless signals, create lenses that can see tiny viruses, and protect buildings from earthquakes. They are transforming electronics and healthcare.",
    whyItMattersImg:
      "https://res.cloudinary.com/drlyyxqh9/image/upload/v1708970651/timeline/Magical%20materials/huw8sm0jxsekbriwteez.webp",
  },
  {
    date: 2004,
    title: "GRAPHENE",
    img: "https://res.cloudinary.com/drlyyxqh9/image/upload/v1708970649/timeline/Magical%20materials/jglaenhvoicrf42oauut.webp",
    desc: "Graphene can create efficient batteries, store renewable energy more efficiently, and make super-fast electronic devices, reducing the need for energy-intensive and costly materials.",
    whyItMatters:
      "Metamaterials can boost wireless signals, create lenses that can see tiny viruses, and protect buildings from earthquakes. They are transforming electronics and healthcare.",
    whyItMattersImg:
      "https://res.cloudinary.com/drlyyxqh9/image/upload/v1708970651/timeline/Magical%20materials/rdih8yjz79klszlipoez.webp",
  },
  {
    date: 2010,
    title: "SELF-HEALING MATERIALS",
    img: "https://res.cloudinary.com/drlyyxqh9/image/upload/v1708970649/timeline/Magical%20materials/zvp5p5pa61llpm2mjlel.webp",
    desc: "Self-healing materials were widely recognized only in the 21st century.",
    whyItMatters:
      "Self-healing materials extend the life of products, reducing maintenance costs and wastage. They also increase the life and safety of infrastructure, like buildings and bridges. They are transforming construction and electronics.",
    whyItMattersImg:
      "https://res.cloudinary.com/drlyyxqh9/image/upload/v1708970649/timeline/Magical%20materials/giwijncpxcn9ivstfjxr.webp",
  },
];
export default function Page() {
  // get the dicovery years for positoning the cards
  const discoveryYear = data.map((data) => data.date);
  // make a timeline of dates from starting to the eneding date
  const years: number[] = Array.from(
    { length: discoveryYear[discoveryYear.length - 1] - discoveryYear[0] + 1 },
    (_, index) => discoveryYear[0] + index
  );
  // buttons for the next and prev
  const [hasPrev, setHasPrev] = useState<boolean>(false);
  const [hasNext, setHasNext] = useState<boolean>(true);
  // container for horizontal scrolling
  const containerRef = useRef<HTMLDivElement>(null);
  // last year
  const lastDiscoveryYear = Math.max(...discoveryYear);
  // horizontal scorlling with 5 times more fast speed
  useEffect(() => {
    const container = containerRef.current;
    const handleWheel = (e: WheelEvent) => {
      if (container) {
        container.scrollLeft += e.deltaY * 5;
      }
    };

    container?.addEventListener("wheel", handleWheel);
    return () => container?.removeEventListener("wheel", handleWheel);
  }, []);
  const [visibleCard, setVisibleCard] = useState<string>("0");
  // track which date is in the vp
  const cardRefs = useRef(new Map());
  // Update handleBack function to center the card

  const handleBack = (): void => {
    const currentHash = window.location.hash.slice(1);
    if (currentHash === "next") {
      // If we're at "next", navigate to the last date
      const lastDateIndex = discoveryYear.length - 1;
      scrollToCard(discoveryYear[lastDateIndex]);
      setHasNext(false); // Disable the next button as we're at the last date
      setHasPrev(true); // There's always a previous date from the last
    } else {
      const currentIndex = discoveryYear.indexOf(Number(currentHash));
      let newIndex = currentIndex - 1;
      if (newIndex < 0) {
        newIndex = discoveryYear.length - 1; // Wrap to last if at first
      }
      scrollToCard(discoveryYear[newIndex]);
      setHasNext(true); // Enable next since we moved back
      setHasPrev(newIndex !== 0);
    }
  };

  // Updated handleNext function to include setting hash to "next" at the end
  const handleNext = (): void => {
    const currentHash = window.location.hash.slice(1);
    const currentIndex = discoveryYear.indexOf(Number(currentHash));
    let newIndex = currentIndex + 1;
    if (newIndex >= discoveryYear.length) {
      // If moving past the last date, set hash to "next"
      window.location.hash = "next";
      setHasNext(false); // Disable next button as we're at the end
      setHasPrev(true); // Enable back as there's always a previous item from "next"
    } else {
      scrollToCard(discoveryYear[newIndex]);
      setHasPrev(true); // Enable prev since we can always go back
      setHasNext(true); // Enable next since we're not at the end
    }
  };

  // Function to scroll the container to center the card
  const scrollToCard = (year: number) => {
    const card = cardRefs.current.get(year);
    if (card && containerRef.current) {
      const container = containerRef.current;
      const cardLeft = card.offsetLeft;
      const cardWidth = card.offsetWidth;
      const containerWidth = container.offsetWidth;
      const scrollTo = cardLeft - containerWidth / 2 + cardWidth / 2;
      container.scrollLeft = scrollTo;
      window.location.hash = String(year); // Update the hash to the new year
    }
  };

  useEffect(() => {
    const hashChangeHandler = () => {
      const year = window.location.hash.slice(1);
      if (year) {
        scrollToCard(Number(year));
      }
    };

    // Listen for hash changes to handle browser back/forward
    window.addEventListener("hashchange", hashChangeHandler);
    return () => {
      window.removeEventListener("hashchange", hashChangeHandler);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            setVisibleCard(id as string);
            window.location.hash = `${id}`;
          }
        });
      },
      {
        threshold: 1,
      }
    );
    cardRefs.current.forEach((ref) => observer.observe(ref));

    return () => observer.disconnect();
  }, []);

  const getEvent = (year: number) => {
    return data.filter((d) => d.date === year);
  };
  return (
    <Flex
      className={quicksand.className}
      ref={containerRef}
      bgImage={"/timeline/timelinebg.png"}
      bgPosition={"center"}
      bgSize={"cover"}
      alignItems={"flex-end"}
      overflowX={"scroll"}
      position={"absolute"}
      top={"0"}
      h={"100vh"}
      w={"full"}
    >
      <Flex h={["100vh", "100vh"]} direction={"column"} gap={"0px"}>
        <Flex px={"10px"} my={"20px"} justify={"center"}>
          {years.map((year, index) => (
            <>
              <Flex key={index} w={["400px", "400px"]} alignItems={"center"}>
                {discoveryYear.includes(year) && (
                  <Box
                    key={index}
                    id={String(year)}
                    ref={(el) => cardRefs.current.set(year, el)}
                  >
                    <Card
                      key={1}
                      title={getEvent(year)[0].title}
                      subtitle={getEvent(year)[0].desc}
                      imageUrl={getEvent(year)[0].img}
                      date={year}
                      whyItMatters={getEvent(year)[0].whyItMatters}
                      whyItMattersImg={getEvent(year)[0].whyItMattersImg}
                    />
                  </Box>
                )}
              </Flex>{" "}
              {year === lastDiscoveryYear &&
                index === years.findIndex((y) => y === lastDiscoveryYear) && (
                  <EndCard onRestart={handleNext} />
                )}
            </>
          ))}
        </Flex>
        <Flex
          px={"10px"}
          my={"0"}
          mb={"-4px"}
          scaleX={"smooth"}
          overflowX={"scroll"}
        >
          {years.map((year, index) => (
            <Flex key={index} w={["400px", "400px"]} alignItems={"center"}>
              {discoveryYear.includes(year) && (
                <Flex
                  key={index}
                  direction={"column"}
                  w={["400px", "400px"]}
                  alignItems={"center"}
                  my={"0"}
                >
                  <Text
                    h={"15px"}
                    rounded={"full"}
                    w={"15px"}
                    bg={"red"}
                    my={"0"}
                    fontWeight={700}
                  />
                </Flex>
              )}
            </Flex>
          ))}
        </Flex>
        <Flex p={"10px"} scaleX={"smooth"} borderTop={"1px solid black"}>
          {years.map((year, index) => (
            <Flex
              key={index}
              direction={"column"}
              w={["400px", "400px"]}
              mt={"-10px"}
              alignItems={"center"}
            >
              <Box
                h={"15px"}
                w={year % 10 === 0 ? "2px" : "1px"}
                bg={"black"}
              />
              <Text fontWeight={700}>{year}</Text>
            </Flex>
          ))}
        </Flex>{" "}
        <IconButton
          position={"fixed"}
          zIndex={1011}
          top={"50%"}
          left={"10px"}
          aria-label="back"
          onClick={handleBack}
          bg={"white"}
          isDisabled={!hasPrev}
          rounded={"full"}
          icon={<AiFillLeftCircle size={"40px"} color={COLOR.ORANGERED} />}
        />{" "}
        <IconButton
          position={"fixed"}
          onClick={handleNext}
          isDisabled={!hasNext}
          zIndex={100}
          top={"50%"}
          right={"10px"}
          aria-label="Next"
          bg={"white"}
          rounded={"full"}
          icon={<AiFillRightCircle size={"40px"} color={COLOR.ORANGERED} />}
        />
      </Flex>
    </Flex>
  );
}
