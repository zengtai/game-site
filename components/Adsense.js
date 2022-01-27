import React, { useEffect } from "react";
import { ADS_ID } from "../lib/constants";

export default function Adsense({ slot }) {
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
      className="adsbygoogle bg-loading bg-no-repeat bg-center bg-black/10"
      style={{ display: "block", height: "100%", width: "100%" }}
      data-ad-client={ADS_ID}
      data-ad-slot={slot}
      // data-ad-format="auto"
      // data-full-width-responsive="true"
    ></ins>
  );
}
