---
templateKey: blog-post
title: kotlin SQL Framework Exposed を使ってDB接続してみた
slug: /2017/02/08/kotlin-db-connect-by-exposed
createdAt: 2017-02-08 00:22:56
updatedAt: 2018-11-08 18:33:11
thumbnail: /2017/02/20170208_kotlin-db-connect-by-exposed/thumbnail.png
categories:
  - engineering
tags:
  - dummy
related:
  - dummy
---

&nbsp;

前回のkotlinシリーズに引き続き
今回は、DB接続です。

&nbsp;

本題に入る前にちょっと宣伝。
よかったらどうぞ

<ul>
<li>Kotlinでhttpリクエストを投げてみる。<a href="http://ver-1-0.net/2017/02/05/kotlin-http-request-khttp/" target="_blank" rel="noopener noreferrer">http://ver-1-0.net/2017/02/05/kotlin-http-request-khttp/</a></li>
<li>KotolinでHelloworld <a href="http://ver-1-0.net/2017/01/02/kotlin-hello-world/" target="_blank" rel="noopener noreferrer">http://ver-1-0.net/2017/01/02/kotlin-hello-world/</a></li>
</ul>

&nbsp;

<div class="adsense"></div>

&nbsp;

ということで、早速build.gradleを公開

&nbsp;

<strong>build.gradle</strong>

&nbsp;
```groovy
version '1.0-SNAPSHOT'

buildscript {
    ext {
        kotlinVersion = '1.0.2'
    }
    repositories {
        mavenCentral()
    }
    dependencies {
        classpath("org.jetbrains.kotlin:kotlin-gradle-plugin:${kotlinVersion}")
    }
}

apply plugin: 'kotlin'
apply plugin: 'application'

mainClassName = "samples.HelloWorldKt"


repositories {
    mavenCentral()
    maven {
        url('https://dl.bintray.com/kotlin/exposed/')
    }
}

dependencies {
    compile "org.jetbrains.kotlin:kotlin-stdlib:${kotlinVersion}"
    compile 'org.jetbrains.exposed:exposed:0.7.6'
    compile 'mysql:mysql-connector-java:5.1.6'
}

```
特に難しいことはないですが、
exposedとmysqlの依存性を記載しています。

&nbsp;

&nbsp;

メインクラスはこういった感じで記載。

src/main/kotlin/samples/HelloWorld.kt


```kotlin
package samples

import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.transactions.transaction
import org.jetbrains.exposed.sql.SchemaUtils.create

object Student : Table("student") {
    val id = integer("student_id").autoIncrement().primaryKey()
    val name = varchar("name", 50)
    val grade = integer("grade")
}

fun main(args: Array) {
    Database.connect("jdbc:mysql://localhost/sample", "com.mysql.jdbc.Driver","user","password")
    transaction {
       create(Student)
    }
}

```
今回はデータベースに接続して、Student テーブルを作るまで。
CRUDとかはもう少し時間のあるときに勉強します。

&nbsp;

では ./gradlew run で実行してみましょう.
```bash
$ ./gradlew run
:compileKotlin UP-TO-DATE
:compileJava UP-TO-DATE
:processResources UP-TO-DATE
:classes UP-TO-DATE
:run

BUILD SUCCESSFUL

Total time: 5.092 secs

This build could be faster, please consider using the Gradle Daemon: https://docs.gradle.org/2.10/userguide/gradle_daemon.html

$ mysql -u user -ppassword sample -e "show tables; show columns from student"
mysql: [Warning] Using a password on the command line interface can be insecure.
+------------------+
| Tables_in_sample |
+------------------+
| student          |
+------------------+
+------------+-------------+------+-----+---------+----------------+
| Field      | Type        | Null | Key | Default | Extra          |
+------------+-------------+------+-----+---------+----------------+
| student_id | int(11)     | NO   | PRI | NULL    | auto_increment |
| name       | varchar(50) | NO   |     | NULL    |                |
| grade      | int(11)     | NO   |     | NULL    |                |
+------------+-------------+------+-----+---------+----------------+


```
はい!!
確かにstudentテーブルが作成されています。

CRUDとかDAOとかもっともっとできることはあるんだろうけど、
今回はとりあえずここまで。

#### 参考URL

Javaビーム研究所 Exposedの使い方

http://blog.orekyuu.net/?p=484

算譜王におれはなる!!!! KotlinでDBアクセスしてみた(原始的な方法、標準ライブラリ、3rdパーティライブラリ)
http://taro.hatenablog.jp/entry/2013/08/06/214702

https://github.com/JetBrains/Exposed/blob/master/src/main/kotlin/org/jetbrains/exposed/sql/Database.kt

&nbsp;
