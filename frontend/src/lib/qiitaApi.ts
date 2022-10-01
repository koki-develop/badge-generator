import axios from "axios";
import { load } from "cheerio";
import { saveCache, loadCache } from "@/lib/cache";

type QiitaUser = {
  followers_count: number;
  items_count: number;
};

export const getContributions = async (
  username: string
): Promise<number | null> => {
  const cacheKey = `qiita_contributions_${username}`;
  const cache = await loadCache<number>(cacheKey);
  if (cache?.data != null) {
    return cache.data;
  }

  const endpoint = `https://qiita.com/${encodeURIComponent(
    username
  )}/contributions`;
  const resp = await axios.get(endpoint, {
    validateStatus: (status) => [200, 404].includes(status),
  });
  if (resp.status === 404) {
    await saveCache(cacheKey, null);
    return null;
  }

  const $ = load(resp.data);
  const text = $('a:contains("Contributions")').text();
  if (!text.endsWith("Contributions")) {
    await saveCache(cacheKey, null);
    return null;
  }

  const contributions = Number(text.replaceAll("Contributions", ""));
  if (Number.isNaN(contributions)) {
    await saveCache(cacheKey, null);
    return null;
  }

  await saveCache(cacheKey, contributions);
  return contributions;
};

export const getFollowersCount = async (
  username: string
): Promise<number | null> => {
  const user = await _getUser(username);
  return user?.followers_count ?? null;
};

export const getArticlesCount = async (
  username: string
): Promise<number | null> => {
  const user = await _getUser(username);
  return user?.items_count ?? null;
};

const _getUser = async (username: string): Promise<QiitaUser | null> => {
  const cacheKey = _cacheKey(username);
  const cache = await loadCache<QiitaUser>(cacheKey);
  if (cache?.data) {
    return cache.data;
  }

  const endpoint = `https://qiita.com/api/v2/users/${encodeURIComponent(
    username
  )}`;
  const resp = await axios.get<QiitaUser>(endpoint, {
    headers: {
      authorization: `Bearer ${process.env.QIITA_ACCESS_TOKEN}`,
    },
    validateStatus: (status) => [200, 404].includes(status),
  });
  if (resp.status === 404) {
    await saveCache(cacheKey, null);
    return null;
  }

  await saveCache(cacheKey, resp.data);
  return resp.data;
};

const _cacheKey = (username: string): string => {
  return `qiita_${username}`;
};
