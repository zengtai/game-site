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
    <ins
      className="adsbygoogle"
      style={{
        display: `block`,
        margin: `0 auto`,
        height: `${h}`,
        width: `${w}`,
      }}
      data-ad-client={ADS_ID}
      data-ad-slot={slot}
      data-full-width-responsive="false"
    ></ins>
  );
}