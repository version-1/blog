---
templateKey: blog-post
title: Kotlinの基本文法について少しだけ（パッケージ・関数・変数の定義）
slug: /2017/06/12/kotlin-syntax-alittle
createdAt: 2017-06-12 22:09:19
updatedAt: 2018-08-26 11:57:42
thumbnail: /2017/06/20170612_kotlin-syntax-alittle/thumbnail.png
categories: 
  - engineering
---

&nbsp;

これまでkotlinについていくつか
記事をあげてきましたが、
文法について触れていなかったので、
今回は文法について

&nbsp;
&nbsp;

<h2 class="chapter">パッケージの定義</h2>
まずはパッケージの定義について
ここはあまりjavaと変わりないですね。
「;」がなくなったことくらい
```kotlin
package my.demo

import java.util.*

// ...
```

&nbsp;
&nbsp;
&nbsp;
<h2 class="chapter">functionの定義</h2>
```kotlin
fun sum(a: Int, b: Int): Int {
    return a + b
}
```
kotlinのメソッドはfun　・・・と書くだけです。
functionと全部書きそうになりますが,
funだけです。

&nbsp;
&nbsp;

戻り値も
```kotlin
fun [関数名]( a: Int , b:Int): [返り値の型]{}

```
のように書くのも特徴的です。
java で言う所のvoidのように返り値を返さない場合は、
ここを省略します。

&nbsp;

&nbsp;
<h2 class="chapter">変数の定義</h2>
```kotlin
val a: Int = 1 // 読み取り専用の変数。定数。

var a: Int = 1 // ローカル変数の宣言

```

&nbsp;
&nbsp;

全部の文法を紹介するには、
少々根気がいるので、
今回はこれくらいで（少なすぎ笑）

Javaに慣れていると
少し読みづらいかもしれませんが、
慣れればシンプルにプログラムをかけるので
慣れていきましょう。
