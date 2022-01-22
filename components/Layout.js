import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ list, children }) {
  // console.log(list);
  return (
    <div className="flex flex-col text-sm bg-gradient-to-br from-blue-800 to-blue-900 text-white/80 min-h-screen">
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="shortcut icon" href="/brand/favicon.svg" sizes="128x128" />
      </Head>

      <Navbar>{list}</Navbar>
      {children}
      <Footer></Footer>
    </div>
  );
}
