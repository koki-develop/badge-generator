import { NextApiHandler } from "next";
import { render } from "@/api/api";
import {
  getArticlesCount,
  getContributions,
  getFollowersCount,
} from "@/lib/qiitaApi";
import { BadgeType } from "@/lib/qiitaBadge";
import logos from "@/logos.json";

const _selectLabel = (type: BadgeType): string =>
  ({
    articles: "Articles",
    followers: "followers",
    contributions: "Contributions",
  }[type]);

const _handler = (type: BadgeType): NextApiHandler =>
  render(async (query) => {
    const label = query.label?.trim() || _selectLabel(type);

    const value = await {
      articles: getArticlesCount,
      followers: getFollowersCount,
      contributions: getContributions,
    }[type](query.username);

    return {
      logoDataUrl: logos.qiita,
      color: value == null ? "#D1654D" : "#55C500",
      label,
      message: value?.toString() ?? "user not found",
      style: query.style,
    };
  });

export const articles = _handler("articles");
export const followers = _handler("followers");
export const contributions = _handler("contributions");
