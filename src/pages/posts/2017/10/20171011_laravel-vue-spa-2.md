---
templateKey: blog-post
title: Laravel5.4とVue.jsでSPAを作ってみる。② -クライアントルーティング-
slug: 2017/10/11/laravel-vue-spa-2
createdAt: 2017-10-11 08:09:50
updatedAt: 2018-08-26 11:36:41
thumbnail: http://ver-1-0.net/wp-content/uploads/2017/10/0f71ba28509b81ba05c2dc6a54eb60d9_s.jpg
description: >-
  前回はこの記事でLaravel5.4とVue.jsの環境構築を行いました。Laravel5.4とVue.jsでSPAを作ってみる。① -環境構築-
  今回は、クライアント側でのルーティングを行なう形でもう少し実践的な内容で進めていきます。
  記事の終わりにはこのようなページができます。※無音なので、安心してご視聴ください。
categories:
  - engineering
---

&nbsp;

&nbsp;

前回はこの記事でLaravel5.4とVue.jsの環境構築を行いました。
<a href="https://ver-1-0.net/2017/10/11/laravel-vue-spa-1/">Laravel5.4とVue.jsでSPAを作ってみる。① -環境構築-</a>

今回は、
クライアント側でのルーティングを行なう形で
もう少し実践的な内容で進めていきます。

&nbsp;

記事の終わりにはこのようなページができます。
※無音なので、安心してご視聴ください。

[video width="844" height="598" mp4="http://ver-1-0.net/wp-content/uploads/2017/10/spa-sample.mp4"][/video]

&nbsp;

動画をみるとわかりますが、
ページを切り替えているのに全体を読み込まず、
差分だけ切り替えているので、
これまでのWebアプリ特有のページの読み込みが無くなっています。

&nbsp;

[adsense_double_rect]

&nbsp;

<h2 class="chapter">vue-routerのインストール</h2>
&nbsp;

上の動画を実現するには、
クライアント側でルーティングを行う必要があるので、
vue-routerをインストールします。

<a href="https://router.vuejs.org/ja/essentials/getting-started.html">https://router.vuejs.org/ja/essentials/getting-started.html</a>
インストールの流れは簡単で、
package.jsonに依存性を追加 -&gt; npm installです。
<pre><code class="language-json">"devDependencies": {
    "axios": "^0.16.2",
    "bootstrap-sass": "^3.3.7",
    "cross-env": "^5.0.1",
    "jquery": "^3.1.1",
    "laravel-mix": "^1.0",
    "lodash": "^4.17.4",
    "vue": "^2.1.10",
    "vue-router": "^2.3.0"
  }
</code></pre>
[adsense]
<h2 class="chapter">クライアントでのルーティングの設定</h2>
&nbsp;

&nbsp;

vue-routerをインストールできたら、
app.js、web.php、app.blade.phpを下のように変更します。

resourses/assets/js/app.js
<pre><code class="language-javascript">import Vue from 'vue';
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

</code></pre>
routes/web.php
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


Route::get('/{any}', function () {
    return view('app');
})-&gt;where('any', '.*');
</code></pre>
&nbsp;

&nbsp;

resources/app.blade.php
(body部分のみ表示しています)
<pre><code class="language-markup">&lt;body&gt;
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
&lt;/body&gt;</code></pre>
&nbsp;

&nbsp;

ここまでが終わったら、
一度ビルドしてhttp://127.0.0.1:8000/にアクセスしてみましょう。
http://127.0.0.1:8000/でアクセスすると上の動画のトップページが
表示され、任意のURLhttp://127.0.0.1:8000/hogeなどでアクセスすると
何も表示されなければ、クライアント側でのルーティングは成功しています。

さらにweb.phpを以下のように設定して、
指定したComponentを作成して配置してあげれば、
/, /example,/example/1, /example/2で
それぞれの画面を描画することができます。

&nbsp;

&nbsp;
<pre><code class="language-javascript">const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', component: require('./components/Example.vue') },
        { path: '/example', component: require('./components/Example.vue') },
        { path: '/example/1', component: require('./components/Example1.vue') },
        { path: '/example/2', component: require('./components/Example2.vue') },
    ]
});
</code></pre>
※resources配下のソースを変更した場合は、ビルドするのを忘れずに・・・

&nbsp;

ここまでで、
クライアントでのルーティングはできるようになりました。

わかりやすいように
app.jsとapp.blade.phpの全体を乗せておきます。

app.blade.php

<pre><code class="language-markup">&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;{{ config(&#039;app.locale&#039;) }}&quot;&gt;
&lt;head&gt;
    &lt;meta charset=&quot;utf-8&quot;&gt;
    &lt;meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;IE=edge&quot;&gt;
    &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1&quot;&gt;

    &lt;title&gt;spa-samples&lt;/title&gt;

    &lt;link rel=&quot;stylesheet&quot; href=&quot;{{ mix(&#039;css/app.css&#039;) }}&quot;&gt;&lt;/script&gt;
    &lt;meta name=&quot;csrf-token&quot; content=&quot;{{ csrf_token() }}&quot;&gt;
    &lt;script&gt;
    window.Laravel = {
        csrfToken: &quot;{{ csrf_token() }}&quot;
    };
    &lt;/script&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;div id=&quot;app&quot; class=&quot;container&quot;&gt;
        &lt;router-view&gt;&lt;/router-view&gt;
        &lt;nav-footer&gt;&lt;/nav-footer&gt;
    &lt;/div&gt;

&lt;/body&gt;
&lt;script src=&quot;{{ mix(&#039;js/app.js&#039;) }}&quot;&gt;&lt;/script&gt;
&lt;/html&gt;</code></pre>
app.js
<pre><code class="language-javascript">import Vue from 'vue';
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

</code></pre>

&nbsp;
長くなったので、今回はここまでとします。

&nbsp;

&nbsp;
<h2 class="chapter">まとめ</h2>
ここまでやると、
Vueで作成したSPAのサクサクした使用感がわかってくると
思います。
次回のAJAX通信によって画面を変更するとよりアプリケーションらしく
なって面白いかと思います。
以上です！！

&nbsp;

ここまでのソースは下記に置いておきます。
<ins>レポジトリを変更したので、こちらのソースはfeature/step1ブランチにあります。</ins>
<a href="https://github.com/version-1/spa-sample">https://github.com/version-1/spa-sample</a>

&nbsp;

&nbsp;

[adsense_double_rect]

&nbsp;

&nbsp;
