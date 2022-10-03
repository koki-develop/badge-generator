import makeBadge from "badge-maker/lib/make-badge";
import { RenderBadgeOptions } from "@/lib/badge";

export const renderBadge = (options: RenderBadgeOptions): string => {
  return makeBadge({
    logo: options.logoDataUrl,
    color: options.color,
    label: options.label,
    message: options.message,
    style: options.style,
  });
};
