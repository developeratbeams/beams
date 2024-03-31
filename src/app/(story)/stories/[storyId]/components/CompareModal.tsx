// comparison modal
import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Flex,
  Text,
  Image,
} from "@chakra-ui/react";
import { AiFillCloseCircle } from "react-icons/ai";
import { Quicksand } from "next/font/google";
const quicksand = Quicksand({ subsets: ["latin"] });
const ori = [
  "https://res.cloudinary.com/drlyyxqh9/image/upload/v1710605408/story-1/originals/image-1-65f55485ec021_hgfypr.webp",
  "https://res.cloudinary.com/drlyyxqh9/image/upload/v1711023825/story-1/originals/whatsapp-image-2024-03-21-at-174825-934bc045-65fc2631e9603_ivgk8h.webp",
  "https://res.cloudinary.com/drlyyxqh9/image/upload/v1710605522/story-1/originals/image-3-65f5548c1709d_ofslad.webp",
  "https://res.cloudinary.com/drlyyxqh9/image/upload/v1710605526/story-1/originals/image-4-65f5548e49551_uhwftz.webp",
  "https://res.cloudinary.com/drlyyxqh9/image/upload/v1710605533/story-1/originals/image-5-65f55492b4a45_mafikd.webp",
  "https://res.cloudinary.com/drlyyxqh9/image/upload/v1710605542/story-1/originals/image-6-65f554946cd3f_qaf6xe.webp",
  "https://res.cloudinary.com/drlyyxqh9/image/upload/v1710605548/story-1/originals/image-7-65f55498a69c7_msmfd0.webp",
  "https://res.cloudinary.com/drlyyxqh9/image/upload/v1710605556/story-1/originals/image-8-65f5549a918b2_njfceo.webp",
  "https://res.cloudinary.com/drlyyxqh9/image/upload/v1710605564/story-1/originals/image-9-65f5549db033d_tvaxxs.webp",
  "https://res.cloudinary.com/drlyyxqh9/image/upload/v1710605412/story-1/originals/image-10-65f554a060dcb_hahbdj.webp",
  "https://res.cloudinary.com/drlyyxqh9/image/upload/v1710605419/story-1/originals/image-11-65f554a2577fe_heqq9y.webp",
  "https://res.cloudinary.com/drlyyxqh9/image/upload/v1710605426/story-1/originals/image-12-65f554a6271b5_yuc0x6.webp",
  "https://res.cloudinary.com/drlyyxqh9/image/upload/v1710605436/story-1/originals/image-13-65f554a73a8ae_izh1dj.webp",
  "https://res.cloudinary.com/drlyyxqh9/image/upload/v1710605443/story-1/originals/image-14-65f554ab9f9e0_nfa1kq.webp",
  "https://res.cloudinary.com/drlyyxqh9/image/upload/v1710605448/story-1/originals/image-15-65f554ac85f85_cpmf4q.webp",
  "https://res.cloudinary.com/drlyyxqh9/image/upload/v1710605456/story-1/originals/image-16-65f554b24c2a0_rute3q.webp",
  "https://res.cloudinary.com/drlyyxqh9/image/upload/v1710605463/story-1/originals/image-17-65f554b2b68cb_drqsxp.webp",
  "https://res.cloudinary.com/drlyyxqh9/image/upload/v1710605471/story-1/originals/image-18-65f554ba6c4cf_rqxlhm.webp",
  "https://res.cloudinary.com/drlyyxqh9/image/upload/v1711028918/story-1/originals/image-20-65fc3a71b01d3_r4neok.webp",
];

function ComparisonModal({ isOpen, onClose, currentIndex }: any) {
  const [imageIndex, setImageIndex] = useState(currentIndex);
  useEffect(() => {
    setImageIndex(currentIndex);
  }, [currentIndex]);
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size={"5xl"}>
        <ModalOverlay
          sx={{
            bg: "white",
          }}
        />
        <ModalContent className={quicksand.className} my={"auto"}>
          <ModalCloseButton color={"gray"}>
            <AiFillCloseCircle size={"30px"} />
          </ModalCloseButton>

          <ModalBody>
            <Flex
              flex={1}
              w={"full"}
              gap={"20px"}
              direction={["column", "row"]}
            >
              <Flex
                justifyContent={"center"}
                alignItems={"center"}
                direction={"column"}
                flex={1}
                gap="10px"
              >
                <Text fontWeight={"bold"}>Original Slide</Text>
                <Image
                  h={"400px"}
                  src={ori[imageIndex]}
                  alt={`Canvas ${imageIndex}`}
                />
              </Flex>
              {/* <Flex
                justifyContent={"center"}
                alignItems={"center"}
                direction={"column"}
                flex={4}
                gap="10px"
              >
                <Text fontWeight={"bold"}>Your Slide</Text>
                <Image
                  h="full"
                  src={completedSlide[imageIndex]?.url}
                  alt={`Canvas ${imageIndex}`}
                />
              </Flex> */}
            </Flex>
          </ModalBody>
          <ModalFooter justifyContent={"center"}>
            <Text>
              {" "}
              {imageIndex === 0 ? "cover" : `Slide ${imageIndex}`}
            </Text>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ComparisonModal;
