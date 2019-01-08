const {meta} = require('./config/constants');

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
          'gatsby-remark-prismjs'
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
        whitelistPatternsChildren: [/^post/, /^sns-buttons/]
      }
    },
    'gatsby-plugin-netlify', // make sure to keep it last in the array
    {
      resolve: 'gatsby-plugin-google-fonts',
      options: {
        fonts: ['material icons', 'roboto:300,400,500,700'],
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: meta.sitemap,
        query: `
        {
          site {
            siteMetadata {
              siteUrl
            }
          }

          allSitePage {
            edges {
              node {
                path
              }
            }
          }
      }`,
      },
    },
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
            serialize: ({query: {site, allMarkdownRemark}}) => {
              return allMarkdownRemark.edges.map(edge => {
                const url =
                  site.siteMetadata.siteUrl + edge.node.frontmatter.slug;
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.createdAt,
                  url,
                  guid: url,
                  custom_elements: [{'content:encoded': edge.node.html}],
                });
              });
            },
            query: `
            {
              allMarkdownRemark(
                limit: 1000,
                sort: { order: DESC, fields: [frontmatter___createdAt] },
                filter: {frontmatter: { templateKey: { eq: "blog-post" } }}
              ) {
                edges {
                  node {
                    excerpt
                    html
                    fields { slug }
                    frontmatter {
                      title
                      slug
                      createdAt(formatString: "MMM DD, YYYY")
                    }
                  }
                }
              }
            }
          `,
            output: '/rss.xml',
          },
        ],
      },
    },
  ],
};
