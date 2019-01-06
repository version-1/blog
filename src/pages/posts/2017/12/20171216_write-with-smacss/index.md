---
templateKey: blog-post
title: SMACSSでデモサイトのコード書いてみた
slug: /2017/12/16/write-with-smacss
createdAt: 2017-12-16 22:00:52
updatedAt: 2018-05-20 22:38:01
thumbnail: /2017/12/20171216_write-with-smacss/thumbnail.jpg
categories:
  - engineering
  - design
---

&nbsp;

前回の記事では、SMACSSの電子書籍をまとめてみました。
<a href="https://ver-1-0.net/2017/12/10/learn-smacss/">CSSスタイルガイドのSMACSSを勉強してみたまとめ</a>

今回は、書籍を読むだけでは理解が深まらないので実際にSMACSSを意識しながらコーディングしてみました。

&nbsp;

<div class="adsense"></div>

&nbsp;
<h2 class="chapter">ランディングページを作ってみる</h2>
&nbsp;

今回は、題材としてランディングページのコーディングをしてみました。

ランディングページとは、LPと呼ばれたりもするので、広告や検索から訪れるユーザが最初にみるページのことです。

人間関係でも第一印象が大事と言われるように、商品とユーザが初めて出会う場所ですのでサイトのユーザに与える印象の大事な部分を担っています。

&nbsp;

今回はSMACSSを意識しながら書いてみて、悩んだところや、よかったところ、SMACCSでは表現しにくいところを知るための題材ですので、それほどユーザに与える印象とかビジネスライクな部分はあまり意識していないです。

&nbsp;

というか、私普段からバリバリcss書いていててcssでは誰にも負けません!!

という感じではないので私のコードはあくまでも私のコードで、これを参考にすれば大丈夫!!みたいな絶対的なものでなく、コーディングしてみましたーというようなのものなのでご了承ください。

&nbsp;

その点踏まえて、仕上げたページはこちらになります。

<img class="post-image" src="https://s3-ap-northeast-1.amazonaws.com/statics.ver-1-0.net/uploads/2017/12/20171216_write-with-smacss/smaccs-1024x517.png" alt="smaccs-1024x517.png"/>

おぉ・・・

まぁありがちですね。
サイトは自分が開発してみたいなぁと思っている個人のタスク管理ツールをイメージして作りました。

レイアウトはシングルカラムレイアウトのよく見るランディングページという感じですね。

&nbsp;

ログインボタンやサインアップのボタンを押すとフォームが表示されたりするようにはしていますが、完全なるデモページなので、それ以上は進めません。

ご了承ください。

デモページのリンクはこちらです。
GitHubPagesで後悔しているので実際のデモがご覧いただけます。

<a href="https://version-1.github.io/smacss-sample/example/default/">https://version-1.github.io/smacss-sample/example/default/</a>

&nbsp;

ソースはgithubにあげておきました。
<a href="https://github.com/version-1/smacss-sample">https://github.com/version-1/smacss-sample</a>

&nbsp;

<div class="mid-article"></div>

&nbsp;
<h2 class="chapter">SMACSSしてみて気づいたこと</h2>
&nbsp;
<ul>
 	<li>境界線の引き方が難しい</li>
 	<li>moduleのソースが大きくなりがち</li>
 	<li>jsをどれくらい使うかでコードが変わりそう</li>
</ul>
&nbsp;
<h3 class="section">境界線の引き方が難しい</h3>
&nbsp;

これは単に慣れ次第でもう少し切り分けができるようになるかなとも思うのですが、他のcssの設計手法と同じように線引きが難しいと感じました。

何がレイアウトで何がモジュールなのかというのはやはりコーディングをしていて悩みました。

&nbsp;

カルーセルやアコーディオンなど明らかにわかりやすいのは良いのですが、ヘッダーやフッターはどこまでレイアウトのカテゴリで書くべきなのかというのは悩みました。

SMACSSを提唱している原本でもそこまで明確に線引きをしている訳ではないので、あくまでもセマンティック性の維持と保守性という目的から考えたベストエフォートを取っていくしかないのではないでしょうか。

&nbsp;

結果的にはレイアウトは最低限の大枠に留めて、ヘッダーやフッターの中のスタイルのほとんどは、モジュールで定義しました。

&nbsp;
<h3 class="section">モジュールのソースが大きなくなりがち</h3>
&nbsp;

LPをコーディングした結果以下のような構成になりました。

&nbsp;

<img class="post-image" src="https://s3-ap-northeast-1.amazonaws.com/statics.ver-1-0.net/uploads/2017/12/20171216_write-with-smacss/dir-structure-665x1024.png" alt="dir-structure-665x1024.png"/>

&nbsp;

みてわかるようにSMACSSのカテゴリでシンプルに分類しています。
モジュールが全体の80%くらいになりそうですね。。

&nbsp;

もう少し大きいシステムになると管理画面とユーザの画面でスタイルを分けたりする必要があるので、管理者、ユーザ、共通、のような形で分けて各セクションごとにベース、レイアウト、モジュール・・・のように分けてしまう方法もありかもしれません。

&nbsp;

今回に関してはLPのみのコーディングでしたので、入れ子にせずフラットに分割しました。

スクショみてもわかるようにレイアウトは大まかなところ、モジュールは細かいところというような形で分担してしまったので、モジュールのコードが占める割合が大きくなっています。

大きくなること自体が悪いわけではないのですが、大きい分その中に冗長なコードが含まれているのではという懸念もあるので、ちょと不安になりました。

コードを書いていると

「これ、ステートじゃないよな」

「レイアウトでもないしな」

「じゃあモジュールか」

という感じで多くのコードがモジュールに流れつきましたね。

&nbsp;

まぁここは割合の問題というよりは、あくまでもセマンティックで重複のないコードを目指す上での問題なのでそれらを鑑みて
「どうすれば一見で理解できて、整理されたコードになるのか」
というのを考えながらリファクタして答えを見つけていいかないといけません。

&nbsp;
<h3 class="section">jsをどれくらい使うかでコードが変わりそう</h3>
&nbsp;

今回一応JQueryも使っているのですが、本格的にJQueryでクラスを当てたり外したりということはせず、いくつかのアニメーションを極力cssで実現できるようにしました。

modalに関しては、modal-cssを使ったので、jsをほとんど自分で書くことはなく、カルーセルでもslick.jsでslickの関数呼び出し、アコーディオンでのクラスの割り当てに簡単にjs使うくらいでした。

JQueryをもっとバリバリ書いていくとよりステートコードが増えていきそうです。

ランディングページだけなのであまりJS書かなくて済んでいますが、もう少しページが増えて大規模になってくるとJQueryも必要になってきそうなので、実際の現場ではもう少し、ステートのコードの割合は増えそうな気がしています。

&nbsp;
<h2 class="chapter">工夫したこと</h2>
&nbsp;

簡単に今回自分なりに工夫したことを書くと以下になります。
<ul>
 	<li>テーマの層が有効に使えるようにした。</li>
 	<li>アコーディオンやボーダーのアニメーションなどが極力HTMLに依存しないようにした。</li>
</ul>
&nbsp;
<h3 class="section">テーマの層が有効に使えるようにした</h3>
&nbsp;

SMACSSの原本によるとテーマの層はプロジェクトによって存在しない場合があるそうですが、テーマはサイトの見た目の変更をユーザに委ねる場合などで使われるようです。

ようは、見た目の変更をユーザの好みに合わせてできるようにしますよということです。

&nbsp;

今回上のディレクトリ構造の写真によると_variable.scssというファイルと、theme/_default.scssというファイルがあります。

これが何をやっているかというと、
_variable.scssでサイトで使う色やフォント、フォントのサイズなどを変数を使って定義しています。

&nbsp;

さらに今回は、_variable.scssでは主に、ユーザがいじれないような変数を定義して、theme下のファイルで代表的な色をユーザの好みに合わせて色を変更できるようにしました。

スクショだと、theme下に4つのファイルがありますが、それぞれサイトの色を変更できるテーマファイルになっていて読み込むファイルを変更することで、サイト内で使われる色を変更できます。

&nbsp;

下記の例では、default.scssを読み込んでいます。
```
@import 'theme/default';
// @import 'theme/theme1';
// @import 'theme/theme2';
// @import 'theme/theme3';



/* bg-color{{{ */
$primary-bg-color: map-get($color-map,site-base-white-color);
$secondary-bg-color: map-get($color-map,site-quaternary-color);
・
・
< 略 >

```
&nbsp;

それぞれの例は、下記URLで確認できます。

<a href="https://version-1.github.io/smacss-sample/example/default/">default</a>

<a href="https://version-1.github.io/smacss-sample/example/theme1/">theme1</a>

<a href="https://version-1.github.io/smacss-sample/example/theme2/">theme2</a>

<a href="https://version-1.github.io/smacss-sample/example/theme3/">theme3</a>

&nbsp;

&nbsp;
<h3 class="section">モジュールのアニメーションがHTMLに依存しないようにした</h3>
&nbsp;

アコーディオンを今回自前で実装しました。がアコーディオンのアニメーションをこのページ二箇所で使えるように実装しました。

一つはFAQのコーナーで、一つは画面幅が狭い時のメニューです。

どちらも、隠れていたオブジェクトが表示される際にアコーディオンが開くのをイメージした形で実装されています。

&nbsp;

また、hover（マウスオーバー）した際に発火する下線のアニメーションもhtmlにクラスを追加するだけで、アニメーションが実現できるようにしました。

これらに関してどのアニメーションも要素タグを使っていないので、HTMLと疎結合な形でCSSを実装することができました。

&nbsp;
<h2 class="chapter">まとめ</h2>
&nbsp;

ここまで色々とまとめましたが、正直まだSMACSSはわからないです。。

SMACSSは意識しつつもOOCSSも意識して構造と見た目は分離した方がいいのか
やこれは本当にモジュールとして定義していいのか

などなど疑問はつきません。

&nbsp;

まぁどのスタイルガイドを採用するにせよ、セマンティックで変更に強い重複のない設計が求められるとは思うのですが、これは最初に実装してみた後に徐々に変更を加えてみると

「このコード変更するときにやたらコード書くな」

みたいな違和感を感じてコードのよくない部分に気づける気がしています。

実装完了した時は完璧に実装できているように見えるけど、実際に拡張してみたりのちの変更に対応してみるといかに最初の設計の弱い部分が見えてくるのでしょう。

&nbsp;

今回紹介したコードも暫定的なものなので、これらを差し引いてみて頂けると嬉しいです。
今回は設計の話がメインでしたが、SMACSSで書いてみるに当たって新たに学んだコンポーネントのつくり方なども紹介して行ければと思います!!

では

<div class="after-article"></div>