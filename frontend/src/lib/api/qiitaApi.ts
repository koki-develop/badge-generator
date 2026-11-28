import { load } from "cheerio";
import { ApiError, ApiResult } from "@/lib/api/api";
import { withCache } from "@/lib/api/cache";
import { httpGet } from "@/lib/api/http";
import { withRate } from "@/lib/api/rate";

export type QiitaUser = {
  followers_count: number;
  items_count: number;
};

export const getContributions = async (
  username: string,
): Promise<ApiResult<number>> => _getContributionsWithCache(username);

export const getUser = async (
  username: string,
): Promise<ApiResult<QiitaUser>> => _getUserWithCache(username);

const _getUserWithCache = async (
  username: string,
): Promise<ApiResult<QiitaUser>> => {
  const cacheKey = `qiita_${username}`;
  return withCache(
    cacheKey,
    withRate("qiita", () => _getUser(username)),
  );
};

const _getUser = async (username: string): Promise<ApiResult<QiitaUser>> => {
  const url = new URL(
    `https://qiita.com/api/v2/users/${encodeURIComponent(username)}`,
  );
  const resp = await httpGet(url, {
    headers: { authorization: `Bearer ${process.env.QIITA_ACCESS_TOKEN}` },
    acceptStatuses: [200, 404],
  });
  if (resp.status === 404) {
    return { data: null, error: ApiError.UserNotFound };
  }

  return { data: (await resp.json()) as QiitaUser };
};

const _getContributionsWithCache = async (
  username: string,
): Promise<ApiResult<number>> => {
  const cacheKey = `qiita_contributions_${username}`;
  return withCache(
    cacheKey,
    withRate("qiita", () => _getContributions(username)),
  );
};

const _getContributions = async (
  username: string,
): Promise<ApiResult<number>> => {
  const url = new URL(
    `https://qiita.com/${encodeURIComponent(username)}/contributions`,
  );
  const resp = await httpGet(url, { acceptStatuses: [200, 404] });
  if (resp.status === 404) {
    return { data: null, error: ApiError.UserNotFound };
  }

  const $ = load(await resp.text());
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
