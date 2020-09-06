import * as React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import tachyons from './tachyons/tachyonsComposer';

const PageContainer = tachyons(
  "section",
  "bg-near-white w-100 h-100 pt4 pt5-l"
);

const SectionContainer = ({ children }) => (
  <ul className="w-90 mw9 db center mb5">
    {children}
  </ul>
);

const SectionHeading = ({ children }) => (
  <h2 className="f2 f1-l mb4 bb b--dark-blue b--dotted avenir">{children}</h2>
);

const Date = tachyons("time", "mt2 f7 tr");

export const BlogRollItem = ({
  title,
  description,
  featuredimage,
  slug,
  date,
}) => (
  <li className="pv4 bb b--dark-blue b--dotted ph3 ph0-l mb3">
    <div className="flex flex-column flex-row-ns">
      <div className="w-100 w-60-ns pr3-ns order-2 order-1-ns">
        <Link to={`.${slug}`} className="link blue">
          <h1 className="f2 helvetica fw6 mt0 lh-title">{title}</h1>
        </Link>
        <p className="f5 lh-copy helvetica">{description}</p>
      </div>
      <div className="pl3-ns order-1 order-2-ns mb4 mb0-ns w-100 w-40-ns">
        <Link to={`.${slug}`}>
          <Img
            fluid={featuredimage.childImageSharp.fluid}
            className="db"
            alt=""
          />
        </Link>
      </div>
    </div>
    <Date>{date}</Date>
  </li>
);

export default ({ blog, ...props }) => {
  return (
    <PageContainer>
      <SectionContainer>
        <SectionHeading>Blog</SectionHeading>
        {blog.map(post => (
          <BlogRollItem
            slug={post.node.fields.slug}
            key={post.node.id}
            {...post.node.frontmatter}
          />
        ))}
      </SectionContainer>
    </PageContainer>
  );
};
