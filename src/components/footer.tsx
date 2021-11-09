import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #141E30;
  padding: 40px;
`;

const IconsContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Icons = styled.div`
  margin: auto;
  a {
    margin-right: 30px;
    &:last-of-type {
      margin-right: 0;
    }
  }
`;

const Copyright = styled.div`
  text-align: center;
`;

export const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <IconsContainer>
        <Icons>
          <a href="https://github.com/nbeekman">
            <StaticImage
              src="../images/github.png"
              alt="github link"
              placeholder="blurred"
              width={50}
            />
          </a>
          <a href="https://linkedin.com/in/nathanbeekman/">
            <StaticImage
              src="../images/linkedin.png"
              alt="linkedin link"
              placeholder="blurred"
              width={50}
            />
          </a>
          <a href="https://twitter.com/nathanbeekman">
            <StaticImage
              src="../images/twitter.png"
              alt="twitter"
              placeholder="blurred"
              width={50}
            />
          </a>
        </Icons>
      </IconsContainer>
      <Copyright>
        &#169; {new Date().getFullYear()} Nathan Beekman. All rights reserved.
      </Copyright>
    </FooterContainer>
  );
};
