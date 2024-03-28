import Link from "next/link";

interface CardProps {
  href: string;
  title: string;
  desc: string;
}

const Card: React.FC<CardProps> = ({ href, title, desc }) => {
  return (
    <div className="w-full sm:w-1/2 p-2">
      <Link href={href}>
        <div className="rounded-lg shadow-md p-4 bg-white hover:shadow-lg transition-shadow duration-200 ease-in flex flex-col items-center">
          <h2 className="text-xl font-bold">{title}</h2>
          <div className="py-5 h-20 line-clamp-2">{desc}</div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
