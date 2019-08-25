import md from "markdown-it";
import { ellipsisString } from "./utils";

const markdownParser = (markdown: any) => {
  let text = md().render(markdown, { html: false });
  let replaced = text
    .replace(/(?:\r\n|\r|\n)/g, " ")
    .replace(/(<([^>]+)>)/g, "");
  return ellipsisString(replaced, 300);
};

export default markdownParser;
