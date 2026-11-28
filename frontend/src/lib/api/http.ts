import { logger } from "@/lib/logger";

export class HttpError extends Error {
  constructor(
    readonly method: string,
    readonly url: string,
    readonly status: number,
  ) {
    super(`${method} ${url} failed with status ${status}`);
    this.name = "HttpError";
  }
}

export type HttpGetOptions = {
  headers?: Record<string, string>;
  // Statuses the caller handles itself. Any 2xx when omitted.
  acceptStatuses?: number[];
};

// Headers stay out of the log lines and out of HttpError: the Qiita API
// request carries the access token in Authorization.
export const httpGet = async (
  url: URL,
  { headers, acceptStatuses }: HttpGetOptions = {},
): Promise<Response> => {
  const requestMethod = "GET";
  const requestUrl = url.href;
  logger.info(`sending request to ${requestUrl}.`, {
    requestMethod,
    requestUrl,
  });
  const resp = await fetch(requestUrl, { method: requestMethod, headers });
  logger.info(`got response from ${requestUrl}.`, {
    requestMethod,
    requestUrl,
    responseStatus: resp.status,
  });

  const accepted = acceptStatuses
    ? acceptStatuses.includes(resp.status)
    : resp.ok;
  if (!accepted) {
    throw new HttpError(requestMethod, requestUrl, resp.status);
  }
  return resp;
};
