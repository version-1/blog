---
templateKey: blog-post
title: \[CakePHP3\]CakePHP3でSQLをログに吐き出す方法
slug: 2017/01/29/cakephp3-sql-log
description: CakePHP3でRailsのようにSQLを
ログに書き出すようにしたいなあと
思っていたので、
少し調べました。

&nbsp;

[after_intro]

&nbsp;

調べたところ
ここに書いてありました。
<a href="https://book.cakephp.org/3.0/ja/orm/database-basics.html#database-configuration">https://book.cakephp.org/3.0/ja/orm/database-basics.html#database-configuration</a>
<bl
createdAt: 2017-01-29 14:27:43
updatedAt: 2018-08-26 12:39:39
thumbnail: http://ver-1-0.net/wp-content/uploads/2017/01/5ntkpxqt54y-sai-kiran-anagani.jpg
categories: 
  - engineering
---

CakePHP3でRailsのようにSQLを
ログに書き出すようにしたいなあと
思っていたので、
少し調べました。

&nbsp;

[after_intro]

&nbsp;

調べたところ
ここに書いてありました。
<a href="https://book.cakephp.org/3.0/ja/orm/database-basics.html#database-configuration">https://book.cakephp.org/3.0/ja/orm/database-basics.html#database-configuration</a>
<blockquote>log
クエリログを有効にするには true をセットします。 有効なクエリで debug レベルの時に、 queriesLog スコープでログ出力されます。</blockquote>
これでアプリケーションのdebug設定がtrueの時は,
SQLをapp/logs/*.logに吐いてくれます。

&nbsp;

&nbsp;

デバック設定にする方法は以下の通り
<strong>app/config/app.php 10~13行目あたり</strong>


<pre><code class="language-php">* true: Errors and warnings shown.
*/
'debug' =&gt; filter_var(env('DEBUG', true), FILTER_VALIDATE_BOOLEAN),

</code></pre>
