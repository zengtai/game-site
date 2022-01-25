import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ list, children }) {
  // console.log(list);
  return (
    <div className="flex flex-col text-sm bg-slate-100 text-stone-900/80 min-h-screen">
      <Head>
        <meta
          name="viewport"
          content="user-scalable=no, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, width=device-width, height=device-height"
        />
        <link rel="shortcut icon" href="/brand/favicon.svg" sizes="128x128" />
      </Head>

      <Navbar>{list}</Navbar>
      {children}
      <Footer></Footer>
    </div>
  );
}
