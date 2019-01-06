import React, {Fragment} from 'react';
import {renderToString} from 'react-dom/server';
import {JSDOM} from 'jsdom';
import * as minimatch from 'minimatch';

const ampBoilerplate = `body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}`;
const ampNoscriptBoilerplate = `body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}`;

const isAMP = pathname => pathname.match(/\/amp$/);

// export const onPreRenderHTML = ({
//   getHeadComponents,
//   replaceHeadComponents,
//   getPreBodyComponents,
//   replacePreBodyComponents,
//   getPostBodyComponents,
//   replacePostBodyComponents,
//   pathname,
// }) => {
//   const head = getHeadComponents();
//   if (!isAMP(pathname)) {
//     const href = [meta.siteUrl, pathname, '/amp'].join('');
//     replaceHeadComponents([<link rel="amphtml" href={href} />, ...head]);
//     return;
//   }
//   replaceHeadComponents([
//     <meta
//       name="viewport"
//       content="width=device-width,minimum-scale=1,initial-scale=1"
//     />,
//     <style
//       amp-boilerplate=""
//       dangerouslySetInnerHTML={{__html: ampBoilerplate}}
//     />,
//     <noscript>
//       <style
//         amp-boilerplate=""
//         dangerouslySetInnerHTML={{__html: ampNoscriptBoilerplate}}
//       />
//     </noscript>,
//     ...head,
//   ]);
// };
//
// export const replaceRenderer = ({
//   bodyComponent,
//   replaceBodyHTMLString,
//   setHeadComponents,
//   pathname,
// }) => {
//   if (!isAMP(pathname)) return;
//   const isAmp = pathname.indexOf(pathIdentifier) > -1;
//   if (isAmp) {
//     const bodyHTML = renderToString(bodyComponent);
//     const dom = new JSDOM(bodyHTML);
//     const _dom = ampify(dom)
//     const document = _dom.window.document;
//
//     replaceBodyHTMLString(document.documentElement.outerHTML);
//   }
// };
