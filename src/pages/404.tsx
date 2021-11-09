import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

import { SEO } from '../components/seo';

const Main = styled.main`
  color: #232129;
  font-family: 'Roboto', sans-serif, serif;
`;

const Heading = styled.h1`
  margin-top: 0;
  margin-bottom: 64;
  max-width: 320;
`;

const NotFoundPage = () => {
  return (
    <Main>
      <SEO title="404" />
      <Heading>Page not found</Heading>
      <Link to="/">Go back to Nathan&#8217;s portfolio!</Link>
    </Main>
  );
};

export default NotFoundPage;
