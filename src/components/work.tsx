import { Badge, Box, Heading, SimpleGrid } from "@chakra-ui/react";
import { GatsbyImage, getImage, IGatsbyImageData } from "gatsby-plugin-image";
import React from "react";
import styled from "styled-components";

type ClientProps = {
  description: string;
  image: IGatsbyImageData;
  project: string;
  clientName: string;
  featuredClient: boolean;
  featuredProject: boolean;
  technology: string[];
};

type WorkProps = {
  data: {
    frontmatter: ClientProps;
  }[];
};

const StyledGatsbyImage = styled(GatsbyImage)`
  height: 275px;
  background-color: #e2e8f0;
`;

export const Work: React.FC<WorkProps> = ({ data }) => {
  const projectContent: (client: ClientProps) => JSX.Element = (client: ClientProps) => (
    <>
      <StyledGatsbyImage
        image={getImage(client.image)}
        alt={client.clientName}
      />

      <Box p="6">
        {client.technology.map((tech, i) => (
          <Badge key={i} px="2" colorScheme="teal" marginRight={2}>
            {tech}
          </Badge>
        ))}

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {client.clientName}
        </Box>

        <Box>
          {client.project}
        </Box>
      </Box>
    </>
  );

  return (
    <section>
      <Heading as="h2" size="3xl" marginBottom={4}>Work</Heading>
      <SimpleGrid columns={3} spacing={10} minChildWidth={['280px', '425px']}>
        {data.map((client, i) => (
          <div key={i}>
            {client.frontmatter.featuredProject && (
              <Box maxWidth="md" borderWidth="1px" borderRadius="sm" margin="0 auto">
                {projectContent(client.frontmatter)}
              </Box>
            )}
          </div>
        ))}
      </SimpleGrid>
    </section>
  );
};
