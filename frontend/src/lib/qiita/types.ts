import { RenderBadgeOptions } from "../badge/types";

export type BadgeType = "articles";

export type RenderQiitaBadgeOptions = Omit<
  RenderBadgeOptions,
  "color" | "logoDataUrl" | "message" | "label"
> & {
  type: BadgeType;
  username: string;
};

export type User = {
  followers_count: number;
  items_count: number;
};
