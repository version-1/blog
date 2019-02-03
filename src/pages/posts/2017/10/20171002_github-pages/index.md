---
templateKey: blog-post
title: GitHub Pagesが便利。簡単にwebアプリのデモを公開するならオススメ
slug: /2017/10/02/github-pages
createdAt: 2017-10-02 19:44:09
updatedAt: 2018-10-19 23:42:49
thumbnail: /2017/10/20171002_github-pages/thumbnail.jpg
categories:
  - engineering
  - for-beginner
tags:
  - dummy
---

どうも、近所に中華屋さんしかなくて栄養が偏りがちな
<a href="https://twitter.com/version1_2017">@version1</a>です。

昔からなんかあるな〜とは思っていたのですが、前回の記事

<a href="https://ver-1-0.net/2017/10/01/japanese-action/">日本地図を地方ごとにアクションを分ける〜クリッカブルマップ〜</a>

を書いている時に使ってみて、
**GitHub Pages便利！！**
となりました。

<a href="https://pages.github.com/">GitHub Pages | Websites for you and your projects, hosted directly ..</a>

ので、紹介して行きます。

<h2 class="chapter">GitにPushするだけでwebページを公開できる。</h2>

このGitHubを使うと、
<strong>Webアプリ</strong>の<strong>デモの公開</strong>が
GitPushするだけでできてしまいます。


前回の日本地図の記事でも
デモを公開していますが、

&nbsp;

GitPushしたあとにRepositoryで設定を行うと
このようにすぐwebページを公開できます。

&nbsp;
`http://{your account name}.github.io/{repository name}`

例）
<a href="https://version-1.github.io/imagemap/">https://version-1.github.io/imagemap/</a>

<div class="adsense"></div>

<h2 class="chapter">Git Pagesの設定方法</h2>

1.適当なwebページ用のリポジトリを作成
(もちろんPush )

<img class="post-image" src="https://statics.ver-1-0.net/uploads/2017/10/20171002_github-pages/setting1.png" alt="setting"/>


2.リポジトリの「Settings」のページに
行き、Sourceのところでmaster branchを選択する。

<img class="post-image" src="https://statics.ver-1-0.net/uploads/2017/10/20171002_github-pages/setting2.png" alt="setting"/>


3.master branch を選択しSAVEを押した所で、
「 Your site is published at {url}」
のように表示されたらOK。

<img class="post-image" src="https://statics.ver-1-0.net/uploads/2017/10/20171002_github-pages/setting3.png" alt="setting"/>


ページが作成されるまで、一定の時間がかかるので、しばらく待ってからアクセスすると

リポジトリのindex.htmlが開かれて
自分のwebページが表示されます。

<h2 class="chapter">まとめ</h2>

以上、
GitHup Pagesだと本当に設定いらずでページ公開できます。

さすがにPHPやRubyなどサーバ側でもプログラムを動かす動的なページの作成は難しいですが、

html,css,javascriptあたりのデモであれば
簡単に公開することができます。

もっというと、他のツールも併用するとブログなどもできてしまうようです。
<a href="https://liginc.co.jp/web/programming/server/104594">https://liginc.co.jp/web/programming/server/104594</a>

以上、です。

