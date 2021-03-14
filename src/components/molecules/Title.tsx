import React from 'react'
import { instance } from 'lib/i18next'

const Title = (props: any) => {
  const title = props.title || instance.t(props.label)
  const className = 'square square-' + props.color
  return (
    <div className="section-title">
      <span className={className}></span>
      <span className="square square-"></span>
      <h3 className="title">{title}</h3>
      <span className="square square-"></span>
      <span className="square square-"></span>
    </div>
  )
}

export default React.memo(Title)
