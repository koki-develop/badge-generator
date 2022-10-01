import { ApiError } from "@/lib/errors";

export type ApiResult<T> = {
  data: T;
  error?: ApiError;
};
