import React, {useEffect, useState } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { providerOptions } from "./web3Modal";
import * as UAuthWeb3Modal from "./UAuthWeb3";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import {
  ManagerAddr,
  ManagerABI,
  CampaignABI,
  ERC20ABI,
  DAI,
} from "./constant";

export const Web3Context = React.createContext();

const fetchERC20Contract = (address, signerOrProvider) => {
  return new ethers.Contract(address, ERC20ABI, signerOrProvider);
};

const fetchManagerContract = (signerOrProvider) => {
  return new ethers.Contract(ManagerAddr, ManagerABI, signerOrProvider);
};

const fetchCampaignContract = (address, signerOrProvider) => {
  return new ethers.Contract(address, CampaignABI, signerOrProvider);
};

export const Web3Provider = ({ children }) => {
  const [web3Modal, setWeb3Modal] = useState();
  const [currentAddress, setCurrentAddress] = useState("");
  const [provider, setProvider] = useState();
  const [library, setLibrary] = useState();
  const [account, setAccount] = useState();
  const [signature, setSignature] = useState("");
  const [error, setError] = useState("");
  const [chainId, setChainId] = useState();
  const [network, setNetwork] = useState();
  const [message, setMessage] = useState("");
  const [signedMessage, setSignedMessage] = useState("");
  const [signer, setSigner] = useState("");
  const [campaigns, setCampaigns] = useState([]);
  const toast = useToast();
  useEffect(() => {
    if (typeof window !== "undefined") {
      const web3modal = new Web3Modal({
        network: "polygon", // optional
        cacheProvider: true, // optional
        providerOptions, // required
      });

      setWeb3Modal(web3modal);
    }
  }, []);

  const fetchCampaigns = async () => {
    try {
      const contract = fetchManagerContract(library);
      const res = await contract.getTotalCampaigns();
      const count = res.toNumber();
      console.log("count:", count);
      const camps = await contract.getCampaignInfo(count);
      let campsList = [];
      console.log(camps);

      for (let i = 0; i < count; i++) {
        let raised = ethers.utils.formatEther(camps.totalRaised[i]._hex);
        let target = ethers.utils.formatEther(camps.target[i]._hex);
        let campIds = camps.campaignId[i]._hex;
        let campstate = camps.Status[i]._hex;
        let deadline;
        let cover;
        let imgs;
        let title;
        let desc;
        let website;
        let pdf;
        let imgcid;
        let video;
        let updates;
        await axios
          .get(`https://ipfs.io/ipfs/${camps.url[i]}/.json`)
          .then(async (res) => {
            console.log(res.data);
            title = res.data.title;
            desc = res.data.description;
            imgs = res.data.imgs;
            imgcid = res.data.imgCID;
            cover = res.data.image;
            pdf = res.data.pdf;
            deadline = res.data.deadline;
            website = res.data.website;
            video = res.data.video;
            updates = res.data.updates
          });

        let camp = {
          raised: raised,
          campIds: campIds,
          target: target,
          creator: camps.creator[i],
          campaignAddr: camps.campaignAddr[i],
          campstate: campstate,
          deadline: deadline,
          title: title,
          desc: desc,
          imgs: imgs,
          imgcid: imgcid,
          cover: cover,
          pdf: pdf,
          deadline: deadline,
          website: website,
          video: video,
          updates: updates
        };
        campsList.push(camp);
        console.log(camp);
      }
      setCampaigns(campsList);
      return campsList;
    } catch (err) {
      console.log(err);
    }
  };

  const connectWallet = async () => {
    try {
      console.log("trying to connect");
      const provider = await web3Modal.connect();
      const library = new ethers.providers.Web3Provider(provider);
      const signer = library.getSigner();
      setSigner(signer);
      const accounts = await library.listAccounts();
      const network = await library.getNetwork();
      setProvider(provider);
      setLibrary(library);
      if (accounts) {
        setAccount(accounts[0]);
        setCurrentAddress(accounts[0]);
      }
      setChainId(network.chainId);
    } catch (error) {
      setError(error);
    }
  };

  const disconnect = async () => {
    web3Modal.clearCachedProvider();
    setAccount();
    setChainId();
    setNetwork("");
    setMessage("");
    setSignature("");
  };

  const fetchUserNFTs = async (account) => {
    console.log(account);
    const options = {
        method: 'GET',
        url: `https://api.nftport.xyz/v0/accounts/${account}`,
        params: {chain: 'mumbai', page_size: '5', include: 'metadata'},
        headers: {'Content-Type': 'application/json', Authorization: process.env.NEXT_PUBLIC_NFTPORT_KEY}
      };
    await axios.request(options)
      .then(async (res) => {
        console.log(res);
        const nfts = res.data.nfts.filter((nft) =>
          nft.contract_address.includes(whitelist)
        );
        setUserNFTs(nfts);
        console.log(userNFTs);
      });
  };

  const createCampaign = async (target, deadline, url) => {
    console.log(url, ethers.utils.parseEther(target.toString()), deadline);
    try {
      const ManagerContract = fetchManagerContract(signer);
      const tx = await ManagerContract.createCampaign(
        url,
        ethers.utils.parseEther(target.toString()),
        deadline
      );
      await tx.wait();
      toast({
        title: "Campaign created",
        description: "You've launched a campaign",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (err) {
      console.log(err);
      toast({
        title: "An error occurred",
        description: "Something's wrong. Please try again",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const contribute = async (addr, amount) => {
    console.log(addr, amount);
    const erc20Contract = fetchERC20Contract(DAI, signer);

    const allowance = await erc20Contract.allowance(account, addr);
    console.log(allowance);

    if (ethers.utils.formatEther(allowance) < amount) {
      const tx0 = await erc20Contract.approve(addr, amount);
      await tx0.wait();
    }
    const campaignContract = fetchCampaignContract(addr, signer);
    const tx = await campaignContract.contribute(amount);
    await tx.wait();
  };

  const endCampaigns = async (addr) => {
    const campaignContract = fetchCampaignContract(addr, signer);
    const tx = await campaignContract.closeCampaign();
    await tx.wait();
  };

  const checkIfWalletConnected = async () => {
    if (web3Modal?.cachedProvider) {
      console.log("reconnect...", web3Modal.cachedProvider);
      await connectWallet();
    }
    if (currentAddress == "") {
      await connectWallet();
    }
  };
  useEffect(() => {
    checkIfWalletConnected();
  }, []);

  const value = {
    currentAddress,
    connectWallet,
    checkIfWalletConnected,
    disconnect,
    fetchUserNFTs,
    createCampaign,
    contribute,
    fetchCampaigns,
    endCampaigns,
    campaigns,
    account,
  };

  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>;
};
