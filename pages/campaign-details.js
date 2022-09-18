import { useRouter } from 'next/router';
import truncateMiddle from "../utils/truncateMiddle.js";

import {
  Button,CircularProgress,Box,
  Text,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Flex,
  Progress,
  Container,
  Icon,
  Link,
} from "@chakra-ui/react";
import { FaLink, FaVideo } from "react-icons/fa";
import React, { useEffect, useState } from 'react'

const CampaignDetails = () => {
  const router = useRouter();
  const [c, setCampaign] = useState({
    raised:"",
    campIds: "",
    campaignAddr: "",
    campstate: "",
    cover: "",
    creator: "",
    deadline: "",
    desc: "",
    imgcid: "",
    imgs: [],
    pdf: "",
    raised: "",
    target: "",
    title: "",
    video: "",
    website: "",

  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!router.isReady) return;
    setCampaign(router.query);
    console.log(c)
    setIsLoading(false);
  }, [router.isReady]);

  if (isLoading) return <CircularProgress />;

  return (
    <Box p={10} pt={100} w={"100%"}>
    <Box
        display={"flex"}
        w="100%"
        top={0}
        gap={4}
        flexDir={{ base: "column", lg: "row" }}
    >
        <Box display={"flex"} flex={3} flexDir={"column"} gap={4}>
            <Box>
                <Image
                    src={`https://ipfs.io/ipfs/${c.cover}`}
                    objectFit={"contain"}
                    fit={"cover"}
                    align={"center"}
                    w={"100%"}
                    rounded={"lg"}
                    alt="cover"
                  />
                </Box>
                <Flex justifyContent={"space-between"} color={"gray.500"}>
                  <Text>
                    Created 4 days ago by{" "}
                    <Link
                      href={`https://mumbai.polygonscan.com/address/${c.creator}`}
                      isExternal
                    >
                      {truncateMiddle(c.creator)}
                    </Link>
                  </Text>
                </Flex>
                <Text fontSize={"xl"} fontWeight="bold" py={4}>
                  Story
                </Text>
                <Text>{c.desc}</Text>
                {c.imgs.map((img, i) => (
                  <Image
                    key={i}
                    alt={img}
                    src={`https://ipfs.io/ipfs/${c.imgcid}/${img}`}
                  />
                ))}
              </Box>
              <Container
                display={"flex"}
                flexDir="column"
                flex={1}
                boxShadow={"md"}
                p={4}
                rounded="md"
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
                    <Text>&nbsp;End on</Text>
                    <Text fontWeight={700}>{c.deadline}</Text>
                  </Flex>
                  {c.vid && (
                    <Flex gap={1} alignItems="center">
                      <Icon as={FaVideo} />
                      <Text fontWeight={700}>
                        &nbsp;
                        <Link href={c.vid} isExternal>
                          {c.vid}
                        </Link>
                      </Text>
                    </Flex>
                  )}
                  {c.website && (
                    <Flex gap={1} alignItems="center">
                      <Icon as={FaLink} />
                      <Text fontWeight={700}>
                        &nbsp;
                        <Link href={c.website} isExternal>
                          {c.website}
                        </Link>
                      </Text>
                    </Flex>
                  )}
                </Box>

                <InputGroup>
                  <InputLeftElement pointerEvents="none" fontSize="1.2em">
                    ◈
                  </InputLeftElement>

                  <Input
                    placeholder="Enter donation amount"
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </InputGroup>
                <Button
                  mt={2}
                  colorScheme={"blue"}
                  onClick={(e) => handleSubmit(e)}
                >
                  Donate Now 💪
                </Button>
              </Container>
            </Box></Box>
  )
}

export default CampaignDetails