import algoliasearch from 'algoliasearch'
import constants from 'config/constants'

const client = algoliasearch(
  process.env.GATSBY_ALGOLIA_APP_ID!,
  process.env.GATSBY_ALGOLIA_SEARCH_KEY!
)

const index = client.initIndex(constants.search.index)

export const search = (query: string) => {
  return index.search(query, {
  })
}
