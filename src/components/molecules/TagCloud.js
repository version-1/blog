import React, { useState, useMemo, useCallback } from 'react'
import Link from 'atoms/Link'
import i18next from 'lib/i18next'
import { tagPath } from 'lib/routes'

const defaultCount = 24
const delta = 8

const TagCloud = ({ language, tags }) => {
  const [count, setCount] = useState(defaultCount)
  const [value, setValue] = useState('')
  const onMore = useCallback(() => {
    setCount(count => count + delta)
  }, [setCount])
  const onChangeText = useCallback(
    e => {
      setValue(e.target.value)
    },
    [setValue]
  )

  const rest = useMemo(() => tags.length - count, [tags, count])

  const filteredTags = tags.filter(tag => {
    if (!value) {
      return true
    }
    const text = i18next.t(`tags.${tag}`)
    return text.match(new RegExp(value))
  })

  return (
    <div className="tagcloud-tags">
      <div className="tagcloud-filter">
        <input
          className="input"
          placeholder="input tag name"
          type="text"
          value={value}
          onChange={onChangeText}
        />
      </div>
      <ul className="tagcloud-tags-list">
        {filteredTags.slice(0, count).map(tag => {
          const key = `tags.${tag}`
          return (
            <li key={key} className="tagcloud-tags-item">
              <Link
                className="tagcloud-tags-item-link"
                to={tagPath(tag, language)}
              >
                {i18next.t(key)}
              </Link>
            </li>
          )
        })}
      </ul>
      {filteredTags.length > count && (
        <p className="tagcloud-more" onClick={onMore}>{`>> ${rest} more`}</p>
      )}
    </div>
  )
}

export default TagCloud
