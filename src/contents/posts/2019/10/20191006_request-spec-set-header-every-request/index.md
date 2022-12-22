---
templateKey: blog-post
language: ja
title: Request Specでデフォルトのヘッダーを設定する
slug: /2019/10/06/request-spec-set-header-every-request
createdAt: 2019-10-06 22:31:56
updatedAt: 2019-10-06 22:31:56
thumbnail: /2019/10/20191006_request-spec-set-header-every-request/thumbnail.png
categories:
  - engineering
tags:
  - ruby
  - rails
  - test
---

私がRailsを始めた頃は、rspecでのコントローラのテストをそのまま書くのが普通ですが、
最近だとコントローラのテストはリクエストスペックが主流のようです。

そんなことを気にしながらリクエストスペックの設定を進めていると「あれ、これリクエストの
たびに、認証情報などのヘッダ書かないといけないのか？」と思って調べてみたところ、
ちょうど良い方法がわかったのでここにまとめておきます。

## Request Specのデフォルトのヘッダーを定義する

ヘッダをデフォルトで設定するには、requst spec内で呼び出せる、
get, post, patch, put, deleteなどのメソッドをラップしてあげることでspecのファイルごとに毎回
ヘッダを付与する処理を書かなくて済むようにすることができます。

[RAILS API](https://api.rubyonrails.org/classes/ActionDispatch/Integration/RequestHelpers.html#method-i-head)

reqest specの各HTTPメソッドに対応したメソッドはそれぞれ第二引数でheaderを設定することができます。

```ruby
get '/users/', params: params, header: header
```

なので、このheader部分にラップした関数でデフォルトのヘッダーを付与して楽しちゃおうというのが今回のやり方です。

### Request Helper(HTTPメソッドのラッパ）を用意

まずspec/support配下に下記のようなファイルを用意します。

spec/support/request\_spec\_helper.rb

```ruby
module RequestSpecHelper
  %i[get post patch put delete head].each do |name|
    define_method(name) do |path, params: {}, headers: {}|
      super(path, params: params&.to_json, headers: default_request_headers&.merge(headers))
    end
  end
end
```

define\_methodを使ってメタプロしているのでちょっとわかりづらいですが、
実直に書いていくと下記のようになります。

<div class="adsense"></div>

```ruby
module RequestSpecHelper
  def get(path, params: {}, headers: {})
    super(path, params: params&.to_json, headers: default_request_headers&.merge(headers))
  end

  def post(path, params: {}, headers: {})
    super(path, params: params&.to_json, headers: default_request_headers&.merge(headers))
  end

  def patch(path, params: {}, headers: {})
    super(path, params: params&.to_json, headers: default_request_headers&.merge(headers))
  end

  def put(path, params: {}, headers: {})
    super(path, params: params&.to_json, headers: default_request_headers&.merge(headers))
  end

  def delete(path, params: {}, headers: {})
    super(path, params: params&.to_json, headers: default_request_headers&.merge(headers))
  end

  def head(path, params: {}, headers: {})
    super(path, params: params&.to_json, headers: default_request_headers&.merge(headers))
  end
end
```

ここでのsuperはもともとのActionDispatch::Integration::RequestHelpersクラスのそれぞれのメソッドをさしています。
コードをよく見るとそれぞれでdefault\_request\_headersという変数が呼ばれているかと思うのですが、
ここにletなどであらかじめデフォルトの引数を設定しておけばspecファイルの中では

```ruby
post '/path/to/endpoint', params: params
```

という感じで、認証に使うようなヘッダなど毎回使うものを定義せずにspecを書くことができるようになります。

このファイルが用意できたらあとは、ファイルを読み込んであげれば良いので、
spec/rails\_helper.rbに
```ruby
RSpec.configure do |config|
   ~~~
  config.include RequestSpecHelper, type: :request
   ~~~
end
```

という形でrequest specの時だけ同ファイルを読み込むようにしてあげると上のメソッドが使えるようになります。

かなり手短にすませましたが、controller specからrequest specに移行するのに必要と思われる手順なのでまとめておきました。
