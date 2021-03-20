type Lang = 'ja' | 'en'

type Environment = 'production' | 'development'

interface LayoutContext {
  archiveByMonth: any
  tags: string[]
}

interface PageContext {
  layout: LayoutContext

}
