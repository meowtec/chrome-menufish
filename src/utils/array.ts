export const removeNulls = <T>(array: ReadonlyArray<T | null | undefined>) =>
  array.filter((x) => x != null) as T[];
