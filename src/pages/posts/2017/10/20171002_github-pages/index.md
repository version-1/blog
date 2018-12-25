---
templateKey: blog-post
title: GitHub Pagesが便利。簡単にwebアプリのデモを公開するならオススメ
slug: /2017/10/02/github-pages
createdAt: 2017-10-02 19:44:09
updatedAt: 2018-10-19 23:42:49
thumbnail: ./thumbnail.jpg
categories: 
  - engineering
  - for-beginner
---

&nbsp;

&nbsp;

&nbsp;

どうも、
近所に中華屋さんしかなくて
栄養が偏りがちな
<a href="https://twitter.com/version1_2017">@version1</a>です。

&nbsp;


昔から
なんかあるな〜とは
思っていたのですが、
前回の記事
<a href="https://ver-1-0.net/2017/10/01/japanese-action/">日本地図を地方ごとにアクションを分ける〜クリッカブルマップ〜</a>

を書いている時に使ってみて、
<h2>GitHub Pages便利！！</h2>
となりました。
<a href="https://pages.github.com/">GitHub Pages | Websites for you and your projects, hosted directly ..</a>

ので、
紹介して行きます。

&nbsp;
<h2 class="chapter">GitにPushするだけでwebページを公開できる。</h2>
&nbsp;

&nbsp;

このGitHubを使うと、
<strong>Webアプリ</strong>の<strong>デモの公開</strong>が
GitPushするだけでできてしまいます。

&nbsp;

&nbsp;

前回の日本地図の記事でも
デモを公開していますが、

&nbsp;

GitPushしたあとにRepositoryで設定を行うと
このようにすぐwebページを公開できます。

&nbsp;
<blockquote>http://{your account name}.github.io/{repository name}</blockquote>
例）
<a href="https://version-1.github.io/imagemap/">https://version-1.github.io/imagemap/</a>

<div class="after-intro"></div>

&nbsp;

&nbsp;
<h2 class="chapter">Git Pagesの設定方法</h2>
&nbsp;

&nbsp;

1.適当なwebページ用のリポジトリを作成
(もちろんPush )

<img class="post-image" src="./Screen-Shot-2017-10-02-at-19.46.02-1024x465.png" alt="Screen-Shot-2017-10-02-at-19.46.02-1024x465.png"/>

&nbsp;

2.リポジトリの「Settings」のページに
行き、Sourceのところでmaster branchを選択する。

<img class="post-image" src="./Screen-Shot-2017-10-02-at-19.46.29-1024x567.png" alt="Screen-Shot-2017-10-02-at-19.46.29-1024x567.png"/>

&nbsp;

3.master branch を選択しSAVEを押した所で、
「 Your site is published at {url}」
のように表示されたらOK。

<img class="post-image" src="./Screen-Shot-2017-10-02-at-19.46.42-1024x711.png" alt="Screen-Shot-2017-10-02-at-19.46.42-1024x711.png"/>

&nbsp;

ページが作成されるまで、
一定の時間がかかるので、
しばらく待ってからアクセスすると

リポジトリのindex.htmlが開かれて
自分のwebページが表示されます。

&nbsp;

&nbsp;
<h2 class="chapter">まとめ</h2>
&nbsp;

&nbsp;

以上、
GitHup Pagesだと
本当に設定いらずでページ公開できます。

&nbsp;

&nbsp;

さずがにPHPやRubyなどサーバ側でも
プログラムを動かす動的なページ
の作成は難しいですが、

&nbsp;

&nbsp;

html,css,javascriptあたりのデモであれば
簡単に公開することができます。

&nbsp;

&nbsp;

もっというと、
他のツールも併用するとブログなどもできてしまうようです。
<a href="https://liginc.co.jp/web/programming/server/104594">https://liginc.co.jp/web/programming/server/104594</a>

以上、です。

&nbsp;
