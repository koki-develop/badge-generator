import { RenderBadgeOptions } from "@/lib/badge";
import { renderBadge } from "@/lib/renderBadge";
import {
  getArticlesCount,
  getBooksCount,
  getFollowersCount,
  getLikesCount,
  getScrapssCount,
} from "@/lib/zennApi";
import logos from "@/logos.json";

export type ZennBadgeType =
  | "articles"
  | "books"
  | "followers"
  | "scraps"
  | "likes";

export type RenderZennBadgeOptions = Omit<
  RenderBadgeOptions,
  "color" | "logoDataUrl" | "message" | "label"
> & {
  type: ZennBadgeType;
  username: string;
  label?: string;
};

const typeLabelMap: Record<ZennBadgeType, string> = {
  articles: "Articles",
  books: "Books",
  followers: "Followers",
  scraps: "Scraps",
  likes: "Likes",
};

export const renderZennBadge = async (
  options: RenderZennBadgeOptions
): Promise<string> => {
  const { type, label, username, ...renderOptions } = options;
  const value = await _getValue(type, username);

  const svg = renderBadge({
    logoDataUrl: logos.zenn,
    color: value == null ? "#D1654D" : "#3EA8FF",
    label: label?.trim() || typeLabelMap[options.type],
    message: value?.toString() ?? "user not found",
    ...renderOptions,
  });

  return svg;
};

const _getValue = async (
  type: ZennBadgeType,
  username: string
): Promise<number | null> => {
  return {
    articles: getArticlesCount,
    books: getBooksCount,
    followers: getFollowersCount,
    scraps: getScrapssCount,
    likes: getLikesCount,
  }[type](username);
};
