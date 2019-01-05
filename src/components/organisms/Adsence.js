import React from 'react';
import { isProduction } from '../../lib/env'

class Adsence extends React.Component {
  componentDidMount() {
    if (window) (window.adsbygoogle = window.adsbygoogle || []).push({});
  }
  render() {
    return <div>{this.props.component}</div>;
  }
}

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
const InArticleMock = () => <div className="ad-in-article-mock" />;

const AdRect = () =>
  isProduction ? (
    <Adsence component={<Rect />} />
  ) : (
    <Adsence component={<RectMock />} />
  );

export const AdInArticle = () =>
  isProduction ? (
    <Adsence component={<InArticle />} />
  ) : (
    <Adsence component={<InArticleMock />} />
  );

export const AdDoubleRect = () => {
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
