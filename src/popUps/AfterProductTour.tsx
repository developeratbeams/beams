"use client";
import React from "react";
import { PopUp } from "@/components/modal/PopUp";
import useProductTourModal from "@/hooks/useAfterProductTourModal";
export const AfterProductTourModal = () => {
  const modal = useProductTourModal();

  const handleClose = () => {
    modal.onClose();
  };
  return (
    <PopUp
      isOpen={modal.isOpen}
      title="Brace for Blastoff, Super Star!"
      subHeading="You aced the tour! Ready to conquer the galaxy of knowledge?"
      imageUrl="/modals/afterProductTour.png"
      buttonText="Launch Me In"
      onClose={handleClose}
    />
  );
};
