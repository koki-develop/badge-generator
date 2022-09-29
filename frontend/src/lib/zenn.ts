import axios from "axios";
import fs from "fs";
import path from "path";
import { renderBadge, RenderBadgeOptions } from "./badge";

export type BadgeType = "likes";

const typeLabelMap: Record<BadgeType, string> = {
  likes: "Likes",
};

export type RenderZennBadgeOptions = Omit<
  RenderBadgeOptions,
  "color" | "logoDataUrl" | "message" | "label"
> & {
  type: BadgeType;
  username: string;
};

export const renderZennBadge = async (
  options: RenderZennBadgeOptions
): Promise<string> => {
  const logoBase64 = fs
    .readFileSync(path.resolve(process.cwd(), "public/logos/zenn.svg"))
    .toString("base64");

  const { type, username, ...renderOptions } = options;
  const value = await _getValue(type, username);

  const svg = renderBadge({
    logoDataUrl: `data:image/svg+xml;base64,${logoBase64}`,
    color: "#3EA8FF",
    label: typeLabelMap["likes"],
    message: value.toString(),
    ...renderOptions,
  });

  return svg;
};

const _getValue = async (
  type: BadgeType,
  username: string
): Promise<number> => {
  switch (type) {
    case "likes":
      return _getLikesCount(username);
  }
};

const _getLikesCount = async (username: string): Promise<number> => {
  const { total_liked_count } = await _getUser(username);
  return total_liked_count;
};

type User = {
  articles_count: number;
  books_count: number;
  follower_count: number;
  scraps_count: number;
  total_liked_count: number;
};

// TODO: cache 処理実装
const _getUser = async (username: string): Promise<User> => {
  const endpoint = `https://zenn.dev/api/users/${username}`;
  const { data } = await axios.get<{ user: User }>(endpoint);

  return data.user;
};
