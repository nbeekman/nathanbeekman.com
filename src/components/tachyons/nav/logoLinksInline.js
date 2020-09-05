import * as React from "react";
import Img from "gatsby-image";
import { Link } from "gatsby";
import tachyons from "../tachyonsComposer";

const Nav = tachyons("nav", "dt w-90 mw9 center border-box pv3");

const Logo = ({ logo, ...props }) => {
  const Container = tachyons(Link, "dtc v-mid mid-gray");
  const Logo = tachyons(Img);
  return (
    <Container to="/">
      <Logo fixed={logo} />
    </Container>
  );
};

const LinksContainer = tachyons("div", "dtc v-mid w-100 tr");

const NavLink = tachyons(Link, "link white f6 f5-ns dib");

const ExternalLink = tachyons(
  ({ href, children, ...props }) => (
    <a rel="noopener noreferrer" target="_blank" href={href} {...props}>
      {children}
    </a>
  ),
  "link white f6 f5-ns dib"
);

const LogoLinksInline = ({ logo, children, ...props }) => {
  return (
    <Nav>
      <Logo logo={logo} />
      <LinksContainer>{children}</LinksContainer>
    </Nav>
  );
};

LogoLinksInline.Nav = Nav;
LogoLinksInline.Logo = Logo;
LogoLinksInline.LinksContainer = LinksContainer;
LogoLinksInline.Link = NavLink;
LogoLinksInline.ExternalLink = ExternalLink;

export default LogoLinksInline;
