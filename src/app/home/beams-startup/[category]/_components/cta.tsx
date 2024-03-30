"use client";
//  custom cta in the drawer due to small sizr
import React, { useState } from "react";
import { Button } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { MdArrowForwardIos } from "react-icons/md";
import Link from "next/link";

interface AnimatedButtonProps {
  text: string;
  bg: string;
  href: string | undefined;
  onClick?: () => void;
}
const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  text,
  bg,
  href,
  ...props
}) => {
  const [isClicked, setIsClicked] = useState(false);

  const arrowVariants = {
    initial: {
      x: "0%", // Start off-screen to the left
      opacity: 1,
    },
    animate: {
      x: "100%", // End off-screen to the right
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "linear", // Smoother acceleration at the start
        type: "spring", // Add springiness for a natural feel
        stiffness: 200, // Adjust stiffness for desired feel
      },
    },
  };

  const textVariants = {
    initial: { opacity: 1 },
    exit: {
      opacity: 0,
      transition: { duration: 0.8, ease: "easeInOut" }, // Ensure this matches the arrow's transition
    },
  };

  const handleButtonClick = () => {
    setIsClicked(true);
    if (props.onClick) props.onClick();
  };

  return (
    <Link href={href!}>
      <Button
        onClick={handleButtonClick}
        _hover={{}}
        fontWeight={600}
        fontSize={["12px", "16px"]}
        w={"fit-content"}
        bg={bg}
        color={"white"}
        position="relative"
        {...props}
        gap={"10px"}
      >
        <motion.div>
          <MdArrowForwardIos />
        </motion.div>
        <AnimatePresence>
          {!isClicked && (
            <motion.div variants={textVariants} exit="exit">
              {text}
            </motion.div>
          )}
        </AnimatePresence>
      </Button>
    </Link>
  );
};

export default AnimatedButton;
