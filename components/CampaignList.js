import { Box, Text } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { Web3Context } from "../context/Web3Context";
import Card from "./Card";

const CampaignList = () => {
    const [campaigns, setCampaign] = useState([]);
  const { account, fetchCampaigns,fetchSCampaigns, connectWallet,chainId } = useContext(Web3Context);
  useEffect(() => {
    if (account && chainId==80001) {
      fetchCampaigns().then((item) => setCampaign(item));
      console.log(campaigns);
    }
    else if (account && chainId!=80001) {
      fetchSCampaigns().then((item) => setCampaign(item));
      console.log(campaigns);
    }
  }, [account]);
  return (
    <Box maxW={"7xl"} w="full" display={"flex"} gap={4} flexWrap={"wrap"} alignSelf="center">
       {campaigns ? (
        campaigns.map((c, i) => {
          return <Card key={i} c={c} t={"display"} />;
        })
      ) : (
        <Text>No campaign found </Text>
      )}
    </Box>
  );
};

export default CampaignList;
