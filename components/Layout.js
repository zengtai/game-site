import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { SITE_NAME } from "../lib/constants";

export default function Layout({ list, children }) {
  // console.log(list);
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Navbar>{list}</Navbar>
      {children}
      <Footer></Footer>
    </>
  );
}
