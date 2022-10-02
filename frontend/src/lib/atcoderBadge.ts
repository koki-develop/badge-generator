import { ApiResult } from "@/lib/api";
import { getAlgorithmRating, getHeuristicRating } from "@/lib/atcoderApi";
import { RenderBadgeOptions } from "@/lib/badge";
import { renderBadge } from "@/lib/renderBadge";
import logos from "@/logos.json";
import { ApiError } from "./errors";

export type BadgeType = "algorithm_rating" | "heuristic_rating";

export type RenderAtCoderBadgeOptions = Omit<
  RenderBadgeOptions,
  "color" | "logoDataUrl" | "message" | "label"
> & {
  type: BadgeType;
  username: string;
  label?: string;
};

const typeLabelMap: Record<BadgeType, string> = {
  algorithm_rating: "Rating",
  heuristic_rating: "Rating(Heuristic)",
};

export const renderAtCoderBadge = async (
  options: RenderAtCoderBadgeOptions
): Promise<string> => {
  const { type, label, username, ...renderOptions } = options;
  const { data, error } = await _getValue(type, username);

  const [message, color] = (() => {
    switch (error) {
      case ApiError.UserNotFound:
        return ["user not found", "#D1654D"];
      case ApiError.DataNotFound:
        return ["data not found", "#D1654D"];
    }

    const color = (() => {
      // 参考: https://chokudai.hatenablog.com/entry/2019/02/11/155904
      switch (true) {
        case data >= 2800:
          return "#ff0000"; // 赤
        case data >= 2400:
          return "#ff8c00"; // 橙
        case data >= 2000:
          return "#ffff00"; // 黄
        case data >= 1600:
          return "#4169e1"; // 青
        case data >= 1200:
          return "#57BFC0"; // 水
        case data >= 800:
          return "#7cfc00"; // 緑
        case data >= 400:
          return "#b8860b"; // 茶
        default:
          return "#808080"; // 灰
      }
    })();
    return [data.toString(), color];
  })();

  const logo = (() => {
    switch (renderOptions.style) {
      case "social":
        return logos.atcoderBlack;
      default:
        return logos.atcoderWhite;
    }
  })();

  const svg = renderBadge({
    logoDataUrl: `data:image/svg+xml;base64,${logo}`,
    color,
    label: label?.trim() || typeLabelMap[options.type],
    message,
    ...renderOptions,
  });

  return svg;
};

const _getValue = async (
  type: BadgeType,
  username: string
): Promise<ApiResult<number>> => {
  switch (type) {
    case "algorithm_rating":
      return getAlgorithmRating(username);
    case "heuristic_rating":
      return getHeuristicRating(username);
  }
};
