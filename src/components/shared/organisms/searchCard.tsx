import React from 'react'
import Styles from 'lib/styles'
import { instance as i18next } from 'lib/i18next'
import SearchField from '../molecules/searchField'
import { showForm } from './searchForm'
import { mq } from 'constants/index'

const styles = new Styles({
  container: `
    padding: 16px;
    background: linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0.61) 100%);
    border-radius: 16px;
    max-width: 496px;
    margin: 64px auto;

    h2 {
      font-size: 14px;
      letter-spacing: 0.8px;
      text-align: center;
      margin-bottom: 16px;
    }

    p {
      font-size: 12px;
      text-align: center;
    }

    ${mq.md} {
      padding: 8px;
      margin: 16px 8px;
    }
  `,
  button: `
    width: 200px;
    margin: auto;
  `,
  search: `
    width: 300px;
    margin: auto;

    ${mq.md} {
      width: 100%;
    }
  `
}).style

const SearchCard = () => {
  return (
    <div className={styles.container}>
      <h2>{i18next.t('labels.search-posts')}</h2>
      <div className={styles.body}>
        <p>{i18next.t('messages.search-posts')}</p>
        <div className={styles.search}>
          <SearchField  onFocus={showForm}/>
        </div>
      </div>
    </div>
  )
}

export default SearchCard
