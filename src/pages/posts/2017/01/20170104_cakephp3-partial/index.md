---
templateKey: blog-post
title: CakePHP3 テンプレートを共通化。CakePHP部分テンプレート
slug: /2017/01/04/cakephp3-partial
createdAt: 2017-01-04 23:47:57
updatedAt: 2018-08-26 12:49:31
thumbnail: /2017/01/20170104_cakephp3-partial/thumbnail.png
categories:
  - engineering
  - rails
tags:
  - dummy
---

Rails のようにCakePHPでもViewの共通化ができないか
調べた。

その結果。見つけた。

<a href="http://improve-future.com/cakephp3-how-to-use-partial-template-like-in-rails.html">http://improve-future.com/cakephp3-how-to-use-partial-template-like-in-rails.html</a>

<div class="adsense"></div>

&nbsp;
<h2>共通テンプレートをTemplate/Elementに切り出し</h2>
共通化したい部分のビューを
Template/Element配下に~.ctpとして配置。
CakePHP2では、View/Elementだったそう。

そして、本チャンのテンプレートから呼び出し
```bash
$this->element('search_firm',[ 'result' => $result_org); ?>

```
上の書き方だと
部分テンプレートでは $resultとして変数の値を引き継げる。

どこからでもテンプレートが呼び出せて便利。
検索フォームなどで使えるかも
あとは表組みなど。
