const { ulid } = require("ulid");

export const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");

export const generateId = () => {
  return ulid();
};

export const nBoolean = (value: any) =>
  value === null ? null : Boolean(value);

export const now = () => {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    d.getFullYear() +
    "-" +
    pad(d.getMonth() + 1) +
    "-" +
    pad(d.getDate()) +
    " " +
    pad(d.getHours()) +
    ":" +
    pad(d.getMinutes()) +
    ":" +
    pad(d.getSeconds())
  );
};

// comma separated list
export const csl = {
  toString(list: string[] | string | null | undefined) {
    if (Array.isArray(list)) return list.join(",");
    if (typeof list === "string") {
      const splitted = new Set(this.fromString(list));
      return Array.from(splitted).join(",");
    }
    return "";
  },
  fromString(list: string) {
    return list
      .trim()
      .replace(/\s?,\s?/g, ",")
      .split(",");
  },
};
