---
templateKey: blog-post
language: ja
title: LaravelにVue.jsを導入してみる。- Bladeの{{ }}とコンフリクトする問題の対処 -
slug: /2017/08/09/conflict-vue-with-blade
createdAt: 2017-08-09 23:18:54
updatedAt: 2018-08-26 01:16:14
thumbnail: /2017/08/20170809_conflict-vue-with-blade/thumbnail.jpg
categories:
  - engineering
tags:
  - laravel
  - php
  - vue
  - blade
  - serverside
related:
  - dummy
---

&nbsp;

どうも、
トレーニング後にビールを
飲んでしまう@version1です。

&nbsp;

今回は、
そろそろ勉強のために、
JqueryでなくAngular, React, Vueらへん
使って見ようかということ
で<strong>vue.js</strong>を<strong>laravel</strong>にインストールしてみました。

&nbsp;

<div class="adsense"></div>

&nbsp;

数あるjavascriptライブラリの
中で<strong>vue.js</strong>を選んだ理由は
特になく、なんとなく
なのですが強いて言うのであれば、
今からやるのであれば後発の新しいライブラリを
使いたいと言うところでした。

&nbsp;

以下、Googleトレンドで他ライブラリとの
検索の割合調べてみた画像。

<img class="post-image" src="https://statics.ver-1-0.net/uploads/2017/08/20170809_conflict-vue-with-blade/javascript-library.png" alt="javascript-library.png"/>

&nbsp;

検索数も伸びてますね。
後発だけに他ライブラリの課題を見事に解決しているとか
いないとか

&nbsp;
<h2 class="chapter">まずはライブラリのインストール</h2>
&nbsp;

インストールの方法は<a href="https://jp.vuejs.org/v2/guide/installation.html">こちら</a>から

最初に触ってみる程度であれば
CDNでの読み込みが一番早いので、
htmlのヘッダ部に下記を追加してしまうのが早いです。

```markup
<script src="https://unpkg.com/vue"></script>
```
&nbsp;

が、
これだとライブラリがアップデートされると
アプリが使うライブラリのバージョンも変わってしまうので、
ダウンロードリンクから直接
ライブラリをダウンロードして配置します。

&nbsp;

&nbsp;

開発版と本番版があるようなので
両方ダウンロードしてpublic/jsに

public/js/vue.js (開発版）

public/js/vue.min.js (本番版）

を配置します。

&nbsp;

ヘッダ部分は以下のようにして、
.envのAPP_DEBUGの値を元に読み込むライブラリを
変えるようにしましょう。
```markup
@if (env('APP_DEBUG'))
    <script src="{{ asset('js/vue.js') }}"></script>
@else
    <script src="{{ asset('js/vue.min.js') }}"></script>
@endif

```

<h2 class="chapter">Hello Worldしてみる　〜 Bladeとのコンフリクト解消方も ~</h2>

上のような設定が終わっていれば
下記のようにすれば<strong>Hello Vue! </strong>
という文字が表示されるので
導入完了です！

※注意※

<strong>Laravel</strong>で<strong>blade</strong>を使っている場合は、
{{}}のMastache記法がコンフリクトして、
Vueのテキスト表示がPHPに解釈されエラーとなってしまいます。

<strong>blade + vue</strong>の場合は
<strong>blade（PHP)の式を書く場合</strong> -> {{}}で囲う
<strong>vueの式を書く場合は、</strong> -> {{}} の前に@を表示する

ようにしてください。

&nbsp;
```markup
<!DOCTYPE html>
<head>
    <title>Sample</title>
    <link href="{{ asset('css/reset.css') }}" rel="stylesheet">
    <link href="{{ asset('css/style.css') }}" rel="stylesheet">
    @if (env('APP_DEBUG'))
        <script src="{{ asset('js/vue.js') }}"></script>
    @else
        <script src="{{ asset('js/vue.min.js') }}"></script>
    @endif
</head>

<body>
    <div class="container" id="app">
        @{{ message }}
    </div>
    <script>
      var app = new Vue({
            el: '#app',
            data: {
                message: 'Hello Vue!'
            }
        })
    </script>
</body>
</html>

```
&nbsp;

以上です。

↓ここでは<strong>Vue.js</strong>でできたアプリを試せますので是非

<a href="https://jp.vuejs.org/v2/examples/">https://jp.vuejs.org/v2/examples/</a>

&nbsp;

<div class="after-article"></div>
