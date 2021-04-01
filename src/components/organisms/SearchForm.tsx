import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { Link } from 'gatsby'
import { postShowPath } from 'lib/routes'
import { instance as i18next } from 'lib/i18next'
import SearchField from 'molecules/SearchField'
import Modal from 'components/organisms/Modal'
import { search } from 'services/algolia'
import Styles from 'lib/styles'
import throttle from 'lodash/throttle'
import { colors } from 'constants/index'
import { mq } from 'constants/index'

const styles = new Styles({
  modalContainer: `
    border-radius: 8px;
    min-height: auto;
    max-height: 80vh;
    overflow: scroll;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.9) 100%);

    ${mq.md} {
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
    }
  `,
  field: `
    height: 48px;
    margin: 16px 0;
    padding: 16px;
    border: 1px solid #f5f5f5;
  `,
  header: `
    background: white;
    padding: 16px 32px;
    margin-bottom: 16px;
  `,
  container: `
    padding: 16px;
  `,
  empty: `
    background: white;
    border-radius: 8px;
    border-radius: 8px;;
    display: flex;
    height: 200px;
    align-items: center;
    justify-content: center;
  `,
  list: `
    min-height: 200px;

    li {
      margin-bottom: 8px;
    }
  `,
  card: `
    background: white;
    border-radius: 8px;;
    border: 1px solid #f1f1f1;
    display: block;
    padding: 16px;
    color: ${colors.fontColor};

    h2 {
      font-size: 14px;
    }

    .body {
      margin: 8px 0;
    }

    .footer {
      display: flex;
    }

    p {
      font-size: 10px;
    }

  `,
  category: `
    display: flex;

    li {
      margin-right: 4px;
    }

    li:after {
      content: ','
    }
    li:last-child:after {
      content: ''
    }
  `,
  tag: `
    display: flex;
    margin-left: 8px;
    font-weight: normal;
    font-style: italic;

    li {
      margin-right: 4px;
    }

    li:before {
      content: '#';
    }
  `
}).style

const Header = () => (
  <h2 css={styles.header}>{i18next.t('labels.search-posts')}</h2>
)

export const showForm = () =>
  Modal.show({
    header: <Header />,
    content: <SearchForm />,
    containerStyle: styles.modalContainer
  })

const inputRef = React.createRef()
const SearchForm = () => {
  const [, setQuery] = useState('')
  const [result, setResult] = useState<any>()

  const onChange = useCallback(
    async (text: string) => {
      setQuery(text)
      if (text.length < 1) {
        return
      }
      const res = await search(text)

      setResult(res)
    },
    [setResult]
  )

  const onChangeThrottled = useMemo(() => throttle(onChange, 1500), [onChange])

  return (
    <div css={styles.container}>
      <SearchField
        initialFocus
        containerStyle={styles.field}
        onChange={onChangeThrottled}
      />
      <ul css={styles.list}>
        {result && result.hits.length > 0 ? (
          result.hits.map((article: any) => {
            const {
              title,
              excerpt,
              language,
              frontmatter: { categoryLabels, createdAt, slug, tagLabels }
            } = article
            return (
              <li key={article.id}>
                <Link css={styles.card} to={postShowPath(slug, language)}>
                  <p>{createdAt.slice(0, 10)}</p>
                  <h2>{title}</h2>
                  <p className="footer">
                    {categoryLabels.length && (
                      <ul css={styles.category}>
                        {categoryLabels.map((label: string) => {
                          return (
                            <li className="category" key={label}>
                              {label}
                            </li>
                          )
                        })}
                      </ul>
                    )}
                    <ul css={styles.tag}>
                      {tagLabels.map((label: string) => {
                        return (
                          <li className="tag" key={label}>
                            {label}
                          </li>
                        )
                      })}
                    </ul>
                  </p>
                  <p className="body">{excerpt.slice(0, 200) + '...'}</p>
                </Link>
              </li>
            )
          })
        ) : (
          <li css={styles.empty}>
            <p>No recent search</p>
          </li>
        )}
      </ul>
    </div>
  )
}

export default SearchForm
