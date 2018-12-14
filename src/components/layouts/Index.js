import React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from "gatsby"
import headerImage from '../../assets/images/header-image-2.svg'
import favicon from '../../assets/images/favicon.ico'

import Navbar from '../../components/Navbar'
import '../../assets/stylesheets/index.sass'

const IndexLayout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query HeadingQuery {
          site {
            siteMetadata {
              title,
              description,
            }
          }
        }
    `}
    render={data => (
      <div>
        <Helmet>
          <html lang="en" />
          <title>{data.site.siteMetadata.title}</title>
          <meta name="description" content={data.site.siteMetadata.description} />
          <link rel="shortcut icon" href={favicon} />
        </Helmet>
        <div className="header-image">
          <img src={headerImage} alt="headerImage"/>
        </div>
        <Navbar />
        <div>{children}</div>
      </div>
    )}
  />
)

export default IndexLayout
