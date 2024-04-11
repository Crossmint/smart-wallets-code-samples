import React, { useState } from "react";

interface WalletInfoProps {
  email: string;
  address: string;
  balance: string;
}

const WalletInfo: React.FC<WalletInfoProps> = ({ email, address, balance }) => {
  const [isCopied, setIsCopied] = useState(false);

  const truncatedAddress = `${address.slice(0, 10)}...${address.slice(-5)}`;

  const copyWallet = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error("failed to copy text to clipboard: ", error);
    }
  };

  return (
    <>
      <div className="col-span-2 p-4">
        <div className="bg-white shadow-md rounded p-8 flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 mb-8"></div>
          <div className="mt-2 text-center font-semibold text-gray-600">
            {balance} MATIC
          </div>
          <div className="mt-2 text-center font-semibold text-gray-600">
            20 USDC
          </div>
        </div>
      </div>

      <div className="col-span-3 p-5 space-y-2">
        <div className="flex justify-between items-center">
          <span className="font-semibold text-gray-600">Email:</span>
          <span className="font-light text-gray-800 mr-1">{email}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-semibold text-gray-600" title={address}>
            Address:
          </span>
          <div>
            <span className="font-light text-gray-800">{truncatedAddress}</span>
            <button
              onClick={copyWallet}
              className={`py-0 px-1 ml-2 rounded-md transition duration-500 ease-in-out ${
                isCopied ? "bg-green-500 opacity-50" : ""
              }`}
            >
              📋
            </button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-semibold text-gray-600">Chain:</span>
          <div>
            <span className="font-light text-gray-800">Polygon</span>
            <a
              href={`https://polygonscan.com/address/${address}`}
              className="px-1 ml-2"
              target="_blank"
            >
              🔗
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default WalletInfo;
