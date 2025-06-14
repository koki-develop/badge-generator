export type ApiResult<T> =
  | {
      data: T;
      error?: undefined;
    }
  | {
      data: null;
      error: ApiError;
    };

export const ApiError = {
  UserNotFound: "USER_NOT_FOUND",
  DataNotFound: "DATA_NOT_FOUND",
  RateLimit: "RATE_LIMIT",
} as const;

export type ApiError = (typeof ApiError)[keyof typeof ApiError];
