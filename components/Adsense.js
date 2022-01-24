import React, { useEffect } from "react";
import { ADS_ID } from "../lib/constants";

export default function Adsense({ slot, height }) {
  const loadAds = () => {
    try {
      if (typeof window !== "undefined") {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (error) {
      console.log("adsense error", error.message);
    }
  };

  useEffect(() => {
    loadAds();
  }, []);

  return (
    <div
      aria-hidden={true}
      className="flex justify-center md:px-4 xl:px-8 my-3 bg-black/10"
    >
      <ins
        className={`adsbygoogle bg-loading bg-no-repeat bg-center`}
        style={{
          // height: `${height}`,
          height: `6rem`,
          width: `100%`,
        }}
        data-ad-client={ADS_ID}
        data-ad-slot={slot}
        data-ad-format="auto"
        // data-full-width-responsive="true"
      ></ins>
    </div>
  );
}
