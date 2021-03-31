import {  StaticImage } from 'gatsby-plugin-image'
import { colors } from 'constants/index'
import Styles from 'lib/styles'

const styles = new Styles({
  container: `
    border-radius: 16px;
    color: ${colors.fontColor};
  `,
}).style

const ProfileIcon = () => {
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

export default ProfileIcon
