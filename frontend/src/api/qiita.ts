import { NextApiRequest, NextApiResponse } from "next";
import { renderSvg } from "@/api/renderer";
import { BadgeStyle } from "@/lib/badge";
import { BadgeType, renderQiitaBadge } from "@/lib/qiitaBadge";

export const contributions = async (
  req: NextApiRequest,
  res: NextApiResponse
) => _render("contributions", req, res);

export const articles = async (req: NextApiRequest, res: NextApiResponse) =>
  _render("articles", req, res);

export const followers = async (req: NextApiRequest, res: NextApiResponse) =>
  _render("followers", req, res);

const _render = async (
  type: BadgeType,
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const username = req.query.username as string;
  const style = req.query.style as BadgeStyle;

  const svg = await renderQiitaBadge({
    type,
    style,
    username,
  });

  return renderSvg(res, svg);
};
