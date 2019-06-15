import React from 'react';
import { Link } from 'gatsby';
import Layout from 'components/layouts/Index';
import Sidebar from 'components/Sidebar';

const Breadcrumbs = ({context}) => {
  return (
    <ul className="breadcrumbs">
      {context.map((item, idx) => {
        return (
          <li className="breadcrumbs-item" key={idx}>
            <Link to={item.path}>{item.label}</Link>
          </li>
        );
      })}
    </ul>
  );
};

class DefaultLayout extends React.PureComponent {
  render() {
    const {language, amp, baseUrl, layout} = this.props;
    const {archiveByMonth, breadcrumbs = []} = layout;
    return (
      <Layout language={language} amp={amp} baseUrl={baseUrl}>
        <div className="row site-container">
          <div className="row flex">
            <div className="col s12 m12 l8" style={{padding: 'unset'}}>
              <Breadcrumbs context={breadcrumbs} />
              <main className="main">{this.props.children}</main>
            </div>
            <div className="col s12 m12 l4 hide-on-med-and-down">
              <Sidebar
                language={language}
                amp={amp}
                archiveByMonth={archiveByMonth}
              />
            </div>
          </div>
          <div className="row flex">
            <div className="col s12 m12 hide-on-large-only">
              <Sidebar
                language={language}
                amp={amp}
                archiveByMonth={archiveByMonth}
              />
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default DefaultLayout;
