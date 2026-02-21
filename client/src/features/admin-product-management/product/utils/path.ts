/* eslint-disable @typescript-eslint/no-explicit-any */
export function get (obj: any, path: string) {
  if (!obj || !path) return undefined;

  const parts = path.replace(/\[(\d+)\]/g, '.$1').split('.');

  return parts.reduce((acc, key) => {
    if (acc === null || acc === undefined) return undefined;
    return acc[key];
  }, obj);
}

export function set (obj: any, path: string, value: any) {
  const parts = path.replace(/\[(\d+)\]/g, '.$1').split('.');
  const newObj = structuredClone(obj);
  let current = newObj;

  parts.forEach((key, index) => {
    if (index === parts.length - 1) {
      current[key] = value;
      return;
    }

    if (!current[key] || typeof current[key] !== 'object') {
      current[key] = isNaN(Number(parts[index + 1])) ? {} : [];
    }
    current = current[key];
  });

  return newObj;
}
