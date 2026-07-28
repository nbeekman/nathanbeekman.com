import {
  Badge,
  Box,
  Heading,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { GatsbyImage, getImage, IGatsbyImageData } from "gatsby-plugin-image";
import React from "react";
import styled from "styled-components";

type ClientProps = {
  description: string;
  overview: string;
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

const TechBadges: React.FC<{ technology: string[] }> = ({ technology }) => (
  <>
    {technology.map((tech, i) => (
      <Badge key={i} px="2" colorScheme="teal" marginRight={2}>
        {tech}
      </Badge>
    ))}
  </>
);

export const Work: React.FC<WorkProps> = ({ data }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selected, setSelected] = React.useState<ClientProps | null>(null);

  const openProject = (client: ClientProps) => {
    setSelected(client);
    onOpen();
  };

  const projectContent: (client: ClientProps) => JSX.Element = (client: ClientProps) => (
    <>
      <StyledGatsbyImage
        image={getImage(client.image)}
        alt={client.clientName}
      />

      <Box p="6">
        <TechBadges technology={client.technology} />

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
              <Box
                height="100%"
                maxWidth="md"
                borderWidth="1px"
                borderRadius="sm"
                margin="0 auto"
                cursor="pointer"
                transition="transform 0.15s ease, box-shadow 0.15s ease"
                _hover={{ transform: "translateY(-4px)", boxShadow: "lg" }}
                onClick={() => openProject(client.frontmatter)}
                role="button"
                tabIndex={0}
                aria-label={`Read more about ${client.frontmatter.clientName}`}
                onKeyDown={(e: React.KeyboardEvent) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openProject(client.frontmatter);
                  }
                }}
              >
                {projectContent(client.frontmatter)}
              </Box>
            )}
          </div>
        ))}
      </SimpleGrid>

      <Modal isOpen={isOpen} onClose={onClose} size="2xl" scrollBehavior="inside" isCentered>
        <ModalOverlay />
        <ModalContent bg="gray.50" color="gray.800">
          <ModalHeader pb="2">
            <Box fontSize="2xl" fontWeight="bold">
              {selected?.url ? (
                <Link href={selected.url} isExternal color="teal.700">
                  {selected.clientName}
                </Link>
              ) : (
                selected?.clientName
              )}
            </Box>
            <Text fontSize="md" fontWeight="normal" color="gray.600">
              {selected?.project}
            </Text>
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody pb="8">
            <Box mb="4">
              {selected && <TechBadges technology={selected.technology} />}
            </Box>

            {selected?.overview
              ? selected.overview
                  .split("\n\n")
                  .filter((p) => p.trim())
                  .map((paragraph, i) => (
                    <Text key={i} mb="4" lineHeight="tall">
                      {paragraph.trim()}
                    </Text>
                  ))
              : (
                <Text lineHeight="tall">{selected?.description}</Text>
              )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </section>
  );
};
