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
    if (this.props.amp) {
      return (
        <amp-img
          width={defaults.image.width}
          height={defaults.image.height}
          layout={defaults.image.layout}
          {...this.props}
        />
      );
    }

    if (this.props.gatsbyImage) {
      return <Img fluid={this.props.fluid} alt={this.props.title} />;
    }
    return <img {...this.props} />;
  }
}
