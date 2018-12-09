---
templateKey: blog-post
title: \[Atom\]   個人的RubyMineからAtomに切り替えた人おすすめパッケージ
slug: 2017/04/30/advice-for-rubymine-to-atom
description: &nbsp;

&nbsp;

最近開発のエディタで
Atomを使うようになりました。
[adsense_double_rect]

&nbsp;

&nbsp;

仕事での開発はRubyが主で
今までは、RubyMineやPHPStormなど
IntelliJ製品IDEを使っていたのですが、
「30日で無料で使えなくなる」や、
「EAPなら使える」や
「しょうがない買うか！いやどうしようか。。」
などなど、
迷うのが煩わしくなってきたので、
Atomを使うようにしました。

&nbsp;

RubyMineなどは結構好きで使ってたのですが、
よ
createdAt: 2017-04-30 12:16:19
updatedAt: 2018-01-30 23:21:32
thumbnail: http://ver-1-0.net/wp-content/uploads/2017/01/5ntkpxqt54y-sai-kiran-anagani.jpg
categories: 
  - engineering
  - for-beginner
---

&nbsp;

&nbsp;

最近開発のエディタで
Atomを使うようになりました。
[adsense_double_rect]

&nbsp;

&nbsp;

仕事での開発はRubyが主で
今までは、RubyMineやPHPStormなど
IntelliJ製品IDEを使っていたのですが、
「30日で無料で使えなくなる」や、
「EAPなら使える」や
「しょうがない買うか！いやどうしようか。。」
などなど、
迷うのが煩わしくなってきたので、
Atomを使うようにしました。

&nbsp;

RubyMineなどは結構好きで使ってたのですが、
よくよく考えるとIDEの機能を隅から隅まで
使っている訳ではないので、
よく使う機能がAtomで実現できればいいっしょ。

&nbsp;

ということでAtomに乗り換えました。

&nbsp;

だいたい開発のときに使うのは以下の機能ですね。
なので、これらに関連してオススメのパッケージを下にまとめておきます。

&nbsp;

&nbsp;
<ul class="cool-list">
 	<li>
<h3>シンタックスハイライト</h3>
</li>
 	<li>
<h3>プロジェクト管理</h3>
</li>
 	<li>
<h3>宣言先にジャンプ</h3>
</li>
 	<li>
<h3>Console ( コード書きながらrails実行したりするので )</h3>
</li>
</ul>
&nbsp;

&nbsp;

それでは、
<h2></h2>
<h2></h2>
<h2 class="chapter">シンタックスハイライト　<a href="https://atom.io/packages/linter">Linter</a></h2>
&nbsp;

今利用しているのがlinter　というパッケージ
インストールの仕方は簡単 Command + ,で　設定を開いて[ Install ] を選択
Linter で検索して、出てきたものをクリックです。

<a href="http://ver-1-0.net/wp-content/uploads/2017/04/スクリーンショット-2017-04-29-22.59.17.png"><img class="alignnone size-large wp-image-332" src="http://ver-1-0.net/wp-content/uploads/2017/04/スクリーンショット-2017-04-29-22.59.17-1024x900.png" alt="Linter" width="700" height="615" /></a>

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

<a href="http://ver-1-0.net/wp-content/uploads/2017/04/スクリーンショット-2017-04-30-12.11.34.png"><img class="alignnone size-large wp-image-336" src="http://ver-1-0.net/wp-content/uploads/2017/04/スクリーンショット-2017-04-30-12.11.34-897x1024.png" alt="" width="700" height="799" /></a>

&nbsp;

&nbsp;

IDEだと一度開いたディレクトリを保存してくれたりするのですが、
テキストエディタだとデフォルトで
そういったことはしてくれません。

&nbsp;

&nbsp;

そこで、使うのが
project-managerというものです。

&nbsp;

使い方は
①プロジェクトとして管理したいディレクトリを「File」 -&gt; 「Open...」で開く。
②ディレクトリを開いたら
「Packages」 -&gt; 「Project Manager」 -&gt; 「Save Project」
でプロジェクトを保存。<a href="http://ver-1-0.net/wp-content/uploads/2017/04/スクリーンショット-2017-04-30-11.58.58.png"><img class="alignnone size-large wp-image-333" src="http://ver-1-0.net/wp-content/uploads/2017/04/スクリーンショット-2017-04-30-11.58.58-1024x491.png" alt="ProjectManager" width="700" height="336" /></a>
③別のプロジェクトを開きたいときは Cmd + Ctrl + P
でプロジェクトの一覧を表示して選択。

&nbsp;

プロジェクトを頻繁に切り替えるという人は、
Cmd + Shift + N で新しいタブを作って、
それぞれでプロジェクトを開いておくというのもありですね。

&nbsp;

&nbsp;

&nbsp;

&nbsp;
<h2 class="chapter">宣言先にジャンプ <a href="https://atom.io/packages/goto-definition">Goto Definition</a></h2>
&nbsp;

これは、
RubyMineの奴が便利でしたねー。
Cmd ＋ Click でdefineしている所に飛べるという。

Atomでこれをやるなら
<a href="https://atom.io/packages/goto-definition">Go To Definition</a>
が使えます。

これも使い方が簡単 パッケージ検索で名前を検索して、
インストールすればすぐ使えます。
<h2></h2>
<h2></h2>
&nbsp;

&nbsp;
<h2 class="chapter">Console <a href="https://atom.io/packages/platformio-ide-terminal">Platoform-Ide-Terminal</a></h2>
<a href="http://ver-1-0.net/wp-content/uploads/2017/04/スクリーンショット-2017-04-30-12.07.08.png"><img class="alignnone size-large wp-image-334" src="http://ver-1-0.net/wp-content/uploads/2017/04/スクリーンショット-2017-04-30-12.07.08-1024x625.png" alt="Platform-Ide-Terminal" width="700" height="427" /></a>

&nbsp;

&nbsp;

&nbsp;

これは使う人が多いのかわからないのですが、
(パッケージあるということはいるんだろう）

&nbsp;

私がRubyMineを使っていた頃は、
エディタでコードをガリガリしつつ、
Console画面を立ち上げて、
railsを起動していたり,
migrationをしたりしていました。

&nbsp;

&nbsp;

全部を一画面でできるので重宝していたのですが、
Atomデフォルトでそれらしき機能は見つかりませんでしので、
いれたのが。

<a href="https://atom.io/packages/platformio-ide-terminal">Platoform-Ide-Terminal</a>

です。

&nbsp;

&nbsp;

操作感も普通のターミナルと同じように使えるので
問題ないです。
快適です。

&nbsp;

&nbsp;

&nbsp;

&nbsp;

以上!!
どれもオススメのパッケージです。

[adsense_double_rect]
