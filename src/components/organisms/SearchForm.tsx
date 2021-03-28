import React, { useState } from 'react'
import SearchField from 'molecules/SearchField'
import { search } from 'services/algolia'

const SearchForm = () => {
  const [query, setQuery] = useState('')
  const [result, setResult] = useState<any>()

  return (
    <div>
      <SearchField
        onChange={async (text: string) => {
          setQuery(text)
          if (text.length < 2) {
            return
          }
          const res = await search(text)

          debugger

          setResult(res)
        }}
      />
      <div>content is not found</div>
      <ul>{result.hits.map((article: any) => {
        debugger
        const { title, language } = article
        return <li key={article.id}>{title}</li>
      })}</ul>
    </div>
  )
}

export default SearchForm
