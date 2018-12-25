---
templateKey: blog-post
title: DockerでRails + Nginx + Postgresの環境を構築する。その②
slug: 2017/11/23/rails-nginx-postgres-on-docker-2
createdAt: 2017-11-23 14:34:17
updatedAt: 2018-08-26 01:09:02
thumbnail: https://ver-1-0.net/wp-content/uploads/2017/11/whale-2193356_640-1.jpg
description: >-
  前回の記事ではDockerをMacにインストールして、
  少しDockerコンテナを起動させたり、
  コンテナに繋いでDockerの操作に慣れました。
categories:
  - engineering
  - rails
---

<h2 class="chapter">Dockerでrails5.1.4環境を構築する</h2>
&nbsp;

前回の記事ではDockerをMacにインストールして、
少しDockerコンテナを起動させたり、
コンテナに繋いでDockerの操作に慣れました。

<ol>
 	<li><a href="https://ver-1-0.net/2017/11/19/rails-nginx-postgres-on-docker-1/">DockerでRails + Nginx + Postgresの環境を構築する。その①</a></li>
 	<li>DockerでRails + Nginx + Postgresの環境を構築する。その②</li>
 	<li><a href="https://ver-1-0.net/2017/11/29/docker-rails-nginx-postgres/">DockerでRails + Nginx + Postgresの環境を構築する。その③</a></li>
</ol>

今回はそのDockerでrails環境を構築して行きます。

&nbsp;

&nbsp;
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

&nbsp;

&nbsp;

[after_intro]

&nbsp;

&nbsp;
<h2 class="chapter">早速構築</h2>
&nbsp;
<h3 class="section">ruby2.4.2のイメージを取得</h3>
&nbsp;

まずはruby2.4.2がインストールされた、
イメージを取得してきます。
<pre><code class="language-bash">docker pull ruby:2.4.2</code></pre>
※前回の記事ですでにruby:2.4.2の取得が済んでいる人は、
ここはスキップしても大丈夫です。

&nbsp;

&nbsp;
<h3 class="section">rubyのコンテナでbundle init</h3>
&nbsp;

取得したコンテナ内でbundle initして、
Gemfileを作成します。
<pre><code class="language-bash">docker run --rm -v "$PWD":/usr/src/sample -w /usr/src/sample ruby:2.4.2 bundle init</code></pre>
&nbsp;

できたGemfileを編集して、
railsの行を追加してあげます。
<pre><code class="language-bash">$cat Gemfile
# frozen_string_literal: true

source "https://rubygems.org"

git_source(:github) {|repo_name| "https://github.com/#{repo_name}" }

 gem "rails", '5.1.4'
</code></pre>
&nbsp;

&nbsp;
<h3 class="section">Dockerfileを基にrailsアプリ用イメージの作成</h3>
&nbsp;

次にDockerfileを用いてrailsアプリ用のイメージをビルドして行きます。
今回は下記のようなDockerfileを作成します。
<pre><code class="language-docker">FROM ruby:2.4.2

ENV APP_ROOT /usr/src/sample

WORKDIR $APP_ROOT

RUN apt-get update &amp;&amp; \
    apt-get install -y nodejs \
                       sqlite3 \
                       --no-install-recommends &amp;&amp; \
    rm -rf /var/lib/apt/lists/*

COPY Gemfile $APP_ROOT
COPY Gemfile.lock $APP_ROOT

RUN \
  echo 'gem: --no-document' &gt;&gt; ~/.gemrc &amp;&amp; \
  cp ~/.gemrc /etc/gemrc &amp;&amp; \
  chmod uog+r /etc/gemrc &amp;&amp; \
  bundle config --global build.nokogiri --use-system-libraries &amp;&amp; \
  bundle config --global jobs 4 &amp;&amp; \
  bundle install &amp;&amp; \
  rm -rf ~/.gem
</code></pre>
&nbsp;

Dokcerfileとははapacheの設定ファイルのような形式で記述されたファイルになります。
ここに、
自由にイメージのビルドに必要なタスクを記述していくことで、
基のイメージから新しいイメージを作成することができます。

&nbsp;

今回はrailsに必要なモジュールがインストールされた
イメージを作成するためのDockerfileになっています。

&nbsp;

&nbsp;

Gemfile.lockがないので作成。
<pre><code class="language-bash"> :&gt; Gemfile.lock</code></pre>
&nbsp;

ビルドのコマンドは次のように、
ビルドの基になるイメージと基底ディレクトリを指定します。
<pre><code class="language-bash">$ docker build -t version1/sample .</code></pre>
&nbsp;

&nbsp;

docker images(イメージの一覧取得)を叩くと確かに新しいイメージが作成されています。
<pre><code class="language-bash">$docker images | grep version1
version1/sample         latest              f31106e13371        40 seconds ago      762MB
</code></pre>
&nbsp;

&nbsp;

先ほどの手順までで、
railsに必要なモジュールがインストールできたので、
作成されたイメージでrails newして行きます。
<pre><code class="language-bash">$docker run --rm -it -v "$PWD":/usr/src/sample version1/sample rails new .</code></pre>
&nbsp;

&nbsp;

このコマンドは、
カレントディレクトリをversion1/sampleイメージの/usr/src/sampleに
マウントしてrails newしています。

これで、rails new できました。
ローカルでファイルをみてみるとrailsのファイル群がインストールされています。

&nbsp;
<pre><code class="language-bash">$ls -ltr
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
</code></pre>
&nbsp;

&nbsp;

[mid_article]

&nbsp;

&nbsp;
<h3 class="section">コンテナを起動した際に、Railsが立ち上がるように設定</h3>
&nbsp;

ここまででrailsが動く環境は作れましたが、
コンテナ起動と同時にRailsも立ち上がるようにしたいので、
Dockerfileに下記記述を追記します。
<pre><code class="language-docker">COPY . $APP_ROOT

EXPOSE  3000
CMD ["rails", "server", "-b", "0.0.0.0"]
</code></pre>
&nbsp;

&nbsp;

記述を追記したら再度ビルドします。
追記した部分では、
ローカルのソースをコンテナ内の $APP_ROOTにコピーして、
3000番ポートを開けて、railsを起動しています。
<pre><code class="language-bash">docker build -t version1/sample .</code></pre>
&nbsp;

&nbsp;

これで構築は
完了なので、コンテナを起動させてみましょう。
<pre><code class="language-bash">docker run -d -p 3000:3000 -v "${PWD}:/usr/src/sample" version1/sample</code></pre>
※起動させる場合は、
-vコマンドでローカルのディレクトリをマウントして置くのがみそです。
これしないとローカルのソースとコンテナ内のソースが同期できないので

&nbsp;

&nbsp;

無事起動しました。
<pre><code class="language-bash">$docker ps
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                    NAMES
c7a0a8cfabe5        version1/sample     "rails server -b 0..."   8 seconds ago       Up 7 seconds        0.0.0.0:3000-&gt;3000/tcp   admiring_hugle
</code></pre>
&nbsp;

&nbsp;

ブラウザから繋いでもみれます。

&nbsp;

<a href="https://ver-1-0.net/2017/11/23/rails-nginx-postgres-on-docker-2/screen-shot-2017-11-23-at-13-24-29/" rel="attachment wp-att-1403"><img class="alignnone size-full wp-image-1403" src="https://ver-1-0.net/wp-content/uploads/2017/11/Screen-Shot-2017-11-23-at-13.24.29.png" alt="rails起動画面" width="980" height="798" /></a>

&nbsp;
<h2 class="chapter">少し開発してみる</h2>
&nbsp;

せっかくコンテナが
できたのでUserのCRUDくらいまで
作りましょう。

scaffoldする場合は、
<pre><code class="language-bash">docker exec -it c7a0a8cfabe5 bash</code></pre>
&nbsp;

としてコンテナに接続してコマンドを叩いてもいいですが、
面倒なので、
<pre><code class="language-bash">docker exec c7a0a8cfabe5 rails scaffold User name email age</code></pre>
とすればワンコマンドでscaffoldできます。

&nbsp;

&nbsp;

マイグレーションも
<pre><code class="language-bash">docker exec c7a0a8cfabe5 rake db:migrate</code></pre>
でいけます。

&nbsp;

config/routes.rbも少し変更して、
ユーザ管理画面がトップに来るようにします。
<pre><code class="language-ruby">Rails.application.routes.draw do
  resources :users
  root 'users#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
</code></pre>
&nbsp;

&nbsp;

config/配下を修正したので、
コンテナを再起動させます。
<pre><code class="language-bash">docker restart c7a0a8cfabe5</code></pre>
&nbsp;

&nbsp;

これで、
http://localhostに接続すれば。

ユーザ管理画面が表示されます。

<a href="https://ver-1-0.net/2017/11/23/rails-nginx-postgres-on-docker-2/screen-shot-2017-11-23-at-14-07-19/" rel="attachment wp-att-1406"><img class="border alignnone size-full wp-image-1406" src="https://ver-1-0.net/wp-content/uploads/2017/11/Screen-Shot-2017-11-23-at-14.07.19.png" alt="ユーザ管理画面" width="981" height="801" /></a>

構築は以上です。

&nbsp;

&nbsp;
<h2 class="chapter">まとめ</h2>
&nbsp;

&nbsp;

ここまで、railsの環境構築をしましたが、
Dockerには一プロセス一コンテナという原則みたいなものがあるので、
アプリとDBではコンテナを分ける必要があります。
（今回はsqliteを使ったので、DBと一緒のコンテナにしてます。）

&nbsp;

コンテナ管理ツールとして
docker-composeというものがあるので、
次はそれを使いながら、
rails + nginx + postgres環境を構築したいと思います。

&nbsp;

[after_article]
