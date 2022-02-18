import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { closeIcon, menuIcon } from "./Icons";
import { getIcon } from "../lib/api";

export default function Navbar({ navItems, isOpen }) {
  // console.log(isOpen);
  const router = useRouter();
  const current = router.query;
  const [isMenuOpen, setOpen] = useState(isOpen);
  function toggle() {
    setOpen(!isMenuOpen);
  }
  // console.log(children);
  // console.log(getIcon(`action`));
  const categoryNav = navItems.map((e) => {
    return (
      <li
        className={`${
          e == current.slug
            ? `border-sky-50/60 md:border-transparent bg-sky-500/80 md:bg-sky-500/0 md:shadow-none md:bg-none lg:scale-125`
            : `md:border-sky-50/0 md:shadow-none border-sky-50/0`
        } basis-1/2 sm:basis-1/6 md:basis-1/12 my-1 lg:mx-4 transition ease-in-out duration-500 md:hover:bg-none border-2 rounded-xl`}
        key={e}
      >
        <Link href={`/category/${e}`}>
          <a
            className={`${
              e == current.slug
                ? `text-white`
                : `text-white/70 md:hover:scale-125`
            } p-2 pr-3 flex flex-row items-center hover:text-white/90 transition duration-200 delay-50 drop-shadow`}
          >
            <span className="mr-1">{getIcon(e)}</span>
            {e}
          </a>
        </Link>
      </li>
    );
  });
  return (
    <nav>
      <div className="block relative z-10">
        <Link href={`/`}>
          <a className="absolute hover:scale-125 transition ease-in-out duration-400 delay-75 lg:top-8 lg:left-6 flex justify-center items-center text-lime-500 rounded-full w-10 h-10 left-0 top-0 z-20 lg:bg-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
          </a>
        </Link>
        <button
          onClick={toggle}
          className="ml-auto flex justify-center items-center w-10 h-10 lg:hidden text-lime-500"
        >
          {!isMenuOpen ? closeIcon() : menuIcon()}
        </button>
        <div
          className={`
            ${
              !isMenuOpen ? `hidden lg:block` : `block`
            } relative p-3 z-30 md:z-10`}
        >
          <ul className="flex flex-wrap lg:flex-nowrap lg:justify-center py-2 px-2 md:mt-2 capitalize bg-gradient-to-br from-cyan-600 to-blue-500 rounded-3xl lg:rounded-full shadow-lg shadow-black/20">
            {categoryNav}
          </ul>
        </div>
      </div>
    </nav>
  );
}
