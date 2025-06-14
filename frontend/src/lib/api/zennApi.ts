import { ApiError, ApiResult } from "@/lib/api/api";
import { axiosInstance } from "@/lib/api/axios";
import { withCache } from "@/lib/api/cache";
import { withRate } from "./rate";

export type ZennUser = {
  articles_count: number;
  books_count: number;
  follower_count: number;
  scraps_count: number;
  total_liked_count: number;
};

export const getUser = async (username: string) => _getUserWithCache(username);

const _getUserWithCache = async (
  username: string,
): Promise<ApiResult<ZennUser>> => {
  const cacheKey = `zenn_${username}`;
  return withCache(
    cacheKey,
    withRate("zenn", () => _getUser(username)),
  );
};

const _getUser = async (username: string): Promise<ApiResult<ZennUser>> => {
  const url = new URL(
    `https://zenn.dev/api/users/${encodeURIComponent(username)}`,
  );
  const resp = await axiosInstance.get<{ user: ZennUser }>(url.href, {
    validateStatus: (status) => [200, 404].includes(status),
  });
  if (resp.status === 404) {
    return { data: null, error: ApiError.UserNotFound };
  }

  return { data: resp.data.user };
};
