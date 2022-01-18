import Link from "next/link";

export default function Navbar({ children }) {
  // console.log(children);
  const categoryNav = children.map((e) => {
    return (
      <li
        className="m-1 bg-slate-50/10 border-2 border-slate-50/20 rounded-xl shadow-lg"
        key={e}
      >
        <Link href={`/category/${e}`}>
          <a className="p-2 block opacity-60 text-white">{e}</a>
        </Link>
      </li>
    );
  });
  return (
    <nav className="p-2">
      <Link href={`/`}>
        <a className="text-stone-900/70">
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
      <ul className="flex flex-wrap p-2 mt-2 capitalize bg-yellow-900 rounded-3xl shadow-lg shadow-yellow-900/20">
        {categoryNav}
      </ul>
    </nav>
  );
}
