import type { NextApiRequest, NextApiResponse } from "next";
import { BadgeStyle } from "@/lib/badge";
import { renderQiitaBadge } from "@/lib/qiitaBadge";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const username = req.query.username as string;
  const style = req.query.style as BadgeStyle;

  const svg = await renderQiitaBadge({
    type: "contributions",
    style,
    username: username,
  });

  res.status(200).setHeader("content-type", "image/svg+xml").send(svg);
};

export default handler;
