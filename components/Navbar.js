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
        className={
          e == current.slug
            ? `m-1 bg-slate-50/10 border-2 border-slate-50/60 rounded-xl md:shadow-lg`
            : `m-1 transition ease-in-out duration-500 bg-slate-50/10 md:bg-slate-50/0 hover:bg-slate-50/10 border-2 border-transparent rounded-xl md:shadow-md`
        }
        key={e}
      >
        <Link href={`/category/${e}`}>
          <a
            className={
              e == current.slug
                ? `p-2 block opacity-80 text-white`
                : `p-2 block opacity-50 text-white`
            }
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
          <a className="absolute transition ease-in-out duration-500 md:backdrop-blur-sm md:hover:backdrop-blur-none md:top-3 md:left-3 flex justify-center items-center rounded-[100%] text-slate-600/80 w-20 h-20 -left-4 -top-5 z-20 bg-slate-200/80 shadow-[lg] shadow-stone-900">
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
          className="ml-auto flex justify-center items-center w-10 h-10 md:hidden"
        >
          {isOpen ? closeIcon() : menuIcon()}
        </button>
        <div
          className={
            isOpen
              ? `hidden md:block p-3  z-10 relative`
              : `block p-3 relative z-30 md:z-10`
          }
        >
          <ul className="flex md:pl-20 md:ml-3 flex-wrap p-2 md:mt-2 capitalize bg-slate-800 rounded-3xl shadow-lg shadow-slate-900/20">
            {categoryNav}
          </ul>
        </div>
      </div>
    </nav>
  );
}
