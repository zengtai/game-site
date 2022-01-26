import React, { useEffect } from "react";
import { ADS_ID } from "../lib/constants";

export default function Adsense({ slot }) {
  const loadAds = () => {
    try {
      if (typeof window !== "undefined") {
        (adsbygoogle = window.adsbygoogle || []).push({});
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
        height: `100px`,
        width: `100%`,
      }}
      data-ad-client={ADS_ID}
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
}
