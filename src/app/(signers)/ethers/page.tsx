"use client";

import { useState, useEffect } from "react";
import {
  CrossmintAASDK,
  Blockchain,
  EVMAAWallet,
} from "@crossmint/client-sdk-aa";
import { ethers } from "ethers";
const { parseUnits, formatEther } = ethers.utils;
import { Wallet } from "ethers";
import SignUpForm from "../../components/SignUpForm";
import WalletInfo from "../../components/WalletInfo";
import NFT from "../../components/NFT";

const Page: React.FC = () => {
  const [wallet, setWallet] = useState<EVMAAWallet | undefined>(undefined);
  const [balance, setBalance] = useState<string | undefined>(undefined);
  const [address, setAddress] = useState<string | undefined>(undefined);
  const [nfts, setNfts] = useState<[] | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    const email = localStorage.getItem("email") || "";
    setEmail(email);
  }, []);

  useEffect(() => {
    getAddress();
    getBalance();
  }, [wallet]);

  const createAAWalletHelper = async () => {
    if (typeof window !== "undefined") {
      const xm = CrossmintAASDK.init({
        apiKey: process.env.NEXT_PUBLIC_API_KEY || "",
      });

      const getSigner = () => {
        const savedMnemonic = localStorage.getItem(`mnemonic-${email}`);
        if (savedMnemonic) {
          console.log("loading from localStorage");
          return Wallet.fromMnemonic(savedMnemonic);
        } else {
          console.log("generating new random wallet");
          // Generate a random Wallet object.
          const ethersSigner = Wallet.createRandom();

          // Save the mnemonic phrase
          let mnemonic = ethersSigner.mnemonic.phrase;

          // log the mnemonic phrase, you should save it securely
          console.log("mnemonic: ", mnemonic);

          // save to localStorage
          localStorage.setItem(`mnemonic-${email}`, mnemonic);

          return ethersSigner;
        }
      };

      const walletInitParams = {
        signer: getSigner(),
      };

      const wallet = await xm.getOrCreateWallet(
        { email },
        Blockchain.POLYGON,
        walletInitParams
      );

      console.log({ walletAddress: await wallet.getAddress() });

      return wallet;
    } else {
      // Handle the server-side rendering case
      console.log("We're on the server-side. Can't access localStorage.");
      return undefined;
    }
  };

  const createWallet = async () => {
    setLoading(true);
    localStorage.setItem("email", email);
    const wallet = await createAAWalletHelper();
    console.log(wallet);
    setWallet(wallet);
    setLoading(false);
  };

  const getAddress = async () => {
    if (!wallet) {
      return "The wallet is not initialized";
    }

    const address = await wallet.getAddress();
    setAddress(address);
  };

  const getBalance = async () => {
    if (!wallet) {
      return "The wallet is not initialized";
    }

    const balance = await wallet.getBalance();
    setBalance(formatEther(balance.toString()));
  };

  const getNFTs = async () => {
    if (!wallet) {
      return "The wallet is not initialized";
    }

    const nfts = await wallet.getNFTs();
    console.log(nfts);
    setNfts(nfts);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-5 bg-gray-200 p-5">
      {!wallet && (
        <SignUpForm
          email={email}
          setEmail={setEmail}
          createWallet={createWallet}
        />
      )}

      {wallet && (
        <WalletInfo
          email={email}
          address={address || ""}
          balance={balance || ""}
        />
      )}
    </div>
  );
};

export default Page;
