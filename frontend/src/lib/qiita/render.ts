import axios from "axios";
import fs from "fs";
import path from "path";
import { BadgeType, RenderQiitaBadgeOptions, User } from "./types";
import { renderBadge } from "../badge/render";
import { loadCache, saveCache } from "../cache";

const typeLabelMap: Record<BadgeType, string> = {
  articles: "Articles",
};

export const renderQiitaBadge = async (
  options: RenderQiitaBadgeOptions
): Promise<string> => {
  const logoBase64 = fs
    .readFileSync(path.resolve(process.cwd(), "public/logos/qiita.png"))
    .toString("base64");

  const { type, userId, ...renderOptions } = options;
  const value = await _getValue(type, userId);

  const svg = renderBadge({
    logoDataUrl: `data:image/png;base64,${logoBase64}`,
    color: value == null ? "#D1654D" : "#55C500",
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
    case "articles":
      return _getArticlesCount(username);
  }
};

const _getArticlesCount = async (username: string): Promise<number | null> => {
  const user = await _getUser(username);
  return user?.items_count ?? null;
};

const _getUser = async (username: string): Promise<User | null> => {
  const cacheKey = `qiita_${username}`;
  const cache = await loadCache<User>(cacheKey);
  if (cache?.data) {
    return cache.data;
  }

  const endpoint = `https://qiita.com/api/v2/users/${encodeURIComponent(
    username
  )}`;
  const resp = await axios.get<User>(endpoint, {
    validateStatus: (status) => [200, 404].includes(status),
  });
  if (resp.status === 404) {
    await saveCache(cacheKey, null);
    return null;
  }

  await saveCache(cacheKey, resp.data);
  return resp.data;
};
