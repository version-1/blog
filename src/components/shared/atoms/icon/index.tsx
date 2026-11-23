import {
  IoSearch,
  IoChevronBack,
  IoChevronForward,
  IoLogoGithub,
  IoLogoTwitter,
  IoLogoYoutube,
  IoCaretBackCircle,
  IoCaretForwardCircle,
  IoMail,
  IoMenuOutline,
  IoClose,
  IoListOutline
} from 'react-icons/io5'

const icons = Object.freeze({
  close: IoClose,
  mail: IoMail,
  menu: IoMenuOutline,
  index: IoListOutline,
  search: IoSearch,
  github: IoLogoGithub,
  youtube: IoLogoYoutube,
  twitter: IoLogoTwitter,
  forward: IoChevronForward,
  back: IoChevronBack,
  forwardFill: IoCaretForwardCircle,
  backFill: IoCaretBackCircle
})

interface Props {
  icon: keyof typeof icons
  className?: string
  color?: string
  size?: string | number
  onClick?: () => void
}

const Icon = ({ icon, color, size, onClick, ...rest }: Props) => {
  const Component = icons[icon as keyof typeof icons]

  return <Component color={color} size={size} onClick={onClick} {...rest} />
}

export default Icon
