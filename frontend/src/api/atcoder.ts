import { NextApiHandler } from "next";
import { renderSvg } from "@/api/api";
import { getAlgorithmRating, getHeuristicRating } from "@/lib/api/atcoderApi";
import logos from "@/logos.json";

export type AtCoderBadgeType = "algorithm_rating" | "heuristic_rating";

const _selectLabel = (type: AtCoderBadgeType): string =>
  ({
    algorithm_rating: "Rating",
    heuristic_rating: "Rating(Heuristic)",
  }[type]);

const _selectColor = (rating: number): string => {
  if (rating >= 2800) return "#ff0000"; // 赤
  if (rating >= 2400) return "#ff8c00"; // 橙
  if (rating >= 2000) return "#ffff00"; // 黄
  if (rating >= 1600) return "#4169e1"; // 青
  if (rating >= 1200) return "#57BFC0"; // 水
  if (rating >= 800) return "#7cfc00"; // 緑
  if (rating >= 400) return "#b8860b"; // 茶
  return "#808080"; // 灰
};

const _handler = (type: AtCoderBadgeType): NextApiHandler =>
  renderSvg(async (query) => {
    const logo =
      query.style === "social" ? logos.atcoderBlack : logos.atcoderWhite;

    const base = {
      logo,
      label: _selectLabel(type),
    };

    const result = await {
      algorithm_rating: getAlgorithmRating,
      heuristic_rating: getHeuristicRating,
    }[type](query.username);
    if (result.error) return { ...base, error: result.error };

    return {
      ...base,
      color: _selectColor(result.data),
      message: result.data.toString(),
    };
  });

export const algorithmRating = _handler("algorithm_rating");
export const heuristicRating = _handler("heuristic_rating");
