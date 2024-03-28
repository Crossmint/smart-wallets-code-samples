import React from "react";

interface NFT {
  metadata: {
    image: string;
    name: string;
    description: string;
  };
  chain: string;
  contractAddress: string;
  tokenId: string;
  tokenStandard: string;
}

interface NFTDisplayProps {
  nft: NFT;
}

const NFTDisplay: React.FC<NFTDisplayProps> = ({ nft }) => {
  return (
    <div className="border p-4 rounded-lg">
      <img
        src={nft.metadata.image}
        alt={nft.metadata.name}
        className="w-full h-64 object-cover rounded-md"
      />
      <h2 className="text-xl font-bold mt-2">{nft.metadata.name}</h2>
      <p>{nft.metadata.description}</p>
      <p>Chain: {nft.chain}</p>
      <p>Contract Address: {nft.contractAddress}</p>
      <p>Token ID: {nft.tokenId}</p>
      <p>Token Standard: {nft.tokenStandard}</p>
    </div>
  );
};

export default NFTDisplay;
