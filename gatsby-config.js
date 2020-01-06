const {meta} = require('./config/constants');
const {serialize, queries} = require('./node/rss');

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    siteUrl: meta.siteUrl,
    title: meta.title,
    description: meta.description,
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
        ignore: [`**/\.*`, '**/*.png, **/*.jpg'],
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/assets/images`,
        name: 'images',
        ignore: [`**/\.*`],
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-relative-images',
            options: {
              name: 'uploads',
            },
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 2048,
            },
          },
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: {
              destinationDir: 'static',
            },
          },
          {
            resolve: 'gatsby-remark-embed-video',
            options: {
              width: 800,
              height: 400, // Optional: Overrides optional.ratio
              related: false, //Optional: Will remove related videos from the end of an embedded YouTube video.
              noIframeBorder: true, //Optional: Disable insertion of <style> border: 0
            },
          },
          'gatsby-remark-prismjs',
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-purgecss', // must be after other CSS plugins
      options: {
        printRejected: true,
        printAll: true,
        develop: false,
        ignore: ['node_modules/prismjs/'],
        whitelistPatternsChildren: [/^post/, /^sns-buttons/],
      },
    },
    'gatsby-plugin-netlify', // make sure to keep it last in the array
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: meta.trackingId,
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: meta.siteUrl,
        sitemap: [meta.siteUrl, meta.sitemap].join(''),
        policy: [{userAgent: '*', allow: '/'}],
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
        {
          site {
            siteMetadata {
              title
              description
              siteUrl
              site_url: siteUrl
            }
          }
        }
      `,
        feeds: [
          {
            serialize,
            query: queries(['ja', 'en']),
            output: '/rss.xml',
          },
          {
            serialize,
            query: queries(['ja']),
            output: '/rss.ja.xml',
          },
          {
            serialize,
            query: queries(['en']),
            output: '/rss.en.xml',
          },
        ],
      },
    },
  ],
};
