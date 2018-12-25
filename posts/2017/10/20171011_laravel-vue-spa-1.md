---
templateKey: blog-post
title: Laravel5.4とVue.jsでSPAを作ってみる。① -環境構築-
slug: 2017/10/11/laravel-vue-spa-1
createdAt: 2017-10-11 00:05:25
updatedAt: 2018-08-26 11:25:34
thumbnail: http://ver-1-0.net/wp-content/uploads/2017/10/0f71ba28509b81ba05c2dc6a54eb60d9_s.jpg
description: >-
  LaravelはVue.jsを標準でサポートしており、
  お手軽にSPAのアプリを作成することができます。
  だいたい二回くらいで簡単なSPAのサンプルアプリを作る計画で、
  今回はまず環境構築をしてきます。
categories:
  - engineering
---

&nbsp;

LaravelはVue.jsを標準でサポートしており、
お手軽にSPAのアプリを作成することができます。

だいたい二回くらいで簡単なSPAのサンプルアプリを作る計画で、
今回はまず環境構築をしてきます。

&nbsp;

[adsense_double_rect]

&nbsp;

<h2 class="chapter">そもそもSPAって何？！</h2>
SPAとはSingle Page Applicationの略で、
従来のDOMを直接書き換えたり、ルートから<strong>画面全体</strong>を
再度描画(レンダリングとも言います）し直す、
<strong>クライアント-サーバ型</strong>のアプリケーションとは別に、
仮想DOMを用いて、<strong>差分</strong>だけ変更し、
ページ遷移を伴いwebアプリケーションのことです。

&nbsp;

&nbsp;

SPAでサイトを構築すると、
いちいち画面全体の描画を行わない（ページをリロードしたりしない）ので、
<strong>サクサクした使用感</strong>になります。

<strong>デメリット</strong>としては、
ブラウザが行なっていた操作なども、
記述しないといけないとめ<strong>実装のコストが高く</strong>、
難易度の高い技術となっていること。

初期ロードでそれら実装した大量のJavaScriptコード
なども読み込む必要があるので、
<strong>初期読み込みに時間がかかる</strong>ということがあるようです。
<h2 class="chapter">環境構築　Laravelアプリ作成・Vue.jsインストール</h2>
&nbsp;

&nbsp;

Laravel5.4のアプリ作成
（Laravelはすでに導入済みの体です。）
<pre><code class="language-bash">composer create-project --prefer-dist laravel/laravel  my-app "5.4.*"</code></pre>
&nbsp;

&nbsp;

上でアプリが作成できたら、できたファイル群をみてみると。
以下のようになります。
<pre><code class="language-bash">$cd my-app/ &amp;&amp; ls -1
app
artisan
bootstrap
composer.json
composer.lock
config
database
package.json
phpunit.xml
public
readme.md
resources
routes
server.php
storage
tests
vendor
webpack.mix.js
</code></pre>
&nbsp;

&nbsp;

&nbsp;

今回はVueもインストールしないといけないので、
上の中にある。package.jsonをみてみると
<pre><code class="language-json">
"devDependencies": {
    "axios": "^0.16.2",
    "bootstrap-sass": "^3.3.7",
    "cross-env": "^5.0.1",
    "jquery": "^3.1.1",
    "laravel-mix": "^1.0",
    "lodash": "^4.17.4",
    "vue": "^2.1.10"
  }
</code></pre>
&nbsp;

&nbsp;

このような風に、最初からvueが
依存関係に記述されていることがわかります。
<pre><code>npm install</code></pre>
これらのモジュールをインストールします。

npmはNode.jsのパッケージを管理するツールです。
ちなみに、Nodeもすでにインストールされている前提です。

&nbsp;

&nbsp;

&nbsp;
<h2 class="chapter">環境構築　DB設定-salite3-</h2>
&nbsp;

&nbsp;

今回のDBはsqlite3を使用します。
<pre><code class="language-bash">$sqlite3
SQLite version 3.16.0 2016-11-04 19:09:39
Enter ".help" for usage hints.
Connected to a transient in-memory database.
Use ".open FILENAME" to reopen on a persistent database.
sqlite&gt; .open database/development.sqlite3
sqlite&gt; .q
</code></pre>
&nbsp;

sqliteのデータベースを作成したので、
作成したものをデータベースに指定します。
<pre><code class="language-bash">$cat .env
APP_NAME=Laravel
APP_ENV=local
APP_KEY=base64:tD+sSyvGr6EtipnDgOmBXCFlfwJsV6635aS3ssi/rgU=
APP_DEBUG=true
APP_LOG_LEVEL=debug
APP_URL=http://localhost

DB_CONNECTION=sqlite
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=../database/development.sqlite3
DB_USERNAME=
DB_PASSWORD=

BROADCAST_DRIVER=log
CACHE_DRIVER=file
SESSION_DRIVER=file
QUEUE_DRIVER=sync

REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

MAIL_DRIVER=smtp
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null

PUSHER_APP_ID=
PUSHER_APP_KEY=
PUSHER_APP_SECRET=
</code></pre>
ここまでで、
<pre><code class="language-bash">php artisan serve</code></pre>
として、http://127.0.0.1:8000
にアクセスすればLaravelのトップページは確認可能です。

&nbsp;

&nbsp;

&nbsp;

&nbsp;
<h2 class="chapter">環境構築　トップページだけVueで描画してみる</h2>
&nbsp;

&nbsp;

作り込みは次回に回しますが、
とりあえず、npm installされた後にできるExampleページだけでも
描画できるようにしましょう。

resources/views/app.blade.php(新規作成)
<pre><code class="language-markup">&lt;!DOCTYPE html&gt;
&lt;html lang="{{ config('app.locale') }}"&gt;
&lt;head&gt;
  &lt;meta charset="utf-8"&gt;
  &lt;meta http-equiv="X-UA-Compatible" content="IE=edge"&gt;
  &lt;meta name="viewport" content="width=device-width, initial-scale=1"&gt;

  &lt;title&gt;SPA-samples&lt;/title&gt;

  &lt;link rel="stylesheet" href="{{ mix('css/app.css') }}"&gt;&lt;/script&gt;
  &lt;meta name="csrf-token" content="{{ csrf_token() }}"&gt;
  &lt;script&gt;
  window.Laravel = {
    csrfToken: "{{ csrf_token() }}"
  };
  &lt;/script&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;div id="app" class="container"&gt;
    &lt;div class="header"&gt;
      {{$description = __('messages.site-description') }}
      &lt;navbar description="{{$description}}"&gt;&lt;/navbar&gt;
    &lt;/div&gt;
    &lt;div class="wrapper"&gt;
      &lt;div class="main"&gt;
        &lt;h2&gt;Contetns&lt;/h2&gt;
        &lt;hr&gt;
        &lt;router-view price="{{__('labels.price')}}"&gt;&lt;/router-view&gt;
      &lt;/div&gt;
    &lt;/div&gt;
    &lt;div class="footer"&gt;
      &lt;nav-footer&gt;&lt;/nav-footer&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/body&gt;
&lt;script src="{{ mix('js/app.js') }}"&gt;&lt;/script&gt;
&lt;/html&gt;
</code></pre>
ルーティング設定で上で作成したapp.blade.phpが
読み込まれるように設定します。

&nbsp;

routes/web.php(編集)
<pre><code class="language-php">&lt;?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('app');
});

</code></pre>
app.js はもともとありますが、
一応載せます。

resources/assets/app.js
<pre><code class="language-javascript">
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.component('example', require('./components/Example.vue'));

const app = new Vue({
    el: '#app'
});

</code></pre>
&nbsp;

これらが一通り終わったら
<pre><code class="language-bash">npm run dev</code></pre>
でresources配下のjsファイルなどをビルドして、
artisanでサーバを起動すると

<img class="alignnone size-large wp-image-804" src="http://ver-1-0.net/wp-content/uploads/2017/10/Screen-Shot-2017-10-11-at-0.02.03-1024x739.png" alt="spa-demo-top-page" width="700" height="505" />

これで、
resources/assets/js/component/Example.vue
の内容が表示されていることがわかります。
<pre><code class="language-markup">
&lt;template&gt;
  &lt;div class="container"&gt;
    &lt;div class="row"&gt;
      &lt;div class="col-md-8 col-md-offset-2"&gt;
        &lt;div class="panel panel-default"&gt;
          &lt;div class="panel-heading"&gt;Example Component&lt;/div&gt;

          &lt;div class="panel-body"&gt;
            I'm an example component!
          &lt;/div&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
  export default {
    mounted() {
      console.log('Component mounted.')
    }
  }
&lt;/script&gt;
</code></pre>
以上、ここまでで環境構築は終わりです。
次回は実際にVueのクライアントでのルーティングやAjax通信など
を使ってデモページを作成していきます。


<ins><a href="https://ver-1-0.net/2017/10/11/laravel-vue-spa-2/"></a></ins>

&nbsp;

[adsense_double_rect]
