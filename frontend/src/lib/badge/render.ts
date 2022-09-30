import makeBadge from "badge-maker/lib/make-badge";
import { BadgeStyle } from "./types";

export type RenderBadgeOptions = {
  logoDataUrl: string;
  color: string;
  label: string;
  message: string;
  style: BadgeStyle;
};

export const renderBadge = (options: RenderBadgeOptions): string => {
  if (!Object.values(BadgeStyle).includes(options.style)) {
    options.style = "plastic";
  }

  return makeBadge({
    logo: options.logoDataUrl,
    color: options.color,
    label: options.label,
    message: options.message,
    style: options.style,
  });
};
