import React from 'react';
import Layout from '../../components/layouts/Index';
import Sidebar from '../../components/Sidebar';

class DefaultLayout extends React.PureComponent {
  render() {
    const {amp, baseUrl} = this.props;
    return (
      <Layout amp={amp} baseUrl={baseUrl}>
        <div className="row site-container">
          <div className="row flex">
            <div className="col s12 m12 l8">
              <main className="main">{this.props.children}</main>
            </div>
            <div className="col s12 m12 l4 hide-on-med-and-down">
              <Sidebar amp={amp} />
            </div>
          </div>
          <div className="row flex">
            <div className="col s12 m12 hide-on-large-only">
              <Sidebar amp={amp} />
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default DefaultLayout;
