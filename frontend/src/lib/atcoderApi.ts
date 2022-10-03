import axios from "axios";
import { load } from "cheerio";
import { ApiResult, ApiError } from "@/lib/api";
import { loadCache, saveCache } from "@/lib/cache";

export const getAlgorithmRating = async (
  username: string
): Promise<ApiResult<number>> => {
  return _getRating(username, "algorithm");
};

export const getHeuristicRating = async (
  username: string
): Promise<ApiResult<number>> => {
  return _getRating(username, "heuristic");
};

const _getRating = async (
  username: string,
  type: "algorithm" | "heuristic"
): Promise<ApiResult<number>> => {
  const cacheKey = `atcoder_${type}_rating_${username}`;
  const cache = await loadCache<ApiResult<number>>(cacheKey);
  if (cache?.data != null) {
    return cache.data;
  }

  const endpoint = `https://atcoder.jp/users/${encodeURIComponent(
    username
  )}?contestType=${type === "algorithm" ? "algo" : "heuristic"}&graph=rating`;
  const resp = await axios.get(endpoint, {
    validateStatus: (status) => [200, 404].includes(status),
  });
  if (resp.status === 404) {
    const result = { data: 0, error: ApiError.UserNotFound };
    await saveCache(cacheKey, result);
    return result;
  }

  const $ = load(resp.data);
  const text = $('tr:contains("Rating"):nth(0)').text().trim().split(/\s+/)[0];
  if (!text.startsWith("Rating")) {
    const result = { data: 0, error: ApiError.DataNotFound };
    await saveCache(cacheKey, result);
    return result;
  }

  const rating = Number(text.replaceAll("Rating", ""));
  if (Number.isNaN(rating)) {
    const result = { data: 0, error: ApiError.DataNotFound };
    await saveCache(cacheKey, result);
    return result;
  }

  const result = { data: rating };
  await saveCache(cacheKey, result);
  return result;
};
