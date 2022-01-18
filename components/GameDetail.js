import Image from "next/image";
import Link from "next/link";

export default function GameDetail({ game }) {
  return (
    <>
      <div>
        <Image
          src={game.icon}
          alt={game.title}
          width={200}
          height={200}
          quality="83"
        />
      </div>
      <p>
        <Link href={`/category/${game.category.toLowerCase()}`}>
          {game.category.toLowerCase()}
        </Link>
      </p>
      <p>
        <Link href={game.url}>
          <a title={`Play ${game.name} now`}>
            <button>Play now</button>
          </a>
        </Link>
      </p>
      <p>{game.description}</p>
    </>
  );
}
