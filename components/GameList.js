import Link from "next/link";
import Image from "next/image";
export default function GameList({ title, games }) {
  const gamesList = games.map((game) => (
    <li key={game.id}>
      <Link
        href={`/game/${game.name}`}
        as={`/game/${game.name
          .replace(/([A-Z])/g, " $1")
          .trim()
          .replace(/3 D/g, "3D")
          .replace(/ /g, "-")
          .toLowerCase()}`}
      >
        <a>
          <Image
            src={game.icon}
            alt={game.name}
            height={100}
            width={100}
            quality={83}
          />
        </a>
      </Link>
    </li>
  ));
  if (games.length != 0)
    if (title === undefined) {
      return (
        <>
          <ul>{gamesList}</ul>
        </>
      );
    } else {
      return (
        <>
          <h2>{title}</h2>
          <ul>{gamesList}</ul>
        </>
      );
    }
  else {
    return <></>;
  }
}
