import React from "react";
import styled from "styled-components";

import { Footer } from "./footer";
import { SEO } from "./seo";

const Main = styled.main`
  background: linear-gradient(#141E30, #243B55);
`;

const TopBanner = styled.div`
  background-color: #BC412B;
  height: 10px;
`;

const ContentContainer = styled.div`
  width: 90%;
  max-width: 1440px;
  margin: 0 auto;
  margin-bottom: 112px;
`;

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => (
  <Main>
    <TopBanner />
    <SEO />
    <ContentContainer>
      {children}
    </ContentContainer>
    <Footer />
  </Main>
)
