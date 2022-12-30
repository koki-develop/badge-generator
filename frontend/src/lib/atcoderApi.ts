import axios from "axios";
import { load } from "cheerio";
import { ApiResult, ApiError } from "@/lib/api";
import { withCache } from "@/lib/cache";

export const getAlgorithmRating = async (
  username: string
): Promise<ApiResult<number>> => {
  return _getRatingWithCache(username, "algorithm");
};

export const getHeuristicRating = async (
  username: string
): Promise<ApiResult<number>> => {
  return _getRatingWithCache(username, "heuristic");
};

const _getRatingWithCache = async (
  username: string,
  type: "algorithm" | "heuristic"
): Promise<ApiResult<number>> => {
  const cacheKey = `atcoder_${type}_rating_${username}`;
  return withCache(cacheKey, () => _getRating(username, type));
};

const _getRating = async (
  username: string,
  type: "algorithm" | "heuristic"
): Promise<ApiResult<number>> => {
  const url = new URL(
    `https://atcoder.jp/users/${encodeURIComponent(username)}`
  );
  const contestType: string = { algorithm: "algo", heuristic: "heuristic" }[
    type
  ];
  url.searchParams.set("contestType", contestType);
  url.searchParams.set("graph", "rating");

  const resp = await axios.get(url.href, {
    validateStatus: (status) => [200, 404].includes(status),
  });

  if (resp.status === 404) {
    return { data: null, error: ApiError.UserNotFound };
  }

  const $ = load(resp.data);
  const text = $('tr:contains("Rating"):nth(0)').text().trim().split(/\s+/)[0];
  if (!text.startsWith("Rating")) {
    return { data: null, error: ApiError.DataNotFound };
  }

  const rating = Number(text.replaceAll("Rating", ""));
  if (Number.isNaN(rating)) {
    return { data: null, error: ApiError.DataNotFound };
  }

  return { data: rating };
};
