import Head from "next/head";
import React from "react";
import ServiceTabs, { Service } from "@/components/pages/HomePage/ServiceTabs";
import { Badge } from "@/components/util/BadgeBlock";
import {
  buildAtCoderBadgeUrl,
  buildBlueskyBadgeUrl,
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

const usernameToBlueskyBadges = (username: string): Badge[] => {
  return [
    {
      name: "Followers",
      buildUrl: buildBlueskyBadgeUrl("followers"),
      link: `https://bsky.app/profile/${username}`,
    },
    {
      name: "Posts",
      buildUrl: buildBlueskyBadgeUrl("posts"),
      link: `https://bsky.app/profile/${username}`,
    },
  ];
};

const services: Service[] = [
  {
    name: "Zenn",
    logo: logos.zenn,
    defaultUsername: "kou_pg_0131",
    usernameToBadges: usernameToZennBadges,
  },
  {
    name: "Qiita",
    logo: logos.qiita,
    defaultUsername: "koki_develop",
    usernameToBadges: usernameToQiitaBadges,
  },
  {
    name: "AtCoder",
    logo: logos.atcoderBlack,
    defaultUsername: "chokudai",
    usernameToBadges: usernameToAtCoderBadge,
  },
  {
    name: "Bluesky",
    logo: logos.bluesky,
    defaultUsername: "koki.me",
    usernameToBadges: usernameToBlueskyBadges,
  },
];

const HomePage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Badge Generator</title>
        <meta name="description" content="シンプルなバッジ生成サービス。" />
      </Head>

      <ServiceTabs services={services} />
    </div>
  );
};

export default HomePage;
