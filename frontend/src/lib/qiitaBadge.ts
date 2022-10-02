import { RenderBadgeOptions } from "@/lib/badge";
import {
  getArticlesCount,
  getContributions,
  getFollowersCount,
} from "@/lib/qiitaApi";
import { renderBadge } from "@/lib/renderBadge";
import logos from "@/logos.json";

export type BadgeType = "contributions" | "followers" | "articles";

export type RenderQiitaBadgeOptions = Omit<
  RenderBadgeOptions,
  "color" | "logoDataUrl" | "message" | "label"
> & {
  type: BadgeType;
  username: string;
  label?: string;
};

const typeLabelMap: Record<BadgeType, string> = {
  contributions: "Contributions",
  followers: "Followers",
  articles: "Articles",
};

export const renderQiitaBadge = async (
  options: RenderQiitaBadgeOptions
): Promise<string> => {
  const { type, label, username, ...renderOptions } = options;
  const value = await _getValue(type, username);

  const svg = renderBadge({
    logoDataUrl: logos.qiita,
    color: value == null ? "#D1654D" : "#55C500",
    label: label?.trim() || typeLabelMap[options.type],
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
