module.exports = {
  siteMetadata: {
    title: `Nathan Beekman`,
    description: `A personal portfolio site.`,
    author: {
      twitter: `@natebeekman`,
      github: `@nbeekman`,
    }
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `nathanbeekman.com`,
        short_name: `nb.com`,
        start_url: `/`,
        background_color: `#2e2e2e`,
        theme_color: `#c96218`,
        display: `minimal-ui`,
        icon: `src/images/icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-32814352-1",
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
