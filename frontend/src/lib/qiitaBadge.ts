import { RenderBadgeOptions } from "./badge";
import { renderBadge } from "./renderBadge";
import {
  getArticlesCount,
  getContributions,
  getFollowersCount,
} from "./qiitaApi";
import { qiita } from "../logos.json";

export type BadgeType = "contributions" | "followers" | "articles";

export type RenderQiitaBadgeOptions = Omit<
  RenderBadgeOptions,
  "color" | "logoDataUrl" | "message" | "label"
> & {
  type: BadgeType;
  username: string;
};

const typeLabelMap: Record<BadgeType, string> = {
  contributions: "Contributions",
  followers: "Followers",
  articles: "Articles",
};

export const renderQiitaBadge = async (
  options: RenderQiitaBadgeOptions
): Promise<string> => {
  const { type, username, ...renderOptions } = options;
  const value = await _getValue(type, username);

  const svg = renderBadge({
    logoDataUrl: `data:image/png;base64,${qiita}`,
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
    case "contributions":
      return getContributions(username);
    case "followers":
      return getFollowersCount(username);
    case "articles":
      return getArticlesCount(username);
  }
};
