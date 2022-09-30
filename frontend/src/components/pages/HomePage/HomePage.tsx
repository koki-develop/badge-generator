import type { NextPage } from "next";
import React from "react";
import ZennBadgeBlocks from "./ZennBadgeBlocks";

const HomePage: NextPage = () => {
  return (
    <div className="pt-4">
      <ZennBadgeBlocks />
    </div>
  );
};

export default HomePage;
