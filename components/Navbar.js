import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { closeIcon, menuIcon } from "./Icons";

export default function Navbar({ children }) {
  const router = useRouter();
  const current = router.query;
  const [isOpen, setOpen] = useState(true);
  function toggle() {
    setOpen(!isOpen);
  }
  // console.log(children);
  const categoryNav = children.map((e) => {
    return (
      <li
        className={`${
          e == current.slug
            ? `border-slate-50/80 md:shadow-lg bg-slate-50/20 md:bg-slate-50/10`
            : `md:border-slate-50/0 md:shadow-none border-slate-50/20 bg-slate-50/10`
        } m-1 transition ease-in-out duration-500 md:bg-slate-50/0 hover:bg-slate-50/10 border-2 rounded-xl`}
        key={e}
      >
        <Link href={`/category/${e}`}>
          <a
            className={`${
              e == current.slug ? `opacity-80 ` : `opacity-60`
            } p-2 block text-white`}
          >
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
          <a className="absolute transition ease-in-out duration-400 md:backdrop-blur-sm md:hover:backdrop-blur-none md:top-3 md:left-3 flex justify-center items-center rounded-[100%] text-cyan-600 w-20 h-20 -left-4 -top-5 z-20 bg-cyan-600/5 md:bg-white/80 shadow-[lg] shadow-stone-900">
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
          className="ml-auto flex justify-center items-center w-10 h-10 md:hidden text-cyan-600"
        >
          {isOpen ? closeIcon() : menuIcon()}
        </button>
        <div
          className={`
            ${isOpen ? `hidden md:block` : `block`} relative p-3 z-30 md:z-10`}
        >
          <ul className="flex md:pl-20 md:ml-3 flex-wrap p-2 md:mt-2 capitalize bg-cyan-600 rounded-3xl shadow-lg shadow-cyan-500/20">
            {categoryNav}
          </ul>
        </div>
      </div>
    </nav>
  );
}
