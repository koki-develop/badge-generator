export type ApiResult<T> = {
  data: T;
  error?: ApiError;
};

export const ApiError = {
  UserNotFound: "USER_NOT_FOUND",
  DataNotFound: "DATA_NOT_FOUND",
} as const;

export type ApiError = typeof ApiError[keyof typeof ApiError];
