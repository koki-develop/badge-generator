import axios from "axios";
import { saveCache, loadCache } from "./cache";
import { QiitaUser } from "../models/qiita";

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
