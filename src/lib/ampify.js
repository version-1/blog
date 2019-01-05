const defaults = {
  image: {
    width: 640,
    height: 475,
    layout: 'responsive',
  },
  video: {
    height: 475,
    layout: 'fixed-height',
  },
};

const convert = (dom, beforeTagName, afterTagName, callback) => {
  const eles = [].slice.call(dom.getElementsByTagName(beforeTagName));
  eles.forEach(ele => {
    if (callback) {
      return ele.parentNode.replaceChild(callback(ele), ele);
    }
    const ampEle = dom.createElement(afterTagName);
    inheritAttribute(ele, ampEle);
    ele.parentNode.replaceChild(ampEle, ele);
  });
}

const inheritAttribute = (ele, newEle) => {
  return Object.keys(ele.attributes).map(key => {
    const attribute = ele.attributes[key];
    newEle.setAttribute(attribute.name, attribute.value);
    return attribute.name;
  });
};

const applyInlineSize = (layout = {} ) => (ele, attributes) => {
  Object.keys(layout).forEach(key => {
    if (attributes.indexOf(key) === -1) {
      ele.setAttribute(key, layout[key]);
    }
  });
};
export const ampify = html => {
  const parser = new DOMParser();
  const dom = parser.parseFromString(html, 'text/html');

  convert(dom, 'image', null, (image) => {
    const isGif = image.src.indexOf('.gif') > -1;
    const ampTag = isGif ? 'amp-anim' : 'amp-img';
    const ampImage = dom.createElement(ampTag);
    const inheritedAttributes = inheritAttribute(image, ampImage);
    applyInlineSize(defaults.image)(ampImage, inheritedAttributes);
    return ampImage;
  });
  convert(dom, 'iframe', 'amp-iframe');
  convert(dom, 'video', 'amp-video', (video) => {
    const ampVideo = dom.createElement('amp-video');
    const inheritedAttributes = inheritAttribute(video, ampVideo);
    applyInlineSize(defaults.video)(ampVideo, inheritedAttributes);
    return ampVideo;
  });

  return dom.body.innerHTML;
};
