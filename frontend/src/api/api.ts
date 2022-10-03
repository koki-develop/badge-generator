import { BadgeStyle, RenderBadgeOptions } from "@/lib/badge";
import { renderBadge } from "@/lib/renderBadge";
import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

export type Query = {
  username: string;
  style?: BadgeStyle;
  label?: string;
};

export const render =
  (
    queryToRenderOptions: (query: Query) => Promise<RenderBadgeOptions>
  ): NextApiHandler =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    const query = req.query as Query;
    const options = await queryToRenderOptions(query);
    const svg = renderBadge(options);
    return _renderSvg(res, svg);
  };

const _renderSvg = (res: NextApiResponse, svg: string) => {
  return res.status(200).setHeader("content-type", "image/svg+xml").send(svg);
};

// TODO: 削除
export const renderSvg = (res: NextApiResponse, svg: string) => {
  return res.status(200).setHeader("content-type", "image/svg+xml").send(svg);
};
