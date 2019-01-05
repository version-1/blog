import React from 'react';
import Helmet from 'react-helmet';

const boilerPlate =
  'body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}';
const boilerPlateNoScript =
  '<style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style>';

export const AMPHead = ({amp, baseUrl}) => {
  if (!amp) return <noscript />;
  return (
    <Helmet htmlAttributes={{amp: true}}>
      <meta
        name="viewport"
        content="width=device-width,minimum-scale=1,initial-scale=1"
      />
      <style amp-boilerplate>{boilerPlate}</style>
      <noscript dangerouslySetInnerHTML={{__html: boilerPlateNoScript}} />
      <script async src="https://cdn.ampproject.org/v0.js" />
      <script async custom-element="amp-video" src="https://cdn.ampproject.org/v0/amp-video-0.1.js"></script>
      <script async custom-element="amp-iframe" src="https://cdn.ampproject.org/v0/amp-iframe-0.1.js"></script>
      <script async custom-element="amp-ad" src="https://cdn.ampproject.org/v0/amp-ad-0.1.js"></script>
    </Helmet>
  );
};

export const AMPHtmlLink = ({url}) => {
  const amphtml = url + '/amp';
  return (
    <Helmet>
      <link rel="amphtml" href={amphtml} />
    </Helmet>
  );
};
