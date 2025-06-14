import { NextApiHandler } from "next";
import { renderSvg } from "@/api/api";
import { getProfile } from "@/lib/api/bluesky";
import logos from "@/logos.json";

export type BlueskyBadgeType = "followers" | "posts";

const _selectLabel = (type: BlueskyBadgeType): string =>
  ({
    followers: "Followers",
    posts: "Posts",
  })[type];

const _handler = (type: BlueskyBadgeType): NextApiHandler =>
  renderSvg(async (query) => {
    const base = {
      logo: logos.bluesky,
      color: "#0285FF",
      label: _selectLabel(type),
    };

    const result = await getProfile(query.username);
    if (result.error) return { ...base, error: result.error };

    const value = (() => {
      switch (type) {
        case "followers":
          return result.data.followersCount ?? 0;
        case "posts":
          return result.data.postsCount ?? 0;
      }
    })();

    return {
      ...base,
      message: value.toString(),
    };
  });

export const followers = _handler("followers");
export const posts = _handler("posts");
