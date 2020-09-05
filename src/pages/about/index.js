import React from 'react';

import Layout from '../../components/layout';
import SEO from '../../components/seo';

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <SEO title="About" />
      This is the about page.
    </Layout>
  );
};

export default IndexPage;
