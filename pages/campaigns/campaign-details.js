import React from "react";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { MdDateRange, MdEmail } from "react-icons/md";
import { LinkIcon } from "@chakra-ui/icons";
import { FaDonate } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import { Web3Context } from "../../context/Web3Context";
import truncateMiddle from "../../utils/truncateMiddle";

import Share from "../../components/Share";
import {
  Box,
  CircularProgress,
  Button,
  Container,
  Flex,
  Icon,
  Img,
  Input,
  InputGroup,
  InputLeftElement,
  Progress,
  Text,
  useColorModeValue,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
} from "@chakra-ui/react";
import { useLaunch } from "@relaycc/receiver";
import DonateModal from "../../components/DonateModal";
import Avatar from "boring-avatars";
const CampaignDetails = () => {
  const { chainId, fetchUserBalance } = useContext(Web3Context);

  const [isLoading, setIsLoading] = useState(true);
  const [showBalance, setShowBalance] = useState();
  const boxBg = useColorModeValue("", "gray.700");
  const launch = useLaunch();
  const [c, setC] = useState({
    raised: "",
    campIds: "",
    target: "",
    creator: "",
    campaignAddr: "",
    campstate: "",
    deadline: "",
    title: "",
    desc: "",
    imgs: "",
    imgs: "",
    imgcid: "",
    cover: "",
    pdf: "",
    website: "",
    video: "",
  });
  const router = useRouter();
  useEffect(() => {
    if (!router.isReady) return;
    setC(router.query);
    console.log(chainId);

    setIsLoading(false);
  }, [router.isReady]);

  useEffect(() => {
    async function fetchData() {
      console.log(c.creator);
      if (c.creator == "") return;
      const balance = await fetchUserBalance(c.creator);
      if (!balance) return ""
      try {
        const show = balance
          
          .map((i, index) => {
            return (
              <Text key={index} textAlign="center">
                {" "}
                {(i.balance / 10 ** i.contract_decimals).toFixed(2)}&nbsp;
                {i.contract_ticker_symbol}
              </Text>
            );
          });
        setShowBalance(show);
        console.log(showBalance)
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [c.creator]);
  if (isLoading)
    return (
      <Box p={10} pt={100} w={"100%"}>
        <CircularProgress />
      </Box>
    );
  return (
    <Box p={10} pt={100} w={"100%"}>
      <Text fontSize={"xx-large"} fontWeight={700} mb={4}>
        {c.title}
      </Text>
      <Box
        display={"flex"}
        w="100%"
        top={0}
        gap={4}
        flexDir={{ base: "column", lg: "row" }}
      >
        <Box display={"flex"} flex={3} flexDir={"column"} gap={4}>
          <Box>
            <Img
              src={`https://ipfs.io/ipfs/${c.cover}`}
              objectFit={"contain"}
              fit={"cover"}
              align={"center"}
              w={"100%"}
              rounded={"lg"}
            />
          </Box>
          <Flex color={"gray.500"}>
            <Text>Created 4 days ago by </Text>
            <Popover>
              <PopoverTrigger>
                <Text cursor={"pointer"}>
                  {" "}
                  &nbsp;{truncateMiddle(c.creator)}
                </Text>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>
                  <Box
                    alignItem="center"
                    justifyContent="center"
                    w="100%"
                    display="flex"
                  >
                    <Avatar
                      size={60}
                      name={c.creator}
                      variant="beam"
                      colors={[
                        "#92A1C6",
                        "#146A7C",
                        "#F0AB3D",
                        "#C271B4",
                        "#C20D90",
                      ]}
                    />
                    <Link
                      href={
                        chainId == 80001
                          ? `https://mumbai.polygonscan.com/address/${c.creator}`
                          : `https://hackathon-complex-easy-naos.explorer.eth-online.skalenodes.com/address/${c.creator}/transactions`
                      }
                      isExternal
                    >
                      <Text p={4}>{truncateMiddle(c.creator)}</Text>
                    </Link>
                  </Box>
                </PopoverHeader>
                <PopoverBody><Text fontWeight={700} textAlign="center">Account Balance</Text>{showBalance}</PopoverBody>
              </PopoverContent>
            </Popover>
          </Flex>
          <Text fontSize={"xl"} fontWeight="bold" py={4}>
            Details
          </Text>
          <ReactMarkdown>{c.desc}</ReactMarkdown>
          {c.video.includes("you") && (
            <iframe
              width="734"
              height="413"
              src={`${c.video.replace(
                "https://youtu.be/",
                "https://www.youtube.com/embed/"
              )}`}
              title="'What's going on in the Algorand Ecosystem' at University of Florida's Blockchain Lab session."
              frameBorder="0"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          )}
        </Box>
        <Container
          display={"flex"}
          flexDir="column"
          flex={1}
          boxShadow={"lg"}
          p={4}
          rounded="md"
          bgColor={boxBg}
          height={"min-content"}
          pos="sticky"
          top={20}
        >
          <Box
            gap={3}
            display={"flex"}
            flexDir="column"
            justifyContent={"center"}
            p={4}
            pb={8}
          >
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Text fontWeight={700} fontSize={"md"}>
                ◈{c.raised} raised&nbsp;
              </Text>
              <Text fontSize={"md"} fontWeight={700}>
                ◈{c.target}
              </Text>
            </Box>
            <Box w="90%" mx={"auto"} mb={4}>
              <Progress
                value={Number((c.raised * 100) / c.target)}
                size="sm"
                colorScheme="blue"
                rounded={"lg"}
              />
            </Box>
            <Flex gap={1} alignItems="center">
              <Icon as={FaDonate} />
              <Text fontWeight={700}>&nbsp;100</Text>
              <Text>Supporters</Text>
            </Flex>
            <Flex gap={1} alignItems="center">
              <Icon as={MdDateRange} />
              <Text>&nbsp;End on</Text>
              <Text fontWeight={700}>{c.deadline}</Text>
            </Flex>
            <Flex gap={1} alignItems="center">
              <LinkIcon />
              <Text>&nbsp;{c.website}</Text>
            </Flex>
          </Box>

          <InputGroup>
            <InputLeftElement pointerEvents="none" fontSize="1.2em">
              ◈
            </InputLeftElement>

            <Input placeholder="Enter donation amount" />
          </InputGroup>
          <DonateModal />
          <Button onClick={() => launch(c.creator)}>Get in touch</Button>
          <Share />
        </Container>
      </Box>
    </Box>
  );
};

export default CampaignDetails;
