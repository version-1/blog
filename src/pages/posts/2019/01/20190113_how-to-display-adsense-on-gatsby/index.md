---
templateKey: blog-post
language: ja
title: GatsbyおよびReactでのAdsense設置方法。
slug: /2019/01/13/how-to-display-adsense-on-gatsby
createdAt: 2019-01-13 11:30:35
updatedAt: 2019-01-13 11:30:35
thumbnail: /2019/01/20190113_how-to-display-adsense-on-gatsby/thumbnail.png
categories:
  - engineering
  - react
tags:
  - marketing
  - gatsby
  - react
  - frontend
related:
  - dummy
---

当サイトではアドセンスを設置していたのですが、
Wordpressからの移行に際してReactでアドセンスを設置することに
なったので、
Reactでのアドセンスの設置方法をまとめておきます。

Gatsbyの場合、記事外はReactコンポーネントで表現できますが、
記事内はマークダウンなのでレンダリング時(ビルド時)にadsenseを埋め込む形にしています。


<div class="adsense"></div>


## 記事外の設置


記事外に設置する場合は、
もともとのアドセンスのコードが以下だとすると


```html
<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<!-- レスポンシブ広告2 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="XXXX"
     data-ad-slot="XXXX"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>
```


adsbygoogle.jsは他のレイアウトテンプレート内で読み込んでおくとして、
最終的には以下のように、


```html
<scrip>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>
```

このscriptタグの部分とinsタグの部分を分割して、
(htmlタグはjsxに変換しています。）

```jsx
class Adsense extends React.Component {
  componentDidMount() {
    if (window) (window.adsbygoogle = window.adsbygoogle || []).push({});
  }
  render() {
    return <div>{this.props.component}</div>;
  }
}

const Rectangle = () => {
  return (
    <ins
      className="adsbygoogle"
      style={{display: 'inline-block', width: '300px', height: '250px'}}
      data-ad-client="XXXX"
      data-ad-slot="XXXX"
    />
  );
};

const AdsenseRectangle = () => <Adsense component={<Rectangle/>}/>

export default AdsenseRectangle

```

のようにします。

Gatsbyでは、ビルド時にwindowが空でビルドされるので、
componentDidmount内で叩くのが望ましいです。

```javascript
 (window.adsbygoogle = window.adsbygoogle || []).push({})
```

またAdsense広告も種類(AMP広告だったり、記事内広告だったり)
があるのですがwindowの部分は変わらないので
それぞれ中身だけ変えられるようにAdsenseという名前の親コンポーネントを作り、
そこに中身をpropsとして与えるように作っています。


## 記事内の設置

記事内の設置はGatsby内部だとMarkdownがhtmlに変換されてコンポーネントに渡されてくるので、
htmlを書き換える形で実現しています。

記事内のMarkdownに特定のセレクタをもったdiv要素を仕込んでおき、
そこにadsenseのタグを挿入する感じでアドセンスを設置しています。


コードで書くと以下のような形です。

```javascript
const parser = typeof DOMParser !== 'undefined' && new DOMParser();

export const insertAdsense = ad => html => {
  if (!parser) return html;
  const dom = parser.parseFromString(html, 'text/html');
  const eles = [].slice.call(dom.querySelectorAll('.adsense'));
  if (eles) {
    eles.map(ele => (ele.innerHTML = ad));
  }
  return dom.body.innerHTML;
};

```

記事の中身を表示するコンポーネントで

`insertAdsense([アドセンスのコード])(html)`

のように呼び出してあげるとコードが挿入された形のhtmlが返却されます。

コードの中身は、先ほどあげたアドセンスのコードのadsbygoogle.jsの部分を
抜いたものを渡します。
こちらもAMP広告かどうかなど中身が変わるのでアドセンスのコードを
外から渡す形にしています。


## まとめ


これらを自分で実装した時は、windowの部分やDOMParserの部分でつまずきました。
develop環境では特にこれらを考慮しなくても動くのですが、実際にビルドしようとした時にこけます。

windowとかDOMParserが使えるかどうかはwebpackのビルドモードに関係しているっぽいです。

https://webpack.js.org/concepts/targets/


