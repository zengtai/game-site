import { useState } from "react";
import Head from "next/head";

export default function Editor({ params }) {
  
  async function getData() {}

  return (
    <>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>

      <div className="container mx-auto my-6 bg-white p-6">
        <h2>Fetch source data</h2>
        <div className="flex items-center gap-3">
          <lable>URL: </lable>
          <input
            className="w-1/2 border p-2"
            type="text"
            name="dataUrl"
            id="dataUrl"
          />
          <button className="bg-blue-600 p-2 text-white">Fetch</button>
        </div>
        <div></div>
      </div>
    </>
  );
}
