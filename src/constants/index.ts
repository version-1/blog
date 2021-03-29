export const colors = {
  fontColor: '#222',
  primaryColor: '#362A65',
  link: '#0066C5',
  white: 'white'
}

export const imagePath = `../../assets/images`

export const profileSnsLinks = [
  {
    icon: 'github',
    iconColor: '#333',
    href: 'https://github.com/version-1'
  },
  {
    icon: 'twitter',
    iconColor: '#1DA1F2',
    href: 'https://twitter.com/version1_2017'
  }
]

const breakpoitns = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200
}

export const mq = Object.freeze({
  sm: `@media (max-width: ${breakpoitns.sm}px)`,
  md: `@media (max-width: ${breakpoitns.md}px)`,
  lg: `@media (max-width: ${breakpoitns.lg}px)`,
  xl: `@media (max-width: ${breakpoitns.xl}px)`
})

