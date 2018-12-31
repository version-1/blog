import React from 'react';
import Layout from '../../components/layouts/Index';
import Sidebar from '../../components/Sidebar';

class DefaultLayout extends React.PureComponent {
  render() {
    const {amp, baseUrl} = this.props;
    return (
      <Layout amp={amp} baseUrl={baseUrl}>
        <div className="row site-container">
          <div className="col s12 m12 l8">
            <main className="main">{this.props.children}</main>
          </div>
          {amp ? null : (
            <div className="col l4 hide-on-med-and-down">
              <Sidebar amp={amp} />
            </div>
          )}
        </div>
        {amp ? (
          <div className="row">
            <Sidebar amp={amp} />
          </div>
        ) : null}
      </Layout>
    );
  }
}

export default DefaultLayout;
