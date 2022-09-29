import makeBadge from "badge-maker/lib/make-badge";

export type RenderBadgeOptions = {
  logoSvg: string;
  color: string;
  label: string;
  message: string;
  style: "plastic" | "flat" | "flat-square" | "social" | "for-the-badge";
};

export const renderBadge = (options: RenderBadgeOptions): string => {
  return makeBadge({
    logo: `data:image/svg+xml;base64,${Buffer.from(
      options.logoSvg.trim()
    ).toString("base64")}`,
    color: options.color,
    label: options.label,
    message: options.message,
    style: options.style,
  });
};
