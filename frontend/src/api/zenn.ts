import { NextApiHandler } from "next";
import { render } from "@/api/api";
import {
  getArticlesCount,
  getBooksCount,
  getFollowersCount,
  getLikesCount,
  getScrapssCount,
} from "@/lib/zennApi";
import { BadgeType } from "@/lib/zennBadge";
import logos from "@/logos.json";

const _selectLabel = (type: BadgeType): string =>
  ({
    articles: "Articles",
    books: "Books",
    followers: "Followers",
    scraps: "Scraps",
    likes: "Likes",
  }[type]);

const _handler = (type: BadgeType): NextApiHandler =>
  render(async (query) => {
    const value = await {
      articles: getArticlesCount,
      books: getBooksCount,
      followers: getFollowersCount,
      scraps: getScrapssCount,
      likes: getLikesCount,
    }[type](query.username);

    return {
      logoDataUrl: logos.zenn,
      color: value == null ? "#D1654D" : "#3EA8FF",
      label: _selectLabel(type),
      message: value?.toString() ?? "user not found",
    };
  });

export const articles = _handler("articles");
export const books = _handler("books");
export const followers = _handler("followers");
export const likes = _handler("likes");
export const scraps = _handler("scraps");
