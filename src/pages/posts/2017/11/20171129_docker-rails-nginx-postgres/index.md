---
templateKey: blog-post
title: DockerでRails + Nginx + Postgresの環境を構築する。その③
slug: /2017/11/29/docker-rails-nginx-postgres
createdAt: 2017-11-29 02:41:35
updatedAt: 2018-08-26 01:06:08
thumbnail: ./thumbnail.jpg
categories: 
  - engineering
  - rails
---

&nbsp;
<h2 class="chapter">Docker Composeを利用する</h2>
&nbsp;


<ol>
 	<li><a href="https://ver-1-0.net/2017/11/19/rails-nginx-postgres-on-docker-1/">DockerでRails + Nginx + Postgresの環境を構築する。その①</a></li>
 	<li><a href="https://ver-1-0.net/2017/11/23/rails-nginx-postgres-on-docker-2/">DockerでRails + Nginx + Postgresの環境を構築する。その②</a></li>
 	<li>DockerでRails + Nginx + Postgresの環境を構築する。その③</li>
</ol>



前回二つの記事でDockerとは何？？ということや、Dockerでrailsのアプリケーションを構築する方法などを紹介してきました。今回はそのラストの記事になります。


前回までは、イメージを引っ張ってきて、コンテナ作って、起動してRailsアプリケーションを作ってという一コンテナの話に終始していましたが今回は違います。

今回はdocler-composeを使って、各コンテナを管理するということを行なっていきます。そのゴールとしてRailsの構成としてよくある<strong>Rails+Nginx+Postgres</strong>という構成を実現するということをやっていきます。

Dockerには<strong>「一コンテナ一プロセス」</strong>という思想があり一つのコンテナにアプリケーションもデータベースもぜーんぶ含め流のではなく、アプリケーション用のコンテナ、Webサーバ用のコンテナ、DB用のコンテナに分けてコンテナを作りそれぞれを連携させるというのが正しいあり方になっています。

&nbsp;

そうなると当然Railsのアプリケーションを立ち上げた時に

<strong>「どのコンテナを起動すればいいの？」</strong>

などの管理が大変になります。

&nbsp;

その問題を解決するのがdocker-composeでyaml形式のdocker-compose.ymlファイルにそれぞれのコンテナの関係性を記述していきます。

そのため、一度docker-composeを記述してしまえば、
```bash
docker-compose up
```
のコマンドだけで必要なコンテナが起動することができます。

docker-compose.ymlの紹介はここまでにして、実際にdocker-composeでrails+nginx+postgress環境を作っていきましょう。

<div class="after-intro"></div>

&nbsp;
<h2 class="chapter">rails new でアプリケーション環境を構築</h2>
&nbsp;

&nbsp;

まずは前回作成したrails のイメージを使ってrailsアプリケーションをローカルのディレクトリに生成します。

&nbsp;

コマンドを実行する前に適当なGemfileをカレントにコピっといてください。Gemfileがないと当然怒られます。
```bash
mkdir rnp-sample &amp; cd rnp-sample
cp -pr [手頃なGemfile] ./.
docker run --rm -it -v "$PWD":/usr/src/sample version1/sample bundle install
docker run --rm -it -v "$PWD":/usr/src/sample version1/sample rails new . -d postgresql
```
これで構築を始める準備完了です。

&nbsp;

次に、コンテナを起動する際のDockerfileを用意します。

Docker Fileはこんな形になります。
```docker
FROM ruby:2.4.2

# 必要なモジュールをインストール
# ここでpostgresのクライアントを入れておく
RUN apt-get update -qq &amp;&amp; \
    apt-get install -y build-essential libpq-dev nodejs postgresql-client

ENV APP_DIR /rnp

# Rails App
RUN mkdir /rnp
WORKDIR $APP_DIR
ADD Gemfile $APP_DIR
ADD Gemfile.lock $APP_DIR
RUN bundle install
ADD . $APP_DIR
RUN mkdir -p tmp/sockets # nginxとの通信用


# Expose volumes to frontend
VOLUME /rnp/public
VOLUME /rnp/tmp

# Start Server
CMD bundle exec puma

```
このファイルで行なっていることは前回の内容とかぶるところが多いので説明は省きます。

&nbsp;

ここまででアプリケーション部分の準備は完了です。
お次は、postgresです。

&nbsp;
<h2 class="chapter">postgresの環境を構築</h2>
&nbsp;

railsアプリのファイル群をルート直下（rnp-sample/)に置いて他のコンテナはcontainers/配下に配置するような形で配置していきます。
```bash
mkdir -p containers/postgres
cd containers/postgres
echo 'create database rnp;' > initdb.sql
touch Dockerfile

```
&nbsp;

このような形でpostgres関係のファイルを配置していきます。

&nbsp;

initdb.sqlというファイルが気になるかと思うのですが、postgresイメージを使用してコンテナを作成する場合に、sqlファイルやshファイルを/docker-entrypoint-initdb.d/配下に配置しておくと、コンテナ起動時にそれらを実行してくれます。

ここでは、とりあえずアプリケーションで使用するDatabaseだけ作成していますが、ユーザを作成するSQLを入れたりするのも良いかと思います。

&nbsp;

&nbsp;

Dokcerファイルは次のようになります。
```docker
FROM postgres:10.1
COPY initdb.sql /docker-entrypoint-initdb.d/.

```
シンプルに先ほど作成したsqlを/docker-entrypoint-initdb.d下にコピーしただけです。Dockerfileでここまでやっておけばあとはビルドしたときに勝手にSQLが発行されます。

&nbsp;

&nbsp;
<h2 class="chapter">nginxの環境を構築</h2>
&nbsp;

&nbsp;

次は、nginxの環境を構築していきます。
```bash
mkdir -p containers/nginx
cd containers/nginx
touch Dockerfile

```
&nbsp;

Dockerfileは
```docker
FROM nginx:1.12.2
RUN rm -f /etc/nginx/conf.d/*
ADD nginx.conf /etc/nginx/conf.d/[任意のアプリ名].conf
CMD /usr/sbin/nginx -g 'daemon off;' -c /etc/nginx/nginx.conf

```
&nbsp;

このようになりADDするnginx.confは下記のようになります。

&nbsp;
```nginx
# https://github.com/puma/puma/blob/master/docs/nginx.md
upstream [任意のアプリ名] {
  server unix:///[任意のアプリ名]/tmp/sockets/puma.sock;
}

server {
  listen 80;
  server_name localhost;

  keepalive_timeout 5;

  # static files
  root /[任意のアプリ名]/public;

  location / {
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header Host $http_host;

    # static files
    if (-f $request_filename) {
      break;
    }
    if (-f $request_filename.html) {
      rewrite (.*) $1/index.html break;
    }
    if (-f $request_filename.html) {
      rewrite (.*) $1.html break;
    }

    if (!-f $request_filename) {
      proxy_pass http://[任意のアプリ名];
      break;
    }
  }

  location ~* \.(ico|css|gif|jpe?g|png|js)(\?[0-9]+)?$ {
    expires max;
    break;
  }
}

```
&nbsp;

また、これに関連してpumaの設定の変更も必要なので

&nbsp;

config/puma.rb
```ruby
threads_count = ENV.fetch("RAILS_MAX_THREADS") { 5 }.to_i
threads threads_count, threads_count
port        ENV.fetch("PORT") { 3000 }
environment ENV.fetch("RAILS_ENV") { "development" }
plugin :tmp_restart

app_root = File.expand_path("../..", __FILE__)
bind "unix://#{app_root}/tmp/sockets/puma.sock"

stdout_redirect "#{app_root}/log/puma.stdout.log", "#{app_root}/log/puma.stderr.log", true


```
とします。

&nbsp;

お次は実際にdocker-composeを書いていきます。

&nbsp;

&nbsp;

<div class="mid-article"></div>
<h2 class="chapter">docker-composeでRails+Nginx+Postgresを管理する。</h2>
&nbsp;

先にも書いたようにdocker-composeはyml形式で各コンテナ間の関係を記載していて、先に今回のdocker-composeを見せておくと以下のようになります。

&nbsp;
```yaml
version: '2'
services:
  app:
    build: .
    volumes:
      - .:/rnp
    depends_on:
      - db
  db:
    build: containers/postgres
    environment:
      - POSTGRES_PASSWORD=password
    volumes:
      - ./db/pgdata:/var/lib/postgresql/data
  web:
    build: containers/nginx
    ports:
      - "80:80"
    volumes_from:
      - app

```
&nbsp;

それぞれservicesの下で各コンテナに関して定義をしており,buildという命令がどのディレクトリでビルドを行うのか指名します。
※docker-composeに関してはこちらを<a href="http://docs.docker.jp/compose/toc.html">compose リファレンス</a>参考にすると良いと思います。

今回の場合は,app = rails, db = postgres , web = nginxとなります。左辺に関しては自由に名前をつけるごとができ、わかりやすいような名前をつけることが好ましいです。

&nbsp;

他の命令を説明するとvolumesでホストOSのディレクトリをコンテナ内のディレクトリにマウントしています。上のDockerfileではapp,dbでマウントを行なっていますが、appではホストOSのファイルの変更がコンテナに同期されるため、dbではコンテナを削除してもデータが消えないようにするために行なっています。

構築の段階ではあまり気になりませんが、railsのアプリのコードがコンテナと同期されていないといちいちコンテナ内に入ってソースを変更しなくてはなりません。<strong>appのマウントは開発中の手間を省くため</strong>に行なっています。

一方dbでのマウントは<strong>データの永続化</strong>を実現するために行なっています。これをしないとコンテナを終了した場合や自分のPCを再起動した場合docker上のデータは完全に失われてしまいます。コンテナを起動するたびに新たにデータを入れ直すというスクリプトを組むことも可能ですが、都度時間を取られてしまうので、望ましくないです。

<strong>データベースの永続化</strong>は検索してみると色々な記事が出てくるので腑に落ちない場合はそれらを参考にすると良いと思います。

ここまででだいたい<strong>Rails+Nginx+Postgres</strong>の環境構築はあとビルドするだけとなってはいますが、最後にデータベースの設定だけ変更して完了となります。

下記はあくまでも例ですが、お使いの環境に合わせてconfig/database.ymlを変更しましょう。
```yaml
default: &amp;default
  adapter: postgresql
  encoding: unicode
  pool: <%= ENV.fetch("RAILS_MAX_THREADS") { 5 } %>
  host: db
  database: rnp
  username: postgres
  password: password

```
databaseのパスワードはdocker-composeで記した環境変数の値になります。また、ここでホスト名をdbとしている所にも注意です。

&nbsp;

ここまでで一通り準備ができたのでビルドしていきます。
<pre><code class="console">docker-compose up
```
エラーが出力されず、問題なさそうでなければhttp://localhostに接続してrailsのトップ画面が出力されることを確認します。

&nbsp;

ここまでで構築は完了です。追加で開発を行いたい場合は、
```bash
docker-compose run --rm app rails g scaffold
```
や
```bash
docker-compose run --rm app rake db:migrate
```
とすれば
などどして開発して行けばホストOSにrailsがインストールされていなくても開発を行うことができます。

&nbsp;

docker-comoposeは一度触っただけではなかなか理解しづらい部分がありました。今回この記事をかくにあたり自分で試行錯誤をしたらだいぶ理解が深まったように思います。データの永続化など実際開発を行うときに大事になる部分はあまり説明できなかったので、もしかしたら別記事でフォローするようなことがあるかもしれません。

とりあえず今回はここまでとします。

では。

<div class="after-article"></div>
