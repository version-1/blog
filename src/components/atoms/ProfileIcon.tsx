import {  StaticImage } from 'gatsby-plugin-image'
import { colors, imagePath } from 'constants/index'
import Styles from 'lib/styles'

const styles = new Styles({
  container: `
    border-radius: 16px;
    color: ${colors.fontColor};
  `,
}).style

const ProfileIcon = (props: any) => {
  return (
    <StaticImage
      css={styles.container}
      src={`../../assets/images/profile.png`}
      alt="profile"
      width={32}
      height={32}
      quality={90}
      layout="fixed"
      {...props}
    />
  )
}

export default ProfileIcon
