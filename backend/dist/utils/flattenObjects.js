// utils/flattenObject.ts
export function flattenObject(obj, parent = "", res = {}) {
    for (const key in obj) {
        if (!Object.prototype.hasOwnProperty.call(obj, key))
            continue;
        const propName = parent ? `${parent}.${key}` : key;
        const value = obj[key];
        if (typeof value === "object" &&
            value !== null &&
            !Array.isArray(value)) {
            flattenObject(value, propName, res);
        }
        else {
            res[propName] = value;
        }
    }
    return res;
}
//# sourceMappingURL=flattenObjects.js.map