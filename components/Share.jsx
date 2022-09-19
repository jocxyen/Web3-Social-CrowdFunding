import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { RWebShare } from "react-web-share";
const Share = () => {
  return (
    <Box alignItems={"center"} justifyContent="center" display={"flex"}>
      <RWebShare
        data={{
          text: "Like humans, flamingos make friends for life",
          url: "/",
          title: "Share this article on Flamingos",
        }}
        onClick={() => console.info("share successful!")}
      >
        <Text color="blue.300" cursor={"pointer"} pt={2} decoration="underline">
          Share
        </Text>
      </RWebShare>
    </Box>
  );
};

export default Share;
