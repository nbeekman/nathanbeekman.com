import * as React from "react";
import { graphql } from "gatsby";
import rehypeReact from "rehype-react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import tachyons from "../components/tachyons/tachyonsComposer";
import Prism from "prismjs";
import "./prism-tomorrow.css";

const PostContainer = tachyons("div", "w-100 bg-near-white pv2 avenir");

const PostInnerContainer = tachyons(
  "article",
  "w-90 mw7 center pt2 pt3-ns pt4-l pb5 f6"
);

const Date = tachyons("time", "mt2 f7 tr");

const PrimaryTitle = tachyons("h1", "f1 fw6 blue");

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: {
    h1: PrimaryTitle,
    h2: tachyons("h2", "f2 fw4 blue mt4 mb4"),
    h3: tachyons("h3", "f3 navy mt3 mb3"),
    p: tachyons("p", "f5 mb3 lh-copy w-100"),
    a: tachyons("a", "link dim blue fw5", {
      target: "_blank",
      rel: "noopenner noreferrer",
    }),
    ul: tachyons("ul", "f5 list pl0 mv3 w-100 pl4 measure-wide", {
      style: { listStyleType: "circle" },
    }),
    li: tachyons("li", "f5 lh-copy w-100 mb3"),
    img: tachyons("img", "mv4 db center"),
    code: tachyons("code", "f7 mv3 br2 navy bg-black-10 pa1 mh1"),
    pre: tachyons("pre", "f7 br3 language-undefined"),
  },
}).Compiler;

export const BlogTemplate = ({ date, title, description, content, tags }) => {
  React.useEffect(() => {
    Prism.highlightAll();
  });
  return (
    <PostContainer>
      <PostInnerContainer>
        <Date>{date}</Date>
        <PrimaryTitle>{title}</PrimaryTitle>
        {!!content && renderAst(content)}
      </PostInnerContainer>
    </PostContainer>
  );
};

const BlogPost = ({ data }) => {
  const { markdownRemark: post } = data;
  return (
    <>
      <SEO title={post.frontmatter.title} />
      <Layout>
        <BlogTemplate
          title={post.frontmatter.title}
          content={post.htmlAst}
          date={post.frontmatter.date}
          description={post.frontmatter.description}
          tags={post.frontmatter.tags}
        />
      </Layout>
    </>
  );
};

export default BlogPost;

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      htmlAst
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        tags
      }
    }
  }
`;
