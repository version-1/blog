const defaults = {
  image: {
    width: 640,
    height: 475,
    layout: "responsive"
  }
}

const inheritAttribute = (image, ampImage) => {
  return Object.keys(image.attributes).map(key => {
    const attribute = image.attributes[key];
    ampImage.setAttribute(attribute.name, attribute.value);
    return attribute.name;
  });
};

const applyInlineSize = (ampImage, inheritedAttributes) => {
  Object.keys(defaults.image).forEach(key => {
    if (inheritedAttributes.indexOf(key) === -1) {
      ampImage.setAttribute(key, defaults.image[key]);
    }
  })
}

export const ampify = html => {
  const parser = new DOMParser();
  const dom = parser.parseFromString(html, 'text/html');
  const images = [].slice.call(dom.getElementsByTagName('img'));
  images.forEach(image => {
    const isGif = image.src.indexOf('.gif') > -1;
    const ampTag = isGif ? 'amp-anim' : 'amp-img';
    const ampImage = dom.createElement(ampTag);
    const inheritedAttributes = inheritAttribute(image, ampImage);
    applyInlineSize(ampImage, inheritedAttributes);
    image.parentNode.replaceChild(ampImage, image);
  });
  return dom.body.innerHTML;
};
