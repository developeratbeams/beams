"use client";
import React from "react";
import { PopUp } from "@/components/modal/PopUp";
import useCompleteModuleModal from "@/hooks/useCompleteModule";
import { useRouter } from "next/navigation";
export const CompleteModule = () => {
  const router = useRouter();
  const modal = useCompleteModuleModal();
  const handleClose = () => {
    modal.onClose();
  };
  return (
    <PopUp
      isOpen={modal.isOpen}
      title="Module Mastery Unlocked!"
      subHeading="Congratulations! You've mastered this module. 
Explore other modules or revisit this one anytime!"
      imageUrl="/modals/completeModule.png"
      buttonText="Discover More"
      onClose={handleClose}
    />
  );
};
