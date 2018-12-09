import React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from "gatsby"
import headerImage from '../assets/images/header-image-2.svg'

import Navbar from '../components/Navbar'
import '../assets/stylesheets/index.sass'

const TemplateWrapper = ({ children }) => (
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

export default TemplateWrapper
