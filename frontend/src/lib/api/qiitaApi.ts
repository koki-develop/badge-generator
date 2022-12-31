import { load } from "cheerio";
import { ApiError, ApiResult } from "@/lib/api/api";
import { axiosInstance } from "@/lib/api/axios";
import { withCache } from "@/lib/api/cache";

export type QiitaUser = {
  followers_count: number;
  items_count: number;
};

export const getContributions = async (
  username: string
): Promise<ApiResult<number>> => _getContributionsWithCache(username);

export const getUser = async (
  username: string
): Promise<ApiResult<QiitaUser>> => _getUserWithCache(username);

const _getUserWithCache = async (
  username: string
): Promise<ApiResult<QiitaUser>> => {
  const cacheKey = `qiita_${username}`;
  return withCache(cacheKey, () => _getUser(username));
};

const _getUser = async (username: string): Promise<ApiResult<QiitaUser>> => {
  const url = new URL(
    `https://qiita.com/api/v2/users/${encodeURIComponent(username)}`
  );
  const resp = await axiosInstance.get<QiitaUser>(url.href, {
    headers: { authorization: `Bearer ${process.env.QIITA_ACCESS_TOKEN}` },
    validateStatus: (status) => [200, 404].includes(status),
  });
  if (resp.status === 404) {
    return { data: null, error: ApiError.UserNotFound };
  }

  return { data: resp.data };
};

const _getContributionsWithCache = async (
  username: string
): Promise<ApiResult<number>> => {
  const cacheKey = `qiita_contributions_${username}`;
  return withCache(cacheKey, () => _getContributions(username));
};

const _getContributions = async (
  username: string
): Promise<ApiResult<number>> => {
  const url = new URL(
    `https://qiita.com/${encodeURIComponent(username)}/contributions`
  );
  const resp = await axiosInstance.get(url.href, {
    validateStatus: (status) => [200, 404].includes(status),
  });
  if (resp.status === 404) {
    return { data: null, error: ApiError.UserNotFound };
  }

  const $ = load(resp.data);
  const text = $('a:contains("Contributions")').text();
  if (!text.endsWith("Contributions")) {
    return { data: null, error: ApiError.DataNotFound };
  }

  const contributions = Number(text.replaceAll("Contributions", ""));
  if (Number.isNaN(contributions)) {
    return { data: null, error: ApiError.DataNotFound };
  }

  return { data: contributions };
};
