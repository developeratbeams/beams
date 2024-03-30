"use client";
import React from "react";
import { PopUp } from "@/components/modal/PopUp";
import useHalfModal from "@/hooks/useHalfQuizModal";
export const HalfQuizModal = () => {
  const modal = useHalfModal();

  const handleClose = () => {
    modal.onClose();
  };
  return (
    <PopUp
      isOpen={modal.isOpen}
      title="Quiz Whiz Alert!"
      subHeading="You're halfway to becoming a Quiz Master! Keep going and unlock more knowledge treasures"
      imageUrl="/modals/50centquiz.png"
      buttonText="Keep Quizzing"
      onClose={handleClose}
    />
  );
};
