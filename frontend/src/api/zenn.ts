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

    const value = (() => {
      switch (type) {
        case "articles":
          return result.data.articles_count;
        case "books":
          return result.data.books_count;
        case "followers":
          return result.data.follower_count;
        case "likes":
          return result.data.total_liked_count;
        case "scraps":
          return result.data.scraps_count;
      }
    })();

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
