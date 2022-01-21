import { useEffect } from "react";
import Script from "next/script";
import { useRouter } from "next/router";
import NProgress from "nprogress";
import "../styles/globals.css";
import "../public/nprogress.css";
// import * as gtag from "../lib/gtag";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    const handleStart = (url) => {
      console.log(`Loading: ${url}`);
      NProgress.start();
    };
    const handleStop = () => {
      // gtag.pageview(url);
      NProgress.done();
    };
    // const handleRouteChange = (url) => {
    //   gtag.pageview(url);
    // };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router]);

  return (
    <>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      {/* <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      /> */}
      <script
        async="async"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9209477879340784"
        crossOrigin="anonymous"
      ></script>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
