import React from 'react'
import Link from 'atoms/Link'
import Sidebar from 'components/Sidebar'
import Head from 'components/Head'
import Navbar from 'components/Navbar'
import PickupList from 'components/organisms/PickupList'
import { useDeviceType } from 'hooks/useDeviceType'
import Breadcrumbs from 'components/molecules/Breadcrumbs'
import 'assets/stylesheets/index.sass'

const ToggleLink = ({ active, className, to, children }) => {
  if (active) {
    return <span className={className}>{children}</span>
  }
  return (
    <Link className={className} to={to}>
      {children}
    </Link>
  )
}

const DefaultLayout = ({ children, context }) => {
  const {
    path,
    pickup,
    pickupDisabled,
    sidebarDisabled,
    language,
    baseUrl,
    layout,
    meta
  } = context
  const { smartphone } = useDeviceType()
  const { archiveByMonth = {}, breadcrumbs = [] } = layout
  const containerClass = sidebarDisabled
    ? 'row container container-narrow'
    : 'row container'

  return (
    <div>
      <Head lang={language} baseUrl={baseUrl} meta={meta} />
      <Navbar language={language} />
      <main className={containerClass}>
        <div className="content-header flex">
          <Breadcrumbs currentPath={path} context={breadcrumbs} />
          <div className="toggle-lang">
            <ToggleLink
              className="toggle-lang-label"
              to={ meta?.alternate?.ja || "/" }
              active={language === 'ja'}
            >
              JA
            </ToggleLink>
            <span className="toggle-lang-separator">|</span>
            <ToggleLink
              className="toggle-lang-label"
              to={ meta?.alternate?.en || "/en" }
              active={language === 'en'}
            >
              EN
            </ToggleLink>
          </div>
        </div>
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
      <div className="footer">
        <span className="copyright">
          Copyright © 2018 So Far , So Tech All Rights Reserved.
        </span>
      </div>
    </div>
  )
}

export default React.memo(DefaultLayout)
