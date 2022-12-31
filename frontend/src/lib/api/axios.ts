import axios from "axios";
import { logger } from "@/lib/logger";

export const axiosInstance = axios.create();

axiosInstance.interceptors.request.use((config) => {
  logger.info(`sending request to ${config.url}.`, {
    requestMethod: config.method,
    requestUrl: config.url,
    requestHeaders: config.headers,
  });

  return config;
});

axiosInstance.interceptors.response.use((resp) => {
  logger.info(`got response from ${resp.config.url}.`, {
    requestMethod: resp.config.method,
    requestUrl: resp.config.url,
    requestHeaders: resp.config.headers,
    responseStatus: resp.status,
    responseHeaders: resp.headers,
  });

  return resp;
});
