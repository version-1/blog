---
templateKey: blog-post
title: Rails5.1すでに存在するカラムをmigrationでnot nullにする
slug: /2018/03/01/rails-migration-not-null
createdAt: 2018-03-01 22:03:57
updatedAt: 2018-09-02 13:09:21
thumbnail: /2018/03/20180301_rails-migration-not-null/thumbnail.png
categories:
  - engineering
  - rails
tags:
  - rails
  - ruby
  - activerecord
  - serverside
related:
  - dummy
---

<h2>change_column_nullを使う</h2>

すでに存在するカラムをマイグレーションでnullにするには、change_column_nullを使います。

```ruby
class ChangeLikeCountToPost < ActiveRecord::Migration[5.1]
  def change
    change_column_null :posts, :like_count, null: false, 0
  end
end

```

change_column_nullはDBの定義をnull:オプションで指定した定義に変更するまえに、値がnullのものを第4引数にupdateしたのちにDB定義を変更してくれます。

```ruby
def change_column_null(table_name, column_name, null, default = nil) #:nodoc:
  unless null || default.nil?
    execute("UPDATE #{quote_table_name(table_name)} SET #{quote_column_name(column_name)}=#{quote(default)} WHERE #{quote_column_name(column_name)} IS NULL")
  end

  change_column table_name, column_name, nil, null: null
end

```

<div class="adsense"></div>


change_columnでもDBの定義は変更できますが、このメソッドは問答無用でDBの定義を変更しにいくので、「値がNullのカラムにNotNull制約をつけることはできません」となって怒られます。

<h2> change_column_nullはDBのデフォルト値も変更してくれるわけではない</h2>

下のコードをみると、NotNull制約をつけるついでにDBのデフォルト値も設定してくれそうに見えますが、

```ruby
change_column_null :posts, :like_count, null: false, 0
```

実際は、そこまでやってくれません。第四引数の<strong>0はnullの値を置き換える値を指定するだけでデフォルト値を指定しているわけではない</strong>ことに注意しなければいけません。

そのため、NotNull制約をつけるついでにデフォルト値も設定する場合は、以下のようにする必要があります。

```ruby
class ChangeLikeCountToPost < ActiveRecord::Migration[5.1]
  def change
    change_column_null :posts, :like_count, null: false, 0
    change_column :posts, :like_count, :integer, default: 0
  end
end

```
