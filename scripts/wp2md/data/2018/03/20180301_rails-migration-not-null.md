---
templateKey: blog-post
title: Rails5.1すでに存在するカラムをmigrationでnot nullにする
slug: 2018/03/01/rails-migration-not-null
description: &nbsp;
<h2>change_column_nullを使う</h2>
&nbsp;

すでに存在するカラムをマイグレーションでnullにするには、change_column_nullを使います。

&nbsp;
<pre><code class="language-ruby">class ChangeLikeCountToPost &lt; ActiveRecord::Migration[5.1]
  def change
    change_column_null :posts, :like_count, null: false, 0
  end
end
</c
createdAt: 2018-03-01 22:03:57
updatedAt: 2018-09-02 13:09:21
thumbnail: https://ver-1-0.net/wp-content/uploads/2018/02/rails-1.png
categories: 
  - engineering
  - rails
---

&nbsp;
<h2>change_column_nullを使う</h2>
&nbsp;

すでに存在するカラムをマイグレーションでnullにするには、change_column_nullを使います。

&nbsp;
<pre><code class="language-ruby">class ChangeLikeCountToPost &lt; ActiveRecord::Migration[5.1]
  def change
    change_column_null :posts, :like_count, null: false, 0
  end
end
</code></pre>
&nbsp;

change_column_nullはDBの定義をnull:オプションで指定した定義に変更するまえに、値がnullのものを第4引数にupdateしたのちにDB定義を変更してくれます。

&nbsp;
<pre><code class="language-ruby">def change_column_null(table_name, column_name, null, default = nil) #:nodoc:
  unless null || default.nil?
    execute("UPDATE #{quote_table_name(table_name)} SET #{quote_column_name(column_name)}=#{quote(default)} WHERE #{quote_column_name(column_name)} IS NULL")
  end

  change_column table_name, column_name, nil, null: null
end
</code></pre>
&nbsp;

change_columnでもDBの定義は変更できますが、このメソッドは問答無用でDBの定義を変更しにいくので、「値がNullのカラムにNotNull制約をつけることはできません」となって怒られます。

&nbsp;
<h2> change_column_nullはDBのデフォルト値も変更してくれるわけではない</h2>
&nbsp;

下のコードをみると、NotNull制約をつけるついでにDBのデフォルト値も設定してくれそうに見えますが、

&nbsp;
<pre><code class="language-ruby">change_column_null :posts, :like_count, null: false, 0</code></pre>
&nbsp;

実際は、そこまでやってくれません。第四引数の<strong>0はnullの値を置き換える値を指定するだけでデフォルト値を指定しているわけではない</strong>ことに注意しなければいけません。

そのため、NotNull制約をつけるついでにデフォルト値も設定する場合は、以下のようにする必要があります。

&nbsp;
<pre><code class="language-ruby">class ChangeLikeCountToPost &lt; ActiveRecord::Migration[5.1]
  def change
    change_column_null :posts, :like_count, null: false, 0
    change_column :posts, :like_count, :integer, default: 0
  end
end
</code></pre>
&nbsp;
