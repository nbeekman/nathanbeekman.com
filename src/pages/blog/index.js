import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../../components/layout';
import SEO from '../../components/seo';
import BlogRoll from '../../components/blogRoll';

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <SEO title="Blog" />
      <BlogRoll blog={data.allMarkdownRemark.edges} />
    </Layout>
  );
};

export default IndexPage;

export const query = graphql`
  query blogPageQuery {
    allMarkdownRemark(
      filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            description
            featuredpost
            featuredimage {
              childImageSharp {
                fluid(maxWidth: 900) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`;
