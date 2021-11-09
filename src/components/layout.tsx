import React from "react";
import styled from 'styled-components';

import { SEO } from "./seo";
import { Footer } from "./footer";

const Main = styled.main`
  color: #e2e8f0;
  background: #141E30;
  background: linear-gradient(#141E30, #243B55);
  font-family: 'Roboto', sans-serif, serif;
`;

const ContentContainer = styled.div`
  width: 90%;
  max-width: 1440px;
  margin: 0 auto;
  padding-bottom: 40px;
`;

export const Layout: React.FC = ({ children }) => (
  <Main>
    <SEO />
    <ContentContainer>
      {children}
    </ContentContainer>
    <Footer />
  </Main>
)
