import path from "path";
import { RenderAtCoderBadgeOptions } from "@/lib/atcoderBadge";
import { RenderQiitaBadgeOptions } from "@/lib/qiitaBadge";
import { RenderZennBadgeOptions } from "@/lib/zennBadge";

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

export const atcoderBadgeUrl = (options: RenderAtCoderBadgeOptions): string => {
  const suffix = (() => {
    switch (options.type) {
      case "algorithm_rating":
        return "rating/algorithm";
      case "heuristic_rating":
        return "rating/heuristic";
    }
  })();

  const url = new URL(baseUrl);
  url.pathname = path.join(
    url.pathname,
    "img/atcoder",
    options.username,
    suffix
  );
  url.search = new URLSearchParams({ style: options.style }).toString();

  return url.href;
};
