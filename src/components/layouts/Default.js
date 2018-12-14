import React from 'react';
import Helmet from 'react-helmet';
import {graphql} from 'gatsby';
import i18next from '../../lib/i18next';
import Layout from '../../components/layouts/Index';
import Sidebar from '../../components/Sidebar';
import Post from '../../components/Post';

class DefaultLayout extends React.PureComponent {
  render() {
    return (
      <Layout>
        <div className="row site-container">
          <div className="col m12 l8">
            <main className="main">{this.props.children}</main>
          </div>
          <div className="col l4 hide-on-med-and-down">
            <Sidebar />
          </div>
        </div>
      </Layout>
    );
  }
}

export default DefaultLayout;
