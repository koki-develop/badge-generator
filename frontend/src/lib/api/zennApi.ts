import { ApiError, ApiResult } from "@/lib/api/api";
import { withCache } from "@/lib/api/cache";
import { httpGet } from "@/lib/api/http";
import { withRate } from "@/lib/api/rate";

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
  const resp = await httpGet(url, { acceptStatuses: [200, 404] });
  if (resp.status === 404) {
    return { data: null, error: ApiError.UserNotFound };
  }

  const { user } = (await resp.json()) as { user: ZennUser };
  return { data: user };
};
