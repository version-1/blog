---
templateKey: blog-post
title: Rails  migration |  通らないmigration をスキップする | down upの変更方法
slug: 2017/03/11/migration-matome
createdAt: 2017-03-11 23:07:13
updatedAt: 2018-08-26 12:15:22
thumbnail: http://ver-1-0.net/wp-content/uploads/2017/01/スクリーンショット-2017-01-03-15.37.16.png
description: >-
  rails ではマイグレーションコードをgitで保管して、DBの変更履歴を残していたり
  するのですが、たまーーにmigrationコードを実行せずにSQLで直接DBを変更する輩がいます。
categories:
  - engineering
  - rails
---

&nbsp;

rails ではマイグレーションコードを
gitで保管して、DBの変更履歴を残していたり
するのですが、
たまーーに
migrationコードを実行せずにSQLで直接
DBを変更する輩がいます。

&nbsp;

そんな時に
<pre><code class="language-ruby">rails db:migrate</code></pre>
としようものなら、
<strong>「そんなカラムはalreadyで存在するぜ」</strong>
とか
<strong>「そんなカラムないけどちゃんと確認して」</strong>
と怒られることがあります。

&nbsp;

いらないマイグレーションコードだとわかっていれば
すぐにファイルを削除してしまえばいいのですが、
そうもできない時があります。

&nbsp;

そんな時に、実際は実行してないけど
スキップする方法を探していたのですが。。。
<h3>ありました</h3>
方法は簡単です。

&nbsp;

[after_intro]

&nbsp;

&nbsp;
<h2>スキップしたいバージョン番号のレコード
をschema_migrationテーブルに追加する</h2>
です。
これで、<strong>migrateがupの状態</strong>になり、
次から実行されることはありません。

railsのマイグレーションはどうやら、
<strong>schema_migration</strong>というテーブルで
migrationの実行有無( rake db:migrate:statusで見れるやつ )
を管理しているようですね。

バージョン番号というのは
rails gすると勝手に先頭に付加される数字です
<pre><code class="language-bash"> 例 ) 20170310XXXXXX_create_user.rb</code></pre>
また逆も然りで、
再度migrationコードを実行したい場合は
対象のレコードを削除してあげます。

試してみてください!!
