import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
import { GatsbyImage, getImage, IGatsbyImageData } from "gatsby-plugin-image";
import React from "react";
import styled from 'styled-components';

type ClientProps = {
  current: boolean;
  description: string;
  image: IGatsbyImageData;
  project: string;
  title: string;
};

type WorkPropsData = {
  frontmatter: ClientProps;
};

type WorkProps = {
  data: WorkPropsData[];
};

const Container = styled.section`
  /* stuff */
`;

export const Work: React.FC<WorkProps> = ({ data }) => {
  // console.log(data);

  const projectContent = (client: ClientProps) => (
    <>
      <GatsbyImage
        image={getImage(client.image)}
        alt=""
        style={{ height: '275px' }}
      />

      <Box p="6">
        {/* <Box display="flex" alignItems="baseline">
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            {client.title}
          </Box>
        </Box> */}

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {client.title}
        </Box>

        <Box>
          {client.project}
        </Box>
      </Box>
    </>
  );

  const getClients = (data: WorkPropsData[]) => {
    const currentClients = [];
    const pastClients = [];

    data.map((client, i) => {
      const project = (
        <Box key={i} maxW="lg" borderWidth="1px" borderRadius="sm" overflow="hidden" style={{ margin: '0 auto' }}>
          {projectContent(client.frontmatter)}
        </Box>
      );
      client.frontmatter.current ? currentClients.push(project) : pastClients.push(project);
    });

    const workSections = (
      <>
        <section>
          <Heading as="h3" size="lg">Current:</Heading>
          <SimpleGrid columns={3} spacing={10}>
            {currentClients}
          </SimpleGrid>
        </section>

        <section>
          <Heading as="h3" size="lg">Past:</Heading>
          <SimpleGrid columns={3} spacing={10}>
            {pastClients}
          </SimpleGrid>
        </section>
      </>
    );

    return workSections;
  };

  return (
    <Container>
      <Heading as="h2" size="2xl">Work</Heading>
      {getClients(data)}
    </Container>
  );
};
