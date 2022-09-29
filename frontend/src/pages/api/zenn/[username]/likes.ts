import type { NextApiRequest, NextApiResponse } from "next";
import { renderZennBadge } from "../../../../lib/zenn";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const username = req.query.username as string;

  const svg = await renderZennBadge({
    style: "social",
    type: "likes",
    username: username,
  });

  res.status(200).setHeader("content-type", "image/svg+xml").send(svg);
};

export default handler;
