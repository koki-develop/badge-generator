import path from "path";
import { RenderQiitaBadgeOptions } from "./qiitaBadge";
import { RenderZennBadgeOptions } from "./zennBadge";

const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://badgen.org"
    : "http://localhost:3000";

export const zennBadgeUrl = (options: RenderZennBadgeOptions): string => {
  const url = new URL(baseUrl);
  url.pathname = path.join(
    url.pathname,
    "img/zenn",
    options.username,
    options.type
  );
  url.search = new URLSearchParams({ style: options.style }).toString();

  return url.href;
};

export const qiitaBadgeUrl = (options: RenderQiitaBadgeOptions): string => {
  const url = new URL(baseUrl);
  url.pathname = path.join(
    url.pathname,
    "img/qiita",
    options.username,
    options.type
  );
  url.search = new URLSearchParams({ style: options.style }).toString();

  return url.href;
};
