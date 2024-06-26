module.exports = {
  siteMetadata: {
    siteUrl: `https://nathanbeekman.com`,
    siteTitle: `Nathan Beekman | Front-End Practice Lead`,
    siteDescription: `A personal portfolio site.`,
    twitter: `@nathanbeekman`,
    github: `@nbeekman`,
  },
  plugins: [
    'gatsby-plugin-styled-components',
    'gatsby-plugin-image',
    {
      resolve: 'gatsby-plugin-google-gtag',
      options: {
        trackingIds: [
          'G-EKN2T2JRV0',
        ],
      },
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: `Nathan Beekman | Front-End Practice Lead`,
        short_name: `nathanbeekman.com`,
        start_url: `/`,
        display: `minimal-ui`,
        icon: `src/images/icon.png`,
      },
    },
    'gatsby-transformer-remark',
    'gatsby-plugin-mdx',
    'gatsby-plugin-sharp',
    'gatsby-plugin-typescript',
    'gatsby-transformer-sharp',
    {
      resolve: "@chakra-ui/gatsby-plugin",
      options: {
        resetCSS: true,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/images/',
      },
      __key: 'images',
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: './src/pages/',
      },
      __key: 'pages',
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `work`,
        path: `${__dirname}/src/content/work`,
      },
    },
    {
      resolve: `gatsby-omni-font-loader`,
      options: {
        mode: 'render-blocking',
        enableListener: true,
        preconnect: [`https://fonts.gstatic.com`],
        web: [
          {
            name: `Bebas Neue`,
            file: `https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap`,
          },
          {
            name: `Montserrat`,
            file: `https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap`,
          },
        ],
      },
    },
  ],
};
