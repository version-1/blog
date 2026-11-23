---
templateKey: blog-post
language: ja
title: CakePHP3でSQLをログに吐き出す方法
slug: /2017/01/29/cakephp3-sql-log
createdAt: 2017-01-29 14:27:43
updatedAt: 2020-01-03 02:34:05
thumbnail: /2017/01/20170129_cakephp3-sql-log/thumbnail.png
categories:
  - engineering
tags:
  - cakephp
  - php
  - serverside
related:
  - dummy
---

CakePHP3でRailsのようにSQLを
ログに書き出すようにしたいなあと
思っていたので、
少し調べました。

&nbsp;

<div class="adsense"></div>

&nbsp;

調べたところ
ここに書いてありました。
<a href="https://book.cakephp.org/3.0/ja/orm/database-basics.html#database-configuration">https://book.cakephp.org/3.0/ja/orm/database-basics.html#database-configuration</a>
<blockquote>
logクエリログを有効にするには true をセットします。
有効なクエリで debug レベルの時に、 queriesLog スコープでログ出力されます。
</blockquote>

これでアプリケーションのdebug設定がtrueの時は,
SQLをapp/logs/*.logに吐いてくれます。

&nbsp;

&nbsp;

デバック設定にする方法は以下の通り

app/config/app.php 10~13行目あたり


```php
* true: Errors and warnings shown.
*/
'debug' => filter_var(env('DEBUG', true), FILTER_VALIDATE_BOOLEAN),


```
