import { useStaticQuery, graphql } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import Nav from './tachyons/nav/logoLinksInline';

const HeaderLayout = ({ logo }) => (
  <header className="bg-near-black white">
    <Nav logo={logo}>
      This site is in beta.
      {/* <Nav.Link to="/about" className="mr3">
        About
      </Nav.Link> */}
      {/* <Nav.Link to="/blog" className="mr3">
        Blog
      </Nav.Link> */}
    </Nav>
  </header>
);

HeaderLayout.propTypes = {
  logo: PropTypes.object.isRequired,
};

const Header = () => {
  const data = useStaticQuery(graphql`
    query {
      headerLogo: file(relativePath: { eq: "nathanOutline.png" }) {
        childImageSharp {
          fixed(width: 100) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `);

  return <HeaderLayout logo={data.headerLogo.childImageSharp.fixed} />;
};

export default Header;
