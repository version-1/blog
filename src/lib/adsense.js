import {isStrictProduction} from '../lib/env';

const ampResponsive = `
<amp-ad
  width="100vw"
  height=320
  type="adsense"
  data-ad-client="ca-pub-6597797627874207"
  data-ad-slot="6422152371"
  data-auto-format="rspv"
  data-full-width>
  <div overflow></div>
</amp-ad>
`;
const rect = `
<!-- ads-rect-300 -->
<ins class="adsbygoogle"
     style="display:inline-block;width:300px;height:250px"
     data-ad-client="ca-pub-6597797627874207"
     data-ad-slot="3503777421"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>
`;

const doubleRect = `
<div class="flex">
<div>${rect}</div>
<div class="hide-on-small-and-down">${rect}</div>
</div>
`;

const inArticle = `
<ins class="adsbygoogle"
     style="display:block; text-align:center;"
     data-ad-layout="in-article"
     data-ad-format="fluid"
     data-ad-client="ca-pub-6597797627874207"
     data-ad-slot="7002669777"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
`;

const doubleRectMock = `
<div class="flex">
<div class="ad-rect-mock"></div>
<div class="ad-rect-mock" hide-on-small-and-down"></div>
</div>
`;
const doubleRectAMPMock = `
<div class="flex ampad">
<div class="ad-rect-mock"></div>
<div class="ad-rect-mock" hide-on-small-and-down"></div>
</div>
`;

const inArticleMock = `<div class="ad-in-article-mock"></div>`;
const inArticleAMPMock = `<div class="ad-in-article-mock ampad"></div>`;

const parser = typeof DOMParser !== 'undefined' && new DOMParser();

const insertAdsense = ad => html => {
  if (!parser) return html;
  const dom = parser.parseFromString(html, 'text/html');
  const eles = [].slice.call(dom.querySelectorAll('.adsense'));
  if (eles) {
    eles.map(ele => (ele.innerHTML = ad));
  }
  return dom.body.innerHTML;
};

export const insertInArticle = amp => {
  if (amp) {
    return isStrictProduction
      ? insertAdsense(ampResponsive)
      : insertAdsense(inArticleAMPMock);
  }
  return isStrictProduction
    ? insertAdsense(inArticle)
    : insertAdsense(inArticleMock);
};

export const insertDoubleRect = amp => {
  if (amp) {
    return isStrictProduction
      ? insertAdsense(ampResponsive)
      : insertAdsense(doubleRectAMPMock);
  }
  return isStrictProduction
    ? insertAdsense(doubleRect)
    : insertAdsense(doubleRectMock);
};
