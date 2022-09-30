import type { NextPage } from "next";
import React from "react";
import QiitaBadgeBlocks from "./QiitaBadgeBlocks";
import ZennBadgeBlocks from "./ZennBadgeBlocks";

const HomePage: NextPage = () => {
  return (
    <div className="pt-4">
      <ZennBadgeBlocks />

      <hr className="my-8" />

      <QiitaBadgeBlocks />
    </div>
  );
};

export default HomePage;
