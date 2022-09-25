import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { providerOptions } from "./web3Modal";
import * as UAuthWeb3Modal from "./UAuthWeb3";
import { useSetWallet } from "@relaycc/receiver";
import { Framework } from "@superfluid-finance/sdk-core";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import {
  ManagerAddr_M,
  ManagerAddr_S,
  ManagerABI,
  CampaignABI,
  SCampaignABI,
  ERC20ABI,
  TDAI_S,
  TDAI_M,
} from "./constant";
// Import `connect` from the Tableland library
import { connect } from "@tableland/sdk";
import { calculateFlowRate } from "../utils/calculateFlowRate";

export const Web3Context = React.createContext();

const fetchERC20Contract = (address, signerOrProvider) => {
  return new ethers.Contract(address, ERC20ABI, signerOrProvider);
};

const fetchManagerContract = (ManagerAddr, signerOrProvider) => {
  return new ethers.Contract(ManagerAddr, ManagerABI, signerOrProvider);
};
const fetchCampaignContract = (address, signerOrProvider) => {
  return new ethers.Contract(address, CampaignABI, signerOrProvider);
};
const fetchSCampaignContract = (address, signerOrProvider) => {
  return new ethers.Contract(address, SCampaignABI, signerOrProvider);
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
  const [tbl, setTbl] = useState();
  const [tblName, setTblName] = useState("campaign_table_80001_2883");
  const [balance, setBalance] = useState({});
  const [sf, setSf] = useState();
  /** 
  async function startTableLand() {
    const tbl = await connect({ network: "testnet", chain: "polygon-mumbai" });
    setTbl(tbl);
    await tbl.siwe();
  }

  useEffect(() => {
    startTableLand();
  }, []);

  const createTable = async () => {
    const { name } = await tbl.create(
      `id integer, link text, primary key (id)`, // Table schema definition
      {
        prefix: `campaign_table`, // Optional `prefix` used to define a human-readable string
      }
    );
    console.log(name);
    setTblName(name);
  };

  const writeTable = async (_id, ipfs) => {
    const writeRes = await tbl.write(
      `INSERT INTO ${tblName} (id, link) VALUES (${_id}, ('${ipfs}'));`
    );
    console.log(writeRes);
  };

  const displayTable = async () => {
    const readRes = await tbl.read(`SELECT * FROM ${tblName};`);
    console.log(readRes.rows);
    return readRes.rows;
  };
*/
  function SetWalletExample() {
    const setWallet = useSetWallet();
    useEffect(() => {
      setWallet(signer || null);
    }, [signer, setWallet]);

    return <></>;
  }

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
      const contract = fetchManagerContract(ManagerAddr_M, library);
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
            updates = res.data.updates;
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
          updates: updates,
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

  const fetchSCampaigns = async () => {
    try {
      const contract = fetchManagerContract(ManagerAddr_S, library);
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
            updates = res.data.updates;
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
          updates: updates,
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
      setProvider(provider);
      setLibrary(library);
      const accounts = await library.listAccounts();
      const network = await library.getNetwork();

      if (accounts) {
        setAccount(accounts[0]);
        setCurrentAddress(accounts[0]);
      }
      setChainId(network.chainId);
    } catch (error) {
      setError(error);
    }
  };

  const recurringDonate = async (addr, amount) => {
    const sfModal = await Framework.create({
      networkName: "mumbai",
      provider: library,
      chainId: 80001,
    });
    console.log(sfModal);
    const fdaix = await sfModal.loadSuperToken(
      "0x5D8B4C2554aeB7e86F387B4d6c00Ac33499Ed01f"
    );

    const web3ModalSigner = sfModal.createSigner({ web3Provider: library });

    const approveOp = fdaix.approve({ receiver: addr, amount: amount });
    //amount ethers.utils.parseUnits("100").toString()
    console.log(fdaix);
    console.log(web3ModalSigner);
    const createFlowOperation = sfModal.cfaV1.createFlow({
      sender: account,
      receiver: addr,
      superToken: fdaix.address,
      flowRate: calculateFlowRate(amount), //"1000000000"
    });

    const txnResponse = await createFlowOperation.exec(web3ModalSigner);
    const txnReceipt = await txnResponse.wait();
    // Transaction Complete when code reaches here
    console.log(txnReceipt);
  };
  const switchNetwork = async (chain) => {
    try {
      await library.provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: chain }],
      });
      console.log("hahahahahaha");
    } catch (switchError) {
      if (switchError.code === 4902) {
        try {
          await library.provider.request({
            method: "wallet_addEthereumChain",
            params: [networkParams[toHex(1666600000)]],
          });
        } catch (error) {
          setError(error);
        }
      }
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

  const fetchUserBalance = async (account) => {
    await axios
      .get(
        `https://api.covalenthq.com/v1/80001/address/${account}/balances_v2/?quote-currency=USD&format=JSON&nft=false&no-nft-fetch=true&key=${process.env.NEXT_PUBLIC_COVALENT_KEY}`
      )
      .then((res) => {
        console.log(res.data.data.items);
        setBalance(res.data.data.items);
        console.log(balance);
      });
    return balance;
  };

  const createCampaign = async (target, deadline, url) => {
    console.log(url, ethers.utils.parseEther(target.toString()), deadline);
    try {
      const ManagerContract = fetchManagerContract(ManagerAddr_M, signer);
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
  const createSCampaign = async (target, deadline, url) => {
    console.log(url, ethers.utils.parseEther(target.toString()), deadline);
    try {
      const ManagerContract = fetchManagerContract(ManagerAddr_S, signer);
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
    const erc20Contract = fetchERC20Contract(TDAI_M, signer);

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

  const contributeS = async (addr, amount) => {
    console.log(addr, amount);
    /**const erc20Contract = fetchERC20Contract(TDAI_S, signer);

    const allowance = await erc20Contract.allowance(account, addr);
    console.log(allowance);

    if (ethers.utils.formatEther(allowance) < amount) {
      const tx0 = await erc20Contract.approve(addr, amount);
      await tx0.wait();
    }*/

    const campaignContract = fetchSCampaignContract(addr, signer);
    console.log(campaignContract);
    /**const tx = await campaignContract.contribute(amount);
    await tx.wait();*/
  };
  /**
  const endCampaigns = async (addr) => {
    const campaignContract = fetchCampaignContract(addr, signer);
    const tx = await campaignContract.closeCampaign();
    await tx.wait();
  }; */

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
    connectWallet();
  }, []);

  const value = {
    currentAddress,
    connectWallet,
    checkIfWalletConnected,
    disconnect,
    fetchUserBalance,
    createCampaign,
    contribute,
    contributeS,
    fetchCampaigns,
    fetchSCampaigns,
    chainId,
    createSCampaign,
    campaigns,
    account,
    SetWalletExample,
    switchNetwork,
    recurringDonate,
  };

  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>;
};
