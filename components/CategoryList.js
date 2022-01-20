import Link from "next/link";
export default function CategoryList({ title, categories, icon }) {
  const categoryList = categories.map((category, index) => (
    <li key={index} className="capitalize mx-1 xl:mx-2 mb-2">
      <Link href={`/category/${category}`}>
        <a className="block hover:scale-110 transition ease-in-out duration-300 text-sm py-1 md:py-2 px-2 md:px-3 bg-slate-600/80 text-slate-100/60 rounded-full shadow-md shadow-slate-900/30">
          {category}
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
          <h2 className="flex items-center px-3 xl:px-8 py-2 xl:pb-1 pb-0 md:text-sm xl:text-xl font-semibold text-slate-600 space-x-2">
            {icon}
            <span>{title}</span>
          </h2>
          <ul className="flex flex-wrap px-1 py-2 xl:py-4 xl:px-6">
            {categoryList}
          </ul>
        </>
      );
    }
  else {
    return <></>;
  }
}
