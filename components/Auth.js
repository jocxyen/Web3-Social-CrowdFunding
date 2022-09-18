import { Flex, HStack, Text, VStack, Button } from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";
import { Web3Context } from "../context/Web3Context";
import Avatar from "boring-avatars";
import truncateMiddle from "../utils/truncateMiddle";

export default function Auth() {
  const { account, connectWallet, checkIfWalletConnected } =
    useContext(Web3Context);

  if (!account) {
    connectWallet();
    console.log(account);
  }

  if (account)
    return (
      <Flex alignItems={"center"} fontFamily={"mono"}>
        <HStack>
          <Avatar
            size={40}
            name={account}
            variant="beam"
            colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
          />
          ;
          <VStack
            display={{ base: "none", md: "flex" }}
            alignItems="flex-start"
            spacing="1px"
            ml="2"
          >
            <Text fontSize="sm">{truncateMiddle(account)}</Text>
          </VStack>
        </HStack>
      </Flex>
    );
  else return <Button onClick={connectWallet} colorScheme={"teal"} fontWeight="thin">Connect</Button>;
}
