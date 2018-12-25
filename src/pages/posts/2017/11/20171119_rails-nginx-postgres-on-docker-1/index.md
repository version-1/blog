---
templateKey: blog-post
title: DockerでRails + Nginx + Postgresの環境を構築する。その①
slug: /2017/11/19/rails-nginx-postgres-on-docker-1
createdAt: 2017-11-19 16:45:50
updatedAt: 2018-08-26 01:11:58
thumbnail: ./thumbnail.jpg
categories: 
  - engineering
  - rails
---

&nbsp;

&nbsp;

タイトルのように、
何回かに分けてRails + Nginx + Postgresの環境を
Dockerで構築していきます。

<ol>
 	<li>DockerでRails + Nginx + Postgresの環境を構築する。その①</li>
 	<li><a href="https://ver-1-0.net/2017/11/23/rails-nginx-postgres-on-docker-2/">DockerでRails + Nginx + Postgresの環境を構築する。その②</a></li>
 	<li><a href="https://ver-1-0.net/2017/11/29/docker-rails-nginx-postgres/">DockerでRails + Nginx + Postgresの環境を構築する。その③</a></li>
</ol>
構築を行う前に簡単にDockerの説明から。

※書いていたらそれなりの長さになったので、
Dockerをインストールして、
ちょっと触ってみるところまでで一旦切りました。

Dockerは、
PC上にコンテナという仮想のサーバを作成して、
その上にRailsやPostgres,Nginxなどの環境を構築するものです。

<div class="after-intro"></div>
<h2 class="chapter">Dockerの基本的な仕組み -Virtual Machineとの違い-</h2>
下に図を貼りつけましたが、

<img class="post-image" src="./CompareVMtoDoc-1.jpg" alt="CompareVMtoDoc-1.jpg"/>

<strong>「DockerはVirtual Boxなどの仮想マシンとどう違うの？」</strong>
というように比較して語られることが多いです。

図では、

左側がDocker
右側がVirtual BoxなどのVirtualMachineの
場合の構成になっています。

VMは図を見てわかるように
<strong>Hypervisor（ハイパバイザー）という仮想化技術</strong>を挟んで、
サーバを仮想的に構築します。
このHypervisor（ハイパバイザー）を使用する場合、
メモリなどのリソースをVMごとに割り当て、
ゲストOS上でアプリケーションを稼働させることになるため、
<strong>ゲストOSの分容量であったり、メモリなどのリソースを</strong>
<strong> 大きく取られてしまうことになります。</strong>

対して、
<strong>Docker</strong>のようなコンテナ型のものは、
リソースやカーネルをホストOSと共有するので、
VM型のように余分なリソースを食われることが
少なく、イメージサイズも小さい軽量なものとなります。
（ Windows,Macなどの場合は、ホストOS上にハイパバイザー型の仮想マシンを立ち上げそのゲストOS上にDockerEngineを動かす形になるので、
Linux版にDockerをインストールをするのが、これらのメリットを
多く受けられるようです。）

&nbsp;

このような軽量であることのメリット以外にも、
開発環境で作成したアプリケーションをイメージ化して本番にデプロイができるので、
本番環境と開発環境の差異を極限まで小さくできるという
メリットもあります。

本番環境にDockerさえ入っていれば、
本番環境にDockerのイメージを配置してそのまま、
動かすことができてしまいます。
コードでデプロイするのではなく、
コンテナごと配布する形になるそうです。

&nbsp;

Dockerの仕組みやメリットについての説明は
これくらいにして、
次は実際の構築をやっていきます。

&nbsp;

<div class="mid-article"></div>

&nbsp;
<h2 class="chapter">Dockerのインストール</h2>
&nbsp;

今回は、
MacでのDockerのインストールの仕方だけ説明します。

インストールはこちらからできます。
<a href="https://store.docker.com/editions/community/docker-ce-desktop-mac">https://store.docker.com/editions/community/docker-ce-desktop-mac</a>

インストールの方法は簡単で、
リンク先からDocker.dmgをダウンロードして起動するだけです。

特段コマンドを打ったりする必要はありません。

&nbsp;

&nbsp;
<h2 class="chapter">Dockerを触ってみる。基本コマンドの説明</h2>
&nbsp;

まずは簡単に触ってみてDockerのイメージを
掴んでいきます。
コンソールから以下コマンドを叩いてみましょう。
```bash
docker pull hello-world
```
&nbsp;

実行結果は以下のようになります。
```bash
$docker run hello-world
Unable to find image 'hello-world:latest' locally
latest: Pulling from library/hello-world
9a0669468bf7: Already exists
Digest: sha256:cf2f6d004a59f7c18ec89df311cf0f6a1c714ec924eebcbfdd759a669b90e711
Status: Downloaded newer image for hello-world:latest

Hello from Docker!
This message shows that your installation appears to be working correctly.

To generate this message, Docker took the following steps:
 1. The Docker client contacted the Docker daemon.
 2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
 3. The Docker daemon created a new container from that image which runs the

    executable that produces the output you are currently reading.
 4. The Docker daemon streamed that output to the Docker client, which sent it
    to your terminal.

To try something more ambitious, you can run an Ubuntu container with:
 $ docker run -it ubuntu bash

Share images, automate workflows, and more with a free Docker ID:
 https://cloud.docker.com/

For more examples and ideas, visit:
 https://docs.docker.com/engine/userguide/

```
&nbsp;

<strong>docker run</strong> は、<strong>コンテナの起動</strong>を行なうコマンドです。

実行結果を補足するために
以下に図を用意しました。

<img class="post-image" src="./Docker-1.png" alt="Docker-1.png"/>

Dockerはクライアントーサーバ型のアーキテクチャになっており、
インストールした直後から起動している
<strong>Docker Daemon</strong>という
常駐型のプロセスがコマンドを待ち受けています。

そこに、
先ほどのようにrunコマンドを実行すると、
ClientからDockerデーモンにhello-worldというコンテナを
起動するように命令が飛びます。

デーモンは、命令の通りローカルに保存されているイメージ（コンテナを作成するための雛形のようなもの）を調べて、
命令どおりのhello-worldというイメージがすでに存在するか
確認します。

今回の場合。
実行結果にも"Unable to find image 'hello-world:latest' locally"と出力されているように
ローカルでイメージが見つからないので、
Registryからイメージを取得してコンテナを作成しています。

図でいうところの<strong>青色の矢印</strong>がこの流れ
になります。

&nbsp;

ローカルにどのイメージが存在するか下記コマンドで
確認できます。
```bash
docker images
```
先ほどのrunコマンドを実行した後であれば、
hello-worldイメージが取得されていることを確認できる
と思います。

この状態でrunコマンドを実行すると
図の<strong>赤い矢印</strong>がさすようにすでに存在するイメージを
再利用してコンテナを作成します。

お次は、
railsのコンテナを作成していくので、
まずはrubyのイメージを取得しましょう。
```bash
docker pull ruby:2.4.2
```
取得できたら、
コンテナの中をみて見ましょう。
```bash
$docker run -it ruby:2.4.2 bin/bash
root@e77b7d2cc4a0:/#
root@e77b7d2cc4a0:/#
root@e77b7d2cc4a0:/# ruby -v
ruby 2.4.2p198 (2017-09-14 revision 59899) [x86_64-linux]
root@e77b7d2cc4a0:/#
```
&nbsp;

&nbsp;

<strong>runコマンドに -i と -t オプションを与えてあげて、</strong>
<strong> シェルを起動させる</strong>と、
コンテナの中をみることができます。
railsサーバの構築とは直接関係ないですが、
何か詰まった時に確認できる方法なので、
知っておくと良いと思います。

また、
bashを起動した状態で別ウィンドウから
```bash
docker ps
```
と叩くと起動しているコンテナが確認できます。

dockerを扱うにあたり、
images, run , pull , ps あたりは基本のコマンドなので
覚えておくと良いと思います。

ここまでは、
コンテナを取得・起動して基本のコマンドについて
画像付きで説明しましたが、
このあとは実際にrailsサーバを立てていきます。

と思ったのですが、
長くなったのでこの記事は一旦ここまでと
します。

また別の機会に
続きを書いていきます。

[after_article]
