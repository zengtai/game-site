import Link from "next/link";
export default function CategoryList({ title, categories }) {
  const categoryList = categories.map((category, index) => (
    <li key={index}>
      <Link href={`/category/${category}`}>{category}</Link>
    </li>
  ));
  if (categories.length != 0)
    if (title === undefined) {
      return (
        <>
          <ul>{categoryList}</ul>
        </>
      );
    } else {
      return (
        <>
          <h2>{title}</h2>
          <ul>{categoryList}</ul>
        </>
      );
    }
  else {
    return <></>;
  }
}
