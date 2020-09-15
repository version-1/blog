import React, { useContext } from "react";
import { PageContext } from "context";
import Layout from "components/layouts/Index";
import Sidebar from "components/Sidebar";
import PickupList from "components/organisms/PickupList";
import { useDeviceType } from "hooks/useDeviceType";
import Breadcrumbs from "components/molecules/Breadcrumbs";

const DefaultLayout = ({ children }) => {
  const context = useContext(PageContext);
  const {
    path,
    pickup,
    pickupDisabled,
    sidebarDisabled,
    language,
    baseUrl,
    layout
  } = context;
  const { ready, smartphone } = useDeviceType();
  const { archiveByMonth = {}, breadcrumbs = [] } = layout;
  if (!ready) {
    return null;
  }

  const containerClass = sidebarDisabled
    ? "row container container-narrow"
    : "row container";
  return (
    <Layout language={language} baseUrl={baseUrl}>
      <main className={containerClass}>
        <Breadcrumbs currentPath={path} context={breadcrumbs} />
        {!pickupDisabled && !smartphone && <PickupList posts={pickup} />}
        <section className="flex">
          <div className="main">{children}</div>
          {!smartphone && !sidebarDisabled && (
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

export default React.memo(DefaultLayout);
