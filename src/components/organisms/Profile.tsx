import React from 'react'
import { Link } from 'gatsby'
import Styles from 'lib/styles'
import { aboutPath } from 'lib/routes'
import { instance as i18next } from 'lib/i18next'
import Title from 'components/molecules/Title'
import { colors } from 'constants/index'
import ProfileIcon from 'components/atoms/ProfileIcon'
import ProfileSNSLinks from 'components/molecules/ProfileSNSLinks'

const styles = new Styles({
  container: `
    padding-left: 32px;
    color: inherit;
  `,
  profileTitle: `
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    padding: 0 16px;
    color: ${colors.fontColor};

    .gatsby-image-wrapper {
      margin-right: 32px;
    }

    &:hover {
      opacity: 0.6;
    }
  `,
  profileDescription: `
    padding: 0 16px;
    margin-bottom: 16px;
  `,
  profileIcons: `
    display: flex;
    align-items: center;
    justify-content: flex-end;

    li {
      margin-right: 8px;
    }
  `,
  profileFooter: `
    padding: 0 16px;
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

interface Props {
  language: Lang
}

const Profile = ({ language }: Props) => {
  return (
    <section css={styles.section}>
      <div css={styles.header}>
        <Title color="skyblue" label="labels.sidebar.profile-title" />
      </div>
      <div css={styles.body}>
        <div className="profile-image">
          <Link to={aboutPath(language)}>
            <div css={styles.profileTitle}>
              <ProfileIcon />
              Jiro
            </div>
          </Link>
        </div>
        <div css={styles.profileDescription} className="introduction">
          {i18next.t('profile.description')}
        </div>
        <div css={styles.profileFooter}>
          <ProfileSNSLinks />
        </div>
      </div>
    </section>
  )
}

export default Profile
