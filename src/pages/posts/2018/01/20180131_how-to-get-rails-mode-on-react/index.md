---
templateKey: blog-post
title: AssetPipelineなしでRailsのモデルのデータをReactで取得する方法
slug: /2018/01/31/how-to-get-rails-mode-on-react
createdAt: 2018-01-31 08:00:38
updatedAt: 2018-09-02 13:09:21
thumbnail: /2018/01/20180131_how-to-get-rails-mode-on-react/thumbnail.png
categories:
  - engineering
  - rails
tags:
  - rails
  - ruby
related:
  - dummy
---

&nbsp;

サーバ側はRailsでフロント側はReactみたいな構成でシステム開発していることってまあまああると思うのですが、

RailsとReactは全く別の機構なのでその間でどういう形でデータのやりとりをしていますでしょうか？

SPAなどでは問答無用でAPIで初期状態も含めてデータを取得してくるようなことをやってくるとは思うのですが、そこまでかっちりReactを使っている訳ではなく、初期状態はRailsでレンダリングして、残りのユーザからの入力などによるViewの変更はReactでみたいなことありますよね。

ただ、AssetPipelineなどを使って入ればrails-reactというgemを使って自動（あまり意識せずに）データを受け渡しできるのですが、そうではない場合にどのようにデータをやりとりするか以下にまとめます。

&nbsp;

<div class="adsense"></div>
<h2>JavaScriptでDOMをパース</h2>
&nbsp;

上に書いた内容でRails-Reactでデータの受け渡しをする場合は、基本的な考え方としてモデルの内容を一旦json形式に変換して、DOMにレンダリングします。

その処理自体を自分で書いても良いのですがさすがに辛いので、楽して上にも書いた<a href="https://github.com/reactjs/react-rails"><strong>rails-react</strong></a>のReactComponentヘルパーを使います。このヘルパーの引数にKeyとモデルなどのデータを私てあげるとそれをjson形式に変換してレンダリングしてくれます。

&nbsp;

(例)
```markup
<div data-react-class="Settings"
data-react-props='{"settings":[{"id":72,"user_id":1,
"space_id":"space-a",
"api_key":"hogehoge"},' >
```
&nbsp;

実際のモデルだともっと行数が多いのですが、例では簡略化しています。

DOMへのモデルのレンダリングができたらあとはそれをページが描画されたタイミングなどでパースするだけです。

&nbsp;
```javascript
function getSettings(selector: string){
  const node = document.querySelector(`div[data-react-class=${selector}]`)
  const json = JSON.parse(node.getAttribute('data-react-props'))
  return json
}
```
&nbsp;

こんな感じのメソッドを定義してあげて使い回せばjavascript側でも無事Railsのモデルのデータを取得ができます。

RailsとJavaScriptを確実に分けて開発したい！asset pipelineは使わないという主義の人はこうやって見ると良いかもしれません。

<div class="after-article"></div>
