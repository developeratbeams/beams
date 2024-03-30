"use client";
import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Container, Flex, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import useWriterInstruction from "@/hooks/useWriterIns";

export const WriterInstruction = () => {
  const modal = useWriterInstruction();

  const handleClose = () => {
    modal.onClose();
  };

  return <PopUp isOpen={modal.isOpen} onClose={handleClose} />;
};

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
}

const PopUp = ({ isOpen, onClose }: ModalProps) => {
  const [videoProgress, setVideoProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      const progress = (video.currentTime / video.duration) * 100;
      setVideoProgress(progress);
    };

    video.addEventListener("timeupdate", updateProgress);

    // This function will be called on component unmount or video change
    return () => video.removeEventListener("timeupdate", updateProgress);
  }, [isOpen]); // Depend on isOpen to rebind event listeners when the modal opens

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const modalVariants = {
    hidden: {
      opacity: 0,
      y: "100%",
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        type: "spring",
        damping: 15,
      },
    },
  };

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      display="flex"
      justifyContent="center"
      alignItems="center"
      zIndex={11}
      sx={{
        bg: "white",
      }}
    >
      <motion.div
        className="modal-overlay"
        initial="hidden"
        animate={isOpen ? "visible" : "hidden"}
        variants={modalVariants}
        style={{ margin: "auto" }}
      >
        <Container
          p="10px"
          bg="white"
          maxW="1xl"
          borderRadius="10px"
          boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
          maxHeight="100vh"
          overflowY="auto"
        >
          <Box>
            <video
              ref={videoRef}
              style={{
                display: "flex",
                width: "42rem",
              }}
              width="300"
              height="240"
              autoPlay
              controls
            >
              <source
                src="https://res.cloudinary.com/drlyyxqh9/video/upload/v1711041130/product_tour_-_kqg5np.mp4"
                type="video/mp4"
              />
            </video>
          </Box>
        </Container>
        {Math.round(videoProgress) > 95 && (
          <Flex w="full" justifyContent="center" mt="20px">
            <Button
              bg="purple.500"
              color="white"
              _hover={{ bg: "purple.600" }}
              onClick={onClose}
              disabled={videoProgress < 98}
            >
              Start Writing
            </Button>
          </Flex>
        )}
      </motion.div>
    </Box>
  );
};
