import { renderBadge, RenderBadgeOptions } from "./badge";
import { getArticlesCount } from "./qiitaApi";
import { qiita } from "../logos.json";

export type BadgeType = "articles";

export type RenderQiitaBadgeOptions = Omit<
  RenderBadgeOptions,
  "color" | "logoDataUrl" | "message" | "label"
> & {
  type: BadgeType;
  username: string;
};

const typeLabelMap: Record<BadgeType, string> = {
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
    case "articles":
      return getArticlesCount(username);
  }
};
