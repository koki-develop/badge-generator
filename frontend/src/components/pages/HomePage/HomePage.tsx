import Head from "next/head";
import React from "react";
import BadgeBlocks from "@/components/pages/HomePage/BadgeBlocks";
import ServiceCard from "@/components/pages/HomePage/ServiceCard";
import { Badge } from "@/components/util/BadgeBlock";
import Divider from "@/components/util/Divider";
import {
  buildAtCoderBadgeUrl,
  buildQiitaBadgeUrl,
  buildZennBadgeUrl,
} from "@/lib/badgeUrl";
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

const usernameToAtCoderBadge = (username: string): Badge[] => {
  return [
    {
      name: "Rating",
      buildUrl: buildAtCoderBadgeUrl("algorithm_rating"),
      link: `https://atcoder.jp/users/${username}?contestType=algo`,
    },
    {
      name: "Rating(Heuristic)",
      buildUrl: buildAtCoderBadgeUrl("heuristic_rating"),
      link: `https://atcoder.jp/users/${username}?contestType=heuristic`,
    },
  ];
};

const cards = [
  { name: "Zenn", imgSrc: logos.zenn },
  { name: "Qiita", imgSrc: logos.qiita },
  { name: "AtCoder", imgSrc: logos.atcoderBlack },
];

const HomePage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Badge Generator</title>
        <meta name="description" content="シンプルなバッジ生成サービス。" />
      </Head>

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

      <Divider />

      <BadgeBlocks
        title="AtCoder"
        serviceUrl="https://atcoder.jp"
        defaultUsername="chokudai"
        usernameToBadges={usernameToAtCoderBadge}
      />
    </div>
  );
};

export default HomePage;
