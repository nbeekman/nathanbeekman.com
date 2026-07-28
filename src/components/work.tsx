import { Badge, Box, Heading, Link, SimpleGrid, Text } from "@chakra-ui/react";
import { GatsbyImage, getImage, IGatsbyImageData } from "gatsby-plugin-image";
import React from "react";
import styled from "styled-components";

type ClientProps = {
  description: string;
  image: IGatsbyImageData;
  project: string;
  clientName: string;
  url: string;
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

      <Box p="6" flex="1" display="flex" flexDirection="column">
        <Box>
          {client.technology.map((tech, i) => (
            <Badge key={i} px="2" colorScheme="teal" marginRight={2}>
              {tech}
            </Badge>
          ))}
        </Box>

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {client.url ? (
            <Link href={client.url} isExternal>
              {client.clientName}
            </Link>
          ) : (
            <>
              {client.clientName}
            </>
          )}
        </Box>

        <Box>
          {client.project}
        </Box>

        {client.description && (
          <Box mt="auto" pt="4" mx="-6" mb="-6" px="6" py="4" bg="gray.100">
            <Text fontSize="sm" color="gray.800" noOfLines={4}>
              {client.description}
            </Text>
          </Box>
        )}
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
              <Box height="100%" maxWidth="md" borderWidth="1px" borderRadius="sm" margin="0 auto" display="flex" flexDirection="column" overflow="hidden">
                {projectContent(client.frontmatter)}
              </Box>
            )}
          </div>
        ))}
      </SimpleGrid>
    </section>
  );
};
