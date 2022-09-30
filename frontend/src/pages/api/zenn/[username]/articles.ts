import type { NextApiRequest, NextApiResponse } from "next";
import { BadgeStyle } from "../../../../lib/badge/types";
import { renderZennBadge } from "../../../../lib/zenn/render";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const username = req.query.username as string;
  const style = req.query.style as BadgeStyle;

  const svg = await renderZennBadge({
    type: "articles",
    style,
    username,
  });

  res.status(200).setHeader("content-type", "image/svg+xml").send(svg);
};

export default handler;
