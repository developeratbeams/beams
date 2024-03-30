"use client";
import React from "react";
import { PopUp } from "@/components/modal/PopUp";
import useAftergetStartedModal from "@/hooks/useAftergetStartedModal";
export const AftergetStartedModal = () => {
  const modal = useAftergetStartedModal();

  const handleClose = () => {
    modal.onClose();
  };
  return (
    <PopUp
      isOpen={modal.isOpen}
      title="Beam-tastic!"
      subHeading="Hold onto your space helmets! The adventure begins now. Get ready for some cosmic fun!"
      imageUrl="/modals/aftergetStarted.png"
      buttonText="Let's Go"
      onClose={handleClose}
    />
  );
};
