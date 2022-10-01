import Head from "next/head";
import React from "react";
import Divider from "@/components/util/Divider";
import QiitaBadgeBlocks from "./QiitaBadgeBlocks";
import ZennBadgeBlocks from "./ZennBadgeBlocks";
import type { NextPage } from "next";

const HomePage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Badge Generator</title>
      </Head>

      <ZennBadgeBlocks />
      <Divider />
      <QiitaBadgeBlocks />
    </div>
  );
};

export default HomePage;
