import { Badge, Box, Heading, SimpleGrid } from "@chakra-ui/react";
import { GatsbyImage, getImage, IGatsbyImageData } from "gatsby-plugin-image";
import React from "react";

type ClientProps = {
  current: boolean;
  description: string;
  image: IGatsbyImageData;
  project: string;
  title: string;
  featuredClient: boolean;
  featuredProject: boolean;
  technology: string[];
};

type WorkProps = {
  data: {
    frontmatter: ClientProps;
  }[];
};

export const Work: React.FC<WorkProps> = ({ data }) => {
  const projectContent: (client: ClientProps) => JSX.Element = (client: ClientProps) => (
    <>
      <GatsbyImage
        image={getImage(client.image)}
        alt={client.title}
        style={{ height: '275px' }}
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
          {client.title}
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
      <SimpleGrid columns={3} spacing={10}>
        {data.map((client, i) => (
          <Box key={i} width="md" borderWidth="1px" borderRadius="sm">
            {projectContent(client.frontmatter)}
          </Box>
        ))}
      </SimpleGrid>
    </section>
  );
};
