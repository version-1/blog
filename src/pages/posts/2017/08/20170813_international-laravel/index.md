---
templateKey: blog-post
title: Laravel5.4の多言語化
slug: /2017/08/13/international-laravel
createdAt: 2017-08-13 20:49:40
updatedAt: 2018-08-26 11:47:17
thumbnail: /2017/08/20170813_international-laravel/thumbnail.png
categories:
  - engineering
tags:
  - dummy
---

どうも
多言語化というと
たいそうな話に聞きこえますが、
Laravelでのロケールの話です。

つまり、
webアプリケーションを作る時に
htmlに文字をベタ書きしてしまうと、
あとあと
「このサイト英語にするのどれくらいかかる？」
とかの
無邪気な質問に対応しづらくなります。

ベタ書きしてしまうと、
後から、置き換える必要のある場所を洗い出して
全部htmlなりテンプレートファイルを
書き換えないといけません。


最近
Laravelでアプリを作りはじめていて
使い方を調べたので、
ここにまとめておきます。

ちなみにLaravelのバージョンは5.4です。
この記事はここを参考にしました。
<a href="https://laravel.com/docs/5.4/localization">https://laravel.com/docs/5.4/localization</a>

<div class="adsense"></div>


<h2 class="chapter">ロケールファイルの置き場所</h2>

ロケールファイルこのように、
resources/lang/の下に
言語に分けてそれぞれの言語ファイルを置いて起きます。

```php
/resources
    /lang
        /en
            messages.php
        /ja
            messages.php

```

それぞれの中身は
(英語版) lang/en/message.php

```php
　<?php
  return [
    'description' => 'welcome to our site. this is shopping site on the web !!'
]


```

(日本語版) lang/ja/message.php
```php
<?php
  return [
    'description' => 'ようこそ私たちのオンラインショッピングサイトへ'
]


```

になります。
このようにしておくと
message.descriptionなどを
キーにviewファイルから文字を呼びだすようになります。

<h2>ロケールファイルに書いたメッセージの呼び出し</h2>


上の設定が住んで入れば、
view ファイルで

```php
__('message.description')'
```
のように、
呼び出せます。

&nbsp;


<h2  class="chapter">ロケールの設定</h2>

&nbsp;
&nbsp;


ここまでで、
・言語ごとのロケールファイルの設定
・viewファイルでの呼び出し

はできます。
が、
日本語が呼ばれるか、英語が呼ばれるかどこで判断するの？
という疑問が生まれると思います。

それがどこかというと、
それは、

&nbsp;
&nbsp;

config/app.phpのlocaleになります。

```php
/*
|--------------------------------------------------------------------------
| Application Locale Configuration
|--------------------------------------------------------------------------
|
| The application locale determines the default locale that will be used
| by the translation service provider. You are free to set this value
| to any of the locales which will be supported by the application.
|
*/

'locale' => 'ja',


```


また、config/app.phpはアプリの起動時に
読まれるはずですが、
アプリの起動中でも

```php
Route::get('welcome/{locale}', function ($locale) {
    App::setLocale($locale);

    //
});
```

のような形でロケールを変更できるよう。

これはやってみてはないですが、
これを使って、
言語をユーザに選ばせるとかはできそう。

&nbsp;
&nbsp;

<h2 class="chapter">おまけ - メッセージを動的にする</h2>

&nbsp;
&nbsp;

以下は少し補足的な内容になりますが、
メッセージを動的に変化させたい時ありますよね。

例えば、
ログイン後の画面でよくある「ようこそ〇〇さん」みたいな表示です。

&nbsp;
&nbsp;

これをロケールでやろうとすると
(英語版)
```php
　<?php
  return [
    'welcom' => ':name　, welcome to our site!!'
]


```

(日本語版)
```php
<?php
  return [
    'welcom' => 'ようこそ :name さん'
]


```

のようにファイルに定義して、
呼び出す際に
```php
__('messages.welcome', ['name' => 'John']);
```

のようにすれば、
変数の文字を埋め込んだ形でメッセージを表示することができます。

&nbsp;
&nbsp;

<h2 class="chapter">まとめ</h2>

&nbsp;
&nbsp;

ここまでで、
ロケールとか国際化とか多言語化とかに
役立つ情報をまとめました。

これはアプリを多言語で作ると決めてから
コツコツ両方のロケールを更新していくという作業
が必要なので、
早めに知っておくと良いと思います。
（後から文字を全部置き換えるという単純作業は地獄なので・・・）

以上です!!
