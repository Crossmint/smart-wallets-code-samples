import Card from "./components/Card";

const Page: React.FC = () => {
  return (
    <div className="flex flex-wrap justify-center">
      <Card
        href="/signers/fireblocks"
        title="Fireblocks"
        desc="Using a fireblocks NCW signer"
      />
      <Card
        href="/signers/web3auth"
        title="Web3Auth"
        desc="Using a web3auth signer"
      />
      <Card href="/signers/wagmi" title="WAGMI" desc="Using a wagmi signer" />
      <Card
        href="/signers/ethers"
        title="Ethers"
        desc="Using an ethers signer"
      />
    </div>
  );
};

export default Page;
