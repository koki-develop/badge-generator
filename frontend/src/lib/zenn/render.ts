import axios from "axios";
import fs from "fs";
import path from "path";
import { BadgeType, RenderZennBadgeOptions, User } from "./types";
import { renderBadge } from "../badge";
import { loadCache, saveCache } from "../cache";

const typeLabelMap: Record<BadgeType, string> = {
  likes: "Likes",
  articles: "Articles",
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
    color: value == null ? "#D1654D" : "#3EA8FF",
    label: typeLabelMap[options.type],
    message: value?.toString() ?? "user not found",
    ...renderOptions,
  });

  return svg;
};

const _getValue = async (
  type: BadgeType,
  username: string
): Promise<number | null> => {
  switch (type) {
    case "likes":
      return _getLikesCount(username);
    case "articles":
      return _getArticlesCount(username);
  }
};

const _getLikesCount = async (username: string): Promise<number | null> => {
  const user = await _getUser(username);
  return user?.total_liked_count ?? null;
};

const _getArticlesCount = async (username: string): Promise<number | null> => {
  const user = await _getUser(username);
  return user?.articles_count ?? null;
};

const _getUser = async (username: string): Promise<User | null> => {
  const cacheKey = `zenn_${username}`;
  const cache = await loadCache<User>(cacheKey);
  if (cache?.data) {
    return cache.data;
  }

  const endpoint = `https://zenn.dev/api/users/${encodeURIComponent(username)}`;
  const resp = await axios.get<{ user: User }>(endpoint, {
    validateStatus: (status) => [200, 404].includes(status),
  });
  if (resp.status === 404) {
    await saveCache(cacheKey, null);
    return null;
  }

  await saveCache(cacheKey, resp.data.user);
  return resp.data.user;
};
