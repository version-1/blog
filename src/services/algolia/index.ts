import { algoliasearch } from 'algoliasearch'
import { search as searchIndexNames } from 'configs/constants'

const appId = process.env.GATSBY_ALGOLIA_APP_ID
const apiKey = process.env.GATSBY_ALGOLIA_SEARCH_KEY
const client = appId && apiKey ? algoliasearch(appId, apiKey) : undefined

const indexKey =
  process.env.NODE_ENV === 'production' ? 'production' : 'development'
const indexName = searchIndexNames.index[indexKey]

export const search = (query: string) =>
  client?.searchSingleIndex({ indexName, searchParams: { query } })
