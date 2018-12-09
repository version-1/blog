---
templateKey: blog-post
title: LaravelにVue.jsを導入してみる。- Bladeの{{ }}とコンフリクトする問題の対処 -
slug: 2017/08/09/conflict-vue-with-blade
description: &nbsp;

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

[after_intro]

&nbsp;

数あるjavascriptライブラリの
中で<strong>vue.js</strong>を選んだ理由は
特になく、なんとなく
なの
createdAt: 2017-08-09 23:18:54
updatedAt: 2018-08-26 01:16:14
thumbnail: http://ver-1-0.net/wp-content/uploads/2017/01/5ntkpxqt54y-sai-kiran-anagani.jpg
categories: 
  - engineering
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

[after_intro]

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

<img class="alignnone size-large " src="http://ver-1-0.net/wp-content/uploads/2017/08/Compare-Javasctipt-Library-1024x567.png" alt="javasctipyライブラリ比較" width="700" height="388" />

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
<pre><code>&lt;script src="https://unpkg.com/vue"&gt;&lt;/script&gt;
</code></pre>
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
<pre><code class="language-markup">@if (env('APP_DEBUG'))
    &lt;script src="{{ asset('js/vue.js') }}"&gt;&lt;/script&gt;
@else
    &lt;script src="{{ asset('js/vue.min.js') }}"&gt;&lt;/script&gt;
@endif
</code></pre>
&nbsp;
<h2 class="chapter">Hello Worldしてみる　〜 Bladeとのコンフリクト解消方も ~</h2>
&nbsp;

上のような設定が終わっていれば
下記のようにすれば<strong>Hello Vue! </strong>
という文字が表示されるので
導入完了です！

&nbsp;

※注意※

<strong>Laravel</strong>で<strong>blade</strong>を使っている場合は、
{{}}のMastache記法がコンフリクトして、
Vueのテキスト表示がPHPに解釈されエラーとなってしまいます。

<strong>blade + vue</strong>の場合は
<strong>blade（PHP)の式を書く場合</strong> -&gt; {{}}で囲う
<strong>vueの式を書く場合は、</strong> -&gt; {{}} の前に@を表示する

ようにしてください。

&nbsp;
<pre><code class="language-markup">&lt;!DOCTYPE html&gt;
&lt;head&gt;
    &lt;title&gt;Sample&lt;/title&gt;
    &lt;link href="{{ asset('css/reset.css') }}" rel="stylesheet"&gt;
    &lt;link href="{{ asset('css/style.css') }}" rel="stylesheet"&gt;
    @if (env('APP_DEBUG'))
        &lt;script src="{{ asset('js/vue.js') }}"&gt;&lt;/script&gt;
    @else
        &lt;script src="{{ asset('js/vue.min.js') }}"&gt;&lt;/script&gt;
    @endif
&lt;/head&gt;

&lt;body&gt;
    &lt;div class="container" id="app"&gt;
        @{{ message }}
    &lt;/div&gt;
    &lt;script&gt;
      var app = new Vue({
            el: '#app',
            data: {
                message: 'Hello Vue!'
            }
        })
    &lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;
</code></pre>
&nbsp;

以上です。

↓ここでは<strong>Vue.js</strong>でできたアプリを試していますので是非
<a href="https://jp.vuejs.org/v2/examples/">https://jp.vuejs.org/v2/examples/</a>

&nbsp;

[after_article]
