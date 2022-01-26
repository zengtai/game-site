import React, { useEffect } from "react";
import { ADS_ID } from "../lib/constants";

export default function Adsense({ slot, h = `100px` }) {
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
        display: `flex`,
        justifyContent: `center`,
        height: `${h}`,
      }}
      data-ad-client={ADS_ID}
      data-ad-slot={slot}
      // data-ad-format={f}
      data-full-width-responsive="true"
    ></ins>
  );
}
