import { NextApiHandler } from "next";
import { renderSvg } from "@/api/api";
import {
  getArticlesCount,
  getContributions,
  getFollowersCount,
} from "@/lib/api/qiitaApi";
import logos from "@/logos.json";

export type QiitaBadgeType = "contributions" | "followers" | "articles";

const _selectLabel = (type: QiitaBadgeType): string =>
  ({
    articles: "Articles",
    followers: "Followers",
    contributions: "Contributions",
  }[type]);

const _handler = (type: QiitaBadgeType): NextApiHandler =>
  renderSvg(async (query) => {
    const value = await {
      articles: getArticlesCount,
      followers: getFollowersCount,
      contributions: getContributions,
    }[type](query.username);

    return {
      logoDataUrl: logos.qiita,
      color: value == null ? "#D1654D" : "#55C500",
      label: _selectLabel(type),
      message: value?.toString() ?? "user not found",
    };
  });

export const articles = _handler("articles");
export const followers = _handler("followers");
export const contributions = _handler("contributions");
