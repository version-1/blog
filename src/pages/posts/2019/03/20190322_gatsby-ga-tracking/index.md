---
templateKey: blog-post
title: GatsbyサイトでGoogle Analyticsのトラッキングをする
slug: /2019/03/22/gatsby-ga-tracking
createdAt: 2019-03-22 21:59:11
updatedAt: 2019-03-22 21:59:11
thumbnail: /2019/03/20190322_gatsby-ga-tracking/thumbnail.png
categories:
  - engineering
tags:
  - gatsby
  - ga
related:
  - dummy
---


ちょうど今年1月に下記のような記事を書いてから2ヶ月がたち、私のGatsby運用暦も
そろそろ3ヶ月ほどにもなろうかというところです。

<div class="related-post">
  <a href="/2019/01/10/blog-renewal-by-gatsby">WordpressブログをGatsby+Netlifyでリプレースした話。</a>
</div>

そんなこんなでブログを初めてGoogle Analyticsを自分のサイトにいれているとページごとPV
とかが見れて、へぇーこの記事こんな読まれているんだーとかとかがわかるのですが人間よく深いもので
もっと自分のサイトに訪れた人の行動が知りたいとなってきます。

そんな経緯で自分のサイトにGoogle Analyticsのトラッキングをしてみようということになったので、
そこらへんについてまとめてみます。


## 自分のサイトにanalytics.jsを設置する。

ここらへんはすでに自分のサイトにGoogle Analyticsを導入している人は、設置済みだと思うのですが
トラッキングにはGoogleAnalyticsのスクリプトを読み込む必要があるのでこれは必須の作業になります。

普通にWordpressやその他のプラットフォームで運用している方はそのプラットフォームに準じた方法をとってもらえれば
良いのですが、Gatsbyの場合はこのプラグインを使ってanalyticsを読み込むことができます。

[gatsby-plugin-google-analytics](https://www.gatsbyjs.org/packages/gatsby-plugin-google-analytics/)

細かいいれ方はサイトを参照して頂ければとは思うのですが、簡単に説明すると

```
npm install --save gatsby-plugin-google-analytics
```

or

```
yarn add gatsby-plugin-google-analytics
```

といういつもの感じでライブラリを追加して、gatsby-config.jsを編集して設定してきます。
プラグインの導入はトラッキングIDの設定が必要なので下記のように設定します。

```javascript
{
  resolve: `gatsby-plugin-google-analytics`,
  options: {
    trackingId: [ Tracking ID ],
  },
},
```

注意点としてはyarn run developのように開発用の環境ではanalytics.jsは読み込まれず、
ビルドするとanalytics.jsが読み込まれるのでその点は間違ってはまらないように注意してください。


## Trackingイベントの仕込み方

今回はクリックイベントに絞って紹介しますが、analytics.jsを使ってあるボタンやリンクが押された場合に、

```javascript
ga('send', 'event', {
  eventAction: 'click',
  eventCategory: 'some category',
  eventLabel: 'some label'
});

```

このようなスクリプトを実行させることで、ユーザがクリックしたということをAnalyticsに通知して、あとあとAnalyticsのコンソールから
いつ、どのページでそのクリックイベントが発生したのか？ということが確認できるようになります。

ここで問題になるのは、このイベントの送信をどのようにサイト内に設置していくかというところです。
ECサイトのようにパーツを使いまわして、設置できるような場合であればそのコンポーネントに上のスクリプトを設置しておけば良いのですが、
ブログなどだといちいちそのパーツを持ってこないといけないので結構手間になりますし、記事内のある箇所が押されたかどうかをみたいのに、
都度上のスクリプトを埋め込むようなことはやりたくありません。


そこで、イベントの送信を効率良くサイトに設置するためにはaddEventListnerとHTMLのクラスを使って
サイト上であるクラスに対してイベント送信のイベントを設定してユーザがその要素をクリックしたら関数を実行させるようにします。

具体的なコードは以下で、下記コードをサイトのそれぞれのページで読み込ませるようにすれば準備完了です。

```javascript

// イベントを登録する用の関数
const eventRegister = ({ga, location}) => (
  selector,
  event
) => {
  document.body.querySelectorAll(selector).forEach((ele, index) => {
    ele.addEventListener(event, () => {
      const id = ele.id || 'elements-' + String(index + 1)
      const label = location.href + '#' + id;
      const eventCategory = selector.replace(/^\./, '').replace(/^#/, '')

      eventTracker(ga, ele, event, eventCategory, label);
    });
  });
};

// イベントを送信する部分
const eventTracker = (ga, ele, eventAction, eventCategory, eventLabel) => {
  const object = {
    eventAction,
    eventCategory,
    eventLabel,
  };
  ga('send', 'event', object);
};

const batchEventRegister = ({ga, location}, selectors, event) =>
  selectors.forEach(selector => eventRegister({ga, location})(selector, event))

// トラッキングするセレクタ群
const selectors = [
  'tracking-element-1',
  'tracking-element-2',
  'tracking-element-3',
  'tracking-element-4',
]

batchEventRegister(window, selectors, 'click')
```

これが設置できたら、あとは記事を書いていくと時にここのスクリプトで指定したセレクタをクリックイベントを検知したいに付与して、要素がクリックされるのを待つだけです。

トラッキングする箇所全てにイベント送信のコードを埋め込むのはさすがにほねが折れるので、こういった方法でトラッキングを楽にできるとよいかと思います。

## まとめ

以上、今回の話はGatsbyに限定されず様々なサイトで使えるテクニックだとは思いますが、Gatsbyのサイトで試したので
タイトルもそのようにしてみました。

本文ではかかなかったですが、クリックイベントと同時にSlackへの通知も飛ばすようにしておくと、自分の携帯に通知が
入るようになるのでおすすめです。頻繁にイベントが発生するとちょっと煩わしくなりますがレアなイベントをトラッキングしておくと
通知が来ただけで幸せな気持ちになれるのでおすすめです。

では。



