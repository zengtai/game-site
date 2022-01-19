import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

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
            ? `m-1 bg-slate-50/10 border-2 border-slate-50/60 rounded-xl shadow-lg`
            : `m-1 bg-slate-50/10 border-2 border-slate-50/20 rounded-xl shadow-md`
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
      <div className="flex flex-row justify-between">
        <Link href={`/`}>
          <a className="flex justify-center items-center outline outline-[20px] rounded-full outline-cyan-100 text-slate-600/80 w-10 h-10">
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
          className="flex justify-center items-center w-10 h-10 md:hidden"
        >
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          )}
        </button>
      </div>
      <div
        className={
          isOpen
            ? `hidden md:block  m-3  z-10 relative`
            : `block m-3 relative z-10`
        }
      >
        <ul className="flex flex-wrap p-2 mt-2 capitalize bg-slate-800/80 rounded-3xl shadow-lg shadow-slate-900/20">
          {categoryNav}
        </ul>
      </div>
    </nav>
  );
}
