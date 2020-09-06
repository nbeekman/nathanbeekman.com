import * as React from 'react';
import Img from 'gatsby-image';
import { useStaticQuery, graphql } from 'gatsby';
import PropTypes from 'prop-types';

import tachyons from "./tachyons/tachyonsComposer";

const Logo = ({ logo, url, ...props }) => {
  const Logo = tachyons(Img);
  return (
    <a className="dib v-mid ml3" rel="noopener noreferrer" target="_blank" href={url} {...props}>
      <Logo fixed={logo} />
    </a>
  );
};

const FooterLayout = ({ linkedIn, github, twitter }) => {
  return (
    <footer className="bg-navy white">
      <div className="mw9 center pv3 tc">
        <Logo logo={github} url="https://github.com/nbeekman" />
        <Logo logo={linkedIn} url="https://linkedin.com/in/nathanbeekman/" />
        <Logo logo={twitter} url="https://twitter.com/nathanbeekman" />
      </div>
    </footer>
  );
};
FooterLayout.propTypes = {
  linkedIn: PropTypes.object.isRequired,
};

const Footer = () => {
  const data = useStaticQuery(graphql`
    query {
      linkedIn: file(relativePath: { eq: "linkedIn.png" }) {
        childImageSharp {
          fixed(width: 30, height: 29) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      github: file(relativePath: { eq: "github.png" }) {
        childImageSharp {
          fixed(width: 30) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      twitter: file(relativePath: { eq: "twitter.png" }) {
        childImageSharp {
          fixed(width: 30) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `);

  return <FooterLayout linkedIn={data.linkedIn.childImageSharp.fixed}
                       github={data.github.childImageSharp.fixed}
                       twitter={data.twitter.childImageSharp.fixed} />;
};

export default Footer;
