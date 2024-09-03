type Lang = 'ja' | 'en'

type Environment = 'production' | 'development'

interface Frontmatter {
  title: string
  categories: string[]
  tags: string[]
  language: Lang
  slug: string
  templateKey: string
  thumbnail: string
  createdAt: string
  updatedAt: string
}

interface Breadcrumb {
  path: string
  label: string
}

interface Heading {
  id: null | string
  value: string
  depth: number
}

interface Post {
  id: string
  exerpt?: string
  frontmatter: Frontmatter
}

interface ArchiveByMonth {
  [key: string]: string[]
}

interface LayoutContext {
  baseUrl: string
  archiveByMonth: ArchiveByMonth
  tags: string[]
  categories: string[]
  next: Post | null
  previous: Post | null
  breadcrumbs: Breadcrumb[]
}

interface PageContext {
  index?: string
  limit?: number
  heading?: string
  category?: string
  tag?: string
  month?: string
  totalPages?: number
  language: Lang
  pickup: any[]
  pickupDisabled: boolean
  sidebarDisabled: boolean
  baseUrl: string
  basePath: string
  layout: LayoutContext
  meta: any
  next?: any
  previous?: any
}

interface IPagination {
  index: number
  totalCount: number
  namespace: string
  per: number
}


declare module "*.sass"
declare module "*.scss"
