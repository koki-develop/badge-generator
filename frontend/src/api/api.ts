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
    queryToRenderOptions: (
      query: Query
    ) => Promise<Omit<RenderBadgeOptions, "style">>
  ): NextApiHandler =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    const query = req.query as Query;
    const options = await queryToRenderOptions(query);

    const svg = renderBadge({
      ...options,
      label: query.label?.trim() || options.label,
      style: query.style,
    });
    return _renderSvg(res, svg);
  };

const _renderSvg = (res: NextApiResponse, svg: string) => {
  return res.status(200).setHeader("content-type", "image/svg+xml").send(svg);
};
