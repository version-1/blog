import React, { useState, useCallback, useMemo } from 'react'
import SearchField from 'molecules/SearchField'
import { search } from 'services/algolia'
import Styles from 'lib/styles'
import throttle from 'lodash/throttle'

const styles = new Styles({
  container: `
    padding: 16px;
  `,
  card: `
    display: block;
    border-top: 1px solid lightgray;
    padding: 16px;
  `
}).style


const SearchForm = () => {
  const [, setQuery] = useState('')
  const [result, setResult] = useState<any>()

  const onChange = useCallback(async (text: string) => {
      setQuery(text)
      if (text.length < 2) {
        return
      }

      console.log('search', text)
      const res = await search(text)

      setResult(res)
  }, [setResult])

  const onChangeThrottled = useMemo(() => throttle(onChange, 1500), [onChange])

  return (
    <div css={styles.container}>
      <SearchField
        onChange={onChangeThrottled}
      />
      <div>content is not found</div>
      <ul>
        {result &&
          result.hits.map((article: any) => {
            const { title, excerpt } = article
            return (
              <li css={styles.card} key={article.id}>
                <h2>{title}</h2>
                <p>{excerpt.slice(0, 200) + '...'}</p>
              </li>
            )
          })}
      </ul>
    </div>
  )
}

export default SearchForm
