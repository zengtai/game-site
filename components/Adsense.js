import React, { useEffect } from "react";
import { ADS_ID } from "../lib/constants";

export default function Adsense({ slot, h = `100%`, w = `100%` }) {
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
      className={`overflow-hidden before:content-['Advertisement'] before:flex before:justify-center before:opacity-50 bg-black/5 ${h} w-[300px] md:h-[90px] md:w-[728px] lg:w-[970px] mx-auto`}
    >
      <ins
        className="adsbygoogle"
        style={{
          display: `block`,
          margin: `0 auto`,
          height: `100%`,
          width: `100%`,
        }}
        data-ad-client={ADS_ID}
        data-ad-slot={slot}
        data-full-width-responsive="false"
      ></ins>
    </div>
  );
}
