import { graphql } from 'gatsby';
import React from 'react';
// import styled from 'styled-components';
import {
  Stack,
  Text,
  Heading,
} from "@chakra-ui/react"

import { Layout } from '../components/layout';
import { Work } from '../components/work';


const HomePage = ({ data }) => {
  return (
    <Layout>
      <Stack align="center" spacing="5" py={[12, 16, null, 24, 28]}>
        <Heading as="h1" size="3xl" textAlign="center">
          Hey, I&#8217;m Nathan!
        </Heading>
        <Heading as="h2" size="lg" textAlign="center">
          Senior Frontend Developer
        </Heading>
        <Text marginTop="0px !important">
          React | Angular | Design Systems | Ionic Mobile Apps
        </Text>
      </Stack>

      <Work data={data.allMdx.nodes} />
    </Layout>
  );
};

export default HomePage;

export const query = graphql`
  query workQuery {
    allMdx(filter: {frontmatter: {category: {eq: "work"}}}) {
      nodes {
        frontmatter {
          title
          project
          description
          current
          image {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
      }
    }
  }
`;
