import React from 'react';
import {isStrictProduction} from '../../lib/env';

class Adsense extends React.Component {
  componentDidMount() {
    if (window) (window.adsbygoogle = window.adsbygoogle || []).push({});
  }
  render() {
    return <div>{this.props.component}</div>;
  }
}

const ampResponsive = `
  <amp-ad
      width="100vw"
  height=320
  type="adsense"
  data-ad-client="ca-pub-6597797627874207"
    data-ad-slot="6422152371"
      data-auto-format="rspv"
        data-full-width>
          <div overflow></div> </amp-ad> `;

const AmpAd = () => <div dangerouslySetInnerHTML={{__html: ampResponsive}} />;

const Rect = () => {
  return (
    <ins
      className="adsbygoogle"
      style={{display: 'inline-block', width: '300px', height: '250px'}}
      data-ad-client="ca-pub-6597797627874207"
      data-ad-slot="3503777421"
    />
  );
};

const InArticle = () => {
  return (
    <ins
      className="adsbygoogle"
      style={{display: 'block', 'text-align': 'center'}}
      data-ad-layout="in-article"
      data-ad-format="fluid"
      data-ad-client="ca-pub-6597797627874207"
      data-ad-slot="7002669777"
    />
  );
};

const RectMock = () => <div className="ad-rect-mock" />;
const RectAMPMock = () => (
  <div className="adsense">
    <div className="ad-rect-mock ampad" />
  </div>
);
const InArticleMock = () => <div className="ad-in-article-mock" />;
const InArticleAMPMock = () => <div className="ad-in-article-mock ampad" />;

const AdRect = () =>
  isStrictProduction ? (
    <Adsense component={<Rect />} />
  ) : (
    <Adsense component={<RectMock />} />
  );

export const AdInArticle = ({amp}) => {
  if (!isStrictProduction) {
    return <Adsense component={<InArticleMock />} />;
  }
  if (amp) {
    return isStrictProduction ? (
      <AmpAd />
    ) : (
      <Adsense comopnent={<InArticleAMPMock />} />
    );
  }
  return <Adsense component={<InArticle />} />;
};

export const AdDoubleRect = ({amp}) => {
  if (amp) {
    return isStrictProduction ? <AmpAd /> : <RectAMPMock />;
  }
  return (
    <div className="adsense adsence-double-rect" style={{display: 'flex'}}>
      <div>
        <AdRect />
      </div>
      <div className="hide-on-small-and-down">
        <AdRect />
      </div>
    </div>
  );
};
