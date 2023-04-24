import Head from "next/head";
import React from "react";
import BadgeBlocks from "@/components/pages/HomePage/BadgeBlocks";
import ServiceCard from "@/components/pages/HomePage/ServiceCard";
import { Badge } from "@/components/util/BadgeBlock";
import Divider from "@/components/util/Divider";
import { buildQiitaBadgeUrl, buildZennBadgeUrl } from "@/lib/badgeUrl";
import logos from "@/logos.json";
import type { NextPage } from "next";

const usernameToZennBadges = (username: string): Badge[] => {
  return [
    {
      name: "Likes",
      buildUrl: buildZennBadgeUrl("likes"),
      link: `https://zenn.dev/${username}`,
    },
    {
      name: "Followers",
      buildUrl: buildZennBadgeUrl("followers"),
      link: `https://zenn.dev/${username}`,
    },
    {
      name: "Articles",
      buildUrl: buildZennBadgeUrl("articles"),
      link: `https://zenn.dev/${username}`,
    },
    {
      name: "Books",
      buildUrl: buildZennBadgeUrl("books"),
      link: `https://zenn.dev/${username}?tab=books`,
    },
    {
      name: "Scraps",
      buildUrl: buildZennBadgeUrl("scraps"),
      link: `https://zenn.dev/${username}?tab=scraps`,
    },
  ];
};

const usernameToQiitaBadges = (username: string): Badge[] => {
  return [
    {
      name: "Contributions",
      buildUrl: buildQiitaBadgeUrl("contributions"),
      link: `https://qiita.com/${username}`,
    },
    {
      name: "Followers",
      buildUrl: buildQiitaBadgeUrl("followers"),
      link: `https://qiita.com/${username}`,
    },
    {
      name: "Articles",
      buildUrl: buildQiitaBadgeUrl("articles"),
      link: `https://qiita.com/${username}`,
    },
  ];
};

const cards = [
  { name: "Zenn", imgSrc: logos.zenn },
  { name: "Qiita", imgSrc: logos.qiita },
];

const HomePage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Badge Generator</title>
        <meta name="description" content="シンプルなバッジ生成サービス。" />
      </Head>

      <div className="mb-4 border-l-4 border-orange-500 bg-orange-100 p-4 text-orange-700">
        <p className="font-bold">
          2023/04/25 AtCoder バッジのサポートは終了しました。
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {cards.map((card) => (
          <ServiceCard key={card.name} name={card.name} imgSrc={card.imgSrc} />
        ))}
      </div>

      <Divider />

      <BadgeBlocks
        title="Zenn"
        serviceUrl="https://zenn.dev"
        defaultUsername="kou_pg_0131"
        usernameToBadges={usernameToZennBadges}
      />

      <Divider />

      <BadgeBlocks
        title="Qiita"
        serviceUrl="https://qiita.com"
        defaultUsername="koki_develop"
        usernameToBadges={usernameToQiitaBadges}
      />
    </div>
  );
};

export default HomePage;
