---
templateKey: blog-post
title: webpackでnormalize.cssを読み込む方法
slug: /2017/10/24/webpack-normalize-css
createdAt: 2017-10-24 12:08:38
updatedAt: 2018-01-30 23:18:05
thumbnail: /2017/10/20171024_webpack-normalize-css/thumbnail.png
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

<h2 class="chapter">早速環境準備 - WebPack,CSSLoarder,StyleLoaderをインストール</h2>

サンプル用のプロジェクトを作成
+
<strong>webpack</strong>と<strong>style-loader</strong>、<strong>css-loader</strong>をインストール

```bash
mkdir webpack-normalize-demo
cd webpack-normalize-demo && npm init -y

```

```bash
npm i -D webpack style-loader css-loader

```

cssを読み込むにはwebpackに加えて、
style-loader、css-loaderというモジュールが必要なので、
合わせてインストールします。

&nbsp;

&nbsp;

インストール後
webpack.config.jsにも設定を記述します。
（webpack.config.jsは自分で作成します）

```javascript
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
<h2 class="chapter">normalize.cssをnpmでインストール</h2>

<strong>normalize.css</strong>もnpmでインストールできてしまうので
インストールしましょう。

```bash
npm i -D normalize.css

```

あとは、
エントリポイントに
index.js

```bash
echo "import 'normalize.css'" > index.js

```

と記載すれば、

normalize.cssがバンドルされた、bundle.jsができるので、
それをpublic/index.htmlなどで
読み込めば合わせて、normalize.cssも読み込めます。

public/index.html

```markup
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
