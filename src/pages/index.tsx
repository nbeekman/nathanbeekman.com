import { Heading, Stack, Text } from "@chakra-ui/react";
import { PageProps, graphql } from "gatsby";
import { IGatsbyImageData } from "gatsby-plugin-image";
import React from "react";

import { Layout } from "../components/layout";
import { Work } from "../components/work";

type DataProps = {
  allMdx: {
    nodes: {
      frontmatter: {
        date: string;
        description: string;
        image: IGatsbyImageData;
        project: string;
        clientName: string;
        url: string;
        featuredClient: boolean;
        featuredProject: boolean;
        technology: string[];
      }
    }[]
  }
}


const HomePage: React.FC<PageProps<DataProps>> = ({ data }) => {
  return (
    <Layout>
      <Stack align="center" spacing="5" py={[12, 16, 20]}>
        <Heading as="h1" size="4xl" letterSpacing="normal">
          Hey, I&#8217;m Nathan!
        </Heading>
        <Heading as="h2" size="lg" letterSpacing="normal">
          Front-End Practice Lead
        </Heading>
        <Text marginTop="0px !important" fontSize={[12, 14, 16]}>
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
    allMdx(
      filter: {frontmatter: {category: {eq: "work"}}}
      sort: {
        fields: [
          frontmatter___featuredClient,
          frontmatter___date,
          frontmatter___title
        ],
        order: [DESC, DESC, DESC]}
    ) {
      nodes {
        frontmatter {
          date
          clientName
          url
          project
          description
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
