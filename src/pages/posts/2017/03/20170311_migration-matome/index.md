---
templateKey: blog-post
title: Rails  migration |  通らないmigration をスキップする | down upの変更方法
slug: /2017/03/11/migration-matome
createdAt: 2017-03-11 23:07:13
updatedAt: 2018-08-26 12:15:22
thumbnail: /2017/03/20170311_migration-matome/thumbnail.png
categories:
  - engineering
  - rails
tags:
  - dummy
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
```ruby
rails db:migrate
```
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
**ありました**方法は簡単です。

<div class="adsense"></div>

&nbsp;
<h2>スキップしたいバージョン番号のレコード
をschema_migrationテーブルに追加する</h2>

です。

&nbsp;



これで、<strong>migrateがupの状態</strong>になり、
次から実行されることはありません。

railsのマイグレーションはどうやら、
<strong>schema_migration</strong>というテーブルで
migrationの実行有無( rake db:migrate:statusで見れるやつ )
を管理しているようですね。

バージョン番号というのは
rails gすると勝手に先頭に付加される数字です
```bash
 例 ) 20170310XXXXXX_create_user.rb
```
また逆も然りで、
再度migrationコードを実行したい場合は
対象のレコードを削除してあげます。

試してみてください!!
