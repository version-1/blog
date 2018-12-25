---
templateKey: blog-post
title: Rails migratoinコマンドまとめ
slug: /2017/03/13/rails-migratoin
createdAt: 2017-03-13 23:21:52
updatedAt: 2018-08-26 12:14:47
thumbnail: ./thumbnail.png
categories: 
  - engineering
  - rails
---

Rails では
マイグレーションコードを書いておけば
```ruby
rake db:migrate
```
とするだけで、
DBの変更などをとりくむことができます。

今回はマイグレーションコード
についてまとめてみました。




&nbsp;
<div class="after-intro"></div>
&nbsp;
<h2 class="chapter">Migration Codeの実行</h2>

```ruby
rake db:migrate
```
これを実行するだけで,
[Raisのルートディレクトリ]/db/migrate配下にある
マイグレーションコードを全て実行できます。

&nbsp;
<h2 class="chapter">Migration Codeの個別実行</h2>


```
rake db:migrate:up VERSION=[バーション番号]
```
migrationコードを個別に実行したい場合は、
VERSIONオプションでバージョンを指定して
実行することができます。

バージョン番号とはマイグレーションコードの頭に着く
2017XXXXXXXXXXのような番号です。

ちなみにDBの変更を戻したい場合は
```ruby
rake db:migrate:down VERSION=[バーション番号]
```
&nbsp;
&nbsp;
<h2 class="chapter">Migration Codeの状態確認</h2>


```
rake db:migrate:status
```
このコマンドでどのマイグレーションコードが
実行されているかを確認することができます。

これまで実行したかどうかはup/downで表されます。

まだ、実行していないmigration codeを表示する場合は、
```ruby
rake db:migrate:abort_if_pending_migrations
```
です。


以上です!!
