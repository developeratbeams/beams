"use client";
import React from "react";
import { PopUp } from "@/components/modal/PopUp";
import useWelcomeModal from "@/hooks/useWelcomeModal";
export const WelcomeModal = () => {
  const modal = useWelcomeModal();

  const handleClose = () => {
    modal.onClose();
  };
  return (
    <PopUp
      isOpen={modal.isOpen}
      title="Welcome To Beams"
      subHeading="You're in, explorer! But first, let's fuel up your curiosity. Answer some questions, shall we?"
      imageUrl="/modals/welcome.png"
      buttonText="Start"
      onClose={handleClose}
    />
  );
};
