// utils/flattenObject.ts
export function flattenObject(obj: any, parent = "", res: any = {}) {
  for (let key in obj) {
    const propName = parent ? `${parent}.${key}` : key;
    if (typeof obj[key] === "object" && obj[key] !== null && !Array.isArray(obj[key])) {
      flattenObject(obj[key], propName, res);
    } else {
      res[propName] = obj[key];
    }
  }
  return res;
}
