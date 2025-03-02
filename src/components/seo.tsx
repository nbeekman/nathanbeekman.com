import { useLocation } from "@reach/router";
import { useStaticQuery, graphql } from "gatsby";
import React from "react";
import { Helmet } from "react-helmet";

import favicon from '../images/favicon.png';

type SEOProps = {
  title?: string;
  children: React.ReactNode;
};

export const SEO: React.FC<SEOProps> = ({ title, children }) => {
  const { href } = useLocation();
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            siteTitle
            siteDescription
            siteUrl
            github
          }
        }
      }
    `
  );

  const seo = {
    title: site.siteMetadata.siteTitle,
    description: site.siteMetadata.siteDescription,
    url: href,
    github: `https://github.com/nbeekman`,
  };

  return (
    <Helmet
      title={title}
      defaultTitle={site.siteMetadata.siteTitle}
      titleTemplate={`%s | ${site.siteMetadata.siteTitle}`}
      key={seo.url}
    >
      <html lang="en-US" />
      <meta name="description" content={seo.description} />
      <link rel="canonical" href={seo.url} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:type" content="website" />
      <meta property="og:see_also" content={seo.github} />
      <link rel="icon" type="image/svg+xml" href={favicon} />
      {children}
    </Helmet>
  );
};
