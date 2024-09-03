import React, { useContext, useState, useCallback, useMemo } from 'react'
import { Link } from 'gatsby'
import { blog } from 'lib/routes'
import throttle from 'lodash/throttle'
import { instance as i18next } from 'lib/i18next'
import { search } from 'services/algolia'
import Styles from 'lib/styles'
import { mq, colors } from 'constants/index'
import SearchField from '../molecules/searchField'
import Modal, { context as modalContext } from '../organisms/modal'
import Category from '../atoms/category'
import Icon from '../atoms/icon'
import { AlgoriaIcon } from '../atoms/specialIcon'

const styles = new Styles({
  modalContainer: `
    border-radius: 8px;
    min-height: auto;
    max-height: 80vh;
    overflow: scroll;
    background: linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0.8) 100%);

    ${mq.md} {
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      max-height: 100vh;
    }
  `,
  field: `
    height: 48px;
    margin-bottom: 16px;
    padding: 16px;
    border: 1px solid #f5f5f5;
    box-shadow: 0 0 10px 0px #5a4e7920;
  `,
  header: `
    padding: 8px;
    padding-bottom: 16px;
    font-size: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  container: `
    padding: 16px;
  `,
  empty: `
    background: white;
    box-shadow: 0 0 10px 0px #5a4e7920;
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
    box-shadow: 0 0 10px 0px #5a4e7920;
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
    align-items: baseline;

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
    align-items: baseline;
    font-size: 10px;
    font-weight: normal;
    font-style: italic;

    li {
      margin-right: 4px;
    }

    li:before {
      content: '#';
    }
  `,
  close: `
    margin-right: 8px;
    cursor: pointer;
  `,
  footer: `
    padding: 0px 16px;
    display: flex;
    justify-content: flex-end;
  `
}).style

const Header = () => {
  const { actions } = useContext(modalContext)

  return (
    <div className={styles.header}>
      <h2 className={styles.header}>{i18next.t('labels.search-posts')}</h2>
      <div className={styles.close}>
        <Icon icon="close" onClick={actions.hide} />
      </div>
    </div>
  )
}

const Footer = () => {
  return (
    <div className={styles.footer}>
      <AlgoriaIcon />
    </div>
  )
}

export const showForm = () =>
  Modal.show({
    header: <Header />,
    footer: <Footer />,
    content: <SearchForm />,
    containerStyle: styles.modalContainer
  })

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
    <div className={styles.container}>
      <SearchField
        initialFocus
        containerStyle={styles.field}
        onChange={onChangeThrottled}
      />
      <ul className={styles.list}>
        {result && result.hits.length > 0 ? (
          result.hits.map((article: any) => {
            const {
              title,
              excerpt,
              language,
              frontmatter: { categories, createdAt, slug, tagLabels }
            } = article
            return (
              <li key={article.id}>
                <Link
                  className={styles.card}
                  to={blog.postShowPath(slug, language)}
                >
                  <p>{createdAt.slice(0, 10)}</p>
                  <h2>{title}</h2>
                  <p className="footer">
                    {categories?.length && (
                      <ul className={styles.category}>
                        {categories.map((category: string) => {
                          return (
                            <li className="category" key={category}>
                              <Category
                                category={category}
                                language={language}
                              />
                            </li>
                          )
                        })}
                      </ul>
                    )}
                  </p>
                  <p className="body">{excerpt.slice(0, 200) + '...'}</p>
                  <ul className={styles.tag}>
                    {tagLabels.map((label: string) => {
                      return (
                        <li className="tag" key={label}>
                          {label}
                        </li>
                      )
                    })}
                  </ul>
                </Link>
              </li>
            )
          })
        ) : (
          <li className={styles.empty}>
            <p>No recent search</p>
          </li>
        )}
      </ul>
    </div>
  )
}

export default SearchForm
