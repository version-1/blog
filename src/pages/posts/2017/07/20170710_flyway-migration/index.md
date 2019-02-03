---
templateKey: blog-post
title: データベースマイグレーションにFlyway使ってみた
slug: /2017/07/10/flyway-migration
createdAt: 2017-07-10 00:06:59
updatedAt: 2018-08-26 11:51:03
thumbnail: /2017/07/20170710_flyway-migration/thumbnail.jpg
categories:
  - engineering
tags:
  - kotlin
  - flyway
related:
  - dummy
---

こんばんは
最近目を酷使しがちな<a href="https://twitter.com/version1_2017?lang=ja">@verion1</a>です。


さて、
最近セコセコと
自分で考えたwebサイトを
開発しているのですが、
**「開発をしているとやっぱDBの変更もヴァージョン管理できるといいよね。」**
と思い、マイグレーションツールを導入しました。

<div class="adsense"></div>

その名も<strong>Flyway</strong>です。
使っている人も多いのか少ないのか
よくわからないのですが、
kotlinで開発していてjava系のマイグレーションツールを
探していたので、使ってみることにしました。


サイトをみると
コマンドラインのツールもあるみたいなのですが、
公開サーバにいちいちインストールするのも
怠いので、
gradleで全部やってしまいます。

&nbsp;

gradleなら
1. 依存性にFlywayを追加
2. build.gradleごとgitにコミット
3. サーバにデプロイしたら、 gradlewを使ってFlywayタスクを実行。

のような感じでスムーズにできるので

&nbsp;
<h2 class="chapter">Flywayを使ってみる　| 依存性の追加</h2>
&nbsp;

それでは、
依存性追加
```groovy
buildscript {
    ext.springBootVersion = '1.5.1.RELEASE'
    ext.kotlin_version = '1.1.1'

    repositories {
        jcenter()
        mavenCentral()
    }
    dependencies {
        classpath "org.jetbrains.kotlin:kotlin-gradle-plugin:$kotlin_version"
        classpath "org.flywaydb:flyway-gradle-plugin:3.0"
    }
}

apply plugin: 'kotlin'
apply plugin: 'flyway'


flyway{
    url = 'jdbc:mysql://localhost/hoge'
    user = 'sample'
    password = 'password'
}

repositories {
    jcenter()
    mavenCentral()
}

dependencies {
    compile "org.jetbrains.kotlin:kotlin-stdlib:$kotlin_version"
    compile 'mysql:mysql-connector-java:5.1.6'
}


```

ここでは、
build.gradleに接続情報を持たせてしまっています。

<div class="mid-article"></div>

サイトをみると
コマンドラインで引数に渡す方法もあるみたいです。
ファイルにパスワードとか平文で書くのに抵抗ある方は
こっちの方が良いかと思います。

&nbsp;

さてこれで準備はできましたが、
マイグレーションするファイルがないのでは意味ないので
次は、マイグレーションファイルの準備です。

&nbsp;

&nbsp;
<h2 class="chapter">Flywayを使ってみる　| マイグレーションファイルの配置</h2>
&nbsp;

マイグレーションファイルはクラスパス上に
**db/migration**
と言うディレクトリを切って、
ファイルを配置します。

ファイルの命名規則は
**V[バージョン番号]__[任意のファイル名].sql**
です。

&nbsp;

例えば、
```
V1__create_hoge_table.sql
V1.1__add_column_to_hoge_table.sql
V1.2__alter_column_to_hoge_table.sql
V2__create_foo_table.sql
・
・
```
のような形です。

&nbsp;

バージョン番号は以下のようなコマンドで確認できます。
State が実行のステータスを表し
* 「Pending」　・・・実行前
* 「Success」・・・成功
* 「Failed」・・・失敗

&nbsp;
```bash
$gradle flywayInfo
:compileKotlin
Using kotlin incremental compilation
w: The '-d' option with a directory destination is ignored because '-module' is specified
:compileJava NO-SOURCE
:copyMainKotlinClasses UP-TO-DATE
:processResources UP-TO-DATE
:classes UP-TO-DATE
:compileTestKotlin NO-SOURCE
:compileTestJava NO-SOURCE
:copyTestKotlinClasses UP-TO-DATE
:processTestResources NO-SOURCE
:testClasses UP-TO-DATE
:flywayInfo
+----------------+----------------------------+---------------------+---------+
| Version        | Description                | Installed on        | State   |
+----------------+----------------------------+---------------------+---------+
| 1              | create hoge table          | 2017-07-09 21:24:35 | Success |
| 1.1            | create companies           | 2017-07-09 21:24:35 | Success |
| 1.2            | Insert data into companies | 2017-07-09 21:24:36 | Success |
+----------------+----------------------------+---------------------+---------+

BUILD SUCCESSFUL



```
ここまでで、準備は完了です。

次は実際に実行していきます。

<h2 class="chapter">Flywayを使ってみる　| マイグレーション実行</h2>

いよいよ実行です。
コマンドはこちら
```bash
gradle flywayMigrate
```
このコマンドで、
db/migrate配下にあるSQLファイルがバージョン
の若い方から順番に
実行されていきます。

エラーが表示されず。
「BUILD SUCCCESSFUL」となれば成功です。

&nbsp;

&nbsp;

もし、失敗した場合は、
sqlファイルを直したりする必要があるのですが、
ファイルを直してから、
gradle flywayMigrationをしても
エラーになってしまいます。

Flywayの流儀として、
一度マイグレーションが失敗をしたら
```bash
gradle flywayRepair
```

でマイグレーションの実行状態を
リペアしてあげないといけません。

なので、
マイグレーションが失敗したら、
このコマンドは忘れないように実行するようにしてください。

&nbsp;
<h2 class="chapter">Flywayを使ってみる　| まとめ</h2>
&nbsp;

そもそもFlywayの導入は、
DBの状態もヴァージョン管理できるといいよね。
と言う目的で始めました。

&nbsp;

なので、
一般的には先の手順で使用したようなsqlはgitにコミットして
おき、デプロイで使ったり他のサーバで環境を
作る際に利用します。

&nbsp;

マイグレーションファイルは作成して、
問題ないことが確認できたら忘れずにコミットするように
習慣づけておきましょう。

もっと興味がある方は他のコマンドなども調べてみると良いかと思います。

&nbsp;

私があとよく使うのは
gradle flywayCleanくらいですかね。

これをするとdatabaseの全テーブルが綺麗になるので
利用には注意が必要ですがアプリケーション開発の初期段階では、
頻繁にdbの構造を帰るのでまあまこれをやります。

今回は
基本的なところを
まとめましたが、
これ以上はおいおい知っていけば良いかなと。

では！！
