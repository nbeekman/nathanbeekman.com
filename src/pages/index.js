import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Work from '../components/work';

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" />

    <section className="db mb5 center tc">
      <h1 className="avenir mb1">Senior Frontend Developer</h1>
      <p className="i">Angular | React | Design Systems | Ionic Mobile Apps</p>
    </section>

    <Work work={data.allMarkdownRemark.edges} />
  </Layout>
);

export default IndexPage;

export const query = graphql`
  query homePageQuery {
    allMarkdownRemark(
      filter: { frontmatter: { templateKey: { eq: "work-post" } } }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            project: title
            image {
              childImageSharp {
                fluid(maxWidth: 1000) {
                  src
                }
              }
            }
            colours
            client
            about
            order
          }
        }
      }
    }
  }
`;
