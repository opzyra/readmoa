import md from "markdown-it";

export const markdownParser = (markdown: string) => {
  let text = md().render(markdown, { html: false });
  let replaced = text
    .replace(/(?:\r\n|\r|\n)/g, " ")
    .replace(/(<([^>]+)>)/g, "");
  return replaced;
};

export const ellipsisString = (value: string, max: number) => {
  let isOver = true;
  if (max > value.length) {
    max = value.length;
    isOver = false;
  }
  return value.substring(0, max) + (isOver ? "..." : "");
};

export const removeHtml = (html: string) => {
  let replaced = html
    .replace(/(?:\r\n|\r|\n)/g, " ")
    .replace(/(<([^>]+)>)/g, "");
  return replaced;
};

export const sleep = (delay: number) => {
  const start = new Date().getTime();
  while (new Date().getTime() < start + delay);
};
