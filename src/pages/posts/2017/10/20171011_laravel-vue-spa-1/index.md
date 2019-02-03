---
templateKey: blog-post
title: Laravel5.4とVue.jsでSPAを作ってみる。① -環境構築-
slug: /2017/10/11/laravel-vue-spa-1
createdAt: 2017-10-11 00:05:25
updatedAt: 2018-08-26 11:25:34
thumbnail: /2017/10/20171011_laravel-vue-spa-1/thumbnail.jpg
categories:
  - engineering
tags:
  - dummy
---

&nbsp;

LaravelはVue.jsを標準でサポートしており、
お手軽にSPAのアプリを作成することができます。

だいたい二回くらいで簡単なSPAのサンプルアプリを作る計画で、
今回はまず環境構築をしてきます。

<div class="adsense"></div>

<h2 class="chapter">そもそもSPAって何？！</h2>
SPAとはSingle Page Applicationの略で、
従来のDOMを直接書き換えたり、ルートから<strong>画面全体</strong>を
再度描画(レンダリングとも言います）し直す、
<strong>クライアント-サーバ型</strong>のアプリケーションとは別に、
仮想DOMを用いて、<strong>差分</strong>だけ変更し、
ページ遷移を伴いwebアプリケーションのことです。

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

Laravel5.4のアプリ作成
（Laravelはすでに導入済みの体です。）
```bash
composer create-project --prefer-dist laravel/laravel  my-app "5.4.*"
```

上でアプリが作成できたら、できたファイル群をみてみると。
以下のようになります。
```bash
$cd my-app/ && ls -1
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

```
&nbsp;

今回はVueもインストールしないといけないので、
上の中にある。package.jsonをみてみると
```json
"devDependencies": {
    "axios": "^0.16.2",
    "bootstrap-sass": "^3.3.7",
    "cross-env": "^5.0.1",
    "jquery": "^3.1.1",
    "laravel-mix": "^1.0",
    "lodash": "^4.17.4",
    "vue": "^2.1.10"
  }

```

このような風に、最初からvueが
依存関係に記述されていることがわかります。
```
npm install
```
これらのモジュールをインストールします。

npmはNode.jsのパッケージを管理するツールです。
ちなみに、Nodeもすでにインストールされている前提です。

<h2 class="chapter">環境構築　DB設定-sqlite3-</h2>
&nbsp;

今回のDBはsqlite3を使用します。
```bash
$sqlite3
SQLite version 3.16.0 2016-11-04 19:09:39
Enter ".help" for usage hints.
Connected to a transient in-memory database.
Use ".open FILENAME" to reopen on a persistent database.
sqlite> .open database/development.sqlite3
sqlite> .q

```

sqliteのデータベースを作成したので、
作成したものをデータベースに指定します。
```bash
$cat .env
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

```

ここまでで、
```bash
php artisan serve
```
として、http://127.0.0.1:8000
にアクセスすればLaravelのトップページは確認可能です。

<h2 class="chapter">環境構築　トップページだけVueで描画してみる</h2>

作り込みは次回に回しますが、
とりあえず、npm installされた後にできるExampleページだけでも
描画できるようにしましょう。

resources/views/app.blade.php(新規作成)
```markup
<!DOCTYPE html>
<html lang="{{ config('app.locale') }}">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <title>SPA-samples</title>

  <link rel="stylesheet" href="{{ mix('css/app.css') }}"></script>
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <script>
  window.Laravel = {
    csrfToken: "{{ csrf_token() }}"
  };
  </script>
</head>
<body>
  <div id="app" class="container">
    <div class="header">
      {{$description = __('messages.site-description') }}
      <navbar description="{{$description}}"></navbar>
    </div>
    <div class="wrapper">
      <div class="main">
        <h2>Contetns</h2>
        <hr>
        <router-view price="{{__('labels.price')}}"></router-view>
      </div>
    </div>
    <div class="footer">
      <nav-footer></nav-footer>
    </div>
  </div>
</body>
<script src="{{ mix('js/app.js') }}"></script>
</html>

```
ルーティング設定で上で作成したapp.blade.phpが
読み込まれるように設定します。

&nbsp;

routes/web.php(編集)
```php
<?php

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


```
app.js はもともとありますが、
一応載せます。

resources/assets/app.js
```javascript
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


```
&nbsp;

これらが一通り終わったら
```bash
npm run dev
```
でresources配下のjsファイルなどをビルドして、
artisanでサーバを起動すると

<img class="post-image" src="https://statics.ver-1-0.net/uploads/2017/10/20171011_laravel-vue-spa-1/demo.png" alt="demo"/>

これで、
resources/assets/js/component/Example.vue
の内容が表示されていることがわかります。
```markup
<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8 col-md-offset-2">
        <div class="panel panel-default">
          <div class="panel-heading">Example Component</div>

          <div class="panel-body">
            I'm an example component!
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    mounted() {
      console.log('Component mounted.')
    }
  }
</script>

```
以上、ここまでで環境構築は終わりです。
次回は実際にVueのクライアントでのルーティングやAjax通信など
を使ってデモページを作成していきます。


<ins><a href="https://ver-1-0.net/2017/10/11/laravel-vue-spa-2/"></a></ins>

&nbsp;

<div class="adsense-double-rect"></div>
