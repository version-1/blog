---
templateKey: blog-post
title: polymophicなテーブルを経由して、has_many thourghする。
slug: /2018/02/14/post-1918
createdAt: 2018-02-14 00:57:08
updatedAt: 2018-09-02 13:09:21
thumbnail: ./thumbnail.png
categories: 
  - engineering
  - rails
---

&nbsp;

Railsのアソシエーションで、中間テーブルを経由して一個飛ばしでインスタンスを取得できるhas_many~through便利ですよね。ところが、この<strong>中間テーブルがpolymophicだった場合</strong>に、どうやって対象を取得すれば良いのかということに悩みました。

&nbsp;

解決策は、結論からいうと、下の例でいうと
モデルにはこういう形で定義して、そのままuser.post_commentsのような形でできます。

&nbsp;

&nbsp;
```ruby
has_many :post_comments, through: :comments, :source => :commentable,:source_type => 'Post'
has_many :blog_comments, through: :comments :source => :commentable,:source_type => 'Blog'

```
&nbsp;

[after_intro]

&nbsp;
<h2>図やコードを交えて解説</h2>
&nbsp;

これだけではなんのことかよくわからないかもしれないので、上の結論のコードの全容を明かすと以下のようになります。

以下のモデルは、複数のユーザがブログを作り、各々ポストを投げていくという世界を想定したモデル群です。

<img class="post-image" src="./polymophic-through-1024x767.png" alt="polymophic-through-1024x767.png"/>

&nbsp;

&nbsp;
```ruby
class User < ActiveRecord::Base
  has_many :blogs
  has_many :posts
  has_many :comments
  has_many :post_comments, through: :comments, :source => :commentable,:source_type => 'Post'
  has_many :blog_comments, through: :comments :source => :commentable,:source_type => 'Blog'
end

class Blog < ActiveRecord::Base
  has_many :comments, as: :commentable
end

class Post < ActiveRecord::Base
  has_many :comments, as: :commentable
end

class Comment < ActiveRecord::Base
  belongs_to :commentables, polymophic: true
end

```
&nbsp;

コードを見てみると、確かにいつものようにhas_manyで<strong>「Userが行った投稿を取ってくる」ことや「Userが持っているブログを取得する」ということは簡単にできます。</strong>ただ、<strong>「ユーザーがコメントした投稿」</strong>や<strong>「ユーザーがコメントしたブログ」</strong>についてはどうやって取得しようか少し迷うところがあると思います。

&nbsp;

&nbsp;

特に、ここでは、中間テーブルの役割をはたすCommentがポリモーフィック関連なのでなおさらです。

railsのポリモーフィック関連では、~able_idと~able_typeというカラムで関連が定義されますが、上のコードを例にとるとhas_many :commentsだけでは、<strong>「ユーザーがコメントした投稿」と「ユーザーがコメントしたブログ」の両方ともが取得されてきてしまいます。</strong>愚直にやるのであれば、commentable_typeを条件にSQLを発行してとやればできなくはないですが、それは苦しいです。。

&nbsp;

&nbsp;

そこで、この解決策では、:sourceオプションと:source_typeオプションを使って、ポリモーフィック関連の先のテーブルを指定してあげることで「ユーザーがコメントした投稿」と「ユーザーがコメントしたブログ」を簡単に取得できるようにしています。

&nbsp;

polymophicなテーブルを経由して、has_many thourghする場合は、<strong>sourceオプションでポリモーフィック関連の名前を指定して、source_typeで中間テーブルの先のクラスを指定してシンプルにデータをとってきましょう。</strong>

&nbsp;

&nbsp;

[after_article]
