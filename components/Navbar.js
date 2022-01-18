import Link from "next/link";

export default function Navbar({ children }) {
  // console.log(children);
  const categoryNav = children.map((e) => {
    return (
      <li key={e}>
        <Link href={`/category/${e}`}>{e}</Link>
      </li>
    );
  });
  return (
    <nav>
      <ul>
        <li>
          <Link href={`/`}>Home</Link>
        </li>
        {categoryNav}
      </ul>
    </nav>
  );
}
