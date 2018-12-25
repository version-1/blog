---
templateKey: blog-post
title: whyから始めよう
slug: /2018/02/04/action-report-4
createdAt: 2018-02-04 10:34:48
updatedAt: 2018-10-11 23:57:44
thumbnail: ./thumbnail.jpg
categories: 
  - freelance
---

<h2 id="toc_id_1">振り返りの目的</h2>
&nbsp;

・自分の活動状況を公開してフリーランスの生活を可視化する。
・良いことがあったらドヤする。
・一年スパン、三ヶ月スパンでの目標の確認及び達成度合いの確認。
・自分のための進捗確認。ロギング。

&nbsp;

<div class="after-intro"></div>

&nbsp;
<h2>今週の作業</h2>
&nbsp;
<ul>
 	<li>別でやっているサイトの修正・記事執筆など</li>
 	<li>月末の請求書をMFクラウドのAPI使って作れるようにしてみた</li>
 	<li>個人開発のサービスを進めた</li>
</ul>
&nbsp;
<h3>毎月作成する請求書をMFクラウドのAPI使って作れるようにしてみた</h3>
&nbsp;

個人事業の事務処理をなるべく自動化したいななんて考えて、MFクラウドのAPIを使って自動で請求書を作成・ダウンロードできるようにしました。

が、<strong>APIはOAuth認証でhttpsのサイトへのコールバックが必要な</strong>ので、ローカルでお手軽にというわけには行きませんでした。。（ローカルでもhttpsとかの環境つくればいけんのかな？）

結局1日くらいかけて、請求書出せるようにしましたが、あんまりコスパはよくない気がしています。（omniauth依存していたので、OAuthを自前でやるという経験はつめたかも）

この作業中に自分用の業務ツールサイトみたいなものを作ったので、この他に作業の自動化に際してhttpsとかが必要になってきたりしたら役にたつかもしれませんね。

&nbsp;
<h3>個人開発のサービスについて</h3>
&nbsp;

2018年の目標として、ちゃんと作り込んだWebサービス出したいよね。というのがあるので年末くらいからしこしこ作りはじめています。

やはり週4日の常駐作業などもあり、進捗は思わしくないですがバックエンドでコツコツ進めています。

&nbsp;

コンセプトは<strong>「小規模プロジェクトのSNS化」</strong>です。

色々な表現はあるのですが、<strong>個人で進めているプロジェクトってフィードバックがほしかったり、協力者が欲しかったりしますよね。</strong>

ここにあげるのは「プロジェクト」ていうかっちりしたものでなく雑多なものでも良いのですが、個々人が抱えているタスクやプロジェクトをネット上に公開して、協力者を募ったり、コメントをもらったりできる場が作れればなんて気がしています。

「会社ではコード書いているけど、なんかプライベートで開発したいなぁ」って感じた時にこのサイトにアイデアを投稿してみたり、面白そうなプロジェクトにコンタクトとってみたりとかできると良いななんて思いながら作っています。

リリース時期等は現状未定ですが、こんなの作っています。ということで

&nbsp;
<h2>今週の本 | Whyから始めよ</h2>
Webサービス作ろうと思った時にどうやってユーザを集めようかな？そもそもどういうサービスを作ろうかな？なんて考えますよね。

そんななあなたにこの本はいかがでしょう？

&nbsp;
<div class="cstmreba">
<div class="booklink-box">
<div class="booklink-image"><a href="http://www.amazon.co.jp/exec/obidos/asin/4532317673/llg01-22/" target="_blank" rel="noopener"><img style="border: none;" src="https://images-fe.ssl-images-amazon.com/images/I/415TYu5cQ4L._SL320_.jpg" /></a></div>
<div class="booklink-info">
<div class="booklink-name">

<a href="http://www.amazon.co.jp/exec/obidos/asin/4532317673/llg01-22/" target="_blank" rel="noopener">ＷＨＹから始めよ！―インスパイア型リーダーはここが違う</a>
<div class="booklink-powered-date">posted with <a href="https://yomereba.com" target="_blank" rel="nofollow noopener">ヨメレバ</a></div>
</div>
<div class="booklink-detail">サイモン・シネック 日本経済新聞出版社 2012-01-25</div>
<div class="booklink-link2">
<div class="shoplinkamazon"><a href="http://www.amazon.co.jp/exec/obidos/asin/4532317673/llg01-22/" target="_blank" rel="noopener">Amazon</a></div>
<div class="shoplinkkindle"><a href="http://www.amazon.co.jp/gp/search?keywords=%82v%82g%82x%82%A9%82%E7%8En%82%DF%82%E6%81I%81%5C%83C%83%93%83X%83p%83C%83A%8C%5E%83%8A%81%5B%83_%81%5B%82%CD%82%B1%82%B1%82%AA%88%E1%82%A4&amp;__mk_ja_JP=%83J%83%5E%83J%83i&amp;url=node%3D2275256051&amp;tag=llg01-22" target="_blank" rel="noopener">Kindle</a></div>
<div class="shoplinkrakuten"><a href="https://hb.afl.rakuten.co.jp/hgc/163854b7.d97e8d5b.163854b8.3c41ae34/?pc=http%3A%2F%2Fbooks.rakuten.co.jp%2Frb%2F11466366%2F%3Fscid%3Daf_ich_link_urltxt%26m%3Dhttp%3A%2F%2Fm.rakuten.co.jp%2Fev%2Fbook%2F" target="_blank" rel="noopener">楽天ブックス</a></div>
<div class="shoplinkseven"><a href="https://px.a8.net/svt/ejp?a8mat=2TXHHI+FDP7OQ+2N1Y+BW8O2&amp;a8ejpredirect=http%3A%2F%2F7af-ent.omni7.jp%2Frelay%2Faffiliate%2FentranceProcess.do%3Furl%3Dhttp%253A%252F%252F7net.omni7.jp%252Fsearch%252F%253FsearchKeywordFlg%253D1%2526keyword%253D4-53-231767-6%252520%25257C%2525204-532-31767-6%252520%25257C%2525204-5323-1767-6%252520%25257C%2525204-53231-767-6%252520%25257C%2525204-532317-67-6%252520%25257C%2525204-5323176-7-6" target="_blank" rel="noopener">7net</a><img src="https://www17.a8.net/0.gif?a8mat=2TXHHI+FDP7OQ+2N1Y+BW8O2" alt="" width="1" height="1" border="0" /></div>
</div>
</div>
<div class="booklink-footer"></div>
</div>
</div>
&nbsp;

TED Talkでのプレゼンテーションが話題となったマーケティング・コンサルタントのサイモンシネックさんの書籍になります。
<a href="https://www.ted.com/talks/simon_sinek_how_great_leaders_inspire_action/transcript?language=ja">優れたリーダーはどうやって行動を促すか</a>

&nbsp;

「我々のすることは全て世界を変えるという信念で行なっています」

「違う考え方に価値があると信じています」

「私たちが世界を変える手段は美しくデザインされ、簡単に使えて親しみやすいデザインです。」

「こうして素晴らしいコンピュータが出来上がりました」

&nbsp;

と説明されるとなんだかものすごいコンピュータを作った感じがしますし、ちょっと見てみたい！！使ってみたい！！ってなりますよね。

これはTEDのプレゼンで用いられた例なのですが、

サイモン氏は優れたリーダーはこの<strong>WHY-HOW-WHAT</strong>の順番で語ることで人を動かしたり、優れた製品を生み出してきているということを発見し、それを<strong>ゴールデンサークル</strong>という理論として形式化しました。

この例に即した悪い例は「我々のコンピュータは素晴らしく美しいデザインで簡単に使え、ユーザーフレンリーです」というようなものです。

これだと全然欲しい感じしないですよね。

「なぜ作るのか」というWhyの部分を語れるとより自信のWebサービスやサイトの魅力を伝えられるようになるかもしれません。

&nbsp;

&nbsp;

[after_article]
