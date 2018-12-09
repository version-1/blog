---
templateKey: blog-post
title: Laravel5.1をMacにインストール。導入方法の解説。
slug: 2017/07/27/install-laravel51
description: &nbsp;

&nbsp;

どうも
個人では、
CakePHPを使っていますが、
会社でちょっと使うかもしれなくなったのでちょっと調べて見ました。

&nbsp;

&nbsp;
<h2 class="chapter">インストール</h2>
本当は、
5.2を使いたかったが、
phpのバージョンの関係で5.1を
インストール。
<pre><code class="language-bash"> composer create-project "laravel/laravel=5.1.*" sample</code></pre>
終わった。
だいぶあっさ
createdAt: 2017-07-27 19:30:38
updatedAt: 2018-08-26 11:49:15
thumbnail: http://ver-1-0.net/wp-content/uploads/2017/07/スクリーンショット-2017-07-27-0.16.06.png
categories: 
  - engineering
  - for-beginner
---

&nbsp;

&nbsp;

どうも
個人では、
CakePHPを使っていますが、
会社でちょっと使うかもしれなくなったのでちょっと調べて見ました。

&nbsp;

&nbsp;
<h2 class="chapter">インストール</h2>
本当は、
5.2を使いたかったが、
phpのバージョンの関係で5.1を
インストール。
<pre><code class="language-bash"> composer create-project "laravel/laravel=5.1.*" sample</code></pre>
終わった。
だいぶあっさり

[after_article]

&nbsp;
<h2 class="chapter">Databaseの設定</h2>
インストールして終わっては
つまらないので、
データベース設定まではやりましょうか

.envを編集
<pre><code class="language-bash">
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_DATABASE=your_database
DB_USERNAME=password
DB_PASSWORD=
</code></pre>
&nbsp;
<h2 class="chapter">とりあえず起動してみる</h2>
データベースの設定も終わったので
とりあえず下記のコマンドでビルトインサーバを
起動できるよう。
<pre><code class="language-bash">cd sample
php artisan serve
</code></pre>
<img class="alignnone size-large wp-image-536" src="http://ver-1-0.net/wp-content/uploads/2017/07/スクリーンショット-2017-07-27-0.16.06-1024x574.png" alt="Laravel" width="700" height="392" />
そして、
http://localhost:8000に繋いで見ると
ものすごくシンプルな画面が出てきました。

以上です！

[after_article]

&nbsp;

次チュートリアルでもやってみますかね。
