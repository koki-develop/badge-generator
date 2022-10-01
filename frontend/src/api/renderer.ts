import type { NextApiResponse } from "next";

export const renderSvg = (res: NextApiResponse, svg: string) => {
  return res.status(200).setHeader("content-type", "image/svg+xml").send(svg);
};
