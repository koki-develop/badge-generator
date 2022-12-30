import { NextApiHandler } from "next";
import { renderSvg } from "@/api/api";
import { getContributions, getUser } from "@/lib/api/qiitaApi";
import logos from "@/logos.json";

export type QiitaBadgeType = "contributions" | "followers" | "articles";

const _selectLabel = (type: QiitaBadgeType): string =>
  ({
    articles: "Articles",
    followers: "Followers",
    contributions: "Contributions",
  }[type]);

const _handler = (type: QiitaBadgeType): NextApiHandler =>
  renderSvg(async (query) => {
    const base = {
      logo: logos.qiita,
      color: "#55C500",
      label: _selectLabel(type),
    };

    if (type === "contributions") {
      const result = await getContributions(query.username);
      if (result.error) return { ...base, error: result.error };
      return { ...base, message: result.data.toString() };
    }

    const result = await getUser(query.username);
    if (result.error) return { ...base, error: result.error };

    const value = (() => {
      switch (type) {
        case "articles":
          return result.data.items_count;
        case "followers":
          return result.data.followers_count;
      }
    })();

    return {
      ...base,
      message: value.toString(),
    };
  });

export const articles = _handler("articles");
export const followers = _handler("followers");
export const contributions = _handler("contributions");
