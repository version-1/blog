import React from 'react'

interface Props {
  className: string
  imageClassName: string
  url: string
  title: string
}

const Card = ({ className, imageClassName, url, title }: Props) => {
  const _className = 'card ' + className
  const _imageClassName = 'card-image ' + imageClassName
  return (
    <div className={_className}>
      <div className={_imageClassName}>
        <img src={url} alt={title} />
      </div>
      <div className="card-content related-content">
        <h3>{title}</h3>
      </div>
    </div>
  )
}

export default React.memo(Card)
