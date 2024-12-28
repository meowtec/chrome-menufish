export default function mapValues<T extends string, A, B>(
  obj: Record<T, A>,
  iter: (val: A, key: T) => B,
): Record<T, B> {
  const result = {} as Record<T, B>;

  (Object.keys(obj) as T[]).forEach((key) => {
    result[key] = iter(obj[key], key);
  });

  return result;
}
