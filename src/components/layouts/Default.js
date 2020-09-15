import React from "react";
import { Link } from "gatsby";
import Layout from "components/layouts/Index";
import Sidebar from "components/Sidebar";
import PickupList from "components/organisms/PickupList";
import { useDeviceType } from "../../hooks/useDeviceType";

const Breadcrumbs = ({ context }) => {
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

const DefaultLayout = ({
  children,
  pickupDisabled,
  pickup,
  language,
  baseUrl,
  layout
}) => {
  const { ready, smartphone } = useDeviceType();
  const { archiveByMonth, breadcrumbs = [] } = layout;
  if (!ready) {
    return null;
  }
  return (
    <Layout language={language} baseUrl={baseUrl}>
      <main className="row container">
        <Breadcrumbs context={breadcrumbs} />
        {!pickupDisabled && !smartphone && <PickupList posts={pickup} />}
        <section className="flex">
          <div className="main">{children}</div>
          {!smartphone && (
            <div className="hide-on-med-and-down">
              <Sidebar
                layout={layout}
                language={language}
                archiveByMonth={archiveByMonth}
              />
            </div>
          )}
        </section>
        <div className="flex">
          {smartphone && (
            <div className="hide-on-large-only">
              <Sidebar layout={layout} language={language} />
            </div>
          )}
        </div>
      </main>
    </Layout>
  );
};

export default React.memo(DefaultLayout, []);
