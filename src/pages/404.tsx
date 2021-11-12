import { Heading, Stack, Text } from "@chakra-ui/react";
import { Link } from "gatsby";
import React from "react";

import { SEO } from "../components/seo";

const NotFoundPage: React.FC = () => {
  return (
    <main>
      <SEO title="404" />
      <Stack align="center" spacing="5" py={[12, 16, null, 24, 28]}>
        <Heading as="h1" size="3xl" textAlign="center">
          Page not found
        </Heading>
        <Text as="u">
          <Link to="/">Go back to Nathan&#8217;s portfolio!</Link>
        </Text>
      </Stack>
    </main>
  );
};

export default NotFoundPage;
