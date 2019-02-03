---
templateKey: blog-post
title: Laravel5.4とVue.jsでSPAを作ってみる。② -クライアントルーティング-
slug: /2017/10/11/laravel-vue-spa-2
createdAt: 2017-10-11 08:09:50
updatedAt: 2018-08-26 11:36:41
thumbnail: /2017/10/20171011_laravel-vue-spa-2/thumbnail.jpg
categories:
  - engineering
tags:
  - laravel
  - vue
  - spa
  - build-env
  - serverside
  - frontend
related:
  - dummy
---

前回はこの記事でLaravel5.4とVue.jsの環境構築を行いました。

<a href="https://ver-1-0.net/2017/10/11/laravel-vue-spa-1/">Laravel5.4とVue.jsでSPAを作ってみる。① -環境構築-</a>

今回は、クライアント側でのルーティングを行なう形で
もう少し実践的な内容で進めていきます。


記事の終わりにはこのようなページができます。

※無音なので、安心してご視聴ください。

<video src="https://statics.ver-1-0.net/uploads/2017/10/20171011_laravel-vue-spa-2/spa-sample.mp4" poster="https://statics.ver-1-0.net/uploads/2017/10/20171011_laravel-vue-spa-2/spa-sample.png" poster="https://statics.ver-1-0.net/uploads/2017/10/20171014_laravel-vue-spa-3/spa-sample-step2.png" controls></video>

動画をみるとわかりますが、
ページを切り替えているのに全体を読み込まず、
差分だけ切り替えているので、
これまでのWebアプリ特有のページの読み込みが無くなっています。

<div class="adsense-double-rect"></div>

<h2 class="chapter">vue-routerのインストール</h2>

上の動画を実現するには、
クライアント側でルーティングを行う必要があるので、
vue-routerをインストールします。

<a href="https://router.vuejs.org/ja/essentials/getting-started.html">https://router.vuejs.org/ja/essentials/getting-started.html</a>

インストールの流れは簡単で、
package.jsonに依存性を追加 -> npm installです。

```json
"devDependencies": {
    "axios": "^0.16.2",
    "bootstrap-sass": "^3.3.7",
    "cross-env": "^5.0.1",
    "jquery": "^3.1.1",
    "laravel-mix": "^1.0",
    "lodash": "^4.17.4",
    "vue": "^2.1.10",
    "vue-router": "^2.3.0"
  }

```
<div class="adsense"></div>
<h2 class="chapter">クライアントでのルーティングの設定</h2>

vue-routerをインストールできたら、
app.js、web.php、app.blade.phpを下のように変更します。

resourses/assets/js/app.js
```javascript
import Vue from 'vue';
import VueRouter from 'vue-router';
require('./bootstrap');

Vue.use(VueRouter);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
 const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', component: require('./components/Example.vue') },
    ]
});

const app = new Vue({
    router,
    el: '#app'
});


```
routes/web.php
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


Route::get('/{any}', function () {
    return view('app');
})->where('any', '.*');

```

resources/app.blade.php
(body部分のみ表示しています)

```markup
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
```

ここまでが終わったら、
一度ビルドしてhttp://127.0.0.1:8000/ にアクセスしてみましょう。
http://127.0.0.1:8000/ でアクセスすると上の動画のトップページが
表示され、任意のURLhttp://127.0.0.1:8000/hoge などでアクセスすると
何も表示されなければ、クライアント側でのルーティングは成功しています。

さらにweb.phpを以下のように設定して、
指定したComponentを作成して配置してあげれば、
/, /example,/example/1, /example/2で
それぞれの画面を描画することができます。

```javascript
const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', component: require('./components/Example.vue') },
        { path: '/example', component: require('./components/Example.vue') },
        { path: '/example/1', component: require('./components/Example1.vue') },
        { path: '/example/2', component: require('./components/Example2.vue') },
    ]
});

```
※resources配下のソースを変更した場合は、ビルドするのを忘れずに・・・

ここまでで、
クライアントでのルーティングはできるようになりました。

わかりやすいように
app.jsとapp.blade.phpの全体を乗せておきます。

app.blade.php

```markup
<!DOCTYPE html>
<html lang="{{ config('app.locale') }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>spa-samples</title>

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
        <router-view></router-view>
        <nav-footer></nav-footer>
    </div>

</body>
<script src="{{ mix('js/app.js') }}"></script>
</html>
```

app.js
```javascript
import Vue from 'vue';
import VueRouter from 'vue-router';
require('./bootstrap');

Vue.use(VueRouter);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
 Vue.component('nav-footer', require('./components/NavFooter.vue'));
 const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', component: require('./components/Example.vue') },
        { path: '/example', component: require('./components/Example.vue') },
        { path: '/example/1', component: require('./components/Example1.vue') },
        { path: '/example/2', component: require('./components/Example2.vue') },
    ]
});

const app = new Vue({
    router,
    el: '#app'
});


```

長くなったので、今回はここまでとします。

<h2 class="chapter">まとめ</h2>

ここまでやると、
Vueで作成したSPAのサクサクした使用感がわかってくると
思います。
次回のAJAX通信によって画面を変更するとよりアプリケーションらしく
なって面白いかと思います。
以上です！！


ここまでのソースは下記に置いておきます。

<ins>レポジトリを変更したので、こちらのソースはfeature/step1ブランチにあります。</ins>
<a href="https://github.com/version-1/spa-sample">https://github.com/version-1/spa-sample</a>

<div class="adsense-double-rect"></div>
