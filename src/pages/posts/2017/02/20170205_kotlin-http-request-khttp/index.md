---
templateKey: blog-post
title: Kotlinでhttpリクエストを投げてみる。 (khttp)
slug: /2017/02/05/kotlin-http-request-khttp
createdAt: 2017-02-05 22:48:17
updatedAt: 2018-08-26 12:35:52
thumbnail: /2017/02/20170205_kotlin-http-request-khttp/thumbnail.png
categories: 
  - engineering
---

&nbsp;

&nbsp;

さて、前回のHelloWorldに引き続き今回は
<strong>kotlinでHTTPリクエスト</strong>を送ってみます。
<div class="after-intro"></div>

&nbsp;

<h2 class="chapter">khttpを使ってみる</h2>

今回使用するライブラリは、
<strong>khttp です</strong>
<a href="https://github.com/jkcclemens/khttp">https://github.com/jkcclemens/khttp</a>

ライブラリは
<a href="https://kotlinlang.org/docs/resources.html">ここ</a>
から見つけてきました。

使い方は<strong>khttp</strong>の上記リンク先に書いています。

ひとまず build.gradle.ktsは
```groovy
buildscript {

    repositories {
        gradleScriptKotlin()
    }

    dependencies {
        classpath(kotlinModule("gradle-plugin"))
    }
}

plugins {
    application
}

apply {
    plugin("kotlin")
}

configure {
    mainClassName = "samples.HelloWorldKt"
}

repositories {
    gradleScriptKotlin()
    jcenter()
}

dependencies {
    compile(kotlinModule("stdlib"))
    "compile"("khttp:khttp:0.1.0")
}
</pre></code>
こんな感じで
メインの処理は以下です。
```kotlin
package samples

import khttp.get

fun main(args: Array) {
    var url : String = "https://lightning.bitflyer.jp/v1/getboard" // bitFlyerのAPI URL
    // Get our IP
    println(get(url).jsonObject.getInt("mid_price"))
}

```
リクエストの送信先はなんでもいいのですが
今回は私の最近気になる、
<strong>bitFlyer</strong>さんの<strong>API</strong>を利用して、
<strong>ビットコイン</strong>の現在価格を取得してきます。
<a href="https://px.a8.net/svt/ejp?a8mat=2TAGV9+1IRYQY+3JJ4+631SX" target="_blank">
<img src="https://www21.a8.net/svt/bgt?aid=170129637092&amp;wid=004&amp;eno=01&amp;mid=s00000016528001022000&amp;mc=1" alt="" width="468" height="60" border="0" /></a>
<img src="https://www15.a8.net/0.gif?a8mat=2TAGV9+1IRYQY+3JJ4+631SX" alt="" width="1" height="1" border="0" />

ちなみにjson はこんな形でレスポンスを返します。
```json
{"mid_price":116884.0,
"bids":[{"price":116867.0,"size":2.346},
        {"price":116853.0,"size":2.0},
        {"price":116850.0,"size":10.18},
        {"price":116845.0,"size":0.04046836},
        ・
        ・
        ・
        （略)

```

&nbsp;


では、実際に動かしてみます。
```bash
$ ./gradlew run
:compileKotlin
w: The '-d' option with a directory destination is ignored because '-module' is specified
:compileJava NO-SOURCE
:copyMainKotlinClasses
:processResources NO-SOURCE
:classes UP-TO-DATE
:run
116840
BUILD SUCCESSFUL

```
ちなみに余計な出力を消すときは
<strong>-q オプション</strong>
をつけてあげてください。

見事 1BTCあたりの日本円価格の取得に成功しています。
以上です!!

&nbsp;

&nbsp;

<div class="after-article"></div>
