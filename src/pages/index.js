import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import emailIcon from '../images/email.png';
import linkedInIcon from '../images/linkedIn.png';
import nathanIcon from '../images/nathanOutline.png';

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <div style={{ maxWidth: `400px`, margin: `5rem auto 1.5rem` }}>
      <img src={nathanIcon} alt="Nathan icon" />
      <div style={{ textAlign: `center` }}>
        <a href="mailto:nathan@nathanbeekman.com">
          <img src={emailIcon} style={{ height: `35px`, width: `35px`, marginRight: `20px` }} alt="email" />
        </a>
        <a href="https://www.linkedin.com/in/nathanbeekman/">
          <img src={linkedInIcon} style={{ height: `35px`, width: `35px` }} alt="linkedIn" />
        </a>
      </div>
    </div>
  </Layout>
);

export default IndexPage;
