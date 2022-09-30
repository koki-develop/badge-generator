import type { NextApiRequest, NextApiResponse } from "next";
import { BadgeStyle } from "../../../../lib/badge";
import { renderZennBadge } from "../../../../lib/zennBadge";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const username = req.query.username as string;
  const style = req.query.style as BadgeStyle;

  const svg = await renderZennBadge({
    type: "likes",
    style,
    username,
  });

  res.status(200).setHeader("content-type", "image/svg+xml").send(svg);
};

export default handler;
