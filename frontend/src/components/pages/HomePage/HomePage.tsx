import Head from "next/head";
import React from "react";
import { Badge } from "@/components/util/BadgeBlock";
import Divider from "@/components/util/Divider";
import { BadgeStyle } from "@/lib/badge";
import { qiitaBadgeUrl, zennBadgeUrl } from "@/lib/badgeUrl";
import BadgeBlocks from "./BadgeBlocks";
import type { NextPage } from "next";

const usernameToZennBadges = (username: string, style: BadgeStyle): Badge[] => {
  return [
    {
      name: "Likes",
      src: zennBadgeUrl({ username, style, type: "likes" }),
      link: `https://zenn.dev/${username}`,
    },
    {
      name: "Followers",
      src: zennBadgeUrl({ username, style, type: "followers" }),
      link: `https://zenn.dev/${username}`,
    },
    {
      name: "Articles",
      src: zennBadgeUrl({ username, style, type: "articles" }),
      link: `https://zenn.dev/${username}`,
    },
    {
      name: "Books",
      src: zennBadgeUrl({ username, style, type: "books" }),
      link: `https://zenn.dev/${username}?tab=books`,
    },
    {
      name: "Scraps",
      src: zennBadgeUrl({ username, style, type: "scraps" }),
      link: `https://zenn.dev/${username}?tab=scraps`,
    },
  ];
};

const usernameToQiitaBadges = (
  username: string,
  style: BadgeStyle
): Badge[] => {
  return [
    {
      name: "Contributions",
      src: qiitaBadgeUrl({
        username,
        style,
        type: "contributions",
      }),
      link: `https://qiita.com/${username}`,
    },
    {
      name: "Followers",
      src: qiitaBadgeUrl({
        username,
        style,
        type: "followers",
      }),
      link: `https://qiita.com/${username}`,
    },
    {
      name: "Articles",
      src: qiitaBadgeUrl({
        username,
        style,
        type: "articles",
      }),
      link: `https://qiita.com/${username}`,
    },
  ];
};
const HomePage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Badge Generator</title>
      </Head>

      <BadgeBlocks
        title="Zenn"
        defaultUsername="kou_pg_0131"
        usernameToBadges={usernameToZennBadges}
      />
      <Divider />
      <BadgeBlocks
        title="Qiita"
        defaultUsername="koki_develop"
        usernameToBadges={usernameToQiitaBadges}
      />
    </div>
  );
};

export default HomePage;
