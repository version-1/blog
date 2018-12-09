---
templateKey: blog-post
title: Rails で Ajaxかどうかを見分ける方法 ( Ajaxで .html.erbが読み込まれるのを防ぐ）
slug: 2017/05/11/how-to-check-if-ajax
createdAt: 2017-05-11 00:34:36
updatedAt: 2018-08-26 12:04:44
thumbnail: http://ver-1-0.net/wp-content/uploads/2017/01/5ntkpxqt54y-sai-kiran-anagani.jpg
categories: 
  - engineering
  - rails
---

&nbsp;

Railsでajax送信でポップアップを表示する場合、

&nbsp;

通常は、*.js.erb などが読み込まれるのですが、
ページ内のリンクやボタンではなく、
URLを直打ちなどした場合に

&nbsp;

Controllerが通常のリクエスト通り、
*.html.rbファイルを読み込んでしまい
MissingTemplateになってしまうといった場合があると思います。

&nbsp;
[after_intro]
&nbsp;

これを避けるには
Ajaxのリクエスト　→ 通常通り
それ以外 → 元のページにリダイレクト
のようにするのが有効です。
<pre><code class="language-ruby">class ExamplesController &lt; ApplicationController

  def index 
      unless request.xhr?
         redirect_to [ 元のページ　]
      end 
  end
end

</code></pre>
&nbsp;

コードでは、
以下でAjaxリクエストかどうか判定しています。

&nbsp;
<pre><code class="language-markup">request.xhr?
</code></pre>
&nbsp;

&nbsp;
ちなみにPOST/GETの判定は
<pre><code class="language-markup">request.get?
request.post?
</code></pre>

でできます。
