import { IoSearch, IoLogoGithub, IoLogoTwitter } from 'react-icons/io5'

const icons = Object.freeze({
  search: IoSearch,
  github: IoLogoGithub,
  twitter: IoLogoTwitter
})

const Icon = ({ icon, ...rest }: any) => {
  const Component = icons[icon as keyof typeof icons]

  return <Component {...rest} />
}

export default Icon
