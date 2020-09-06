import React from 'react';

import Layout from '../../components/layout';
import SEO from '../../components/seo';

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <SEO title="About" />
      <h1 className="avenir">About</h1>
    </Layout>
  );
};

export default IndexPage;
