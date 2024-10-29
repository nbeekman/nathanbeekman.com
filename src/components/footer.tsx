import { StaticImage } from "gatsby-plugin-image";
import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  background-color: #BC412B;
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
  border-top: 1px solid #e2e8f0;
  padding-top: 20px;
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
              src="../images/linkedIn.png"
              alt="linkedin link"
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
