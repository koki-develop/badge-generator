import { ApiError } from "@/lib/api/api";
import { BadgeStyle } from "@/lib/badge";
import { renderBadge } from "@/lib/renderBadge";
import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

export type Query = {
  username: string;
  style?: BadgeStyle;
  label?: string;
};

export type Options = { logo: string; label: string } & (
  | {
      error: ApiError;
    }
  | { color: string; message: string; error?: undefined }
);

const _selectStyle = (style?: BadgeStyle): BadgeStyle => {
  const defaultStyle = BadgeStyle.plastic;
  if (!style) return defaultStyle;
  if (Object.values(BadgeStyle).includes(style)) return style;
  return defaultStyle;
};

const _selectErrorMessage = (error: ApiError): string => {
  switch (error) {
    case ApiError.UserNotFound:
      return "user not found";
    case ApiError.DataNotFound:
      return "data not found";
    case ApiError.RateLimit:
      return "service temporarily unavailable";
  }
};

export const renderSvg =
  (queryToRenderOptions: (query: Query) => Promise<Options>): NextApiHandler =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    const query = req.query as Query;
    const options = await queryToRenderOptions(query);

    const badgeOptions = (() => {
      const base = {
        logoDataUrl: options.logo,
        label: query.label?.trim() || options.label,
        style: _selectStyle(query.style),
      };

      if (options.error) {
        return {
          ...base,
          color: "#D1654D",
          message: _selectErrorMessage(options.error),
        };
      }
      return { ...base, color: options.color, message: options.message };
    })();

    const svg = renderBadge({
      ...badgeOptions,
    });

    const status = (() => {
      switch (options.error) {
        case ApiError.UserNotFound:
        case ApiError.DataNotFound:
          return 404;
        case ApiError.RateLimit:
          return 503;
        default:
          return 200;
      }
    })();

    return res
      .status(status)
      .setHeader("content-type", "image/svg+xml")
      .send(svg);
  };
