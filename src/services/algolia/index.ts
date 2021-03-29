import algoliasearch from 'algoliasearch'
import constants from 'config/constants'

const client = algoliasearch(
  process.env.GATSBY_ALGOLIA_APP_ID!,
  process.env.GATSBY_ALGOLIA_SEARCH_KEY!
)

const indexKey = process.env.CONTEXT === 'prodcution' ? 'production' : 'development'
const indexName = constants.search.index[indexKey]

const index = client.initIndex(indexName)

export const search = (query: string) => {
  return index.search(query, {
  })
}
