---
templateKey: blog-post
title: webpackでnormalize.cssを読み込む方法
slug: 2017/10/24/webpack-normalize-css
description: &nbsp;

今回は、
<strong>webpack</strong>で<strong>normalize.css</strong>を読み込む方法を紹介します。

<strong>webpack</strong>とはなんぞやや
<strong>normalize.css</strong>とはなんぞやということは他のサイト
の説明に譲るとして、
この記事ではとりあえず、
<strong>normalize.css</strong>を
読み込むというところを第一目標にして書いていきます。

[adsense_double_rect]

&nbsp;
<h2 clas
createdAt: 2017-10-24 12:08:38
updatedAt: 2018-01-30 23:18:05
thumbnail: http://ver-1-0.net/wp-content/uploads/2017/10/925815.jpg
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

[adsense_double_rect]

&nbsp;
<h2 class="chapter">早速環境準備 - WebPack,CSSLoarder,StyleLoaderをインストール</h2>
&nbsp;

&nbsp;

サンプル用のプロジェクトを作成
+
<strong>webpack</strong>と<strong>style-loader</strong>、<strong>css-loader</strong>をインストール
<pre><code>mkdir webpack-normalize-demo
cd webpack-normalize-demo &amp;&amp; npm init -y
</code></pre>
&nbsp;
&nbsp;
<pre><code>
npm i -D webpack style-loader css-loader
</code></pre>
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
<pre><code>module.exports = {
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
</code></pre>
&nbsp;
&nbsp;
&nbsp;
<h2 class="chapter">normalize.cssをnpmでインストール</h2>
&nbsp;

&nbsp;

<strong>normalize.css</strong>もnpmでインストールできてしまうので
インストールしましょう。
<pre><code>npm i -D normalize.css
</code></pre>
&nbsp;

あとは、
エントリポイントに
index.js
<pre><code>echo "import 'normalize.css'" &gt; index.js
</code></pre>
&nbsp;

と記載すれば、
normalize.cssがバンドルされた、bundle.jsができるので、
それをpublic/index.htmlなどで
読み込めば合わせて、normalize.cssも読み込めます。
publick/index.html
<pre><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
  &lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;Demo&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;div id="root"&gt;&lt;/div&gt;
    &lt;script type="text/javascript" src="./bundle.js"&gt;&lt;/script&gt;
  &lt;/body&gt;
&lt;/html&gt;

</code></pre>
以上です。
&nbsp;
&nbsp;
&nbsp;
[adsense_double_rect]
