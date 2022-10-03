import { NextApiRequest, NextApiResponse } from "next";
import { renderSvg } from "@/api/api";
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

type Query = {
  username: string;
  style?: BadgeStyle;
  label?: string;
};

const _render = async (
  type: BadgeType,
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { username, style = "plastic", label } = req.query as Query;

  const svg = await renderQiitaBadge({
    type,
    style,
    username,
    label,
  });

  return renderSvg(res, svg);
};
