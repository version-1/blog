---
templateKey: blog-post
title: サーバーエンジニアがデザインを勉強してみた。HTML5・CSS3モダンコーディング
slug: /2017/07/03/server-enginner-learn-design
createdAt: 2017-07-03 21:47:02
updatedAt: 2018-08-26 11:51:57
thumbnail: /2017/07/20170703_server-enginner-learn-design/thumbnail.png
categories:
  - column
---

&nbsp;

&nbsp;

普段仕事では
サーバーサイドエンジニア
をやっていますが、
趣味で自分でもアプリケーションなんかを
作ります。

&nbsp;

もちろん、
htmlやcssの最低限の知識とかはあって、
簡単なレイアウトくらいなできます。

が・・・

なぜか自分でサイトをデザインすると
すごい野暮ったいというか
イケてないデザインになります。

&nbsp;

<div class="after-intro"></div>

という訳で本を買って勉強しました。

<a href="http://amzn.to/2tHWHET">HTML5/CSS3モダンコーディング フロントエンドエンジニアが教える3つの本格レイアウト スタンダード・グリッド・シングルページレイアウトの作り方 (WEB Engineer’s Books)</a>

&nbsp;

まだまだイケてるデザイン
とまではいかないものの
この本のサンプルを写経したら
ちょっと垢抜けたデザインができるようになりました！！

&nbsp;

&nbsp;

個人的にかなり感激です。
ここに成果を記しておきます。
<img class="post-image" src="https://statics.ver-1-0.net/uploads/2017/07/20170703_server-enginner-learn-design/screencapture-file-Users-admin-prototype-index-html-1499079551933-844x1024.png" alt="screencapture-file-Users-admin-prototype-index-html-1499079551933-844x1024.png"/>

&nbsp;

そんな訳で結論から言うと、
すごい為になりました！！

と言うことでオススメします。

どうでしょう？？
個人的にかなり進歩したと思いますが (^ ^;)

&nbsp;

&nbsp;
<h2 class="chapter">実例を使ってモダンなデザインを体感できる</h2>
本書は、
以下３つのレイアウトのパターンを
<ul>
 	<li>スタンダードレイアウト・・・ブログなどでよくある。ヘッダー・サイドバー・メインコンテンツのレイアウト</li>
 	<li>グリッドレイアウト・・・画面のサイズにより表示されるカラムの数が変わるレスポンシブなレイアウト</li>
 	<li>シングルページレイアウト・・・個人のポートフォリオサイトや商用のランディングページで見られる一枚構成のレイアウト</li>
</ul>
サンプルとして
コーディングを進めながら
解説をはさみ進んでいきます。

本書全体を通して、
読むだけではあまり身にならないので、
実際に自分でコードを打って見て、
都度表示を確認しながら読み進めて行くというのが
一番身になるかと思います。

&nbsp;

&nbsp;

以下は本書での気づきを記しておきます。
<h2 class="chapter">リセットcssを利用する。</h2>
&nbsp;

お恥ずかしい話知らなかったのですが、
htmlにはデフォルトのスタイルが指定してあるようで、
一行のcssでも装飾されていないhtmlがある程度見やすく
表示されるようになっているいるようです。

しかし、
実際にcssでコーディングして行く時にこれらのデフォルトのスタイル指定
が邪魔になる時があります。

&nbsp;

&nbsp;

h1タグは文字サイズが大きくて太字pタグの上下には必ずパディングが入るなどなど。

そのため、現場でよく使われるのが
リセットCSSと呼ばれるものでこれらの
デフォルトのスタイルをリセットする機能を持っています。

実際は自分でどのリセットCSSを使うかなど
決める必要がありますが
本書では、webサイトからダウンロードしたものを使用して
スタイルしていきます。

&nbsp;

確かに言われてみれば、
h1タグとか、pとかいちいちスタイルを打ち消す
属性を渡すの面倒臭いですよね。

上にも書いたようにリセットCSSをあらかじめ読み込んでいれば
これらの手間が省けます。

&nbsp;

&nbsp;
<h2 class="chapter">html要素にフォントのサイズを指定する。</h2>
&nbsp;

次にhtml要素のフォントサイズを指定するですが、
これが今まで自分のデザインした
（デザインと言うとかっこ良さげですが）
サイトが野暮ったくなる一番の理由だったのでは
と思っています。

&nbsp;

HTMLのデフォルトでは
文字サイズは通常皆が見ているサイトより大分大きく設定
されています。

そんな中でそのままの文字サイズで
サイトをデザインしようとするとかなり
文字が大きくなり、
野暮ったいサイトができ上がります。

&nbsp;

&nbsp;

しかし、
html要素に
次のように指定すると
サイト全体のフォントサイズが
ちょうど良い感じになります。
```css
html {
  font-size: 62.5%;
}

```
ぜひお試しください。

&nbsp;

&nbsp;
<h2 class="chapter">配色パターンを意識する。</h2>
&nbsp;

&nbsp;

直接本の中に書かれている訳ではないのですが、
自分がこの本を
読んで実践（先ほど見せた成果のサイトです。）した
際に気づいたことです。

&nbsp;

&nbsp;

なんか自分が色選ぶとちぐはぐに
なるよなというのは常日頃感じていて
「何か基本を外しているのだろうな」
と言う思いにかられていました。

しょうがないの検索をかけてみると
こんなサイトが見つかりました。

<a href="http://colorhunt.co/">http://colorhunt.co/</a>

ここでは様々な色の組み合わせが紹介
されているので、
自分の使いたい配色パターンを選んで
サイトに反映させてみると
実にしっくり来ると思います。

&nbsp;

&nbsp;
<h2 class="chapter">まとめ</h2>
&nbsp;

&nbsp;

以上、
自分の気づきをまとめてみました。
本当にお世辞抜きでこの本きっかけで
垢抜けたサイトが作ることが
できるようになったと思います。

今までサーバサイドばかり触っていたけれど、
俺も！私も！フロントとかデザインとか
勉強してイケてるアプリ作りたい！！
とか言う人の最初のきっかけにはとても良い本だと思います。

オススメです。

&nbsp;

&nbsp;

<div class="cstmreba"><div class="booklink-box"><div class="booklink-image"><a href="http://www.amazon.co.jp/exec/obidos/asin/4798141577/llg01-22/" target="_blank" rel="nofollow" ><img src="https://images-fe.ssl-images-amazon.com/images/I/51R4sqEpwAL._SL320_.jpg" style="border: none;" /></a></div><div class="booklink-info"><div class="booklink-name"><a href="http://www.amazon.co.jp/exec/obidos/asin/4798141577/llg01-22/" target="_blank" rel="nofollow" >HTML5/CSS3モダンコーディング フロントエンドエンジニアが教える3つの本格レイアウト スタンダード・グリッド・シングルページレイアウトの作り方 (WEB Engineer’s Books)</a><div class="booklink-powered-date">posted with <a href="https://yomereba.com" rel="nofollow" target="_blank">ヨメレバ</a></div></div><div class="booklink-detail">吉田 真麻 翔泳社 2015-11-03    </div><div class="booklink-link2"><div class="shoplinkamazon"><a href="http://www.amazon.co.jp/exec/obidos/asin/4798141577/llg01-22/" target="_blank" rel="nofollow" >Amazonで購入</a></div><div class="shoplinkkindle"><a href="http://www.amazon.co.jp/exec/obidos/ASIN/B0176GNY26/llg01-22/" target="_blank" rel="nofollow" >Kindleで購入</a></div><div class="shoplinkrakuten"><a href="https://hb.afl.rakuten.co.jp/hgc/163854b7.d97e8d5b.163854b8.3c41ae34/?pc=http%3A%2F%2Fbooks.rakuten.co.jp%2Frb%2F13401310%2F%3Fscid%3Daf_ich_link_urltxt%26m%3Dhttp%3A%2F%2Fm.rakuten.co.jp%2Fev%2Fbook%2F" target="_blank" rel="nofollow" >楽天ブックスで購入</a></div><div class="shoplinkseven"><a href="https://px.a8.net/svt/ejp?a8mat=2TXHHI+FDP7OQ+2N1Y+BW8O2&a8ejpredirect=http%3A%2F%2F7af-ent.omni7.jp%2Frelay%2Faffiliate%2FentranceProcess.do%3Furl%3Dhttp%253A%252F%252F7net.omni7.jp%252Fsearch%252F%253FsearchKeywordFlg%253D1%2526keyword%253D4-79-814157-2%252520%25257C%2525204-798-14157-2%252520%25257C%2525204-7981-4157-2%252520%25257C%2525204-79814-157-2%252520%25257C%2525204-798141-57-2%252520%25257C%2525204-7981415-7-2" target="_blank" rel="nofollow" >7netで購入</a><img border="0" width="1" height="1" src="https://www17.a8.net/0.gif?a8mat=2TXHHI+FDP7OQ+2N1Y+BW8O2" alt=""></div>            	  	  	  	</div></div><div class="booklink-footer"></div></div></div>
&nbsp;
