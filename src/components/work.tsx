import {
  Badge,
  Box,
  Heading,
  Icon,
  IconProps,
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

import { secondsSince, track } from "../utils/analytics";

type ClientProps = {
  description: string;
  overview: string;
  image?: IGatsbyImageData;
  project: string;
  clientName: string;
  url: string;
  repo?: string;
  featuredClient: boolean;
  featuredProject: boolean;
  technology: string[];
};

type WorkProps = {
  title?: string;
  data: {
    frontmatter: ClientProps;
  }[];
};

const StyledGatsbyImage = styled(GatsbyImage)`
  height: 275px;
  background-color: #e2e8f0;
`;

// Chakra's ExternalLinkIcon lives in @chakra-ui/icons, which isn't a dependency
// here — inlined rather than pulling in a package for one glyph.
const ExternalLinkIcon = (props: IconProps) => (
  <Icon viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
    <path
      d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M15 3h6v6M10 14 21 3" strokeLinecap="round" strokeLinejoin="round" />
  </Icon>
);

const FallbackCover = styled.div`
  height: 275px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #81e6d9 0%, #4fd1c5 55%, #38b2ac 100%);
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

export const Work: React.FC<WorkProps> = ({ data, title = "Work" }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selected, setSelected] = React.useState<ClientProps | null>(null);
  const featured = data.filter(({ frontmatter }) => frontmatter.featuredProject);
  const gridColumns =
    featured.length <= 1
      ? { base: 1 }
      : featured.length === 2
        ? { base: 1, md: 2 }
        : { base: 1, md: 2, lg: 3 };

  // Derived from the existing `title` prop rather than threading a new one through
  // index.tsx, which renders this component twice.
  const projectType = title.toLowerCase() === "fun" ? "fun" : "work";

  const openedAt = React.useRef(0);
  const didScroll = React.useRef(false);

  const openProject = (client: ClientProps) => {
    setSelected(client);
    openedAt.current = Date.now();
    didScroll.current = false;
    onOpen();

    track("project_open", {
      project_name: client.clientName,
      project_type: projectType,
      is_featured: client.featuredProject,
    });
  };

  // Chakra routes the close button, overlay click, and Escape key all through onClose,
  // so wrapping it covers every close path.
  const closeProject = (): void => {
    if (selected) {
      track("project_modal_close", {
        project_name: selected.clientName,
        engaged_seconds: secondsSince(openedAt.current),
        did_scroll: didScroll.current,
      });
    }

    onClose();
  };

  const projectContent: (client: ClientProps) => JSX.Element = (client: ClientProps) => (
    <>
      {client.image ? (
        <StyledGatsbyImage
          image={getImage(client.image)}
          alt={client.clientName}
        />
      ) : (
        <FallbackCover>
          <Box
            fontSize="2xl"
            fontWeight="bold"
            color="teal.900"
            textAlign="center"
            px="6"
          >
            {client.clientName}
          </Box>
        </FallbackCover>
      )}

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
    <section id={title.toLowerCase()}>
      <Heading as="h2" size="3xl" marginBottom={4}>{title}</Heading>
      <SimpleGrid
        columns={gridColumns}
        spacing={10}
        maxW={featured.length <= 2 ? "4xl" : undefined}
        mx={featured.length <= 2 ? "auto" : undefined}
      >
        {featured.map((client, i) => (
          <Box
            key={i}
            height="100%"
            width="100%"
            borderWidth="1px"
            borderRadius="sm"
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
        ))}
      </SimpleGrid>

      <Modal isOpen={isOpen} onClose={closeProject} size="2xl" scrollBehavior="inside" isCentered>
        <ModalOverlay />
        <ModalContent bg="gray.50" color="gray.800">
          <ModalHeader pb="2">
            <Box fontSize="2xl" fontWeight="bold">
              {selected?.url ? (
                <Link
                  href={selected.url}
                  isExternal
                  color="teal.700"
                  display="inline-flex"
                  alignItems="center"
                  gap="2"
                  aria-label={`${selected.clientName} (opens in a new tab)`}
                  onClick={() =>
                    track("project_link_click", {
                      project_name: selected.clientName,
                      link_url: selected.url,
                      link_type: "site",
                    })
                  }
                >
                  {selected.clientName}
                  <ExternalLinkIcon boxSize="0.7em" aria-hidden focusable="false" />
                </Link>
              ) : (
                selected?.clientName
              )}
            </Box>
            <Text fontSize="md" fontWeight="normal" color="gray.600" lineHeight="1.2">
              {selected?.project}
            </Text>

            {/* lineHeight 1 on the wrapper: the default 1.5 line box would otherwise
                add half-leading above the link that no negative margin cleanly removes. */}
            {selected?.repo && (
              <Box lineHeight="1">
                <Link
                  href={selected.repo}
                  isExternal
                  fontSize="xs"
                  fontWeight="normal"
                  color="teal.700"
                  display="inline-flex"
                  alignItems="center"
                  gap="1"
                  aria-label={`View source for ${selected.clientName} on GitHub (opens in a new tab)`}
                  onClick={() =>
                    track("project_link_click", {
                      project_name: selected.clientName,
                      link_url: selected.repo,
                      link_type: "repo",
                    })
                  }
                >
                  View source
                  <ExternalLinkIcon boxSize="0.9em" aria-hidden focusable="false" />
                </Link>
              </Box>
            )}
          </ModalHeader>
          <ModalCloseButton />

          {/* scrollBehavior="inside" makes ModalBody the scroll container. */}
          <ModalBody pb="8" onScroll={() => { didScroll.current = true; }}>
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
