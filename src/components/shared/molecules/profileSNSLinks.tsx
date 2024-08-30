import React from 'react'
import Styles from 'lib/styles'
import { profileSnsLinks } from 'constants/index'
import Icon from '../atoms/icon'

const styles = new Styles({
  container: `
    display: flex;
    align-items: center;
    justify-content: flex-end;

    li {
      margin-right: 8px;
    }
  `
}).style

const ProfileSNSLinks = () => {
  return (
    <ul className={styles.container}>
      {profileSnsLinks.map((link: any) => {
        return (
          <li key={link.href}>
            <a href={link.href}>
              <Icon icon={link.icon} color={link.iconColor} size={24} />
            </a>
          </li>
        )
      })}
    </ul>
  )
}

export default ProfileSNSLinks
