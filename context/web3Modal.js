import WalletConnectProvider from "@walletconnect/web3-provider";
import UAuthSPA from "@uauth/js";
import * as UAuthWeb3Modal from "./UAuthWeb3";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
const uauthOptions = {
  clientID: "",
  redirectUri: "",
  scope: "openid wallet",
};
export const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: process.env.NEXT_PUBLIC_INFURAID,
    },
  },

  coinbasewallet: {
    package: CoinbaseWalletSDK,
    options: {
      appName: "Just For Society",
      infuraId: process.env.NEXT_PUBLIC_INFURAID,
    },
  },
  injected: {
    display: {
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/512px-MetaMask_Fox.svg.png?20220831120339",
      name: "Metamask",
      description: "Connect with the provider in your Browser",
    },
    package: null,
  },
  "custom-uauth": {
    display: UAuthWeb3Modal.display,
    connector: UAuthWeb3Modal.connector,
    package: UAuthSPA,
    options: uauthOptions,
  },
};
