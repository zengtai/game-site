import GameList from "./GameList";
import { historyIcon } from "./Icons";

export default function PlayedList({
  title,
  games,
  icon,
  cols,
  className,
  iconClassName,
  isPriority,
}) {
  return (
    <>
      <div className="relative">
        <div className="absolute right-0">
          <button>remove</button>
        </div>
        <GameList
          icon={icon}
          className={className}
          iconClassName={iconClassName}
          title={title}
          games={games}
          isPriority={isPriority}
          cols={cols}
        />
      </div>
    </>
  );
}
