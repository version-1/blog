---
templateKey: blog-post
title: WordPressの記事をTwitter投稿するときにサムネイルが表示さるようにした。| Twitter Cards
slug: 2017/08/27/twitter-cards
description: &nbsp;

&nbsp;

一人でも多くの人に
このサイトに訪れていただけるように
時々リンクをtwitterで呟くのですが、
<h3></h3>
<h3>自分のtweetだけなぜかサムネイルが表示されない・・・</h3>
&nbsp;

ということで少し調べて、
サムネイルが表示されるようにしました。
(早速いいねいただけました！！）

&nbsp;

<img class="alignnone size-full wp-image-581" src="http://ver-1-0.net/wp-content/uploads/2017/08/スクリーンシ
createdAt: 2017-08-27 16:26:42
updatedAt: 2018-08-26 11:44:04
thumbnail: http://ver-1-0.net/wp-content/uploads/2017/06/19cb5fd445481b1337387866670d094f_s.jpg
categories: 
  - engineering
  - for-beginner
---

&nbsp;

&nbsp;

一人でも多くの人に
このサイトに訪れていただけるように
時々リンクをtwitterで呟くのですが、
<h3></h3>
<h3>自分のtweetだけなぜかサムネイルが表示されない・・・</h3>
&nbsp;

ということで少し調べて、
サムネイルが表示されるようにしました。
(早速いいねいただけました！！）

&nbsp;

<img class="alignnone size-full wp-image-581" src="http://ver-1-0.net/wp-content/uploads/2017/08/スクリーンショット-2017-08-27-15.46.57.png" alt="tweeterCards" width="648" height="527" />
[after_intro]
<h2 class="chapter">Twitter Cardsというのをやるとどうやら表示されるらしい</h2>
&nbsp;

&nbsp;

題名の通り
Twitter Cards
というのを導入すると
写真や動画などのリッチメディアを
ツイートに添付してウェブサイトへのトラフィックを
促進できるそうです。

まー、上にあるようにLINEとかでお店のリンクとか
投稿すると画像のサムネイルも合わせて自動で表示されますよね？

あれと同じで、
サイトのサムネイルを表示してユーザの興味を引けるというやつです。

では、
早速導入していきましょう。

&nbsp;
<h2 class="chapter">早速Twitter Cards導入</h2>
導入については
<a href="http://wispyon.com/facebook-ogp-twittercards/">http://wispyon.com/facebook-ogp-twittercards/</a>
こちらを参考にしました。

上のリンクのページ最後のコードを
wordpressのー＞「外観」ー＞「テーマの編集」ー＞header.phpを編集で、
headタグの中に書いて保存してあげればOkです。

ちなみに、
こういう記載がありますが今回は関係ないので消しました。
<pre><code class="languaga-markup">&lt;meta property='fb:admins' content='【上で取得したfb:adminsの15桁ID】'&gt;
&lt;meta property='article:publisher' content='【FacebookページがあればそのURL】' /&gt;</code></pre>
あと、descriptionのところで
<pre><code class="languaga-markup">&lt;meta property='og:description' content='&lt;?php echo mb_substr(get_the_excerpt(), 0, 100) ?&gt;'&gt;</code></pre>
こういうのがあったのですが
私のサイトですと関連記事の部分が
descriptionに埋め込まれる感じになってしまったので、
get_the_excerpt()を$post-&gt;$post_contentに変えました。

導入はこれで以上です。
次は確認をしましょう。

&nbsp;
<h2 class="chapter">ちゃんとTwitterCardsでサムネイルが表示されるか確認</h2>
&nbsp;

<a href="https://cards-dev.twitter.com/validator">Card validator</a>

どういうように投稿されるかは
上のリンクで事前に確認できます。

表示させたいページのURLを画面左側のテキストボックスに
貼り付けてPreview Cardを押しましょう。

エラーが出ていなければOKです。

<img class="alignnone size-large wp-image-582" src="http://ver-1-0.net/wp-content/uploads/2017/08/スクリーンショット-2017-08-27-16.19.49-1024x553.png" alt="CardsValidator" width="700" height="378" />

