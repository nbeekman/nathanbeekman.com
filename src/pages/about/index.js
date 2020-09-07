import React from 'react';

import Layout from '../../components/layout';
import SEO from '../../components/seo';

const IndexPage = ({ data }) => {
  // const pageData = data.allMarkdownRemark.edges[0].node.frontmatter;
  return (
    <Layout>
      <SEO title="About" />
      <section className="w-100 h-100 pt3-l">
        {/* <h1 className="f2 f1-l mb4 bb b--dark-blue b--dotted avenir">About</h1> */}
        <h1>TODO:</h1>
        <section className="mb4">
          <p>Nathan is a lead Angular/React developer who has worked for startups, agencies, and Fortune 500 companies.</p>
          <p>He has 10 years experience as a software developer with a focus on UI/UX development and highly efficient code, and a passion for data visualization and management.</p>
          <p>In his spare time, he is an avid biker and skier, loves going to see live music and is constantly getting chased around the house by his dogs, Olive and Ivy.</p>
        </section>
      </section>
    </Layout>
  );
};

export default IndexPage;

export const query = graphql`
  query aboutPageQuery {
    allMarkdownRemark(
      filter: { frontmatter: { templateKey: { eq: "about-post" } } }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            image {
              childImageSharp {
                fluid(maxWidth: 1000) {
                  src
                }
              }
            }
          }
        }
      }
    }
  }
`;
