import { Box } from "@chakra-ui/react";
import CampaignList from "../../components/CampaignList";

const Campaigns = () => {
  return (
    <Box p={10} pt={100} w={"100%"} mx="auto">
      <CampaignList />
    </Box>
  );
};

export default Campaigns;
