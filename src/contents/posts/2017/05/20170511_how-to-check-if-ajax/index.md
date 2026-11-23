---
templateKey: blog-post
language: ja
title: Rails で Ajaxかどうかを見分ける方法 ( Ajaxで .html.erbが読み込まれるのを防ぐ）
slug: /2017/05/11/how-to-check-if-ajax
createdAt: 2017-05-11 00:34:36
updatedAt: 2020-01-03 02:34:05
thumbnail: /2017/05/20170511_how-to-check-if-ajax/thumbnail.png
categories:
  - engineering
  - rails
tags:
  - ruby
  - rails
  - gadget
related:
  - dummy
---

&nbsp;

Railsでajax送信でポップアップを表示する場合、


通常は、*.js.erb などが読み込まれるのですが、
ページ内のリンクやボタンではなく、
URLを直打ちなどした場合にControllerが通常のリクエスト通り、
*.html.rbファイルを読み込んでしまい
MissingTemplateになってしまうといった場合があると思います。

&nbsp;
<div class="adsense"></div>
&nbsp;

これを避けるには
Ajaxのリクエスト　→ 通常通り
それ以外 → 元のページにリダイレクト
のようにするのが有効です。

```ruby
class ExamplesController < ApplicationController

  def index
      unless request.xhr?
         redirect_to [ 元のページ　]
      end
  end
end


```
&nbsp;

コードでは、
以下でAjaxリクエストかどうか判定しています。

&nbsp;
```markup
request.xhr?

```
&nbsp;

&nbsp;
ちなみにPOST/GETの判定は
```markup
request.get?
request.post?

```

でできます。
