---
templateKey: blog-post
title: ブロックチェーンの仕組みがわかる記事”How does blockchain really work? I built an app to show you.”を訳してみた
slug: /2017/10/18/how-does-blockchain-really-work-i-built-an-app-to-show-you-translate-ja
createdAt: 2017-10-18 08:08:08
updatedAt: 2018-01-30 23:18:13
thumbnail: /2017/10/20171018_how-does-blockchain-really-work-i-built-an-app-to-show-you-translate-ja/thumbnail.png
categories:
  - engineering
tags:
  - dummy
---

&nbsp;

どうも週末に、
パッと見つけた記事で面白かったものがあったので
シェアしたいと思いました。

チュートリアル用のようなunderstandableなアプリも
一緒に公開しており、
Awesome!と思ったので和訳します。

<img class="post-image" src="https://statics.ver-1-0.net/uploads/2017/10/20171018_how-does-blockchain-really-work-i-built-an-app-to-show-you-translate-ja/twittercard.png" alt="twittercard"/>

原文はコチラ
<a href="https://medium.freecodecamp.org/how-does-blockchain-really-work-i-built-an-app-to-show-you-6b70cd4caf7d">How does blockchain really work? I built an app to show you.</a>

※プロフェッショナルな
訳ではないのでそこは大目にみてください。
雰囲気だけ伝わればと思っています。
誤訳等あればおしらせください。
※訳文掲載は著者の転載許可の承諾を得ております。

&nbsp;

全文を訳したましたが、
マイニング部分の流れがコード付きで
わかりやすく説明されていて本当に役立ちました！！
できれば本文中にあるweb版のデモを触ってみると
より深く理解できるはずです。

&nbsp;

<div class="adsense-double-rect"></div>

&nbsp;
<h2 class="chapter">海外の記事 - （訳）Sean HHow does blockchain really work? I built an app to show you.</h2>
&nbsp;
<h3 class="section">実際ブロックチェーンはどうやって動いているのか？説明用のアプリを作ってみた</h3>


&nbsp;

ウィキペディアによれば、ブロックチェーンは
<blockquote>ブロックと呼ばれる継続的に成長するレコードのリストを保持するために
使われる分散型データベースである</blockquote>
とある。
うん、いいね！でもそれはどうやって動くのか？

ブロックチェーンについて説明するには、オープンソースの<a href="https://github.com/seanseany/blockchain-cli">Blockchain CLI</a>コマンドラインインタフェースを使うと良いと思う。

私が作ったブラウザで使えるバージョンはここです。
<a href="http://blockchaindemo.io/">browser-based version of this here.</a>
<img class="post-image" src="https://statics.ver-1-0.net/uploads/2017/10/20171018_how-does-blockchain-really-work-i-built-an-app-to-show-you-translate-ja/how-blockchain-works.png" alt="how blockchain-works"/>


<h3 class="section">コマンドラインインターフェースバージョンをインストールする</h3>


&nbsp;

まだ、
自分の環境にNode.jsがインストールされてなかったら、
インスートールしてください、
それから、ターミナルで下のコマンドを実行します。
```
npm install blockchain-cli -g
blockchain

```
コマンドを実行すると
? Welcome to Blockchain CLI!　と bloackchain →
というプロンプトが現れるでしょう。

&nbsp;
<h3 class="section">ブロックがどのように見えるか？</h3>


&nbsp;

ターミナルの今のブロックチェーンを見るには、
```
blockchain
```
か
```
bc
```
をターミナルに
打ち込みます。
下のように見えるはずです。

<img class="post-image" src="https://statics.ver-1-0.net/uploads/2017/10/20171018_how-does-blockchain-really-work-i-built-an-app-to-show-you-translate-ja/block-on-the-blockchain.png" alt="block on the blockchain"/>

<ul>
 	<li>Index (Block#) : それがどのブロックか（ジェネシスブロックのindexは0)</li>
 	<li>Hash : そのブロックが妥当か？</li>
 	<li>　 Previous Hash : 前のブロックが妥当か？</li>
 	<li>Timestamp:いつブロックが追加されたか？</li>
 	<li>Data: どんな情報がブロックに保持されているか？</li>
 	<li>Nonce: 妥当なブロックを見つけるまでに何回イテレートしたか？</li>
</ul>

**Genesis Block (ジェネシスブロック）**
全てのブロックチェーンはGenesis Blockから始まります。
あとで見るように、各ブロックチェーンのブロックは前のブロックに依存している。
そのため、Genesis Blockは最初のブロックとして採掘される必要がある。

<h3 class="section">新しいブロックが採掘される場合に何が起きるか？</h3>

最初のブロックを採掘してみましょう。mine freeCodeCamp♥︎と打ち込んでみてください。

そのブロックはブロックチェーン場での最新のインデックスと前のブロックのハッシュを
みています。このジェネシスブロックのケースでは最新のブロックは、

<ul>
 	<li>Index (Block#) : 0 + 1 = 1</li>
 	<li>　 Previous Hash : 0000018035a828da0…</li>
 	<li>Timestamp:ブロックが追加されたタイムスタンプ</li>
 	<li>Data: freeCodeCamp♥︎</li>
 	<li>Hash : ??</li>
 	<li>Nonce: ??</li>
</ul>

<h3 class="section">ハッシュがどのように計算されているか？</h3>

ハッシュ値は一意にデータを識別する固定長の数字の値です。

そのハッシュはインデックスと前ブロックのハッシュ値、タイムスタンプ、ブロックの値と
ナンスを足したものから計算される。

```
CryptoJS.SHA256(index + previousHash + timestamp + data + nonce)
```

SHA256アルゴリスムはこれらの与えられたものから一意なハッシュを計算します。
同じ入力値からは常に同じハッシュが返却されます。

<h3 class="section">ブロックのハッシュの頭につく4つの0</h3>

先頭の0は有効なハッシュに最低限必要なものです。
その必須の数字はdifficultyと呼ばれます。
<pre>function isValidHashDifficulty(hash, difficulty) {
  for (var i = 0, b = hash.length; i < b; i ++) { if (hash[i] !== '0') { break; } } return i >= difficulty;
}
</pre>
これは<a href="https://en.wikipedia.org/wiki/Proof-of-work_system">Proof-of-Work system</a>としても知られています。

<h3 class="section">nonce（ナンス）とは？</h3>

nonce（ナンス）は妥当なハッシュを見つけるたみに使われる数字です。

```
let nonce = 0;
let hash;
let input;
while(!isValidHashDifficulty(hash)) {
  nonce = nonce + 1;
  input = index + previousHash + timestamp + data + nonce;
  hash = CryptoJS.SHA256(input)
}

```
そのナンスはハッシュが有効になるまでイテレートされます。
このケースでは、有効なハッシュは最低限先頭に4つの0をもつ必要があります。

その有効なハッシュに一致するナンスを見つける過程がマイニングです。

difficultyが増加すると、有効なハッシュである可能性の数字が減ります。
有効となる可能性が低ければ低いほど、ハッシュを見つけるためにより多くの電力を必要とします。

<h3 class="section">なぜこれが重要なのか？</h3>

これらの作業はブロックチェーンが改ざんできなくするのに重要です。

もし、私たちがA->B->Cというブロックチェーンを持っていて、
誰かがブロックAを変更した場合に、以下のことが起こります。
<ol>
 	<li>ブロックAが変更される</li>
 	<li>そのデータはハッシュの計算に使われるのでブロックAのハッシュ値が変更される</li>
 	<li>そのハッシュはもはや先頭4つの0を持たないので、不正なハッシュとなる</li>
 	<li>ブロックAのハッシュはブロックBのハッシュを計算するのに使われているので、
ブロックBのハッシュも変更されます</li>
 	<li>ブロックBのハッシュも先頭4つの0を持たないので、ブロックBが不正になります</li>
 	<li>ブロックBのハッシュはブロックCのハッシュを計算するのに使われるので、
ブロックCのハッシュが変わります。</li>
 	<li>ブロックCのハッシュも先頭4つの0を持たないので、ブロックCが不正になります</li>
</ol>
<span style="text-decoration: underline;"><em>ブロックを変更させるたった一つの方法は、再びブロックを採掘する方法です。
そして、そのあと全てのブロックを採掘する必要があります。
新しいブロックは常に追加され続けるので、ブロックチェーンを改ざんすることは
ほぼ不可能となります。</em></span>

このチュートリアルがあなたに役立ちますように！

もしWebバージョンのでもを確認したい場合はこちらのリンクにお進みください。
<a href="http://blockchaindemo.io">http://blockchaindemo.io</a>

<div class="cstmreba"><div class="booklink-box"><div class="booklink-image"><a href="http://www.amazon.co.jp/exec/obidos/asin/4798151343/llg01-22/" target="_blank" rel="nofollow" ><img src="https://images-fe.ssl-images-amazon.com/images/I/51ZDMhsrXWL._SL320_.jpg" style="border: none;" /></a></div><div class="booklink-info"><div class="booklink-name"><a href="http://www.amazon.co.jp/exec/obidos/asin/4798151343/llg01-22/" target="_blank" rel="nofollow" >はじめてのブロックチェーン・アプリケーション Ethereumによるスマートコントラクト開発入門 (DEV Engineer's Books)</a><div class="booklink-powered-date">posted with <a href="https://yomereba.com" rel="nofollow" target="_blank">ヨメレバ</a></div></div><div class="booklink-detail">渡辺 篤,松本 雄太,西村 祥一,清水 俊也 翔泳社 2017-08-03    </div><div class="booklink-link2"><div class="shoplinkamazon"><a href="http://www.amazon.co.jp/exec/obidos/asin/4798151343/llg01-22/" target="_blank" rel="nofollow" >Amazonで購入</a></div><div class="shoplinkkindle"><a href="http://www.amazon.co.jp/exec/obidos/ASIN/B07416W2PY/llg01-22/" target="_blank" rel="nofollow" >Kindleで購入</a></div><div class="shoplinkrakuten"><a href="https://hb.afl.rakuten.co.jp/hgc/163854b7.d97e8d5b.163854b8.3c41ae34/?pc=http%3A%2F%2Fbooks.rakuten.co.jp%2Frb%2F15008160%2F%3Fscid%3Daf_ich_link_urltxt%26m%3Dhttp%3A%2F%2Fm.rakuten.co.jp%2Fev%2Fbook%2F" target="_blank" rel="nofollow" >楽天ブックスで購入</a></div><div class="shoplinkseven"><a href="https://px.a8.net/svt/ejp?a8mat=2TXHHI+FDP7OQ+2N1Y+BW8O2&a8ejpredirect=http%3A%2F%2F7af-ent.omni7.jp%2Frelay%2Faffiliate%2FentranceProcess.do%3Furl%3Dhttp%253A%252F%252F7net.omni7.jp%252Fsearch%252F%253FsearchKeywordFlg%253D1%2526keyword%253D4-79-815134-2%252520%25257C%2525204-798-15134-2%252520%25257C%2525204-7981-5134-2%252520%25257C%2525204-79815-134-2%252520%25257C%2525204-798151-34-2%252520%25257C%2525204-7981513-4-2" target="_blank" rel="nofollow" >7netで購入</a><img border="0" width="1" height="1" src="https://www17.a8.net/0.gif?a8mat=2TXHHI+FDP7OQ+2N1Y+BW8O2" alt=""></div>            	  	  	  	</div></div><div class="booklink-footer"></div></div></div>

