import makeBadge from "badge-maker/lib/make-badge";

export const BadgeStyle = {
  plastic: "plastic",
  flat: "flat",
  flatSquare: "flat-square",
  social: "social",
  forTheBadge: "for-the-badge",
} as const;

export type BadgeStyle = typeof BadgeStyle[keyof typeof BadgeStyle];

export type RenderBadgeOptions = {
  logoDataUrl: string;
  color: string;
  label: string;
  message: string;
  style: BadgeStyle;
};

export const renderBadge = (options: RenderBadgeOptions): string => {
  return makeBadge({
    logo: options.logoDataUrl,
    color: options.color,
    label: options.label,
    message: options.message,
    style: options.style,
  });
};
