import {  StaticImage } from 'gatsby-plugin-image'
import { colors } from 'constants/index'
import Styles from 'lib/styles'

const styles = new Styles({
  container: `
    color: ${colors.fontColor};

    img {
      border-radius: 16px;
    }
  `,
}).style

export const ProfileIcon = () => {
  return (
    <StaticImage
      css={styles.container}
      src={`../../assets/images/profile.png`}
      alt="profile"
      width={32}
      height={32}
      quality={90}
      layout="fixed"
    />
  )
}

export const LogoIcon = () => {
  return (
    <StaticImage
      css={styles.container}
      src={`../../assets/images/logo.png`}
      alt="profile"
      width={32}
      height={32}
      quality={90}
      layout="fixed"
    />
  )
}

