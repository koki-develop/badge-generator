import axios from "axios";
import { loadCache, saveCache } from "./cache";

type ZennUser = {
  articles_count: number;
  books_count: number;
  follower_count: number;
  scraps_count: number;
  total_liked_count: number;
};

export const getArticlesCount = async (
  username: string
): Promise<number | null> => {
  const user = await _getUser(username);
  return user?.articles_count ?? null;
};

export const getBooksCount = async (
  username: string
): Promise<number | null> => {
  const user = await _getUser(username);
  return user?.books_count ?? null;
};

export const getFollowersCount = async (
  username: string
): Promise<number | null> => {
  const user = await _getUser(username);
  return user?.follower_count ?? null;
};

export const getScrapssCount = async (
  username: string
): Promise<number | null> => {
  const user = await _getUser(username);
  return user?.scraps_count ?? null;
};

export const getLikesCount = async (
  username: string
): Promise<number | null> => {
  const user = await _getUser(username);
  return user?.total_liked_count ?? null;
};

const _getUser = async (username: string): Promise<ZennUser | null> => {
  const cacheKey = _cacheKey(username);
  const cache = await loadCache<ZennUser>(cacheKey);
  if (cache?.data) {
    return cache.data;
  }

  const endpoint = `https://zenn.dev/api/users/${encodeURIComponent(username)}`;
  const resp = await axios.get<{ user: ZennUser }>(endpoint, {
    validateStatus: (status) => [200, 404].includes(status),
  });
  if (resp.status === 404) {
    await saveCache(cacheKey, null);
    return null;
  }

  await saveCache(cacheKey, resp.data.user);
  return resp.data.user;
};

const _cacheKey = (username: string): string => {
  return `zenn_${username}`;
};
