import Link from "next/link";
import { getIcon } from "../lib/api";
export default function CategoryList({ title, categories, icon }) {
  const categoryList = categories.map((category, index) => (
    <li key={index} className="capitalize mx-1 mb-2">
      <Link href={`/category/${category}`}>
        <a className="flex flex-row text-sm py-2 px-3 bg-amber-400 text-white hover:text-yellow-100 shadow-black/10 rounded-full shadow-md">
          <span className="mr-1 drop-shadow">
            {getIcon(`${category.toLowerCase()}`)}
          </span>
          <span className="drop-shadow">{category}</span>
        </a>
      </Link>
    </li>
  ));
  if (categories.length != 0)
    if (title === undefined) {
      return (
        <>
          <ul className="p-4 flex space-x-3">{categoryList}</ul>
        </>
      );
    } else {
      return (
        <>
          <h2 className="flex items-center py-2 font-semibold text-yellow-100/70 md:text-lg space-x-2">
            <span className="text-lime-500">{icon}</span>
            <span>{title}</span>
          </h2>
          <ul className="flex flex-wrap py-2">{categoryList}</ul>
        </>
      );
    }
  else {
    return <></>;
  }
}
