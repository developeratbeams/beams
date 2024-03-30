import React, { useEffect, useState } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Image,
  Flex,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Spacer,
  useDisclosure,
} from "@chakra-ui/react";
import { AiOutlineComment } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import Link from "next/link";
import { COLOR } from "@/types/colors";
import { usePathname } from "next/navigation";
import { User } from "@/types/user.types";
import LogoutModal from "./LogoutModal";
import { BiHome } from "react-icons/bi";

interface DrawerProps {
  isOpenDrawer: boolean;
  onCloseDrawer: () => void;

  data: User | undefined;
}

export default function ProfileDrawer({
  isOpenDrawer,
  onCloseDrawer,
  data,
}: DrawerProps) {
  const [selectedLink, setSelectedLink] = useState<string | null>(null);
  const {
    isOpen: isOpenModal,
    onOpen: onOpenModal,
    onClose: onCloseModal,
  } = useDisclosure();

  const pathname = usePathname();

  const handleLinkClick = (link: string) => {
    setSelectedLink(link);
    onCloseDrawer();
  };
  useEffect(() => {
    setSelectedLink(pathname);
  }, [pathname]);
  const linkStyle = (link: string) => ({
    fontWeight: 500,
    color: selectedLink === link ? COLOR.ORANGE : "inherit",
  });

  return (
    <>
      <Drawer
        isOpen={isOpenDrawer}
        placement="right"
        size={["md", "xs"]}
        onClose={onCloseDrawer}
      >
        <DrawerOverlay />
        <DrawerContent p={["20px", "5px"]}>
          <DrawerCloseButton />

          <Image
            display={["block", "none"]}
            alt="beams"
            src="/assets/favicon.png"
            w={"90px"}
          />

          <DrawerBody mt={"30px"}>
            {data && (
              <Flex w="full" h="full" gap={"50px"} direction={"column"}>
                <Flex w="full" direction={"row"} gap={"10px"}>
                  {data && (
                    <Flex
                      w={"100px"}
                      h={"100px"}
                      rounded={"full"}
                      bgImage={data?.profilePictureUrls?.[0]?.url}
                      bgSize={"cover"}
                      bgRepeat={"no-repeat"}
                      bgPosition={"top"}
                      justifyContent={"flex-end"}
                      alignItems={"flex-end"}
                      position={"relative"}
                      border={`1px solid ${COLOR.YELLOW}`}
                    />
                  )}

                  <Flex direction={"column"} justifyContent={"center"}>
                    <Text fontWeight={700} fontSize={"18px"}>
                      {data?.firstName} {data?.lastName}
                    </Text>
                    <Text>{data?.grade}</Text>
                  </Flex>
                </Flex>{" "}
                <Link href={"/products"}>
                  <Flex mb={"-40px"} alignItems={"center"} gap={"10px"}>
                    <BiHome />
                    <Text fontWeight={500}>Home</Text>
                  </Flex>{" "}
                </Link>
                <Flex w="full" gap={"20px"} direction={"column"}>
                  <Accordion allowToggle m={0} p={0}>
                    <AccordionItem border={"none"}>
                      <AccordionButton w={"200px"} p={0} m={0} display={"flex"}>
                        <Flex alignItems={"center"} gap={"10px"}>
                          <CgProfile />
                          <Text fontWeight={500}>My Account</Text>
                        </Flex>
                        <Spacer />
                        <AccordionIcon />
                      </AccordionButton>

                      <AccordionPanel pt={"10px"} p={0}>
                        <Flex
                          mt={"10px"}
                          w="full"
                          ml={"25px"}
                          gap={"20px"}
                          direction={"column"}
                        >
                          <Flex
                            cursor={"pointer"}
                            alignItems={"center"}
                            gap={"10px"}
                          >
                            <Link href={"/home/edit-profile"}>
                              <Text
                                style={linkStyle("/home/edit-profile")}
                                onClick={() =>
                                  handleLinkClick("/home/edit-profile")
                                }
                              >
                                My Profile{" "}
                              </Text>
                            </Link>
                          </Flex>
                          <Flex
                            cursor={"pointer"}
                            alignItems={"center"}
                            gap={"10px"}
                          >
                            <Link href={"/home/my-journey"}>
                              <Text
                                style={linkStyle("/home/my-journey")}
                                onClick={() =>
                                  handleLinkClick("/home/my-journey")
                                }
                              >
                                My Journey
                              </Text>
                            </Link>
                          </Flex>
                          <Flex
                            cursor={"pointer"}
                            alignItems={"center"}
                            gap={"10px"}
                          >
                            <Link href={"/home/your-activity"}>
                              <Text
                                style={linkStyle("/home/your-activity")}
                                onClick={() =>
                                  handleLinkClick("/home/your-activity")
                                }
                              >
                                My Activity
                              </Text>
                            </Link>
                          </Flex>
                        </Flex>
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>
                  <Flex cursor={"pointer"} alignItems={"center"} gap={"10px"}>
                    <AiOutlineComment />
                    <Link href={"/contact-us"}>
                      <Text
                        style={linkStyle("/contact-us")}
                        onClick={() => handleLinkClick("/contact")}
                      >
                        Contact
                      </Text>
                    </Link>
                  </Flex>

                  <Flex
                    alignItems={"center"}
                    gap={"10px"}
                    onClick={() => onOpenModal()}
                    cursor={"pointer"}
                  >
                    <FiLogOut />

                    <Text style={linkStyle("/privacy-policy")}>Logout</Text>
                  </Flex>
                </Flex>
              </Flex>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <LogoutModal isOpen={isOpenModal} onClose={onCloseModal} />
    </>
  );
}
