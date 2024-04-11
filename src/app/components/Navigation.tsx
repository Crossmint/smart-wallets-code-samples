import Link from "next/link";
import Image from "next/image";

const Navigation: React.FC = () => {
  return (
    <div className="flex justify-between items-center">
      <Link href="/">
        <Image
          src="/crossmint-logo.svg"
          width={192}
          height={43}
          className="rounded-lg shrink"
          alt="Crossmint logo"
          priority={true}
        />
      </Link>
      <div className="font-mono">Smart Wallet Demo</div>
    </div>
  );
};

export default Navigation;
