import { NextApiRequest, NextApiResponse } from "next";
import { renderSvg } from "@/api/renderer";
import { BadgeType, renderAtCoderBadge } from "@/lib/atcoderBadge";
import { BadgeStyle } from "@/lib/badge";

export const algorithmRating = async (
  req: NextApiRequest,
  res: NextApiResponse
) => _render("algorithm_rating", req, res);

export const heuristicRating = async (
  req: NextApiRequest,
  res: NextApiResponse
) => _render("heuristic_rating", req, res);

export const _render = async (
  type: BadgeType,
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const username = req.query.username as string;
  const style = req.query.style as BadgeStyle;

  const svg = await renderAtCoderBadge({
    type,
    style,
    username,
  });

  return renderSvg(res, svg);
};
