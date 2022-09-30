import { RenderBadgeOptions } from "./badge";
import { renderBadge } from "./renderBadge";
import { getArticlesCount, getLikesCount } from "./zennApi";
import { zenn } from "../logos.json";

export type BadgeType = "likes" | "articles";

export type RenderZennBadgeOptions = Omit<
  RenderBadgeOptions,
  "color" | "logoDataUrl" | "message" | "label"
> & {
  type: BadgeType;
  username: string;
};

const typeLabelMap: Record<BadgeType, string> = {
  likes: "Likes",
  articles: "Articles",
};

export const renderZennBadge = async (
  options: RenderZennBadgeOptions
): Promise<string> => {
  const { type, username, ...renderOptions } = options;
  const value = await _getValue(type, username);

  const svg = renderBadge({
    logoDataUrl: `data:image/svg+xml;base64,${zenn}`,
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
      return getLikesCount(username);
    case "articles":
      return getArticlesCount(username);
  }
};
