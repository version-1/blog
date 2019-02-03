---
templateKey: blog-post
title: 個人的RubyMineからAtomに切り替えた人おすすめパッケージ
slug: /2017/04/30/advice-for-rubymine-to-atom
createdAt: 2017-04-30 12:16:19
updatedAt: 2018-01-30 23:21:32
thumbnail: /2017/04/20170430_advice-for-rubymine-to-atom/thumbnail.jpg
categories:
  - engineering
  - for-beginner
tags:
  - dummy
related:
  - dummy
---

&nbsp;

&nbsp;

最近開発のエディタで Atom を使うようになりました。

<div class="adsense-double-rect"></div>

仕事での開発は Ruby が主で今までは、RubyMine や PHPStorm など
IntelliJ 製品 IDE を使っていたのですが、
「30 日で無料で使えなくなる」や、
「EAP なら使える」や
「しょうがない買うか！いやどうしようか。。」
などなど、迷うのが煩わしくなってきたので、Atom を使うようにしました。

&nbsp;

RubyMine などは結構好きで使ってたのですが、
よくよく考えると IDE の機能を隅から隅まで
使っている訳ではないので、
よく使う機能が Atom で実現できればいいっしょ。

&nbsp;

ということで Atom に乗り換えました。

&nbsp;

だいたい開発のときに使うのは以下の機能ですね。

<ul class="cool-list">
 	<li>
シンタックスハイライト
</li>
 	<li>
プロジェクト管理
</li>
 	<li>
宣言先にジャンプ
</li>
 	<li>
Console ( コード書きながらrails実行したりするので )
</li>
</ul>
&nbsp;

&nbsp;

なので、これらに関連してオススメのパッケージを下にまとめておきます。

<h2 class="chapter">シンタックスハイライト　<a href="https://atom.io/packages/linter">Linter</a></h2>
&nbsp;

今利用しているのが linter 　というパッケージ
インストールの仕方は簡単 Command + ,で　設定を開いて[ Install ] を選択
Linter で検索して、出てきたものをクリックです。

<img class="post-image almost-width" src="https://statics.ver-1-0.net/uploads/2017/04/20170430_advice-for-rubymine-to-atom/スクリーンショット-2017-04-29-22.59.17-1024x900.png" alt="スクリーンショット-2017-04-29-22.59.17-1024x900.png"/>

&nbsp;

これをいれた後に自分が使いたい言語のパッケージを同様の手順でインストールしていきます。
ちなみに私がいれているのは
linter-csslint
linter-htmllint
linter-jshlint ( javascript 用 )
linter-ruby
linter-php

ですね。
これらでだいたい自分が開発するものの
シンタックスハイライトを網羅できます。

&nbsp;

お次は、

<h2></h2>
<h2 class="chapter">パッケージ管理 <a href="https://atom.io/packages/project-manager">Project-Manger</a></h2>
&nbsp;

<img class="post-image almost-width" src="https://statics.ver-1-0.net/uploads/2017/04/20170430_advice-for-rubymine-to-atom/スクリーンショット-2017-04-30-12.11.34-897x1024.png" alt="スクリーンショット-2017-04-30-12.11.34-897x1024.png"/>

&nbsp;

&nbsp;

IDE だと一度開いたディレクトリを保存してくれたりするのですが、
テキストエディタだとデフォルトで
そういったことはしてくれません。

&nbsp;

&nbsp;

そこで、使うのが
project-manager というものです。

&nbsp;

使い方は
① プロジェクトとして管理したいディレクトリを「File」 -> 「Open...」で開く。
② ディレクトリを開いたら
「Packages」 -> 「Project Manager」 -> 「Save Project」

<img class="post-image almost-width" src="https://statics.ver-1-0.net/uploads/2017/04/20170430_advice-for-rubymine-to-atom/スクリーンショット-2017-04-30-11.58.58-1024x491.png" alt="スクリーンショット-2017-04-30-11.58.58-1024x491.png"/>

③ 別のプロジェクトを開きたいときは Cmd + Ctrl + P
でプロジェクトの一覧を表示して選択。

&nbsp;

プロジェクトを頻繁に切り替えるという人は、
Cmd + Shift + N で新しいタブを作って、
それぞれでプロジェクトを開いておくというのもありですね。

&nbsp;

<h2 class="chapter">宣言先にジャンプ <a href="https://atom.io/packages/goto-definition">Goto Definition</a></h2>
&nbsp;

これは、
RubyMine の奴が便利でしたねー。
Cmd ＋ Click で define している所に飛べるという。

Atom でこれをやるなら
<a href="https://atom.io/packages/goto-definition">Go To Definition</a>
が使えます。

これも使い方が簡単 パッケージ検索で名前を検索して、
インストールすればすぐ使えます。

&nbsp;

<h2 class="chapter">Console <a href="https://atom.io/packages/platformio-ide-terminal">Platoform-Ide-Terminal</a></h2>
<img class="post-image almost-width" src="https://statics.ver-1-0.net/uploads/2017/04/20170430_advice-for-rubymine-to-atom/スクリーンショット-2017-04-30-12.07.08-1024x625.png" alt="スクリーンショット-2017-04-30-12.07.08-1024x625.png"/>

&nbsp;

これは使う人が多いのかわからないのですが、
(パッケージあるということはいるんだろう）

&nbsp;

私が RubyMine を使っていた頃は、
エディタでコードをガリガリしつつ、
Console 画面を立ち上げて、
rails を起動していたり,
migration をしたりしていました。

&nbsp;

&nbsp;

全部を一画面でできるので重宝していたのですが、
Atom デフォルトでそれらしき機能は見つかりませんでしので、
いれたのが。

<a href="https://atom.io/packages/platformio-ide-terminal">Platoform-Ide-Terminal</a>

です。

&nbsp;

&nbsp;

操作感も普通のターミナルと同じように使えるので
問題ないです。
快適です。

以上!!
どれもオススメのパッケージです。

<div class="adsense-double-rect"></div>
