import React from 'react';

import Layout from '../../components/layout';
import SEO from '../../components/seo';

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <SEO title="About" />
      <section className="w-100 h-100 pt4 pt5-l">
        {/* <h1 className="f2 f1-l mb4 bb b--dark-blue b--dotted avenir">About</h1> */}
      </section>
    </Layout>
  );
};

export default IndexPage;
