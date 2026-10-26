export type Result<T> = { ok: true; data: T } | { ok: false; error: string };

export const getErrorMessage = (error: unknown, fallback: string) =>
  error instanceof Error ? error.message : fallback;

export const toResult = async <T>(
  task: () => Promise<T>,
  fallback: string,
): Promise<Result<T>> => {
  try {
    return { ok: true, data: await task() };
  } catch (error) {
    return { ok: false, error: getErrorMessage(error, fallback) };
  }
};

type ApiResponse = { data: unknown; error: { message: string } | null };

export const unwrap = <R extends ApiResponse>(
  response: R,
): Extract<R, { error: null }>["data"] => {
  if (response.error) {
    throw new Error(response.error.message);
  }
  return response.data;
};
