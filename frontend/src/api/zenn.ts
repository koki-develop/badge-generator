import { NextApiRequest, NextApiResponse } from "next";
import { renderSvg } from "@/api/renderer";
import { BadgeStyle } from "@/lib/badge";
import { BadgeType, renderZennBadge } from "@/lib/zennBadge";

export const articles = async (req: NextApiRequest, res: NextApiResponse) =>
  _render("articles", req, res);

export const books = async (req: NextApiRequest, res: NextApiResponse) =>
  _render("books", req, res);

export const followers = async (req: NextApiRequest, res: NextApiResponse) =>
  _render("followers", req, res);

export const likes = async (req: NextApiRequest, res: NextApiResponse) =>
  _render("likes", req, res);

export const scraps = async (req: NextApiRequest, res: NextApiResponse) =>
  _render("scraps", req, res);

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

  const svg = await renderZennBadge({
    type,
    style,
    username,
    label,
  });

  return renderSvg(res, svg);
};
