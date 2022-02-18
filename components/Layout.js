import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ navItems, children, isOpen }) {
  // console.log(list);

  return (
    <div className="flex flex-col text-sm bg-gradient-to-br from-blue-800 to-blue-900 text-white/80 min-h-screen">
      <Head>
        <meta
          name="viewport"
          content="user-scalable=no, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, width=device-width, height=device-height"
        />
        <link
          rel="icon"
          href="brand/favicon.svg"
          sizes="any"
          type="image/svg+xml"
        />
      </Head>

      <Navbar isOpen={isOpen} navItems={navItems} />
      {children}
      <Footer />
    </div>
  );
}
