import {
    Box,
    Flex,
    Link,
    Progress,
    Text,
  } from "@chakra-ui/react";
  import truncateMiddle from "../utils/truncateMiddle.js";
  import Image from "next/image";
  import React from "react";
  import NextLink from 'next/link'

  const Card = ({ c, t }) => {
    console.log({ c });
    return (
      <NextLink href={{ pathname: '/campaigns/campaign-details', query: c }}>
        <Box display={"flex"} flex={1}  cursor={"pointer"}>
        <Box
          pos={"relative"}
          p={2}
          boxShadow={"md"}
          borderWidth={1}
          borderRadius="md"
          borderColor={"gray"}
          maxW={300}
          minW={280}
          display="flex"
          flexDir={"column"}
        >
          <Image
            src={`https://ipfs.io/ipfs/${c.cover}`}
            width={250}
            height={250}
            objectFit="cover"
            alt="Homeless African"
          />
          <Text fontWeight={700} fontSize={"lg"} noOfLines={1}>
            {c.title}
          </Text>
          <Text noOfLines={2}>{c.desc}</Text>{" "}
          <Text fontSize={"xs"} color="gray.400">
            By{" "}
            <Link
              href={`https://mumbai.polygonscan.com/address/${c.creator}`}
              isExternal
            >
              {" "}
              {truncateMiddle(c.creator)}
            </Link>
          </Text>
          <Flex pt={2}>
            <Text fontWeight={700} color="blue.400">
              ${c.raised}&nbsp;
            </Text>
            <Text> raised out of ${c.target}</Text>
          </Flex>
          <Progress
            value={Number((c.raised * 100) / c.target)}
            size="xs"
            colorScheme="blue"
          />
           
        </Box>
      </Box>
      </NextLink>
    );
  };
  
  export default Card;
  