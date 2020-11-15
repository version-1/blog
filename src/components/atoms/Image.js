import React from 'react'
import Img from 'gatsby-image'
import { isProduction } from 'lib/env'

const defaults = {
  image: {
    width: 640,
    height: 475,
    layout: 'responsive'
  }
}
export default class Image extends React.PureComponent {
  render() {
    const { gatsbyImage, gatsbyType } = this.props

    if (gatsbyImage) {
      if (!isProduction) {
        return <img src={this.props.src} alt={this.props.alt} />
      }
      if (gatsbyType === 'fluid') {
        return <Img fluid={this.props.fluid} alt={this.props.alt} />
      }
      if (gatsbyType === 'fixed') {
        return <Img fixed={this.props.fixed} alt={this.props.alt} />
      }
    }
    return <img alt={this.props.alt} {...this.props} />
  }
}
