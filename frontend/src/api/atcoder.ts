import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { render, renderSvg } from "@/api/api";
import { ApiResult } from "@/lib/api";
import { getAlgorithmRating, getHeuristicRating } from "@/lib/atcoderApi";
import { BadgeType, renderAtCoderBadge } from "@/lib/atcoderBadge";
import { BadgeStyle } from "@/lib/badge";
import { ApiError } from "@/lib/errors";
import logos from "@/logos.json";

type Query = {
  username: string;
  style?: BadgeStyle;
  label?: string;
};

export const _render = async (
  type: BadgeType,
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { username, style = "plastic", label } = req.query as Query;

  const svg = await renderAtCoderBadge({
    type,
    style,
    username,
    label,
  });

  return renderSvg(res, svg);
};

const _selectLabel = (type: BadgeType): string =>
  ({
    algorithm_rating: "Rating",
    heuristic_rating: "Rating(Heuristic)",
  }[type]);

const _selectMessage = (result: ApiResult<number>): string => {
  if (result.error === ApiError.UserNotFound) return "user not found";
  if (result.error === ApiError.DataNotFound) return "data not found";
  return result.data.toString();
};

const _selectColor = (result: ApiResult<number>): string => {
  if (result.error != null) return "#D1654D";

  if (result.data >= 2800) return "#ff0000"; // 赤
  if (result.data >= 2400) return "#ff8c00"; // 橙
  if (result.data >= 2000) return "#ffff00"; // 黄
  if (result.data >= 1600) return "#4169e1"; // 青
  if (result.data >= 1200) return "#57BFC0"; // 水
  if (result.data >= 800) return "#7cfc00"; // 緑
  if (result.data >= 400) return "#b8860b"; // 茶
  return "#808080"; // 灰
};

const _handler = (type: BadgeType): NextApiHandler =>
  render(async (query) => {
    const result = await {
      algorithm_rating: getAlgorithmRating,
      heuristic_rating: getHeuristicRating,
    }[type](query.username);

    const logoDataUrl =
      query.style === "social" ? logos.atcoderBlack : logos.atcoderWhite;

    return {
      logoDataUrl,
      color: _selectColor(result),
      label: _selectLabel(type),
      message: _selectMessage(result),
    };
  });

export const algorithmRating = _handler("algorithm_rating");
export const heuristicRating = _handler("heuristic_rating");
