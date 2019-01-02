---
templateKey: blog-post
title: ローカル開発環境〜Railsで普段開発している時の構成について〜
slug: /2017/09/27/architecture-for-local-rails
createdAt: 2017-09-27 00:14:50
updatedAt: 2017-12-22 22:47:09
thumbnail: /2017/09/20170927_architecture-for-local-rails/thumbnail.jpg
categories:
  - engineering
  - rails
---

どうも、
今日記事を書くべきか早く寝るべきか
葛藤している<a href="https://twitter.com/version1_2017">@version1</a>です。

<div class="adsense"></div>

普段私が開発している時に
よくやる<strong>ローカル開発環境</strong>の構成。
簡単にいうと自分のPCの内部が
どのようになっているか。というのを今回は共有したいと思います。

ちなみに先に言って起きますが、**あくまでも一例として**
です。こんななやり方もあるのね程度でおさめていただければ嬉しいです。

<img class="post-image" src="https://s3-ap-northeast-1.amazonaws.com/statics.ver-1-0.net/uploads/2017/09/20170927_architecture-for-local-rails/diagram.png" alt="Diagram"/>


先に図を載せましたが、
いつも図のような形で開発を
行なっています。


図にするとそこまで複雑ではないので、簡単に説明すると

<ol>
 	<li>terminalでvagrantにSSH接続してRails起動</li>
 	<li>画像右上のRailsのアプリケーションはローカルPCのDatabase（③）に接続します。
（Vagrant上ではありません、Vagrant上だと使えるメモリ・CPUが限られるので）</li>
 	<li>Railsアプリケーションはブラウザから「http://192.168.33.10」のような形で
Vagrantサーバに接続して、wepページを開いて開発を行います。（②）</li>
 	<li>コードの修正はAtomが多いのですが、Atomでローカルのディレクトリのソースを
開いてコードの修正を行います。（①）
（FTPなどで編集を行うパッケージもあるとは思いますが、同期に時間かかりそうなので・・）</li>
</ol>

といった感じです。


補足ですが、
通常特に設定を変更しないまま、
Vagrantイメージを作成して起動すると、
カレントディレクトリが/vagrantにマウントされて共有ディレクトリと
なります。

まあみなさんそれぞれの
形があるとは思うのですが、
私はこう言った形で開発を行うことが多いです。

未だとこれくらいのローカルの開発環境の構成なら、
話を聞いてパッとイメージできるんですけど、
初心者のころとかだと
何言っているかちんぷんかんぷんですよね。

まあそういうのの参考になれば。

以上です！！

<div class="adsense"></div>
