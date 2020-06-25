import React from 'react';
import {Link} from 'gatsby';
import Layout from 'components/layouts/Index';
import Sidebar from 'components/Sidebar';
import PickupList from 'components/organisms/PickupList';

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
    const {pickupDisabled, pickup, language, baseUrl, layout} = this.props;
    const {archiveByMonth, breadcrumbs = []} = layout;
    return (
      <Layout language={language} baseUrl={baseUrl}>
        <main className="row container">
          <Breadcrumbs context={breadcrumbs} />
          {!pickupDisabled && <PickupList posts={pickup} />}
          <section className="flex">
            <div className="main">{this.props.children}</div>
            <div className="hide-on-med-and-down">
              <Sidebar
                layout={layout}
                language={language}
                archiveByMonth={archiveByMonth}
              />
            </div>
          </section>
          <div className="flex">
            <div className="hide-on-large-only">
              <Sidebar
                layout={layout}
                language={language}
              />
            </div>
          </div>
        </main>
      </Layout>
    );
  }
}

export default DefaultLayout;
