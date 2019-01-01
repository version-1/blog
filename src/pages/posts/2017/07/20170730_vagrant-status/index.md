---
templateKey: blog-post
title: vagrantローカルPCのインスタンスの起動状態を知りたい！vagrant global-statusコマンド
slug: /2017/07/30/vagrant-status
createdAt: 2017-07-30 22:38:20
updatedAt: 2018-08-26 11:47:58
thumbnail: /2017/07/20170730_vagrant-status/thumbnail.jpg
categories: 
  - engineering
---

&nbsp;

&nbsp;

どうも、
今回は久しぶりにvagrantの話題です。

&nbsp;

vagrantって
みなさんいちいちVagrantfileのある
それぞれのイメージの
ルートディレクトリに移動（cd)してから
コマンド叩いていたりしませんか？

&nbsp;

<strong>「え、そんなことない」</strong>

と言う方もいるかもしれませんが、

&nbsp;

上記に当てはまる方に朗報です。

vagrantでは、
ローカルPCに散らばるイメージの稼働状況を
みるコマンドが存在します。

&nbsp;

&nbsp;

それは
```bash
vagrant global-status
```
です。

&nbsp;

&nbsp;

これでどのディレクトリにいても、
vagrantの稼働状況を確認します。

実行結果はこんな感じ。
```bash
$vagrant global-status
id       name    provider   state    directory
-------------------------------------------------------------------------
4445c4b  default virtualbox poweroff /Users/admin/Vagrant/hoge
4a947f0  default virtualbox poweroff /Users/admin/Vagrant/ubu
5212b05  default virtualbox poweroff /Users/admin/Vagrant/foo
41ec701  default virtualbox running  /Users/admin/Vagrant/bar

The above shows information about all known Vagrant environments
on this machine. This data is cached and may not be completely
up-to-date. To interact with any of the machines, you can go to
that directory and run Vagrant, or you can use the ID directly
with Vagrant commands from any directory. For example:
"vagrant destroy 1a2b3c4d"

```
こんな感じで、
<strong>使ってないのに、起動してしまっている</strong>
<strong> サーバ</strong>を確認できます。

&nbsp;

しかも消した時は、
表示されているidを引数に渡して
```bash
vagrant halt 41ec701
```
みたいな感じで
狙いを定めてサーバを停止できます。

さらに複数のサーバを停止させたい時は
引数に複数のidを渡してあげれば、
一気にサーバを停止できます。

停止もできるのでもちろん
起動もできるし、
実行結果にもあるようにインスタンスの削除も
可能です。

私のPCではたまに上げっぱなしの
サーバがリソースを食っていたりするので、
この方法でチェックー＞必要なければ停止させるという
ことをやっています。

便利ですよね！
すでに知っている方もいるかとは思いますが
共有まで！！

&nbsp;

&nbsp;
<a href="http://amzn.to/2eY82uA">Vagrant入門ガイド</a>
<a href="https://www.amazon.co.jp/Vagrant%E5%85%A5%E9%96%80%E3%82%AC%E3%82%A4%E3%83%89-%E6%96%B0%E5%8E%9F%E9%9B%85%E5%8F%B8-ebook/dp/B00F418SQ8/ref=as_li_ss_il?ie=UTF8&linkCode=li2&tag=llg01-22&linkId=113f390bb992a0fab201daecb538973c" target="_blank"><img border="0" src="//ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B00F418SQ8&Format=_SL160_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=llg01-22" ></a><img src="https://ir-jp.amazon-adsystem.com/e/ir?t=llg01-22&l=li2&o=9&a=B00F418SQ8" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />

&nbsp;
