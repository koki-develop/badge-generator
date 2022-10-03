import path from "path";
import { Query } from "@/api/api";
import { AtCoderBadgeType } from "@/api/atcoder";
import { QiitaBadgeType } from "@/api/qiita";
import { ZennBadgeType } from "@/api/zenn";

const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://badgen.org"
    : "http://localhost:3000";

export const buildZennBadgeUrl = (type: ZennBadgeType) => (query: Query) => {
  const url = new URL(baseUrl);
  url.pathname = path.join(url.pathname, "img/zenn", query.username, type);

  if (query.style) url.searchParams.set("style", query.style);
  if (query.label?.trim()) url.searchParams.set("label", query.label);

  return url.href;
};

export const buildQiitaBadgeUrl = (type: QiitaBadgeType) => (query: Query) => {
  const url = new URL(baseUrl);
  url.pathname = path.join(url.pathname, "img/qiita", query.username, type);

  if (query.style) url.searchParams.set("style", query.style);
  if (query.label?.trim()) url.searchParams.set("label", query.label);

  return url.href;
};

export const buildAtCoderBadgeUrl =
  (type: AtCoderBadgeType) => (query: Query) => {
    const suffix = {
      algorithm_rating: "rating/algorithm",
      heuristic_rating: "rating/heuristic",
    }[type];

    const url = new URL(baseUrl);
    url.pathname = path.join(
      url.pathname,
      "img/atcoder",
      query.username,
      suffix
    );

    if (query.style) url.searchParams.set("style", query.style);
    if (query.label?.trim()) url.searchParams.set("label", query.label);

    return url.href;
  };
