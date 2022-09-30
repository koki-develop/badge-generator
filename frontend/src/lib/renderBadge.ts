import makeBadge from "badge-maker/lib/make-badge";
import { BadgeStyle, RenderBadgeOptions } from "./badge";

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
