import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { closeIcon, menuIcon } from "./Icons";
import { getIcon } from "../lib/api";

export default function Navbar({ navItems, isOpen }) {
  const router = useRouter();
  const current = router.query;
  const [isMenuOpen, setOpen] = useState(isOpen);
  function toggle() {
    setOpen(!isMenuOpen);
  }
  navItems.sort((a, b) => (a > b ? 1 : -1));

  const categoryNav = navItems.map((e) => {
    return (
      <li
        className={`my-1 basis-1/2 rounded-xl transition duration-500 ease-in-out sm:basis-1/6 md:basis-1/12 md:hover:bg-none`}
        key={e}
      >
        <Link href={`/category/${e.toLowerCase()}`}>
          <a
            className={`${
              e.toLowerCase() == current.slug
                ? `rounded-full border-white/40 text-white md:scale-125 md:border-0`
                : `border-transparent text-white/90 md:hover:scale-125`
            } delay-50 flex flex-row items-center border-2 p-2 pr-3 font-bold drop-shadow transition duration-200 hover:text-white/90 md:justify-center`}
          >
            <span className="mr-1.5">{getIcon(e.toLowerCase())}</span>
            {e}
          </a>
        </Link>
      </li>
    );
  });
  return (
    <nav>
      <div className="relative z-10 block">
        <Link href={`/`}>
          <a className="duration-400 absolute left-0 top-0 z-20 flex h-10 w-10 origin-center items-center justify-center rounded-full text-yellow-300 transition delay-75 ease-in-out hover:scale-125 lg:top-8 lg:left-6 lg:bg-white">
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
          className="ml-auto flex h-10 w-10 items-center justify-center text-yellow-300 lg:hidden"
        >
          {!isMenuOpen ? closeIcon() : menuIcon()}
        </button>
        <div
          className={`
            ${
              !isMenuOpen ? `hidden lg:block` : `block`
            } relative z-30 p-3 md:z-10`}
        >
          <ul className="flex flex-wrap rounded-3xl bg-gradient-to-b from-yellow-500 to-amber-500 py-2 px-2 capitalize shadow-lg shadow-black/20 md:mt-2 lg:flex-nowrap lg:justify-center lg:rounded-full">
            {categoryNav}
          </ul>
        </div>
      </div>
    </nav>
  );
}
