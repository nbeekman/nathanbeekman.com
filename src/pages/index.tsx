import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import { PageProps, graphql } from "gatsby";
import { IGatsbyImageData } from "gatsby-plugin-image";
import React from "react";

import { Layout } from "../components/layout";
import { Work } from "../components/work";

type ProjectFrontmatter = {
  endDate: string;
  description: string;
  overview: string;
  image?: IGatsbyImageData;
  project: string;
  clientName: string;
  url: string;
  featuredClient: boolean;
  featuredProject: boolean;
  technology: string[];
};

type ProjectNodes = {
  nodes: {
    frontmatter: ProjectFrontmatter;
  }[];
};

type DataProps = {
  work: ProjectNodes;
  fun: ProjectNodes;
};

const HomePage: React.FC<PageProps<DataProps>> = ({ data }) => {
  return (
    <Layout>
      <Stack align="center" spacing="5" py={[12, 16, 20]}>
        <Heading as="h1" size="4xl" letterSpacing="normal">
          Hey, I&#8217;m Nathan!
        </Heading>
        <Heading as="h2" size="lg" letterSpacing="normal">
          Senior Frontend Software Engineer
        </Heading>
        <Text marginTop="0px !important" fontSize={[12, 14, 16]}>
          React | Angular | Design Systems | Mobile Apps
        </Text>
      </Stack>

      <Work data={data.work.nodes} />

      {data.fun.nodes.length > 0 && (
        <Box mt={[16, 20]}>
          <Work title="Fun" data={data.fun.nodes} />
        </Box>
      )}
    </Layout>
  );
};

export default HomePage;

export const query = graphql`
  query workQuery {
    work: allMdx(
      filter: {frontmatter: {category: {eq: "work"}}}
      sort: [{frontmatter: {featuredClient: DESC}}, {frontmatter: {endDate: DESC}}, {frontmatter: {clientName: DESC}}]
    ) {
      nodes {
        frontmatter {
          endDate
          clientName
          url
          project
          description
          overview
          featuredClient
          featuredProject
          technology
          image {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
      }
    }

    fun: allMdx(
      filter: {frontmatter: {category: {eq: "fun"}}}
      sort: [{frontmatter: {endDate: DESC}}]
    ) {
      nodes {
        frontmatter {
          endDate
          clientName
          url
          project
          description
          overview
          featuredClient
          featuredProject
          technology
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
