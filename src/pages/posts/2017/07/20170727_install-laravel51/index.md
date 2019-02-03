---
templateKey: blog-post
title: Laravel5.1をMacにインストール。導入方法の解説。
slug: /2017/07/27/install-laravel51
createdAt: 2017-07-27 19:30:38
updatedAt: 2018-08-26 11:49:15
thumbnail: /2017/07/20170727_install-laravel51/thumbnail.png
categories:
  - engineering
  - for-beginner
tags:
  - dummy
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

```bash
 composer create-project "laravel/laravel=5.1.*" sample
```
終わった。
だいぶあっさり

<div class="after-article"></div>

&nbsp;
<h2 class="chapter">Databaseの設定</h2>
インストールして終わっては
つまらないので、
データベース設定まではやりましょうか

.envを編集
```bash
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_DATABASE=your_database
DB_USERNAME=password
DB_PASSWORD=

```
&nbsp;
<h2 class="chapter">とりあえず起動してみる</h2>
データベースの設定も終わったので
とりあえず下記のコマンドでビルトインサーバを
起動できるよう。

```bash
cd sample
php artisan serve

```

<img class="post-image" src="https://statics.ver-1-0.net/uploads/2017/07/20170727_install-laravel51/laravel.png" alt="laravel top"/>

そして、
http://localhost:8000
に繋いで見ると
ものすごくシンプルな画面が出てきました。

以上です！

<div class="after-article"></div>

&nbsp;

次チュートリアルでもやってみますかね。
