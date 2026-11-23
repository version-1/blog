import { algoliasearch } from 'algoliasearch'
import { search as searchIndexNames } from 'configs/constants'

const client = algoliasearch(
  process.env.GATSBY_ALGOLIA_APP_ID!,
  process.env.GATSBY_ALGOLIA_SEARCH_KEY!
)

const indexKey = process.env.NODE_ENV === 'production' ? 'production' : 'development'
const indexName = searchIndexNames.index[indexKey]

export const search = (query: string) =>
  client.searchSingleIndex({ indexName, searchParams: { query } })
