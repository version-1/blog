import { IoSearch } from 'react-icons/io5'

const icons = Object.freeze({
  search: IoSearch
})

const Icon = ({ icon, ...rest }: any) => {
  const Component = icons[icon as keyof typeof icons]

  return <Component {...rest} />
}

export default Icon
