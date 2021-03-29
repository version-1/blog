import {
  IoSearch,
  IoChevronBack,
  IoChevronForward,
  IoLogoGithub,
  IoLogoTwitter,
  IoCaretBackCircle,
  IoCaretForwardCircle,
  IoMail,
  IoMenu,
  IoClose
} from 'react-icons/io5'

const icons = Object.freeze({
  close: IoClose,
  mail: IoMail,
  menu: IoMenu,
  search: IoSearch,
  github: IoLogoGithub,
  twitter: IoLogoTwitter,
  forward: IoChevronForward,
  back: IoChevronBack,
  forwardFill: IoCaretForwardCircle,
  backFill: IoCaretBackCircle,
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
