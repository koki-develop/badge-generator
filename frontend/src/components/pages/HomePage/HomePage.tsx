import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import QiitaBadgeBlocks from "./QiitaBadgeBlocks";
import ZennBadgeBlocks from "./ZennBadgeBlocks";

const HomePage: NextPage = () => {
  return (
    <div className="pt-4">
      <Head>
        <title>Badge Generator</title>
      </Head>

      <ZennBadgeBlocks />
      <hr className="my-8" />
      <QiitaBadgeBlocks />
    </div>
  );
};

export default HomePage;
