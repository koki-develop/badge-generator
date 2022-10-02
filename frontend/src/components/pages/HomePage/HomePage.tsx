import Head from "next/head";
import Image from "next/image";
import React, { useMemo } from "react";
import * as Scroll from "react-scroll";
import BadgeBlocks from "@/components/pages/HomePage/BadgeBlocks";
import { Badge } from "@/components/util/BadgeBlock";
import Divider from "@/components/util/Divider";
import { BadgeStyle } from "@/lib/badge";
import { atcoderBadgeUrl, qiitaBadgeUrl, zennBadgeUrl } from "@/lib/badgeUrl";
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

const usernameToAtCoderBadge = (
  username: string,
  style: BadgeStyle
): Badge[] => {
  return [
    {
      name: "Rating",
      src: atcoderBadgeUrl({ username, style, type: "algorithm_rating" }),
      link: `https://atcoder.jp/users/${username}?contestType=algo`,
    },
    {
      name: "Rating(Heuristic)",
      src: atcoderBadgeUrl({ username, style, type: "heuristic_rating" }),
      link: `https://atcoder.jp/users/${username}?contestType=heuristic`,
    },
  ];
};

const HomePage: NextPage = () => {
  const cards = useMemo(() => {
    return [
      { name: "Zenn", imgSrc: "/logos/zenn.svg" },
      { name: "Qiita", imgSrc: "/logos/qiita.png" },
      { name: "AtCoder", imgSrc: "/logos/atcoder_black.svg" },
    ];
  }, []);

  return (
    <div>
      <Head>
        <title>Badge Generator</title>
        <meta name="description" content="シンプルなバッジ生成サービス。" />
      </Head>

      <div className="grid grid-cols-2 gap-4">
        {cards.map((card) => (
          <Scroll.Link
            key={card.name}
            to={card.name}
            smooth
            duration={300}
            className="flex cursor-pointer flex-col items-center justify-center rounded border py-4 hover:bg-gray-50 active:bg-gray-100"
          >
            <Image width={80} height={80} src={card.imgSrc} alt="" />
            <span>{card.name}</span>
          </Scroll.Link>
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
