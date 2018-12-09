---
templateKey: blog-post
title: ローカル開発環境〜Railsで普段開発している時の構成について〜
slug: 2017/09/27/architecture-for-local-rails
createdAt: 2017-09-27 00:14:50
updatedAt: 2017-12-22 22:47:09
thumbnail: http://ver-1-0.net/wp-content/uploads/2017/01/5ntkpxqt54y-sai-kiran-anagani.jpg
description: >-
  普段私が開発している時によくやるローカル開発環境の構成。簡単にいうと自分のPCの内部がどのようになっているか。
  というのを今回は共有したいと思います。
  ちなみに先に言って起きますが、あくまでも一例としてです。こんななやり方もあるのね程度でおさめていただければ嬉しいです。
categories:
  - engineering
  - rails
---

&nbsp;

&nbsp;

どうも、
今日記事を書くべきか早く寝るべきか
葛藤している<a href="https://twitter.com/version1_2017">@version1</a>です。

&nbsp;

&nbsp;

[adsense]

&nbsp;

普段私が開発している時に
よくやる<strong>ローカル開発環境</strong>の構成。
簡単にいうと自分のPCの内部が
どのようになっているか。

というのを今回は共有したいと思います。

ちなみに先に言って起きますが、
<h3>あくまでも一例として</h3>
です。
こんななやり方もあるのね程度でおさめて
いただければ嬉しいです。

&nbsp;

&nbsp;

<img class="alignnone size-full wp-image-704" src="http://ver-1-0.net/wp-content/uploads/2017/09/Untitled-Diagram.png" alt="ローカル開発環境の構成" width="721" height="611" />

&nbsp;

先に図を載せましたが、
いつも図のような形で開発を
行なっています。

&nbsp;

図にするとそこまで
複雑ではないので、
簡単に説明すると

&nbsp;
<ol>
 	<li>terminalでvagrantにSSH接続してRails起動</li>
 	<li>画像右上のRailsのアプリケーションはローカルPCのDatabase（③）に接続します。
（Vagrant上ではありません、Vagrant上だと使えるメモリ・CPUが限られるので）</li>
 	<li>Railsアプリケーションはブラウザから「http:192.168.33.10」のような形で
Vagrantサーバに接続して、wepページを開いて開発を行います。（②）</li>
 	<li>コードの修正はAtomが多いのですが、Atomでローカルのディレクトリのソースを
開いてコードの修正を行います。（①）
（FTPなどで編集を行うパッケージもあるとは思いますが、同期に時間かかりそうなので・・）</li>
</ol>
&nbsp;

といった感じです。

&nbsp;

&nbsp;

補足ですが、
通常特に設定を変更しないまま、
Vagrantイメージを作成して起動すると、
カレントディレクトリが/vagrantにマウントされて共有ディレクトリと
なります。

&nbsp;

&nbsp;

まあみなさんそれぞれの
形があるとは思うのですが、
私はこう言った形で開発を行うことが多いです。

&nbsp;

&nbsp;

未だとこれくらいのローカルの開発環境の構成なら、
話を聞いてパッとイメージできるんですけど、
初心者のころとかだと
何言っているかちんぷんかんぷんですよね。

まあそういうのの参考になれば。

以上です！！

[adsense]
