import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import Styles from 'lib/styles'
import { GatsbyImage, getImage, StaticImage } from 'gatsby-plugin-image'
import { aboutPath } from 'lib/routes'
import { instance as i18next } from 'lib/i18next'
import Title from 'components/molecules/Title'
import { colors } from 'constants/index'

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

const styles = new Styles({
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

interface Props {
  language: Lang

}

const Promotion: React.VFC<Props> = () => {
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
    <section css={styles.section}>
      <div css={styles.header}>
        <Title label="labels.sidebar.promotion" />
      </div>
      <div css={styles.body}>
        <ul>
          {promotions.map((promotion: any) => {
            const image = getImage(data[promotion.thumbnail].gatsbyImageData)
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
  )
}

export default Promotion
