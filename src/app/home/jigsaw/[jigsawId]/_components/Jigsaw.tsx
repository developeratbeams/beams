"use client";
import React, { useEffect, useState, useTransition } from "react";
import "./puzzle.css";
import { JigsawPuzzle } from "react-jigsaw-puzzle/lib";
import "react-jigsaw-puzzle/lib/jigsaw-puzzle.css";
import {
  Box,
  Button,
  Container,
  Flex,
  IconButton,
  Image,
  Text,
  useToast,
} from "@chakra-ui/react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { COLOR } from "@/types/colors";
import { FaChevronDown } from "react-icons/fa6";

import QuitModal from "./QuitModal";
import { JigSaw, User } from "@/types/user.types";
import { DIFFICULTY } from "@/types/constants";
import { saveJigsawAttempt } from "@/actions/jigsaw";
import KnowledgeModal from "./KnowledgeModal";
import { RxCross2 } from "react-icons/rx";
import "./styles.css";
interface JigsawProps {
  jigSaw: JigSaw;
  user: User;
}
function Jigsaw({ jigSaw, user }: JigsawProps) {
  // level
  const [levelNo, setLevelNo] = useState(2);
  //  toggle original and editor
  const [isOrginalSet, setIsOriginal] = useState(false);
  // knowledge modal after completion
  const {
    isOpen: isKnowledgeModalOpen,
    onOpen: onKnowledgeModalOpen,
    onClose: onKnowledgeModaClose,
  } = useDisclosure();
  // quit modal
  const {
    isOpen: isQuitModalOpen,
    onOpen: onQuitModalOpen,
    onClose: onQuitModalClose,
  } = useDisclosure();
  // toast
  const toast = useToast({ position: "top", isClosable: true });
  // level text
  const [level, setLevel] = useState<DIFFICULTY>(DIFFICULTY.EASY);
  // hook for quiting the game
  const [quiting, startQuiting] = useTransition();
  // automatically submitted func on completion of the game
  const solved = () => {
    // play claps
    const audio = new Audio("/jigsaw/Claps.mp3");
    audio.play().catch((e) => console.error("Audio playback failed", e));
    // payload for api.
    const body = {
      difficulty: level as DIFFICULTY,
      jigSawId: jigSaw.id as string,
    };

    // save the attempt
    saveJigsawAttempt(body)
      .then(() => {
        onKnowledgeModalOpen();
      })
      .catch((err) => toast({ title: JSON.stringify(err), status: "error" }));
  };
  // func to handle quit
  const handleQuit = () => {
    const body = {
      quit: true as boolean,
      jigSawId: jigSaw.id as string,
    };
    // save the quit to the datbase
    startQuiting(() => {
      saveJigsawAttempt(body)
        .then(() => {
          onKnowledgeModalOpen();
        })
        .catch((err) => toast({ title: JSON.stringify(err), status: "error" }));
    });
  };
  // change the image pieces and level
  useEffect(() => {
    if (level === "EASY") setLevelNo(2);
    else if (level === "MEDIUM") setLevelNo(4);
    else setLevelNo(6);
  }, [level]);

  return (
    <>
      <Flex
        w="full"
        h={"100vh"}
        mt={"10px"}
        mb={"50px"}
        direction={"column"}
        gap={["50px", "30px"]}
      >
        <Flex
          direction={["column-reverse", "row"]}
          justifyContent={"space-between"}
          gap={["50px", "20px"]}
          px={"20px"}
        >
          <Flex>
            {/* Image to click on shows the original image */}
            <Image
              mx={["auto", "0"]}
              w={["250px", "120px"]}
              onClick={() => setIsOriginal(!isOrginalSet)}
              cursor="pointer"
              rounded={"10px"}
              src={String(jigSaw?.image?.[0].url!)}
              alt="beams"
            />{" "}
          </Flex>
          <Flex justifyContent={"space-between"} gap={"20px"}>
            {/*  Level setting  */}
            <Popover>
              <PopoverTrigger>
                <Button
                  bg="inherit"
                  p={"0"}
                  variant={"outline"}
                  border={`1px solid ${COLOR.GREEN}`}
                >
                  <Flex
                    w={["250px", "250px"]}
                    p={"10px"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Flex alignItems={"center"} gap={"12px"}>
                      <Image
                        src={`/svgs/${
                          level.charAt(0).toUpperCase() +
                          level.slice(1).toLowerCase()
                        }.svg`}
                        alt="beams"
                      />

                      <Text fontWeight={600}>
                        {level.charAt(0).toUpperCase() +
                          level.slice(1).toLowerCase()}
                      </Text>
                    </Flex>

                    <FaChevronDown />
                  </Flex>
                </Button>
              </PopoverTrigger>
              <PopoverContent
                w={["250px", "250px"]}
                border={`1px solid ${COLOR.GREEN}`}
              >
                <PopoverBody>
                  <Flex direction={"column"} gap={"10px"} w="full">
                    <Flex
                      justifyContent={"space-between"}
                      w="full"
                      alignItems={"flex-end"}
                      p={"10px"}
                      cursor={"pointer"}
                      onClick={() => {
                        setLevel(DIFFICULTY.EASY);
                      }}
                      color={
                        level === DIFFICULTY.EASY ? COLOR.GREEN : "#999696"
                      }
                    >
                      <Text fontWeight={600} fontSize={"16px"}>
                        Easy
                      </Text>
                      <Flex gap={"5px"}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="26"
                          viewBox="0 0 24 26"
                          fill="none"
                        >
                          <g clip-path="url(#clip0_1180_240)">
                            <path
                              d="M17.3453 24.4764H17.1115V20.9256C17.1115 20.0223 16.4348 19.2875 15.603 19.2875H8.397C7.5652 19.2875 6.88852 20.0223 6.88852 20.9256V24.4764H6.65466C6.26719 24.4764 5.95312 24.8175 5.95312 25.2382C5.95312 25.6589 6.26723 26 6.65466 26H17.3453C17.7328 26 18.0468 25.6589 18.0468 25.2382C18.0468 24.8175 17.7328 24.4764 17.3453 24.4764Z"
                              fill={
                                level === DIFFICULTY.EASY
                                  ? COLOR.GREEN
                                  : "#999696"
                              }
                            />
                            <path
                              d="M8.10621 4.34789L9.5568 5.4731C9.62065 5.52266 9.64741 5.60889 9.62341 5.68775L9.06935 7.50846C8.94827 7.90628 9.07226 8.32442 9.38515 8.5736C9.70329 8.82705 10.1164 8.82989 10.4375 8.58091L11.8881 7.45565C11.9541 7.40446 12.0463 7.40431 12.1125 7.45565L13.5631 8.58091C13.722 8.70416 13.9034 8.76571 14.0847 8.76571C14.2698 8.76571 14.4547 8.70162 14.6154 8.5736C14.9284 8.32442 15.0523 7.90628 14.9312 7.50846L14.3771 5.68775C14.3531 5.60889 14.3799 5.52266 14.4438 5.47315L15.8944 4.34789C16.2119 4.10155 16.3404 3.68347 16.2215 3.28265C16.1015 2.87772 15.7684 2.6161 15.3728 2.6161H13.5798C13.4976 2.6161 13.4257 2.56141 13.401 2.47995L12.8469 0.659242C12.725 0.258832 12.3927 0 12.0003 0C11.6079 0 11.2756 0.258832 11.1537 0.659293L10.5996 2.48005C10.5748 2.56146 10.5029 2.6161 10.4208 2.6161H8.62774C8.23216 2.6161 7.89898 2.87772 7.77902 3.28265C7.66019 3.68347 7.78863 4.1016 8.10621 4.34789Z"
                              fill={
                                level === DIFFICULTY.EASY
                                  ? COLOR.GREEN
                                  : "#999696"
                              }
                            />
                            <path
                              d="M14.6179 17.7643C13.9485 15.3364 13.6564 12.7938 13.7558 10.2629C13.3939 10.2065 13.0494 10.0557 12.7447 9.81957L12.0008 9.24219L11.2564 9.81957C10.9485 10.0582 10.6016 10.2055 10.2454 10.2609C10.3447 12.7928 10.0532 15.3359 9.38379 17.7643H14.6179Z"
                              fill={
                                level === DIFFICULTY.EASY
                                  ? COLOR.GREEN
                                  : "#999696"
                              }
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_1180_240">
                              <rect width="24" height="26" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                        <Text fontWeight={600}>300 Beams</Text>
                      </Flex>
                    </Flex>
                    <Flex
                      justifyContent={"space-between"}
                      w="full"
                      alignItems={"flex-end"}
                      p={"10px"}
                      cursor={"pointer"}
                      color={
                        level === DIFFICULTY.MEDIUM ? COLOR.GREEN : "#999696"
                      }
                      onClick={() => {
                        setLevel(DIFFICULTY.MEDIUM);
                      }}
                    >
                      <Text fontWeight={600} fontSize={"16px"}>
                        Medium
                      </Text>
                      <Flex gap={"5px"}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="26"
                          viewBox="0 0 24 26"
                          fill="none"
                        >
                          <g clip-path="url(#clip0_1183_535)">
                            <path
                              d="M12.0071 19.7176C10.1239 19.7176 8.36334 19.139 6.86792 18.1376L4.85449 23.918L7.8382 23.7045L9.94775 26L12.0071 20.0876L14.0665 26L16.1763 23.7045L19.1598 23.918L17.1464 18.1376C15.6511 19.139 13.8906 19.7176 12.0071 19.7176Z"
                              fill={
                                level === DIFFICULTY.MEDIUM
                                  ? COLOR.GREEN
                                  : "#999696"
                              }
                            />
                            <path
                              d="M20.4044 9.09718C20.4044 4.08095 16.6373 0 12.0068 0C7.3764 0 3.60938 4.08095 3.60938 9.09718C3.60938 14.1136 7.3764 18.1946 12.0068 18.1946C16.6373 18.1946 20.4044 14.1136 20.4044 9.09718ZM6.07892 9.09718C6.07892 5.55618 8.73816 2.67534 12.0068 2.67534C15.2756 2.67534 17.9348 5.55618 17.9348 9.09718C17.9348 12.6384 15.2756 15.5192 12.0068 15.5192C8.73816 15.5192 6.07892 12.6384 6.07892 9.09718Z"
                              fill={
                                level === DIFFICULTY.MEDIUM
                                  ? COLOR.GREEN
                                  : "#999696"
                              }
                            />
                            <path
                              d="M16.5291 9.09718C16.5291 6.39606 14.5007 4.19858 12.0071 4.19858C9.51379 4.19858 7.48535 6.39606 7.48535 9.09718C7.48535 11.7985 9.51379 13.996 12.0071 13.996C14.5007 13.996 16.5291 11.7985 16.5291 9.09718Z"
                              fill={
                                level === DIFFICULTY.MEDIUM
                                  ? COLOR.GREEN
                                  : "#999696"
                              }
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_1183_535">
                              <rect width="24" height="26" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                        <Text fontWeight={600}>600 Beams</Text>
                      </Flex>
                    </Flex>
                    <Flex
                      justifyContent={"space-between"}
                      w="full"
                      alignItems={"flex-end"}
                      p={"10px"}
                      cursor={"pointer"}
                      color={
                        level === DIFFICULTY.HARD ? COLOR.GREEN : "#999696"
                      }
                      onClick={() => {
                        setLevel(DIFFICULTY.HARD);
                      }}
                    >
                      <Text fontWeight={600} fontSize={"16px"}>
                        Hard
                      </Text>
                      <Flex gap={"5px"}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="26"
                          viewBox="0 0 24 26"
                          fill="none"
                        >
                          <g clip-path="url(#clip0_1183_539)">
                            <path
                              d="M15.4912 6.64044C15.4912 7.01277 15.7706 7.31548 16.1143 7.31548C16.458 7.31548 16.7376 7.01277 16.7376 6.64044C16.7376 6.26811 16.458 5.96521 16.1143 5.96521C15.7706 5.96521 15.4912 6.26811 15.4912 6.64044Z"
                              fill={
                                level === DIFFICULTY.HARD
                                  ? COLOR.GREEN
                                  : "#999696"
                              }
                            />
                            <path
                              d="M11.3896 10.3887C11.3896 10.7611 11.6691 11.064 12.0128 11.064C12.3564 11.064 12.636 10.7611 12.636 10.3887C12.636 10.0164 12.3564 9.7137 12.0128 9.7137C11.6691 9.7137 11.3896 10.0164 11.3896 10.3887Z"
                              fill={
                                level === DIFFICULTY.HARD
                                  ? COLOR.GREEN
                                  : "#999696"
                              }
                            />
                            <path
                              d="M6.45508 22.5598H17.5436V26H6.45508V22.5598Z"
                              fill={
                                level === DIFFICULTY.HARD
                                  ? COLOR.GREEN
                                  : "#999696"
                              }
                            />
                            <path
                              d="M19.9537 1.75771V0H16.8173V4.57805C17.5908 4.88849 18.1437 5.69583 18.1437 6.64044C18.1437 7.85284 17.2333 8.83911 16.1142 8.83911C14.9952 8.83911 14.0848 7.85284 14.0848 6.64044C14.0848 5.69583 14.6376 4.88869 15.4111 4.57805V0H12.7158V8.32634C13.4892 8.63678 14.0422 9.44412 14.0422 10.3887C14.0422 11.6011 13.1318 12.5874 12.0126 12.5874C10.8937 12.5874 9.98328 11.6011 9.98328 10.3887C9.98328 9.44412 10.5361 8.63698 11.3095 8.32634V0H8.6142V4.57805C9.38763 4.88849 9.94061 5.69583 9.94061 6.64044C9.94061 7.85284 9.03021 8.83911 7.91107 8.83911C6.79211 8.83911 5.88171 7.85284 5.88171 6.64044C5.88171 5.69583 6.43451 4.88869 7.20795 4.57805V0H4.07153V1.75771H0.609375V6.15703C0.609375 8.47015 2.22437 10.382 4.29694 10.6397C4.93103 13.4584 6.85034 15.7374 9.34149 16.7045V21.0363H14.6541V16.7158C17.1597 15.7555 19.0915 13.4695 19.7281 10.6397C21.8009 10.382 23.4159 8.47015 23.4159 6.15703V1.75771H19.9537ZM2.01562 6.15703V3.28114H4.07153V8.60286C4.07153 8.75302 4.0752 8.90239 4.08234 9.05057C2.8949 8.71692 2.01562 7.54617 2.01562 6.15703ZM22.0096 6.15703C22.0096 7.54617 21.1304 8.71692 19.9429 9.05057C19.9501 8.90239 19.9537 8.75302 19.9537 8.60286V3.28114H22.0096V6.15703Z"
                              fill={
                                level === DIFFICULTY.HARD
                                  ? COLOR.GREEN
                                  : "#999696"
                              }
                            />
                            <path
                              d="M7.28809 6.64044C7.28809 7.01277 7.5675 7.31548 7.91119 7.31548C8.25488 7.31548 8.53448 7.01277 8.53448 6.64044C8.53448 6.26811 8.25488 5.96521 7.91119 5.96521C7.5675 5.96521 7.28809 6.26811 7.28809 6.64044Z"
                              fill={
                                level === DIFFICULTY.HARD
                                  ? COLOR.GREEN
                                  : "#999696"
                              }
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_1183_539">
                              <rect width="24" height="26" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                        <Text fontWeight={600}>900 Beams</Text>
                      </Flex>
                    </Flex>
                  </Flex>{" "}
                </PopoverBody>
              </PopoverContent>
            </Popover>
            {/* /Button to quit */}
            <Button
              color={"white"}
              _hover={{}}
              bg={"#f66"}
              onClick={onQuitModalOpen}
            >
              Quit
            </Button>
          </Flex>
        </Flex>
        {/* Game editor */}
        <Container maxW={"2xl"} display={!isOrginalSet ? "block" : "none"}>
          <JigsawPuzzle
            imageSrc={String(jigSaw?.image?.[0].url!) ?? ""}
            rows={levelNo}
            columns={levelNo}
            onSolved={solved}
          />
        </Container>
        <Container
          borderRadius={"10px"}
          maxW={"2xl"}
          display={isOrginalSet ? "flex" : "none"}
        >
          <Box position="relative">
            <Image
              border={"2px solid black"}
              rounded={"10px"}
              src={String(jigSaw?.image?.[0].url!)}
              alt="beams"
            />
            <IconButton
              right={0}
              top={0}
              position="absolute"
              aria-label="close"
              icon={<RxCross2 />}
              _hover={{}}
              onClick={() => setIsOriginal(!isOrginalSet)}
              bg={"white"}
              rounded={"full"}
              color={"black"}
            />
          </Box>
        </Container>
      </Flex>
      {/*shows when user quits */}
      <QuitModal
        loading={quiting}
        onQuit={handleQuit}
        isOpen={isQuitModalOpen}
        onClose={onQuitModalClose}
      />
      {/* Shows when user successfully solves */}
      <KnowledgeModal
        user={user}
        jigSawId={jigSaw.id as string}
        isOpen={isKnowledgeModalOpen}
        onClose={onQuitModalClose}
      />
    </>
  );
}

export default Jigsaw;
