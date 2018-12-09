---
templateKey: blog-post
title: Google Analyticsの情報で人気記事を表示するWordpressプラグインを作ってみた。Google Analytics POP Posts
slug: 2017/11/17/google-analytics-pop-posts
description: <h2 class="chapter">他のWordPressプラグインだと自分のアクセスも含まれてしまう気がした</h2>
&nbsp;

これまではPopular Postsというプラグインを
使って当ブログの人気記事の一覧を表示していました。

そして、
ある日なんとなくどういうデータを基に
人気記事を表示しているのか
調べてみました。

その一貫でデーターベースをみてみると、
投稿のIDとなにやら表示数をカウントしているかの
ようなテーブルがあるのを
発見しました。

<strong>「これって、自分のアクセスも含まれるんじゃね？」</strong>

createdAt: 2017-11-17 19:08:16
updatedAt: 2017-12-22 20:32:22
thumbnail: https://ver-1-0.net/wp-content/uploads/2017/11/edho-pratama-152392.png
categories: 
  - engineering
  - rails
---

<h2 class="chapter">他のWordPressプラグインだと自分のアクセスも含まれてしまう気がした</h2>
&nbsp;

これまではPopular Postsというプラグインを
使って当ブログの人気記事の一覧を表示していました。

そして、
ある日なんとなくどういうデータを基に
人気記事を表示しているのか
調べてみました。

その一貫でデーターベースをみてみると、
投稿のIDとなにやら表示数をカウントしているかの
ようなテーブルがあるのを
発見しました。

<strong>「これって、自分のアクセスも含まれるんじゃね？」</strong>

<strong>「GoogleAnalyticsのものとだいぶランキングが違う・・」</strong>

普段自分のPCからのアクセスは、
アクセス数にカウントしないように設定を行なっているのですが、
wordpressのプラグインで自動でカウントされてしまうと
なると困ったものです。

※細かい挙動は追っていないので、
実際どのようにカウントしているかなどの
本当のところは不明です。

少なくとも、
<strong>GoogleAnalyticsとプラグインのランキングがずれてしまっている</strong>ことは確かで、

<strong>「GoogleAnalyticsのランキングをそのまま表示したい・・・」</strong>
という欲望がふつふつと湧いてきました。

&nbsp;

[after_intro]

&nbsp;
<h2 class="chapter">他同じようなプラグインあるでしょ？</h2>
&nbsp;

ここで、
湧いてくる疑問が
<strong>「同じようなのあるでしょ？」</strong>
というものです。

なかなかシステム開発を妨げる
重要な問いですが、
確かに同じようなものもあるかと思います。

私もいくつか調べて、

こちらや
<a href="https://www.tam-tam.co.jp/tipsnote/cms/post11104.html">【WordPress】サーバ負荷が軽い「Simple GA Ranking」プラグインで人気記事ランキングを表示する方法</a>

こちらを
<a href="https://ja.wordpress.org/plugins/ga-popular-posts/">Google Analytics Popular Posts</a>
使ってみたりしました。

が何かが違う、
私がのやり方が悪いのかエラーが出たり、
私がみているGAのサマリーと結果が異なっていたりと

<strong>「俺がみているこのサマリーを自動で表示するようにしたいんだ！」</strong>

となったので、
自作してみました。

インストール方法はこちらに書いたいので、
よければ使ってみてください。
<a href="https://ver-1-0.net/how-to-install-google-analytics-pop-posts/">[ WordPress プラグイン ] Google Analytics POP Postsのインストール手順</a>

<strong>
※留意事項※
Wordpress.orgにプラグインとして申請中ではありますが、
まだ審査には通過しておりませんので、ご留意ください。
通過次第当ブログでお伝えすると思います。
※留意事項※
</strong>

&nbsp;

[mid_article]

&nbsp;
<h2 class="chapter">プラグインの特徴について</h2>
&nbsp;

プラグインはシンプルです。

最初だけ、<a href="https://developers.google.com/analytics/devguides/reporting/core/v4/?hl=ja">Google Analytics Report API v4</a>の設定が必要ですが、
あとは他のプラグインと同じように、
サイドバーの設定画面からGoogle Analytics POP Posts
を選択して、
直近何日をランキングの評価対象にするか
と
上位何記事を表示するか
を設定してウィジェットに追加するだけです。

当ブログでも利用しています。
<a href="https://ver-1-0.net/2017/11/17/google-analytics-pop-posts/%e4%ba%ba%e6%b0%97%e8%a8%98%e4%ba%8b/" rel="attachment wp-att-1317"><img class="alignnone size-full wp-image-1317" src="https://ver-1-0.net/wp-content/uploads/2017/11/人気記事.jpg" alt="Google Analytics POP Posts の使用例" width="358" height="500" /></a>

&nbsp;

また、
<strong>他のプラグインですとデータベースに表示回数などを</strong>
<strong> 保存したりする関係で重くなりがち</strong>なのですが、
こちらは直接Google Analyticsのデータを参照しているので、
軽い作りになっています。

今のところ表示の自由度みたいな部分は
少ないので、
そこらへんを追加できたりすると良いのかもしれないです。

&nbsp;

&nbsp;

ひとまずは、
早く審査を通過して欲しいのですが、
どれくらいかかるのか・・・。はたまた通るのか？
<h2 class="chapter">まとめ</h2>
&nbsp;

今回Wordpressのプラグインを自作しましたが、
<strong>プラグインにするだけならそこまで難しくない</strong>と思います。

作り方はここを参考にしました。
<a href="https://wpdocs.osdn.jp/%E3%83%97%E3%83%A9%E3%82%B0%E3%82%A4%E3%83%B3%E3%81%AE%E4%BD%9C%E6%88%90" target="_blank" rel="noopener">プラグインの作成 - WordPress Codex 日本語版</a>

今回のプラグインでいうとコアの
人気な記事を取得する部分を作って、
設定画面を作って、という感じの流れでしたね。

今のところあまりこの
プラグインに不満はないのですが、
今後気が向いたら拡張しても良いかなぁなど
考えております。

もし、こういう機能が欲しいなどあれば知りたいですね。

以上です！！

[after_intro]
