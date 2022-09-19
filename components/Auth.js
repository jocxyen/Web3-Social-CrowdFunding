import { Flex, HStack, Text, VStack, Button } from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";
import { Web3Context } from "../context/Web3Context";
import Avatar from "boring-avatars";
import truncateMiddle from "../utils/truncateMiddle";
import { FiChevronDown } from "react-icons/fi";
import Link from "next/link";

export default function Auth() {
  const { account, connectWallet, checkIfWalletConnected } =
    useContext(Web3Context);

  useEffect(()=>{
  if (!account) {
    connectWallet();
    console.log(account);
  }},[])

  if (account)
    return (
      <Flex alignItems={"center"} fontFamily={"mono"}>
        <Menu>
          <MenuButton transition="all 0.3s" _focus={{ boxShadow: "none" }}>
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
              <Box display={{ base: "none", md: "flex" }}>
                <FiChevronDown />
              </Box>
            </HStack>
          </MenuButton>
          <MenuList borderColor={"gray.500"}>
            <MenuItem>
              <Link href={"/dashboard"}>Dashboard</Link>
            </MenuItem>

            <MenuDivider />
            <MenuItem onClick={disconnect}>Sign out</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    );
  else return <Button onClick={connectWallet} colorScheme={"teal"} fontWeight="thin">Connect</Button>;
}
