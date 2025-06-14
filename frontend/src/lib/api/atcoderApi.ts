import { ApiResult, ApiError } from "@/lib/api/api";
import { axiosInstance } from "@/lib/api/axios";
import { withCache } from "@/lib/api/cache";
import { withRate } from "@/lib/api/rate";

export const getAlgorithmRating = async (
  username: string,
): Promise<ApiResult<number>> => {
  return _getRatingWithCache(username, "algorithm");
};

export const getHeuristicRating = async (
  username: string,
): Promise<ApiResult<number>> => {
  return _getRatingWithCache(username, "heuristic");
};

const _getRatingWithCache = async (
  username: string,
  type: "algorithm" | "heuristic",
): Promise<ApiResult<number>> => {
  const cacheKey = `atcoder_${type}_rating_${username}`;
  return withCache(
    cacheKey,
    withRate("atcoder", () => _getRating(username, type)),
  );
};

const _getRating = async (
  username: string,
  type: "algorithm" | "heuristic",
): Promise<ApiResult<number>> => {
  const url = new URL(
    `https://atcoder.jp/users/${encodeURIComponent(username)}/history/json`,
  );
  const contestType: string = { algorithm: "algo", heuristic: "heuristic" }[
    type
  ];
  url.searchParams.set("contestType", contestType);

  const resp = await axiosInstance.get<{ NewRating: number }[]>(url.href);
  const { data } = resp;
  if (data.length === 0) {
    return { data: null, error: ApiError.DataNotFound };
  }

  // get last element
  return { data: data[data.length - 1].NewRating };
};
