---
templateKey: blog-post
language: ja
title: DockerでRails + Nginx + Postgresの環境を構築する。その②
slug: /2017/11/23/rails-nginx-postgres-on-docker-2
createdAt: 2017-11-23 14:34:17
updatedAt: 2020-02-19 02:24:08
thumbnail: /2017/11/20171123_rails-nginx-postgres-on-docker-2/thumbnail.png
categories:
  - engineering
  - rails
tags:
  - docker
  - rails
  - nginx
  - postgress
  - build-env
  - serverside
related:
  - dummy
---

<h2 class="chapter">Dockerでrails5.1.4環境を構築する</h2>

前回の記事ではDockerをMacにインストールして、
少しDockerコンテナを起動させたり、
コンテナに繋いでDockerの操作に慣れました。

<ol>
 	<li><a href="https://ver-1-0.net/2017/11/19/rails-nginx-postgres-on-docker-1/">DockerでRails + Nginx + Postgresの環境を構築する。その①</a></li>
 	<li>DockerでRails + Nginx + Postgresの環境を構築する。その②</li>
 	<li><a href="https://ver-1-0.net/2017/11/29/docker-rails-nginx-postgres/">DockerでRails + Nginx + Postgresの環境を構築する。その③</a></li>
</ol>

今回はそのDockerでrails環境を構築して行きます。

<h2 class="chapter">環境構築の流れ</h2>
&nbsp;

環境構築の流れは以下になります。
<ol>
 	<li>ruby2.4.2のイメージを取得</li>
 	<li>rubyのコンテナでbundle init</li>
 	<li>Dockerfileを元にrailsをインストール</li>
 	<li>コンテナを起動した際に、Railsが立ち上がるように設定</li>
</ol>
手順はこちらの記事を参考にしました。
<a href="https://qiita.com/togana/items/30b22fc39fe6f7a188ec">RailsアプリをDockerで開発するための手順</a>

<div class="adsense"></div>

<h2 class="chapter">早速構築</h2>

<h3 class="section">ruby2.4.2のイメージを取得</h3>

まずはruby2.4.2がインストールされた、
イメージを取得してきます。

```bash
docker pull ruby:2.4.2
```

※前回の記事ですでにruby:2.4.2の取得が済んでいる人は、
ここはスキップしても大丈夫です。

<h3 class="section">rubyのコンテナでbundle init</h3>

取得したコンテナ内でbundle initして、
Gemfileを作成します。
```bash
docker run --rm -v "$PWD":/usr/src/sample -w /usr/src/sample ruby:2.4.2 bundle init
```

できたGemfileを編集して、
railsの行を追加してあげます。

```bash
$cat Gemfile
# frozen_string_literal: true

source "https://rubygems.org"

git_source(:github) {|repo_name| "https://github.com/#{repo_name}" }

 gem "rails", '5.1.4'

```

<h3 class="section">Dockerfileを基にrailsアプリ用イメージの作成</h3>

次にDockerfileを用いてrailsアプリ用のイメージをビルドして行きます。
今回は下記のようなDockerfileを作成します。

```docker
FROM ruby:2.4.2

ENV APP_ROOT /usr/src/sample

WORKDIR $APP_ROOT

RUN apt-get update && \
    apt-get install -y nodejs \
                       sqlite3 \
                       --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

COPY Gemfile $APP_ROOT
COPY Gemfile.lock $APP_ROOT

RUN \
  echo 'gem: --no-document' >> ~/.gemrc && \
  cp ~/.gemrc /etc/gemrc && \
  chmod uog+r /etc/gemrc && \
  bundle config --global build.nokogiri --use-system-libraries && \
  bundle config --global jobs 4 && \
  bundle install && \
  rm -rf ~/.gem

```

Dokcerfileとははapacheの設定ファイルのような形式で記述されたファイルになります。
ここに、
自由にイメージのビルドに必要なタスクを記述していくことで、
基のイメージから新しいイメージを作成することができます。

&nbsp;

今回はrailsに必要なモジュールがインストールされた
イメージを作成するためのDockerfileになっています。

Gemfile.lockがないので作成。
```bash
 :> Gemfile.lock
```

ビルドのコマンドは次のように、
ビルドの基になるイメージと基底ディレクトリを指定します。
```bash
$ docker build -t version1/sample .
```

docker images(イメージの一覧取得)を叩くと確かに新しいイメージが作成されています。
```bash
$docker images | grep version1
version1/sample         latest              f31106e13371        40 seconds ago      762MB

```

先ほどの手順までで、
railsに必要なモジュールがインストールできたので、
作成されたイメージでrails newして行きます。
```bash
$docker run --rm -it -v "$PWD":/usr/src/sample version1/sample rails new .
```

このコマンドは、
カレントディレクトリをversion1/sampleイメージの/usr/src/sampleに
マウントしてrails newしています。

これで、rails new できました。
ローカルでファイルをみてみるとrailsのファイル群がインストールされています。

&nbsp;
```bash
$ls -ltr
total 64
-rw-r--r--   1 admin  staff   546 Nov 23 13:01 Dockerfile
-rw-r--r--   1 admin  staff   130 Nov 23 13:06 config.ru
-rw-r--r--   1 admin  staff   227 Nov 23 13:06 Rakefile
-rw-r--r--   1 admin  staff   374 Nov 23 13:06 README.md
drwxr-xr-x   3 admin  staff   102 Nov 23 13:06 vendor
drwxr-xr-x   4 admin  staff   136 Nov 23 13:06 tmp
drwxr-xr-x  11 admin  staff   374 Nov 23 13:06 test
drwxr-xr-x   9 admin  staff   306 Nov 23 13:06 public
-rw-r--r--   1 admin  staff    64 Nov 23 13:06 package.json
drwxr-xr-x   3 admin  staff   102 Nov 23 13:06 log
drwxr-xr-x   4 admin  staff   136 Nov 23 13:06 lib
drwxr-xr-x   3 admin  staff   102 Nov 23 13:06 db
drwxr-xr-x  14 admin  staff   476 Nov 23 13:06 config
drwxr-xr-x  10 admin  staff   340 Nov 23 13:06 app
-rw-r--r--   1 admin  staff  1974 Nov 23 13:06 Gemfile
drwxr-xr-x   9 admin  staff   306 Nov 23 13:06 bin
-rw-r--r--   1 admin  staff  4772 Nov 23 13:06 Gemfile.lock

```

<div class="mid-article"></div>

<h3 class="section">コンテナを起動した際に、Railsが立ち上がるように設定</h3>

ここまででrailsが動く環境は作れましたが、
コンテナ起動と同時にRailsも立ち上がるようにしたいので、
Dockerfileに下記記述を追記します。
```docker
COPY . $APP_ROOT

EXPOSE  3000
CMD ["rails", "server", "-b", "0.0.0.0"]

```

記述を追記したら再度ビルドします。
追記した部分では、
ローカルのソースをコンテナ内の $APP_ROOTにコピーして、
3000番ポートを開けて、railsを起動しています。

```bash
docker build -t version1/sample .
```

これで構築は
完了なので、コンテナを起動させてみましょう。
```bash
docker run -d -p 3000:3000 -v "${PWD}:/usr/src/sample" version1/sample
```
※起動させる場合は、
-vコマンドでローカルのディレクトリをマウントして置くのがみそです。
これしないとローカルのソースとコンテナ内のソースが同期できないので

無事起動しました。
```bash
$docker ps
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                    NAMES
c7a0a8cfabe5        version1/sample     "rails server -b 0..."   8 seconds ago       Up 7 seconds        0.0.0.0:3000->3000/tcp   admiring_hugle

```

ブラウザから繋いでもみれます。

&nbsp;

<img class="post-image" src="https://statics.ver-1-0.xyz/uploads/2017/11/20171123_rails-nginx-postgres-on-docker-2/Screen-Shot-2017-11-23-at-13.24.29.png" alt="Screen-Shot-2017-11-23-at-13.24.29.png"/>

&nbsp;
<h2 class="chapter">少し開発してみる</h2>
&nbsp;

せっかくコンテナが
できたのでUserのCRUDくらいまで
作りましょう。

scaffoldする場合は、
```bash
docker exec -it c7a0a8cfabe5 bash
```
&nbsp;

としてコンテナに接続してコマンドを叩いてもいいですが、
面倒なので、
```bash
docker exec c7a0a8cfabe5 rails scaffold User name email age
```
とすればワンコマンドでscaffoldできます。

マイグレーションも
```bash
docker exec c7a0a8cfabe5 rake db:migrate
```
でいけます。

config/routes.rbも少し変更して、
ユーザ管理画面がトップに来るようにします。
```ruby
Rails.application.routes.draw do
  resources :users
  root 'users#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end

```

config/配下を修正したので、
コンテナを再起動させます。
```bash
docker restart c7a0a8cfabe5
```

これで、
http://localhostに接続すれば。

ユーザ管理画面が表示されます。

<img class="post-image" src="https://statics.ver-1-0.xyz/uploads/2017/11/20171123_rails-nginx-postgres-on-docker-2/Screen-Shot-2017-11-23-at-14.07.19.png" alt="Screen-Shot-2017-11-23-at-14.07.19.png"/>

構築は以上です。

<h2 class="chapter">まとめ</h2>

ここまで、railsの環境構築をしましたが、
Dockerには一プロセス一コンテナという原則みたいなものがあるので、
アプリとDBではコンテナを分ける必要があります。
（今回はsqliteを使ったので、DBと一緒のコンテナにしてます。）

&nbsp;

コンテナ管理ツールとして
docker-composeというものがあるので、
次はそれを使いながら、
rails + nginx + postgres環境を構築したいと思います。

<div class="after-article"></div>
