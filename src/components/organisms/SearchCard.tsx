import React from 'react'
import { Link } from 'gatsby'
import Styles from 'lib/styles'
import { instance as i18next } from 'lib/i18next'
import { colors } from 'constants/index'
import SearchField from 'components/molecules/SearchField'
import Button from 'components/atoms/Button'

const styles = new Styles({
  container: `
    padding: 16px;
    background: linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0.61) 100%);
    border-radius: 16px;
    max-width: 496px;
    margin: 64px auto;

    h2 {
      text-align: center;
      margin-bottom: 16px;
    }
    p {
      text-align: center;
    }
  `,
  button: `
    width: 200px;
    margin: auto;
  `,
  search: `
    width: 300px;
    margin: auto;
  `
}).style

const SearchCard = () => {
  return (
    <div css={styles.container}>
      <h2>{i18next.t('labels.search-posts')}</h2>
      <div css={styles.body}>
        <p>{i18next.t('messages.search-posts')}</p>
        <div css={styles.search}>
          <SearchField />
        </div>
        <div css={styles.button}>
          <Button variant="primary">{i18next.t('labels.search')}</Button>
        </div>
      </div>
    </div>
  )
}

export default SearchCard
