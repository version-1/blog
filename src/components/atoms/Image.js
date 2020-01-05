import React from 'react';
import Img from 'gatsby-image';

const defaults = {
  image: {
    width: 640,
    height: 475,
    layout: 'responsive',
  },
};
export default class Image extends React.PureComponent {
  render() {
    const {amp, gatsbyImage, gatsbyType} = this.props;
    if (amp) {
      return (
        <amp-img
          width={this.props.width || defaults.image.width}
          height={this.props.height || defaults.image.height}
          layout={this.props.layout || defaults.image.layout}
          src={this.props.src}
          alt={this.props.alt}
          className={this.props.className}
        />
      );
    }

    if (gatsbyImage) {
      if (gatsbyType === 'fluid') {
        return <Img fluid={this.props.fluid} alt={this.props.alt} />;
      }
      if (gatsbyType === 'fixed') {
        return <Img fluid={this.props.fixed} alt={this.props.alt} />;
      }
    }
    return <img alt={this.props.alt} {...this.props} />;
  }
}
