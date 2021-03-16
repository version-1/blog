import React from 'react'
import { Link } from 'gatsby'
import Styles from 'lib/styles'
import { StaticImage } from 'gatsby-plugin-image'
import { aboutPath } from 'lib/routes'
import { instance as i18next } from 'lib/i18next'
import Title from 'components/molecules/Title'

const Profile = () => {
  return (
    <StaticImage
      src="../assets/images/profile.png"
      alt="profile"
      width={64}
      height={64}
      layout="fixed"
    />
  )
}

const styles = new Styles({
  container: `
    padding-left: 32px;
  `,
  section: `
    background: linear-gradient(90deg, rgba(242, 242, 242, 0.95) 0%, rgba(255, 255, 255, 0.7885) 100%);
    box-shadow: 4px 4px 4px 1px rgba(0, 0, 0, 0.01);
    border-radius: 8px;
    margin-bottom: 16px;
  `,
  header: `
    padding: 16px;
    background: linear-gradient(90deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.6) 69.95%, rgba(255, 255, 255, 0.6) 100%);
    box-shadow: 4px 4px 4px 1px rgba(0, 0, 0, 0.01);
    border-radius: 8px;
  `,
  body: `
    padding: 16px;
  `
}).style

const Sidebar = (props: any) => {
  const {
    language,
    layout: { archiveByMonth, tags }
  } = props

  return (
    <div css={styles.container}>
      <section css={styles.section}>
        <div css={styles.header}>
          <Title color="skyblue" label="labels.sidebar.profile-title" />
        </div>
        <div css={styles.body}>
          <div className="profile-image">
            <Profile />
          </div>
          <div className="introduction">
            {i18next.t('labels.sidebar.profile-description')}
            <p>
              <Link to={aboutPath(language)}>
                {i18next.t('labels.sidebar.profile-link')}
              </Link>
            </p>
          </div>
        </div>
      </section>
      {language === 'ja' && (
        <section css={styles.section}>
          <div css={styles.header}>
            <Title color="skyblue" label="labels.sidebar.promotion" />
          </div>
          <div css={styles.body}></div>
        </section>
      )}
    </div>
  )
}

export default Sidebar
