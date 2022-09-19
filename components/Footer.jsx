import { Launcher, Window, useLaunch, useIsOpen } from "@relaycc/receiver";
import { useContext } from "react";
import { Web3Context } from "../context/Web3Context";
import {Box, LightMode, DarkMode} from "@chakra-ui/react"

const Footer = () => {
  const { SetWalletExample } = useContext(Web3Context);
    const launch = useLaunch();
    const isOpen = useIsOpen();
  return (

    <Box fontSize={"sm"} fontWeight="thin" color={"blue.400"}>
      <Window />
      <Launcher />
      <SetWalletExample />
    </Box>
  )
}

export default Footer