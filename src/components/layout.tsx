import React from "react";
import styled from "styled-components";

import { Footer } from "./footer";
import { SEO } from "./seo";

const Main = styled.main`
  color: #e2e8f0;
  background: #141E30;
  background: linear-gradient(#141E30, #243B55);
`;

const ContentContainer = styled.div`
  width: 90%;
  max-width: 1440px;
  margin: 0 auto;
  margin-bottom: 112px;
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
