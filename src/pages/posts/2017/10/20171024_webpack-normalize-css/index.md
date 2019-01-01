---
templateKey: blog-post
title: webpackでnormalize.cssを読み込む方法
slug: /2017/10/24/webpack-normalize-css
createdAt: 2017-10-24 12:08:38
updatedAt: 2018-01-30 23:18:05
thumbnail: /2017/10/20171024_webpack-normalize-css/thumbnail.jpg
categories: 
  - engineering
  - design
---

&nbsp;

今回は、
<strong>webpack</strong>で<strong>normalize.css</strong>を読み込む方法を紹介します。

<strong>webpack</strong>とはなんぞやや
<strong>normalize.css</strong>とはなんぞやということは他のサイト
の説明に譲るとして、
この記事ではとりあえず、
<strong>normalize.css</strong>を
読み込むというところを第一目標にして書いていきます。

<div class="adsense-double-rect"></div>

&nbsp;
<h2 class="chapter">早速環境準備 - WebPack,CSSLoarder,StyleLoaderをインストール</h2>
&nbsp;

&nbsp;

サンプル用のプロジェクトを作成
+
<strong>webpack</strong>と<strong>style-loader</strong>、<strong>css-loader</strong>をインストール
```
mkdir webpack-normalize-demo
cd webpack-normalize-demo &amp;&amp; npm init -y

```
&nbsp;
&nbsp;
```
npm i -D webpack style-loader css-loader

```
&nbsp;

&nbsp;

cssを読み込むにはwebpackに加えて、
style-loader、css-loaderというモジュールが必要なので、
合わせてインストールします。

&nbsp;

&nbsp;

インストール後
webpack.config.jsにも設定を記述します。
（webpack.config.jsは自分で作成します）
```
module.exports = {
  entry: `./index.js`,
  output : {
    path     : `${__dirname}/`,
    filename : 'bundle.js'
  },
  module : {
    rules : [
      {
        test: /\.css/,
        loaders: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {url: false}
          }
        ]
      },
    ]
  }
};

```
&nbsp;
&nbsp;
&nbsp;
<h2 class="chapter">normalize.cssをnpmでインストール</h2>
&nbsp;

&nbsp;

<strong>normalize.css</strong>もnpmでインストールできてしまうので
インストールしましょう。
```
npm i -D normalize.css

```
&nbsp;

あとは、
エントリポイントに
index.js
```
echo "import 'normalize.css'" > index.js

```
&nbsp;

と記載すれば、
normalize.cssがバンドルされた、bundle.jsができるので、
それをpublic/index.htmlなどで
読み込めば合わせて、normalize.cssも読み込めます。
publick/index.html
```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Demo</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="text/javascript" src="./bundle.js"></script>
  </body>
</html>


```
以上です。
&nbsp;
&nbsp;
&nbsp;
<div class="adsense-double-rect"></div>
