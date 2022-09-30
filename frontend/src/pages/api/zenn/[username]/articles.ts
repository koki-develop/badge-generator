import type { NextApiRequest, NextApiResponse } from "next";
import { BadgeStyle } from "../../../../lib/badge/types";
import { renderZennBadge } from "../../../../lib/zenn/render";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const username = req.query.username as string;
  const style = req.query.style as string;

  const svg = await renderZennBadge({
    style: style as BadgeStyle,
    type: "articles",
    username: username,
  });

  res.status(200).setHeader("content-type", "image/svg+xml").send(svg);
};

export default handler;
