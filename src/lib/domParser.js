export const parse = html => {
  if (typeof DOMParser === 'undefined') {
    const DOMParser = require('xmldom').DOMParser
    return new DOMParser().parseFromString(html, 'text/html')
  }
  return new DOMParser().parseFromString(html, 'text/html')
}

export const serialize = dom => {
  if (typeof XMLSerializer === 'undefined') {
    const XMLSerializer = require('xmldom').XMLSerializer
    return new XMLSerializer().serializeToString(dom)
  }
  return new XMLSerializer().serializeToString(dom)
}
