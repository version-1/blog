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
  iframe: {
    width: 640,
    height: 475,
    layout: 'responsive'
  }
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
};

const allowAttributes = {
  img: ['height', 'src', 'alt', 'width', 'layout', 'attribution', 'srcset'],
  iframe: ['height', 'src', 'alt', 'width', 'layout', 'attribution', 'srcset', 'scrolling'],
};

const inheritAttribute = (ele, newEle) => {
  return Object.keys(ele.attributes)
    .map(key => {
      const attribute = ele.attributes[key];
      const allows = allowAttributes[ele.tagName];
      if (attribute.name && (!allows || allows.includes(attribute.name))) {
        newEle.setAttribute(attribute.name, attribute.value);
      }
      return attribute.name;
    })
    .filter(item => !!item);
};

const applyInlineSize = (layout = {}) => (ele, attributes) => {
  let _attributes = [...attributes]
  if (attributes.includes('width') && attributes.includes('height')){
    ele.setAttribute('layout', 'fixed');
    _attributes = [..._attributes, 'layout']
  }
  Object.keys(layout).forEach(key => {
    if (key && !_attributes.includes(key)) {
      ele.setAttribute(key, layout[key]);
    }
  });
};

export const ampify = dom => {
  convert(dom, 'img', null, image => {
    const isGif = image.src && image.src.indexOf('.gif') > -1;
    const ampTag = isGif ? 'amp-anim' : 'amp-img';
    const ampImage = dom.createElement(ampTag);
    const inheritedAttributes = inheritAttribute(image, ampImage);
    applyInlineSize(defaults.image)(ampImage, inheritedAttributes);
    return ampImage;
  });
  convert(dom, 'iframe', 'amp-iframe', iframe => {
    const ampIframe = dom.createElement('amp-iframe');
    const inheritedAttributes = inheritAttribute(iframe, ampIframe);
    applyInlineSize(defaults.iframe)(ampIframe, inheritedAttributes);
    return ampIframe;
  });
  convert(dom, 'video', 'amp-video', video => {
    const ampVideo = dom.createElement('amp-video');
    const inheritedAttributes = inheritAttribute(video, ampVideo);
    applyInlineSize(defaults.video)(ampVideo, inheritedAttributes);
    return ampVideo;
  });

  return dom;
};
