import React, { useEffect } from "react";
import { ADS_ID } from "../lib/constants";

export default function AdsenseFixed({ slot }) {
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
    <ins
      className="adsbygoogle"
      style={{
        display: `block`,
        margin: `0 auto`,
        height: `300px`,
        width: `200px`,
      }}
      data-ad-client={ADS_ID}
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="false"
    ></ins>
  );
}
