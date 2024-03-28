"use client";

import {
  CrossmintAASDK,
  Blockchain,
  EVMAAWallet,
} from "@crossmint/client-sdk-aa";
import { useState } from "react";
import { ethers } from "ethers";
const { parseUnits, formatEther } = ethers.utils;
import { Wallet } from "ethers";
import NFT from "../../components/NFT";

const userIdentifier = { email: "danny+3@crossmint.io" };

const Page: React.FC = () => {
  const [wallet, setWallet] = useState<EVMAAWallet | undefined>(undefined);
  const [balance, setBalance] = useState<string | undefined>(undefined);
  const [address, setAddress] = useState<string | undefined>(undefined);
  const [nfts, setNfts] = useState<[] | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const createAAWalletHelper = async () => {
    if (typeof window !== "undefined") {
      const xm = CrossmintAASDK.init({
        apiKey: process.env.NEXT_PUBLIC_API_KEY || "",
      });

      const getSigner = () => {
        const savedMnemonic = localStorage.getItem("mnemonic");
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
          localStorage.setItem("mnemonic", mnemonic);

          return ethersSigner;
        }
      };

      const walletInitParams = {
        signer: getSigner(),
      };

      const wallet = await xm.getOrCreateWallet(
        userIdentifier,
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

  const createAAWallet = async () => {
    setLoading(true);
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
    <div>
      {/* Wallet not set section */}
      {!wallet && (
        <div>
          <div>Wallet not created</div>
          <div>
            <button
              onClick={createAAWallet}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Create or Load AA Wallet
            </button>
          </div>
        </div>
      )}
      {/* Wallet set section */}
      {wallet && (
        <>
          <div className="p-5">
            <button
              onClick={getAddress}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Get Address
            </button>
            {address && <div>Address: {address}</div>}
          </div>
          <div className="p-5">
            <button
              onClick={getBalance}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Get Balance
            </button>
            {balance && <div>Balance: {balance}</div>}
          </div>
          <div className="p-5">
            <button
              onClick={getNFTs}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Get NFTs
            </button>
            {nfts && (
              <div>
                {nfts && (
                  <div>
                    <h2>NFTs:</h2>
                    {nfts.map((nft, index) => (
                      <NFT nft={nft} key={index} />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Page;
