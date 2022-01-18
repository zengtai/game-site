import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ list, children }) {
  // console.log(list);
  return (
    <>
      <Head></Head>
      <Navbar>{list}</Navbar>
      {children}
      <Footer></Footer>
    </>
  );
}
