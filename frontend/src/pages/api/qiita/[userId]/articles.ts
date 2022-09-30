import type { NextApiRequest, NextApiResponse } from "next";
import { BadgeStyle } from "../../../../lib/badge/types";
import { renderQiitaBadge } from "../../../../lib/qiita/render";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const userId = req.query.userId as string;
  const style = req.query.style as BadgeStyle;

  const svg = await renderQiitaBadge({
    type: "articles",
    style,
    userId,
  });

  res.status(200).setHeader("content-type", "image/svg+xml").send(svg);
};

export default handler;
