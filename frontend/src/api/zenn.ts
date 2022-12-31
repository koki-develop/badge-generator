import { NextApiHandler } from "next";
import { renderSvg } from "@/api/api";
import { getUser } from "@/lib/api/zennApi";
import logos from "@/logos.json";

export type ZennBadgeType =
  | "articles"
  | "books"
  | "followers"
  | "scraps"
  | "likes";

const _selectLabel = (type: ZennBadgeType): string =>
  ({
    articles: "Articles",
    books: "Books",
    followers: "Followers",
    scraps: "Scraps",
    likes: "Likes",
  }[type]);

const _handler = (type: ZennBadgeType): NextApiHandler =>
  renderSvg(async (query) => {
    const base = {
      logo: logos.zenn,
      color: "#3EA8FF",
      label: _selectLabel(type),
    };

    const result = await getUser(query.username);
    if (result.error) return { ...base, error: result.error };

    const value = {
      articles: result.data.articles_count,
      books: result.data.books_count,
      followers: result.data.follower_count,
      likes: result.data.total_liked_count,
      scraps: result.data.scraps_count,
    }[type];

    return {
      ...base,
      message: value.toString(),
    };
  });

export const articles = _handler("articles");
export const books = _handler("books");
export const followers = _handler("followers");
export const likes = _handler("likes");
export const scraps = _handler("scraps");
