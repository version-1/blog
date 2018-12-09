---
templateKey: blog-post
title: Rails migratoinコマンドまとめ
slug: 2017/03/13/rails-migratoin
description: Rails では
マイグレーションコードを書いておけば
<pre><code class="language-ruby">rake db:migrate</code></pre>
とするだけで、
DBの変更などをとりくむことができます。

今回はマイグレーションコード
についてまとめてみました。




&nbsp;
[after_intro]
&nbsp;
<h2 class="chapter">Migration Codeの実行</h2>

<pre><code class="language-ruby">rake db:migrate</code></pr
createdAt: 2017-03-13 23:21:52
updatedAt: 2018-08-26 12:14:47
thumbnail: http://ver-1-0.net/wp-content/uploads/2017/01/スクリーンショット-2017-01-03-15.37.16.png
categories: 
  - engineering
  - rails
---

Rails では
マイグレーションコードを書いておけば
<pre><code class="language-ruby">rake db:migrate</code></pre>
とするだけで、
DBの変更などをとりくむことができます。

今回はマイグレーションコード
についてまとめてみました。




&nbsp;
[after_intro]
&nbsp;
<h2 class="chapter">Migration Codeの実行</h2>

<pre><code class="language-ruby">rake db:migrate</code></pre>
これを実行するだけで,
[Raisのルートディレクトリ]/db/migrate配下にある
マイグレーションコードを全て実行できます。

&nbsp;
<h2 class="chapter">Migration Codeの個別実行</h2>


<pre><code>rake db:migrate:up VERSION=[バーション番号]</code></pre>
migrationコードを個別に実行したい場合は、
VERSIONオプションでバージョンを指定して
実行することができます。

バージョン番号とはマイグレーションコードの頭に着く
2017XXXXXXXXXXのような番号です。

ちなみにDBの変更を戻したい場合は
<pre><code class="language-ruby">rake db:migrate:down VERSION=[バーション番号]</code></pre>
&nbsp;
&nbsp;
<h2 class="chapter">Migration Codeの状態確認</h2>


<pre><code>rake db:migrate:status</code></pre>
このコマンドでどのマイグレーションコードが
実行されているかを確認することができます。

これまで実行したかどうかはup/downで表されます。

まだ、実行していないmigration codeを表示する場合は、
<pre><code class="language-ruby">rake db:migrate:abort_if_pending_migrations</code></pre>
です。


以上です!!
