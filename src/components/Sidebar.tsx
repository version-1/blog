import React from 'react'
import { Link } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import ArchiveByMonth from 'components/organisms/ArchiveByMonth'
import { tagPath, categoryPath, aboutPath } from 'lib/routes'
import { instance as i18next } from 'lib/i18next'
import TagCloud from 'components/molecules/TagCloud'
import Title from 'components/molecules/Title'

const Profile = () => {
  return (
    <StaticImage
      src="../assets/images/profile.png"
      alt="profile"
      width={64}
      height={64}
      layout="fixed"
    />
  )
}

const displayCategories = (language: Lang) => [
  categoryPath('engineering', language),
  categoryPath('react', language),
  categoryPath('freelance', language),
  tagPath('gadget', language),
  tagPath('english', language),
  categoryPath('design', language),
  categoryPath('column', language)
]

const Sidebar = (props: any) => {
  const {
    language,
    layout: { archiveByMonth, tags }
  } = props

  return (
    <div className="sidebar">
      <section className="section">
        <Title color="skyblue" label="labels.sidebar.profile-title" />
        <div className="self-introduction">
          <div className="profile-image">
            <Profile />
          </div>
          <div className="introduction">
            {i18next.t('labels.sidebar.profile-description')}
            <p>
              <Link to={aboutPath(language)}>
                {i18next.t('labels.sidebar.profile-link')}
              </Link>
            </p>
          </div>
        </div>
      </section>
      <section className="section">
        <Title color="skyblue" label="labels.sidebar.categories" />
        <div className="sidebar-categories">
          <ul className="sidebar-categories-list">
            {displayCategories(language).map((category) => {
              const key = category.replace(/\//g, '.').slice(1)
              const _key = language === 'ja' ? key : key.replace('en.', '')
              return (
                <li key={_key} className="sidebar-categories-item">
                  <Link className="sidebar-categories-item-link" to={category}>
                    {i18next.t(_key)}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </section>
      <section className="section">
        <Title color="skyblue" label="labels.sidebar.tags" />
        <TagCloud language={language} tags={tags} />
      </section>
      <section className="section">
        <ArchiveByMonth language={language} items={archiveByMonth} />
      </section>
    </div>
  )
}

export default Sidebar
