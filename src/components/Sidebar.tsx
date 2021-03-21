import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import Styles from 'lib/styles'
import { GatsbyImage, getImage, StaticImage } from 'gatsby-plugin-image'
import { aboutPath } from 'lib/routes'
import { instance as i18next } from 'lib/i18next'
import Title from 'components/molecules/Title'
import Icon from 'components/atoms/Icon'
import { colors } from 'constants/index'

const imagePath = '../assets/images'

const styles = new Styles({
  container: `
    padding-left: 32px;
    color: inherit;
  `,
  profileImage: `
    border-radius: 16px;
    color: ${colors.fontColor};
  `,
  profileTitle: `
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    padding: 0 16px;
    color: ${colors.fontColor};

    .gatsby-image-wrapper {
      margin-right: 32px;
    }

    &:hover {
      opacity: 0.6;
    }
  `,
  profileDescription: `
    padding: 0 16px;
    margin-bottom: 16px;
  `,
  profileIcons: `
    display: flex;
    align-items: center;
    justify-content: flex-end;

    li {
      margin-right: 8px;
    }
  `,
  profileFooter: `
    padding: 0 16px;
  `,
  section: `
    background: linear-gradient(90deg, rgba(242, 242, 242, 0.95) 0%, rgba(255, 255, 255, 0.7885) 100%);
    box-shadow: 4px 4px 4px 1px rgba(0, 0, 0, 0.01);
    border-radius: 8px;
    margin-bottom: 16px;
  `,
  header: `
    padding: 16px;
    background: linear-gradient(90deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.6) 69.95%, rgba(255, 255, 255, 0.6) 100%);
    box-shadow: 4px 4px 4px 1px rgba(0, 0, 0, 0.01);
    border-radius: 8px;
  `,
  body: `
    padding: 16px;
  `,
  card: `
    margin-bottom: 16px;
    padding: 16px;
    background: linear-gradient(90deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.6) 69.95%, rgba(255, 255, 255, 0.6) 100%);
    border-radius: 8px;
    display: flex;
    align-items: center;
  `,
  cardLeft: `
    padding: 8px;
    flex: 2;
    font-size: 12px;
  `,
  cardTitle: `
    margin-bottom: 8px;
  `,
  cardRight: `
    flex: 1;
  `,
  cardImage: `
    border-radius: 8px;
    width: 80px;
    height: 80px;
    margin: auto;

    .gatsby-image-wrapper {
      height: 100%;
    }

    img {
      border-radius: 8px;
      height: 100%:
    }
  `
}).style

const Profile = () => {
  return (
    <StaticImage
      css={styles.profileImage}
      src={`${imagePath}/profile.png`}
      alt="profile"
      width={32}
      height={32}
      quality={90}
      layout="fixed"
    />
  )
}

interface Props {
  language: Lang
  layout: LayoutContext
}

const promotions = [
  {
    title: i18next.t('labels.sidebar.promotions.menta.title'),
    description: i18next.t('labels.sidebar.promotions.menta.description'),
    thumbnail: 'menta',
    link: 'https://menta.work/plan/1608'
  },
  {
    title: i18next.t('labels.sidebar.promotions.techpit.title'),
    description: i18next.t('labels.sidebar.promotions.techpit.description'),
    thumbnail: 'techpit',
    link: 'https://www.techpit.jp/courses/127'
  },
  {
    title: i18next.t('labels.sidebar.promotions.egg-cutter.title'),
    description: i18next.t('labels.sidebar.promotions.egg-cutter.description'),
    thumbnail: 'eggCutter',
    link: 'https://egg-cutter.net'
  }
]

const links = [
  {
    icon: 'github',
    iconColor: '#333',
    href: 'https://github.com/version-1'
  },
  {
    icon: 'twitter',
    iconColor: '#1DA1F2',
    href: 'https://twitter.com/version1_2017'
  }
]

const Sidebar = ({ language }: Props) => {
  const data = useStaticQuery(
    graphql`
      query {
        menta: imageSharp(original: { src: { regex: "/menta-main/" } }) {
          gatsbyImageData(height: 80, quality: 90)
        }
        techpit: imageSharp(original: { src: { regex: "/no-image/" } }) {
          gatsbyImageData(height: 80, quality: 90)
        }
        eggCutter: imageSharp(
          original: { src: { regex: "/egg-cutter-thumbnail/" } }
        ) {
          gatsbyImageData(height: 80, quality: 90)
        }
      }
    `
  )

  return (
    <div css={styles.container}>
      <section css={styles.section}>
        <div css={styles.header}>
          <Title color="skyblue" label="labels.sidebar.profile-title" />
        </div>
        <div css={styles.body}>
          <div className="profile-image">
            <Link to={aboutPath(language)}>
              <div css={styles.profileTitle}>
                <Profile />
                Jiro
              </div>
            </Link>
          </div>
          <div css={styles.profileDescription} className="introduction">
            {i18next.t('labels.sidebar.profile-description')}
          </div>
          <div css={styles.profileFooter}>
            <ul css={styles.profileIcons}>
              {links.map((link: any) => {
                return (
                  <li>
                    <a href={link.href}>
                      <Icon icon={link.icon} color={link.iconColor} size={24} />
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </section>
      {language === 'ja' && (
        <section css={styles.section}>
          <div css={styles.header}>
            <Title color="skyblue" label="labels.sidebar.promotion" />
          </div>
          <div css={styles.body}>
            <ul>
              {promotions.map((promotion: any) => {
                const image = getImage(
                  data[promotion.thumbnail].gatsbyImageData
                )
                return (
                  <div css={styles.card} key={promotion.title}>
                    <div css={styles.cardLeft}>
                      <div css={styles.cardTitle}>
                        <h3>{promotion.title}</h3>
                      </div>
                      <div>
                        <p>{promotion.description}</p>
                      </div>
                    </div>
                    <div css={styles.cardRight}>
                      <div css={styles.cardImage}>
                        <GatsbyImage image={image} alt={promotion.title} />
                      </div>
                    </div>
                  </div>
                )
              })}
            </ul>
          </div>
        </section>
      )}
    </div>
  )
}

export default Sidebar
