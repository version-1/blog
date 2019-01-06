import React, {Fragment} from 'react';
import {renderToString} from 'react-dom/server';
import {parse, serialize} from './src/lib/domParser';
import {ampify} from './src/lib/ampify';

const ampBoilerplate = `body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}`;
const ampNoscriptBoilerplate = `body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}`;

const ampPages = [/^\/20.+/, /^\/about/];

const isAMP = pathname => pathname.match(/\/amp$/);

export const onPreRenderHTML = params => {
  const {
    getHeadComponents,
    getPostBodyComponents,
    replacePostBodyComponents,
    replaceHeadComponents,
    pathname,
  } = params;
  if (!pathname) return;
  if (!isAMP(pathname)) return;
  const heads = getHeadComponents();
  const styles = heads.reduce((str, x) => {
    if (x.type === 'style') {
      str += x.props.dangerouslySetInnerHTML.__html.replace(/!important/g, '');
    }
    return str;
  }, '');
  replaceHeadComponents([
    <script async src="https://cdn.ampproject.org/v0.js" />,
    <script
      async
      custom-element="amp-iframe"
      src="https://cdn.ampproject.org/v0/amp-iframe-0.1.js"
    />,
    <style
      amp-boilerplate=""
      dangerouslySetInnerHTML={{__html: ampBoilerplate}}
    />,
    <noscript>
      <style
        amp-boilerplate=""
        dangerouslySetInnerHTML={{__html: ampNoscriptBoilerplate}}
      />
    </noscript>,
    <style amp-custom="" dangerouslySetInnerHTML={{__html: styles}} />,
    ...heads.filter(x => x.type !== 'style' && x.type !== 'script'),
  ]);
  const body = getPostBodyComponents();
  replacePostBodyComponents(body.filter(x => x.type !== 'script'));
};

export const onRenderBody = params => {
  const {pathname, setHtmlAttributes, setHeadComponents} = params;
  if (!pathname) return;
  if (!isAMP(pathname)) {
    ampPages.forEach(page => {
      if (pathname.match(page)) {
        const amphtml = [pathname, '/amp'].join('');
        setHeadComponents([<link rel="amphtml" href={amphtml} />]);
      }
    });
    return;
  }
  setHtmlAttributes({amp: ''});
};

export const replaceRenderer = params => {
  const {pathname, replaceBodyHTMLString, bodyComponent} = params;
  if (!pathname || !isAMP(pathname)) return;
  const bodyHTML = renderToString(bodyComponent);
  const dom = parse(bodyHTML);
  console.log('===========>replaceRenderHTML', pathname);
  const _dom = ampify(dom);
  const html = serialize(_dom);
  const _html = html.replace(/xmlns=\".*xhtml\"/, '');
  replaceBodyHTMLString(_html);
};
