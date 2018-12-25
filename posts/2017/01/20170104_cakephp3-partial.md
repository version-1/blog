---
templateKey: blog-post
title: \[CakePHP3\]テンプレートを共通化。CakePHP部分テンプレート
slug: 2017/01/04/cakephp3-partial
createdAt: 2017-01-04 23:47:57
updatedAt: 2018-08-26 12:49:31
thumbnail: http://ver-1-0.net/wp-content/uploads/2017/01/スクリーンショット-2017-01-03-18.52.23.png
description: CakePHP3などのWebフレームワークではViewのコードが増えてくるとテンプレートを分けたくなってきますがそちらを解説しています。
categories:
  - engineering
  - rails
---

Rails のようにCakePHPでもViewの共通化ができないか
調べた。

その結果。見つけた。
<a href="http://improve-future.com/cakephp3-how-to-use-partial-template-like-in-rails.html">http://improve-future.com/cakephp3-how-to-use-partial-template-like-in-rails.html</a>

[after_intro]

&nbsp;
<h2>共通テンプレートをTemplate/Elementに切り出し</h2>
共通化したい部分のビューを
Template/Element配下に~.ctpとして配置。
CakePHP2では、View/Elementだったそう。

そして、本チャンのテンプレートから呼び出し
<pre><code class="language-bash">$this-&gt;element('search_firm',[ 'result' =&gt; $result_org); ?&gt;
</code></pre>
上の書き方だと
部分テンプレートでは $resultとして変数の値を引き継げる。

どこからでもテンプレートが呼び出せて便利。
検索フォームなどで使えるかも
あとは表組みなど。
