import React from 'react'
import { Link } from 'gatsby'
import Styles from 'lib/styles'
import { blog } from 'lib/routes'
import { colors } from 'constants/index'
import { instance as i18next } from 'lib/i18next'
import Title from '../../molecules/title'
import { ProfileIcon } from '../../atoms/specialIcon'
import ProfileSNSLinks from '../../molecules/profileSNSLinks'
import * as styles from './index.module.scss'

interface Props {
  language: Lang
}

const Profile = ({ language }: Props) => {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <Title color="skyblue" label="labels.sidebar.profile-title" />
      </div>
      <div className={styles.body}>
        <div className="profile-image">
          <Link to={blog.aboutPath(language)}>
            <div className={styles.profileTitle}>
              <ProfileIcon className={styles.avatar} />
              <span className={styles.name}>
                Jiro
              </span>
            </div>
          </Link>
        </div>
        <div className={[styles.profileDescription, "introduction"].join(' ')}>
          {i18next.t('profile.description')}
        </div>
        <div className={styles.profileFooter}>
          <ProfileSNSLinks />
        </div>
      </div>
    </section>
  )
}

export default Profile
