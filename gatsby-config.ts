import type { GatsbyConfig } from 'gatsby'
import { meta } from './src/configs/constants'
import { serialize, blogQueries } from './src/configs/rss'
import { queries as algoliaQueries } from './src/configs/algolia'

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})

const config: GatsbyConfig = {
  siteMetadata: {
    siteUrl: meta.siteUrl,
    title: meta.title,
    author: '@version1_2017',
    description: meta.description,
    imageBaseUrl: meta.images.url
  },
  plugins: [
    'gatsby-plugin-emotion',
    'gatsby-plugin-sass',
    'gatsby-plugin-twitter',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/contents`,
        name: 'blog-pages',
        ignore: [`**/\.*`, '**/*.png, **/*.jpg']
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/assets/images`,
        name: 'images',
        ignore: [`**/\.*`]
      }
    },
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 2048
            }
          },
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: {
              destinationDir: 'static'
            }
          },
          {
            resolve: 'gatsby-remark-embed-video',
            options: {
              width: 800,
              height: 400, // Optional: Overrides optional.ratio
              related: false, //Optional: Will remove related videos from the end of an embedded YouTube video.
              noIframeBorder: true //Optional: Disable insertion of <style> border: 0
            }
          },
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              inlineCodeMarker: '>',
            }
          },
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              offsetY: `100`,
              icon: `<svg aria-hidden="true" height="20" version="1.1" viewBox="0 0 16 16" width="20"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>`,
              className: `heading-link`,
              maintainCase: true,
              removeAccents: true,
              isIconAfterHeader: false,
              elements: [`h1`, `h2`, `h3`]
            }
          }
        ]
      }
    },
    'gatsby-plugin-netlify', // make sure to keep it last in the array
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          "G-56G6NL8JWS"
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: meta.siteUrl,
        sitemap: [meta.siteUrl, meta.sitemap].join(''),
        policy: [{ userAgent: '*', allow: '/' }]
      }
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: '/',
        entryLimit: 30,
        query: `
        {
          site {
            siteMetadata {
              siteUrl
            }
          }
          allSitePage(filter: {path: {glob: "!/lab/private/**"}}) {
            nodes {
              path
            }
          }
      }`
      }
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
            query: blogQueries(['ja', 'en'], 1000),
            title: 'rss all',
            output: '/rss.xml'
          },
          {
            serialize,
            query: blogQueries(['ja'], 1000),
            title: 'rss ja',
            output: '/rss.ja.xml'
          },
          {
            serialize,
            query: blogQueries(['en'], 1000),
            title: 'rss en',
            output: '/rss.en.xml'
          },
          {
            serialize,
            query: blogQueries(['ja']),
            title: 'rss latest ja',
            output: '/latest.ja.xml'
          },
          {
            serialize,
            query: blogQueries(['en']),
            title: 'rss latest en',
            output: '/latest.en.xml'
          },
        ]
      }
    },
    // {
    //   resolve: `gatsby-plugin-algolia`,
    //   options: {
    //     appId: process.env.GATSBY_ALGOLIA_APP_ID,
    //     apiKey: process.env.ALGOLIA_ADMIN_KEY,
    //     queries: algoliaQueries,
    //   }
    // },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        "icon": "src/assets/images/logo.png"
      }
    }
  ],
  graphqlTypegen: true
}

export default config
