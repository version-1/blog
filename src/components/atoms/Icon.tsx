import {
  IoSearch,
  IoChevronBack,
  IoChevronForward,
  IoLogoGithub,
  IoLogoTwitter
} from 'react-icons/io5'

const icons = Object.freeze({
  search: IoSearch,
  github: IoLogoGithub,
  twitter: IoLogoTwitter,
  forward: IoChevronForward,
  back: IoChevronBack
})

interface Props {
  icon: keyof typeof icons
  color?: string
  size?: string | number
}

const Icon = ({ icon, ...rest }: Props) => {
  const Component = icons[icon as keyof typeof icons]

  return <Component {...rest} />
}

export default Icon
