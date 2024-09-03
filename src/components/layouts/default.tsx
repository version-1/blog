import React, { useEffect, useState } from 'react'
import { mq } from 'constants/index'
import Sidebar from '../sidebar'
import Head from '../head'
import Navbar from '../navbar'
import GlobalStyle from '../globalStyle'
import Console from '../shared/organisms/console'
import Footer from '../shared/organisms/footer'
import Modal from '../shared/organisms/modal'
import * as styles from './default.module.scss'

interface Props {
  context: PageContext
  sidebar?: JSX.Element
  noconsole?: boolean
  children: JSX.Element | JSX.Element[]
}

const DefaultLayout: React.FC<Props> = ({
  children,
  context,
  noconsole,
  sidebar
}) => {
  const { baseUrl, language, meta } = context
  return (
    <>
      <Head lang={language} baseUrl={baseUrl} meta={meta} />
      <Content
        children={children}
        context={context}
        noconsole={noconsole}
        sidebar={sidebar}
      />
    </>
  )
}

const Content = ({ children, context, noconsole, sidebar }: Props) => {
  const { path, sidebarDisabled, language, layout } = context
  const [ready, setReady] = useState(false)
  const containerClass = sidebarDisabled
    ? 'row container container-narrow'
    : 'row container'

  useEffect(() => {
    setReady(true)
  }, [])

  return (
    <>
      <GlobalStyle name="blog" />
      <Navbar language={language} />
      {ready ? (
        <>
          <Modal />
          <div className={styles.consoleContainer}>
            {noconsole || <Console context={context} path={path} />}
          </div>
          <main className={[styles.main, containerClass].join(' ')}>
            <div className={styles.content}>{ready ? children : null}</div>
            {sidebar || <Sidebar language={language} layout={layout} />}
          </main>
        </>
      ) : (
        <div className={styles.skelton} />
      )}
      <Footer lang={language} />
    </>
  )
}

export default React.memo(DefaultLayout)
