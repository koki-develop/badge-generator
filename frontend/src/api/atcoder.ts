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
