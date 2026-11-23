import React from 'react'
import { Link } from 'gatsby'
import { blog } from 'lib/routes'
import Styles from 'lib/styles'
import Modal from '../organisms/modal'
import Icon from '../atoms/icon'
import { colors, mq } from 'constants/index'

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
      max-height: initial;
      height: 100vh;
    }
  `,
  header: `
    background: white;
    padding: 16px 32px;
    margin-bottom: 16px;
    border-bottom: 1px solid #f0f0f0;
    display: flex;
    justify-content: flex-end;

    ${mq.md} {
      margin-bottom: 0;
    }
  `,
  container: `
    li {
      padding: 16px;
      color: ${colors.fontColor};
      background: white;
      border-bottom: 1px solid #f0f0f0;
    }

    a {
      color: ${colors.fontColor};
    }
  `
}).style

const Header = () => (
  <div className={styles.header}>
    <Icon icon="close" onClick={Modal.hide}/>
  </div>
)

export const showForm = (language: Lang) =>
  Modal.show({
    header: <Header />,
    content: (
      <div className={styles.container}>
        <ul>
          <li>
            <Link to={blog.rootPath(language)}>Top</Link>
          </li>
          <li>
            <Link to={blog.aboutPath(language)}>About</Link>
          </li>
          <li>
            <Link to={blog.categoryPath('engineering', language)}>Programming</Link>
          </li>
          <li>
            <Link to={blog.categoryPath('freelance', language)}>Career</Link>
          </li>
          <li>
            <Link to={blog.categoryPath('column', language)}>Column</Link>
          </li>
        </ul>
      </div>
    ),
    containerStyle: styles.modalContainer
  })
