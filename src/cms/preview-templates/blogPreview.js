import * as React from "react";
import Remark from "remark";
import toHAST from "mdast-util-to-hast";
import { BlogTemplate } from "../../templates/blog-post.js";

// Setup Remark.
const remarkOptions = {
  commonmark: true,
  footnotes: true,
  gfm: true,
  pedantic: true,
  tableOfContents: {
    heading: null,
    maxDepth: 6,
  },
};
let remark = new Remark().data(`settings`, remarkOptions);

export default ({ entry, widgetFor }) => {
  let date = "Loading...";
  const postDate = entry.getIn(["data", "date"]);
  if (postDate && typeof postDate === "object") {
    date = entry.getIn(["data", "date"]).toLocaleDateString("en", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
  let markdown = "Loading...";
  if (
    widgetFor("body") &&
    widgetFor("body").props &&
    widgetFor("body").props.value
  ) {
    markdown = widgetFor("body").props.value;
  }
  const markdownAst = remark.parse(markdown);
  const htmlAst = toHAST(markdownAst);
  return (
    <div className="helvetica w-100">
      <BlogTemplate
        date={date}
        title={entry.getIn(["data", "title"]) || "Please enter a title"}
        description={entry.getIn(["data", "description"]) || "Loading..."}
        tags={entry.getIn(["data", "tags"]) || "Loading..."}
        content={htmlAst}
      />
    </div>
  );
};
