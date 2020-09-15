import React from "react";
import { StaticQuery, graphql } from "gatsby";
import Navbar from "components/Navbar";
import Head from "components/Head";
import "assets/stylesheets/index.sass";

const IndexLayout = ({ language, baseUrl, children }) => {
  return (
    <StaticQuery
      query={graphql`
        query HeadingQuery {
          site {
            siteMetadata {
              title
              description
            }
          }
        }
      `}
      render={data => (
        <div>
          <Head
            baseUrl={baseUrl}
            siteTitle={data.site.siteMetadata.title}
            description={data.site.siteMetadata.description}
          />
          <Navbar language={language} />
          <div>{children}</div>
          <div className="footer">
            <span className="copyright">
              Copyright © 2018 So Far , So Tech All Rights Reserved.
            </span>
          </div>
        </div>
      )}
    />
  );
};

export default IndexLayout
