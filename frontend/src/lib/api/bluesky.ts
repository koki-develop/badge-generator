import { BskyAgent } from "@atproto/api";
import {
  ProfileView,
  ProfileViewDetailed,
} from "@atproto/api/dist/client/types/app/bsky/actor/defs";
import { logger } from "@/lib/logger";
import { ApiError, ApiResult } from "./api";
import { withCache } from "./cache";
import { withRate } from "./rate";

const agent = new BskyAgent({ service: "https://bsky.social" });

export const getProfile = async (
  handle: string
): Promise<ApiResult<ProfileViewDetailed>> => _getProfileWithCache(handle);

const _getProfileWithCache = async (
  handle: string
): Promise<ApiResult<ProfileView>> => {
  const cacheKey = `bluesky_${handle}`;
  return withCache(
    cacheKey,
    withRate("bluesky", () => _getProfile(handle))
  );
};

const _getProfile = async (
  handle: string
): Promise<ApiResult<ProfileViewDetailed>> => {
  if (!agent.session) {
    logger.info("logging in to bluesky.");
    await agent.login({
      identifier: process.env.BLUESKY_IDENTIFIER!,
      password: process.env.BLUESKY_PASSWORD!,
    });
  }

  return await agent
    .getProfile({ actor: handle })
    .then(({ data }) => {
      return { data };
    })
    .catch(() => {
      return {
        data: null,
        error: ApiError.UserNotFound,
      };
    });
};
