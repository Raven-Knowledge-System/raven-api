export function pick<O extends object, K extends keyof O>(
  obj: O,
  keys: K[],
): Pick<O, K> {
  const result: Partial<O> = {};
  keys.forEach((key) => {
    if (key in obj) {
      result[key] = obj[key];
    }
  });
  return <Pick<O, K>>result;
}
