import React, { createContext, useEffect, useState } from 'react'
import { colors } from 'constants/index'
import Styles from 'lib/styles'

const style = new Styles({
  header: `
  `,
  content: ``,
  footer: `
    height: 60px;
  `,
  container: `
    opacity: 1;
    background: ${colors.white};
    position: fixed;
    top: 10%;
    left: 20%;
    width: 60%;
    z-index: 1000;
    transition: all 0.3s;
  `,
  overlay: `
    opacity: 1;
    background: #cccccc40;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 999;
  `,
  hidden: `
    opacity: 0;
    z-index: -1;
  `
}).style

interface ContentProps {
  header?: JSX.Element
  content?: JSX.Element
  footer?: JSX.Element
  containerStyle?: any
}

interface StaticMethods {
  show: (props?: ContentProps) => void
  hide: () => void
}

export const context = createContext<any>({
  state: {
    show: false,
    contents: [] as JSX.Element[],
    header: <></>,
    footer: <></>
  }
})

const Modal: React.FC<any> & StaticMethods = () => {
  const [show, setShow] = useState(false)
  const [contents, setContents] = useState<JSX.Element[]>([])
  const [header, setHeader] = useState<JSX.Element | undefined>()
  const [footer, setFooter] = useState<JSX.Element | undefined>()
  const [containerStyle, setContainerStyle] = useState<JSX.Element>()
  const [content] = contents

  useEffect(() => {
    Modal.show = (props) => {
      if (!props) {
        return
      }
      const {
        header: h,
        content: c,
        footer: f,
        containerStyle: _containerStyle
      } = props

      h && setHeader(h)
      c && setContents([...contents, c])
      f && setFooter(f)
      _containerStyle && setContainerStyle(_containerStyle)

      setShow(true)
    }

    Modal.hide = () => {
      setShow(false)
      setContents(contents.slice(0, -1))
    }
  }, [])

  return (
    <>
      <context.Provider value={{
          state: {
            show,
            contents,
            header,
            footer
          },
          actions: {
            show: Modal.show,
            hide: Modal.hide
          }
        }}
      >
      <div css={[style.container, containerStyle, show || style.hidden]}>
        <div css={style.header}>{header}</div>
        <div css={style.content}>{content}</div>
        {footer && <div css={style.footer}>{footer}</div>}
      </div>
      <div
        css={[style.overlay, show || style.hidden]}
        onClick={() => setShow(false)}
      ></div>
        </context.Provider>
    </>
  )
}

Modal.show = () => {}
Modal.hide = () => {}

export default Modal
