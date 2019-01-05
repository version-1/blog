---
templateKey: blog-post
title: Amazon,楽天,7netで本を紹介できるヨメレバをcssカスタマイズ
slug: /2017/12/03/yomereba
createdAt: 2017-12-03 22:40:16
updatedAt: 2018-08-26 01:02:16
thumbnail: /2017/12/20171203_yomereba/thumbnail.jpg
categories:
  - engineering
  - design
---

<h2 class="chapter">ヨメレバとは？</h2>
<div class="cstmreba">
<div class="booklink-box">
<div class="booklink-image"><a href="http://www.amazon.co.jp/exec/obidos/asin/4877710787/llg01-22/" target="_blank" rel="nofollow noopener"><img style="border: none;" src="https://images-fe.ssl-images-amazon.com/images/I/51-akDCvHzL._SL320_.jpg" /></a></div>
<div class="booklink-info">
<div class="booklink-name">

<a href="http://www.amazon.co.jp/exec/obidos/asin/4877710787/llg01-22/" target="_blank" rel="nofollow noopener">仕事は楽しいかね?</a>
<div class="booklink-powered-date">posted with <a href="https://yomereba.com" target="_blank" rel="nofollow noopener">ヨメレバ</a></div>
</div>
<div class="booklink-detail">デイル ドーテン きこ書房 2001-12-01</div>
<div class="booklink-link2">
<div class="shoplinkamazon"><a href="http://www.amazon.co.jp/exec/obidos/asin/4877710787/llg01-22/" target="_blank" rel="nofollow noopener">Amazonで購入</a></div>
<div class="shoplinkkindle"><a href="http://www.amazon.co.jp/exec/obidos/ASIN/B00SIM19YS/llg01-22/" target="_blank" rel="nofollow noopener">Kindleで購入</a></div>
<div class="shoplinkrakuten"><a href="https://hb.afl.rakuten.co.jp/hgc/163854b7.d97e8d5b.163854b8.3c41ae34/?pc=http%3A%2F%2Fbooks.rakuten.co.jp%2Frb%2F1401136%2F%3Fscid%3Daf_ich_link_urltxt%26m%3Dhttp%3A%2F%2Fm.rakuten.co.jp%2Fev%2Fbook%2F" target="_blank" rel="nofollow noopener">楽天ブックスで購入</a></div>
<div class="shoplinkseven"><a href="https://px.a8.net/svt/ejp?a8mat=2TXHHI+FDP7OQ+2N1Y+BW8O2&amp;a8ejpredirect=http%3A%2F%2F7af-ent.omni7.jp%2Frelay%2Faffiliate%2FentranceProcess.do%3Furl%3Dhttp%253A%252F%252F7net.omni7.jp%252Fsearch%252F%253FsearchKeywordFlg%253D1%2526keyword%253D4-87-771078-1%252520%25257C%2525204-877-71078-1%252520%25257C%2525204-8777-1078-1%252520%25257C%2525204-87771-078-1%252520%25257C%2525204-877710-78-1%252520%25257C%2525204-8777107-8-1" target="_blank" rel="nofollow noopener">7netで購入</a><img src="https://www17.a8.net/0.gif?a8mat=2TXHHI+FDP7OQ+2N1Y+BW8O2" alt="" width="1" height="1" border="0" /></div>
</div>
</div>
<div class="booklink-footer"></div>
</div>
</div>
&nbsp;

&nbsp;

色々な方のブログを見ているとこのように本を紹介して、アマゾンや楽天のリンクを貼り付けているのを見るかと思うのですが、これらは全てヨメレバという書籍紹介用のブログパーツを利用しています。

リンクはこちらになります。
<a href="https://yomereba.com/">ヨメレバ</a>

&nbsp;

こちらでAmazonのアフィリエイトIDや楽天のアフィリエイトIDを登録すると、上のようなブログパーツが出来上がります。細かい作成方法はリンク先に譲りますが、今回はそんあブログパーツを自信のサイトに導入したので共有させて頂きました。
<h2 class="chapter">一つのサービスのリンクしか紹介していないもったいないことしていませんか？</h2>
&nbsp;

私もこの記事を書く前に設置した口なのであまり他人のこと言えませんが、設置の動機となったので書かせてもらいます。

&nbsp;

サイトには、希望の本を購入したいという目的は同じであれど、Kindleで読みたいという人と楽天でポイント貯めているから楽天Booksを利用するという人など様々な事情を持った方が訪れます。

&nbsp;

そこでAmazonへのリンクしかないとか楽天へのリンクしかないとかなるとサイトに訪れたユーザの希望のリンクがない場合は機会損失となってしまいます。

そんな勿体無い状態を少しでも解消できるのがこのヨメレバというツールになります。

&nbsp;

オススメする本を購入して欲しいという方はこの機会にぜひこのブログパーツを導入してみましょう。

本記事では簡単な導入方法と自分が行なったカスタマイズについて紹介します。

<div class="adsense"></div>

&nbsp;
<h2 class="chapter">ヨメレバをcssカスタマイズ(verison1の場合)</h2>
&nbsp;

※必要なAmazon,楽天のアフィリエイトIDはすでに入力しているものとします。

&nbsp;

ヨメレバでは、下記のような画面でISBNを入力してブログパーツを作成します。
ISBNは書籍を識別する一意のコードで「本の題名 ISBN」などでググればISBNはわかります。

&nbsp;

ヨメレバでは表示形式をいくつか選択できますが当ブログ導入時は、amazlet風-2(cssカスタマイズ風)というレイアウトのものを選択しました。

&nbsp;

<img class="post-image" src="https://s3-ap-northeast-1.amazonaws.com/statics.ver-1-0.net/uploads/2017/12/20171203_yomereba/yomereba.png" alt="yomereba.png"/>

&nbsp;

必要項目を入力して表示ボタンを押すと貼り付け用のHTMLが生成されます。
このHTMLを自身のブログの表示させたい部分に貼り付ければ完了です。

&nbsp;

ここまでで本を紹介するという目的は達成できているのですが、自身でもう少しカスタマイズしたかったのでcssを追加して、表示をカスタマイズしました。

テーマは<strong>「ついクリックしたくなるカスタマイズ」</strong>です！！
どうでしょうか？？こういう感じにしてみました。
<div class="cstmreba">
<div class="booklink-box">
<div class="booklink-image"><a href="http://www.amazon.co.jp/exec/obidos/asin/4877710787/llg01-22/" target="_blank" rel="nofollow noopener"><img style="border: none;" src="https://images-fe.ssl-images-amazon.com/images/I/51-akDCvHzL._SL320_.jpg" /></a></div>
<div class="booklink-info">
<div class="booklink-name">

<a href="http://www.amazon.co.jp/exec/obidos/asin/4877710787/llg01-22/" target="_blank" rel="nofollow noopener">仕事は楽しいかね?</a>
<div class="booklink-powered-date">posted with <a href="https://yomereba.com" target="_blank" rel="nofollow noopener">ヨメレバ</a></div>
</div>
<div class="booklink-detail">デイル ドーテン きこ書房 2001-12-01</div>
<div class="booklink-link2">
<div class="shoplinkamazon"><a href="http://www.amazon.co.jp/exec/obidos/asin/4877710787/llg01-22/" target="_blank" rel="nofollow noopener">Amazonで購入</a></div>
<div class="shoplinkkindle"><a href="http://www.amazon.co.jp/exec/obidos/ASIN/B00SIM19YS/llg01-22/" target="_blank" rel="nofollow noopener">Kindleで購入</a></div>
<div class="shoplinkrakuten"><a href="https://hb.afl.rakuten.co.jp/hgc/163854b7.d97e8d5b.163854b8.3c41ae34/?pc=http%3A%2F%2Fbooks.rakuten.co.jp%2Frb%2F1401136%2F%3Fscid%3Daf_ich_link_urltxt%26m%3Dhttp%3A%2F%2Fm.rakuten.co.jp%2Fev%2Fbook%2F" target="_blank" rel="nofollow noopener">楽天ブックスで購入</a></div>
<div class="shoplinkseven"><a href="https://px.a8.net/svt/ejp?a8mat=2TXHHI+FDP7OQ+2N1Y+BW8O2&amp;a8ejpredirect=http%3A%2F%2F7af-ent.omni7.jp%2Frelay%2Faffiliate%2FentranceProcess.do%3Furl%3Dhttp%253A%252F%252F7net.omni7.jp%252Fsearch%252F%253FsearchKeywordFlg%253D1%2526keyword%253D4-87-771078-1%252520%25257C%2525204-877-71078-1%252520%25257C%2525204-8777-1078-1%252520%25257C%2525204-87771-078-1%252520%25257C%2525204-877710-78-1%252520%25257C%2525204-8777107-8-1" target="_blank" rel="nofollow noopener">7netで購入</a><img src="https://www17.a8.net/0.gif?a8mat=2TXHHI+FDP7OQ+2N1Y+BW8O2" alt="" width="1" height="1" border="0" /></div>
</div>
</div>
<div class="booklink-footer"></div>
</div>
</div>
コードは以下に張っていますので参考にして頂ければ。

&nbsp;
```css
/* Yomereba */
@media (min-width: 770px) {
    .cstmreba{display: table;}
    .cstmreba .booklink-image{
        display: table-cell;
        float: left;
        padding: 0 30px;
     }
    .cstmreba .booklink-info{
        display: table-cell;
        padding: 0 30px;
    }

 }
.cstmreba{
    padding: 15px;
    border:1px solid #ededed;
    font-family:-apple-system, BlinkMacSystemFont, "Helvetica Neue", "Segoe UI","Noto Sans Japanese","ヒラギノ角ゴ ProN W3", Meiryo, sans-serif;
}
.cstmreba .booklink-image{
    text-align: center;
}

.cstmreba .booklink-info{
    text-align: center;
}
.booklink-name{
    margin-top: 30px;
    margin-bottom: 15px;
}
.booklink-name a{
    font-size: 18px;
}
.booklink-detail{
    margin: 0px  10px;
}
.shoplinkamazon a,
.shoplinkkindle a,
.shoplinkrakuten a,
.shoplinkseven a {
    display: block;
    background: red;
    margin: 10px;
    padding: 15px;
    text-decoration:none;
    color: white;
    text-align: center;
    box-shadow: 0px 5px 0px 0px lightgray;
}

.shoplinkamazon a{
    border: 1px solid #E55812;
　background: #E55812;
  box-shadow: 0px 5px 2px 0px #E55812;
}

.shoplinkkindle a{
  border: 1px solid #EC058E;
  background: #EC058E;
  box-shadow: 0px 5px 2px 0px #EC058E;
}

.shoplinkrakuten a{
  border: 1px solid #2A2D34;
  background: #2A2D34;
  box-shadow: 0px 5px 5px 0px #2A2D34;
}
.shoplinkseven a{
  border: 1px solid #62BBC1;
  background: #62BBC1;
  box-shadow: 0px 5px 5px 0px #62BBC1;
}
/* Yomereba */

```
&nbsp;

このコードを使えば上記のような本紹介のパーツが出来上がります。

&nbsp;

通常では2カラムのレイアウトで表示されますが、画面サイズが狭い場合にも対応しており、画面幅が狭い場合は1カラムのレイアウトで表示されます。
※ご自身のPCのスクリーンを縮小させて見たり携帯から見てみて、ご確認ください。

もし、こちらのカスタマイズがお気に入りになったら、<strong>どんどんパクちゃってください。変更も自由にしてしまって構いません。</strong>

&nbsp;

色合いを変更する場合は,

&nbsp;
```css
.shoplinkamazon a{
    border: 1px solid #E55812;
　background: #E55812;
  box-shadow: 0px 5px 2px 0px #E55812;
}

.shoplinkkindle a{
  border: 1px solid #EC058E;
  background: #EC058E;
  box-shadow: 0px 5px 2px 0px #EC058E;
}

.shoplinkrakuten a{
  border: 1px solid #2A2D34;
  background: #2A2D34;
  box-shadow: 0px 5px 5px 0px #2A2D34;
}
.shoplinkseven a{
  border: 1px solid #62BBC1;
  background: #62BBC1;
  box-shadow: 0px 5px 5px 0px #62BBC1;
}

```
&nbsp;

ここら辺のbackgroundやborder,box-shadowあたりを変更してくだされば色合いは変更できます。

配色が難しいという方は、<a href="https://coolors.co/">coolors.co</a>あたりをお使いになると良いと思います。

&nbsp;

紹介記事も書いているので興味があればどうぞ
<a href="https://ver-1-0.net/2017/11/15/cooler-co-convinent-color-tool/">=>サイトやfaviconを作成するときに使える配色自動生成ツール coolors.co</a>

&nbsp;

&nbsp;

<div class="adsense"></div>
