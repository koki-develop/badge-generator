export const BadgeStyle = {
  plastic: "plastic",
  flat: "flat",
  flatSquare: "flat-square",
  social: "social",
  forTheBadge: "for-the-badge",
} as const;

export type BadgeStyle = typeof BadgeStyle[keyof typeof BadgeStyle];
