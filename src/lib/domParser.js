export const parse = type => html => {
  if (type === 'jsdom') {
    const {JSDOM} = require('jsdom');
    return new JSDOM(html);
  }
  if (typeof DOMParser === 'undefined') return;
  return new DOMParser().parseFromString(html, 'text/html');
};
