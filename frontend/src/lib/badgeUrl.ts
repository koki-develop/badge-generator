import path from "path";
import { Query } from "@/api/api";
import { AtCoderBadgeType } from "@/api/atcoder";
import { QiitaBadgeType } from "@/api/qiita";
import { ZennBadgeType } from "@/api/zenn";

const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://badgen.org"
    : "http://localhost:3000";

const _buildBadgeUrl = (paths: string[], query: Query) => {
  const url = new URL(baseUrl);
  url.pathname = path.join(url.pathname, ...paths);

  if (query.style) url.searchParams.set("style", query.style);
  if (query.label?.trim()) url.searchParams.set("label", query.label);

  return url.href;
};

export const buildZennBadgeUrl = (type: ZennBadgeType) => (query: Query) => {
  return _buildBadgeUrl(["img/zenn", query.username, type], query);
};

export const buildQiitaBadgeUrl = (type: QiitaBadgeType) => (query: Query) => {
  return _buildBadgeUrl(["img/qiita", query.username, type], query);
};

export const buildAtCoderBadgeUrl =
  (type: AtCoderBadgeType) => (query: Query) => {
    const suffix = {
      algorithm_rating: "rating/algorithm",
      heuristic_rating: "rating/heuristic",
    }[type];

    return _buildBadgeUrl(["img/atcoder", query.username, suffix], query);
  };
