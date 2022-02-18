import React, { useEffect } from "react";
import { ADS_ID } from "../lib/constants";

export default function AdsenseFixed({ slot, height }) {
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
      className={`overflow-hidden my-3 before:content-['Advertisement'] before:flex before:justify-center before:opacity-50 bg-black/5 ${height} w-[300px] md:h-[90px] md:w-[728px] lg:w-[970px] mx-auto`}
    >
      <ins
        className="adsbygoogle"
        style={{
          display: `block`,
          margin: `0 auto`,
          // height: `200px`,
          height: `100%`,
          width: `100%`,
          // width: `300px`,
        }}
        data-ad-client={ADS_ID}
        data-ad-slot={slot}
        // data-ad-format="auto"
        data-full-width-responsive="false"
      ></ins>
    </div>
  );
}
