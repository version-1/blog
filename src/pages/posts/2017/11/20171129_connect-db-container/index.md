---
templateKey: blog-post
title: dockerコンテナのDBにホストから接続する方法
slug: /2017/11/29/connect-db-container
createdAt: 2017-11-29 23:07:19
updatedAt: 2018-01-30 23:16:43
thumbnail: ./thumbnail.jpg
categories: 
  - engineering
---

&nbsp;

&nbsp;
<h2 class="chapter">PostgresのコンテナのDBの中身をみたい</h2>
&nbsp;

掲題のようにdockerで作成したDBコンテナのDBにホスト側のクライアントツールで接続したいという欲求が高まったので記事にしました。

vagrantなどだと完全に別OSのサーバになるので、IPアドレスを調べてそのまま接続ということができるのですが、Dockerの場合は同OS上にコンテナを作成するのでIPは変わらずにいけます。
<pre><code class="console">psql -U [任意のuser] -h 127.0.0.1 database 
```
&nbsp;

&nbsp;

<div class="after-article"></div>

&nbsp;
<h2 class="chapter">ホストOSでもデータベースをインストールしている場合</h2>
&nbsp;

ホストOSでもpoostgresなどのDBサーバが起動している場合は、クライアントツールが先にホストOSのデータベースに接続してしまうので思ったことができません。

&nbsp;

その場合はサーバを停止してあげるかホスト側の5432以外のポートをコンテナの5432のポートに転送するように設定します。

サーバを停止せずにコンテナに接続するポートを変更する場合は、
コマンドなら

&nbsp;
<pre><code class="console">docker run -p [外部から接続したいポート]:80 postgres
```
&nbsp;

&nbsp;

docker-comopseなら

&nbsp;
<pre><code class="ruby">
  db:
    images: postgres
    ports:
      - "[外部から接続したいポート]:5432"

```
&nbsp;

とします。

あとは接続の際に先ほど指定した外部から接続する際に使うポートを指定してあげれば無事に接続できます。

&nbsp;
<pre><code class="console">psql -U [任意のuser] -h 127.0.0.1 -p [指定したポート] database
```
&nbsp;

GUIクライアントツールでも同様にポート番号やユーザ名に注意して接続可能です。

&nbsp;

&nbsp;
<h2 class="chapter">その他Dockerに関する記事たち</h2>
&nbsp;

dockerに関する記事を書いているので、よろしければどうぞ。

&nbsp;

<a href="https://ver-1-0.net/2017/11/19/rails-nginx-postgres-on-docker-1/">DockerでRails + Nginx + Postgresの環境を構築する。その①</a>

dockerの入門として、基本的な仕組みを説明し、コンテナを起動させたり、コンテナ’に接続してみたりしています。

&nbsp;

<a href="https://ver-1-0.net/2017/11/23/rails-nginx-postgres-on-docker-2/">DockerでRails + Nginx + Postgresの環境を構築する。その②</a>

rubyのイメージを使って、railsアプリケーションを構築する方法を説明しています。

&nbsp;

<a href="https://ver-1-0.net/2017/11/29/docker-rails-nginx-postgres/">DockerでRails + Nginx + Postgresの環境を構築する。その③</a>

dockerでのRails + Nginx + Postgres 環境について解説しています。

&nbsp;

&nbsp;

<div class="after-article"></div>
