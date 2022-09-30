import path from "path";
import { RenderQiitaBadgeOptions } from "./types";

export const badgeUrl = (options: RenderQiitaBadgeOptions): string => {
  const url = new URL(
    process.env.NODE_ENV === "production"
      ? "https://badgen.org"
      : "http://localhost:3000"
  );
  url.pathname = path.join(
    url.pathname,
    "img/qiita",
    options.username,
    options.type
  );
  url.search = new URLSearchParams({ style: options.style }).toString();

  return url.href;
};
