---
templateKey: blog-post
title: ブラウザの役割について。プログラミングを始める前に知っておいて欲しいWebサイトの仕組み
slug: /2017/11/07/web-structure-browser
createdAt: 2017-11-07 22:30:45
updatedAt: 2018-01-28 14:53:27
thumbnail: /2017/11/20171107_web-structure-browser/thumbnail.png
categories:
  - engineering
  - for-beginner
---

&nbsp;

今回は、
プログラミングを始める前に
Webサイトの仕組みを知ろうと言うことでまず一番
身近な

<strong>ブラウザ</strong>

について説明します。
アイキャッチ画像で言うところの
クライアント側画像左下部分の話になります。
現在地を見失わないようにお願いします。

仕組みを知ることの理由みたいなものは
↓↓↓ここに書いています。
<a href="https://ver-1-0.net/2017/11/07/web-structure/">プログラミングを始める前に知っておいて欲しいWebサイトの仕組み</a>

ブラウザと言うのは割と現在身近になっていて、
ポピュラーなブラウザを上げてみると
Google Chrome ,
Safari ,
Internet Explorer
などなどになります。

<a href="http://gs.statcounter.com/browser-market-share">StatCounter</a>で
日本のシェアをみてみると、
Chrome, Safari, IEの順で利用されているようですね。

<img class="post-image" src="https://s3-ap-northeast-1.amazonaws.com/statics.ver-1-0.net/uploads/2017/11/20171107_web-structure-browser/StatCounter-browser-JP-monthly-201610-201710-bar-1024x576.png" alt="StatCounter-browser-JP-monthly-201610-201710-bar-1024x576.png"/>

&nbsp;

&nbsp;

これらそれぞれのブラウザはもちろん
違う機能を備えていますが、
ある特定の共通の機能を備えていて、
それがブラウザたる所以になります。

&nbsp;

<div class="adsense"></div>

&nbsp;
<h2 class="chapter">ブラウザはHTMLを解析して、人が読みやすい形に表示するツール</h2>
&nbsp;

&nbsp;

&nbsp;

ブラウザはクライアント側のツールで
クライアントツールと呼ばれるように、
サーバから返却されるHTMLをみやすいように変換して、
表示をしてくれます。

&nbsp;

&nbsp;

試しにお使いのブラウザで右クリックを押して、
「ソースを表示する」のような選択肢をクリックすると
新たなウィンドウかタブが表示され、不等号などで区切られた
ファイルが表示されそれがHTMLファイルになります。

<img class="post-image" src="https://s3-ap-northeast-1.amazonaws.com/statics.ver-1-0.net/uploads/2017/11/20171107_web-structure-browser/Screen-Shot-2017-11-07-at-21.54.07.png" alt="Screen-Shot-2017-11-07-at-21.54.07.png"/>

この一見読みづらい構文で書かれたものが、
HTMLファイルでそれらを見やすいように整形して
表示してくれるツールが<strong>ブラウザ</strong>になります。

&nbsp;

ブラウザと聞くと
「え、インターネットに接続して、
Googleで検索したり、
ネットサーフィンするものじゃないの？」
と言うようなイメージがあるかとは思いますが、
ブラウザはHTMLを解析して、
見やすい形に表示すると言う大きな機能を備えています。

&nbsp;

&nbsp;

ちなみにブラウザは
普通の自分のパソコンのテキストファイルも表示することができます。

気にになる方は、適当なテキストファイルを
ブラウザにドロップ&amp;ドラッグなどしてみてください。
（あまりにそのまま表示されるので感動は少ないと思いますが・・）

&nbsp;

&nbsp;
<h2 class="chapter">ブラウザはHTTPプロトコルを利用してサーバにリクエストを送るツール</h2>
&nbsp;

みなさんがネットサーフィンする場合と言うのは、
Googleなどの検索サイトに
<strong>「ブラウザ 仕組み」</strong>などのキーワードを入力して利用する場合が
多いはずです。

&nbsp;

&nbsp;

が、
本来的にブラウザは
先に説明したHTMLを解析するツールであると同時に、
<strong>サーバにこのURLのページをくださいとリクエストを送ったり、</strong>
<strong> サーバからHTMLファイルを受け取ったりという機能</strong>が
あります。

&nbsp;

&nbsp;

例えば、
みなさんがブラウザの上の方にあるテキストバーに
URLを打ち込んだ場合と言うのは、
Enterを押した瞬間に入力した「http://ver-1-0.net」のようなURLリクエスト
を送るという意味になります。

&nbsp;

&nbsp;

そこでそのリクエストを受けたサーバが、
URLに適したHTMLを返却し、
そのHTMLを受けたブラウザがそれを表示するというような
流れになっています。

&nbsp;

&nbsp;

また、
各Webサイトのリンクやボタンを押すと、
画面が切り替わる場合がありますが、
その瞬間も同様にHTTPのリクエストを送っています。

&nbsp;

&nbsp;
<h2 class="chapter">まとめ</h2>
&nbsp;

&nbsp;

ここまでは、
ブラウザが
<ul>
 	<li>HTMLファイルを解析して見やすく表示してくれていること</li>
 	<li>URLを元にHTTPリクエストを送っていること</li>
</ul>
を説明しましたが、
ハラオチされましたでしょうか？

<strong>HTTPとはなんぞや？</strong>と言う疑問をもたれる方もいらっしゃる
とは思いますが、
ここでは、
Webサイトをシステム全体でとらえた場合に

<strong>ブラウザと言う登場人物がいて、</strong>

<strong>そいつが</strong>
<strong> 「Webページ（HTML）をください」と言うリクエストを送って</strong>
<strong> サーバがHTMLを返却して</strong>

返ってきた<strong>HTMLを人が見やすいように表示する</strong>と言うことだけ
覚えて頂ければ良いです。

&nbsp;

&nbsp;

HTTPなどの説明はまた別途しますので、
とりえあえこの記事はここまでとします。

<div class="after-article"></div>
