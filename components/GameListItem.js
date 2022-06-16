import Link from "next/link";
import Image from "next/image";
import { toTitle, toSlug } from "../utils/generator";
import moment from "moment";

const GameListItem = ({ games, className }) => {
  return games.map((game) => (
    <li
      key={game.id}
      className={`transition duration-500 ease-in-out xl:hover:scale-125 ${className}`}
    >
      <Link href={`/game/${toSlug(game.name)}`}>
        <a
          title={toTitle(game.name)}
          className="block overflow-hidden rounded-2xl bg-loading bg-center bg-no-repeat shadow-lg shadow-slate-900/30"
        >
          <Image
            src={game.icon}
            alt={toTitle(game.name)}
            height={200}
            width={200}
            quality={83}
            layout="responsive"
          />
        </a>
      </Link>
      <h3 className="my-2 text-center text-xs font-bold leading-tight">
        {toTitle(game.name)}
      </h3>
      <div className="hidden text-center text-xs">
        {moment(new Date(game.time)).format("MMM Do, YYYY")}
      </div>
    </li>
  ));
};

export default GameListItem;
