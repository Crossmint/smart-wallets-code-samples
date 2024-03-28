import Card from "./components/Card";

const Page: React.FC = () => {
  return (
    <div className="flex flex-wrap justify-center">
      <Card
        href="/fireblocks"
        title="Fireblocks"
        desc="Using a fireblocks NCW signer"
      />
      <Card href="/web3auth" title="Web3Auth" desc="Using a web3auth signer" />
      <Card href="/wagmi" title="WAGMI" desc="Using a wagmi signer" />
      <Card href="/ethers" title="Ethers" desc="Using an ethers signer" />
    </div>
  );
};

export default Page;
