---
templateKey: blog-post
title: Kotlin文法-For,Ifなど制御構文編-
slug: /2017/06/24/kotlin-syntax
createdAt: 2017-06-24 11:32:23
updatedAt: 2018-08-26 11:54:53
thumbnail: /2017/06/20170624_kotlin-syntax/thumbnail.png
categories:
  - engineering
  - for-beginner
tags:
  - dummy
---

今回は制御構文について紹介します。

制御構文とはは、
For文などループ文をさします。

それではまず、For文から

<div class="adsense"></div>
<h2 class="chapter">繰り返し繰り返し - For文</h2>
&nbsp;

for each文のようなものも、
for文で書きます。

&nbsp;
```kotlin
fun main(args: Array) {
    var ints = arrayOf(1,2,3,4,5)

    for (item: Int in ints) {
        println(item)
    }
}


```
&nbsp;

範囲を指定して書けば、
javaのfor文のようなものも書けます。

&nbsp;
```kotlin
for (item: Int in 1..10) {
        println(item)
    }

```
&nbsp;
<h2 class="chapter">While文</h2>
最後while文です。
前置のwhileと後置のwhileがあるので、
両方紹介しておきます。

&nbsp;
```kotlin
while (x > 0) {
    x--
}

do {
    val y = retrieveData()
} while (y != null) // y is visible here!

```
&nbsp;

&nbsp;
<h2 class="chapter">プログラムの必須構文 - IF文</h2>
```kotlin
if (a > b) {
    max = a
} else {
    max = b
}

```
はい、特に構文に変更はないです。
が、
以下のように、
三項演算子のように
書くこともできます。
```kotlin
val max = if (a > b) a else b
```
&nbsp;
```kotlin
fun main(args: Array) {
    var a : Int = 2
    var b: Int = 1

    val c = if (a > b) {
        a
    } else {

        b
    }
    println(c)
}


```
&nbsp;
<h2 class="chapter">Kotlinで特徴的な - When文</h2>
when文って何？？という方もいるかと思いますが、
case文とかswitch文の代わりになるものですね。
構文は以下の通り

&nbsp;
```kotlin
when (x) {
    1 -> print("x == 1")
    2 -> print("x == 2")
    else -> { // Note the block
        print("x is neither 1 nor 2")
    }
}

```
上記の場合,
1だったら"x == 1"を出力、
2だったら"x == 2"を出力、
他の場合は・・・
という感じです。

&nbsp;

"1 ->"の比較部分は様々な書き方ができるようで
以下のようにOR条件で書けたり、

&nbsp;
```kotlin
when (x) {
    0, 1 -> print("x == 0 or x == 1")
    else -> print("otherwise")
}

```
&nbsp;

関数を使ったり

&nbsp;
```kotlin
when (x) {
    parseInt(s) -> print("s encodes x")
    else -> print("s does not encode x")
}

```
範囲を指定したり、
```kotlin
when (x) {
    in 1..10 -> print("x is in the range")
    in validNumbers -> print("x is valid")
    !in 10..20 -> print("x is outside the range")
    else -> print("none of the above")
}

```
型を比較したり
```kotlin
fun hasPrefix(x: Any) = when(x) {
    is String -> x.startsWith("prefix")
    else -> false
}

```
できます。
<h2 class="chapter">最後に</h2>
今回は制御構文について書きましたが、
他にもわからないことがあれば、
ここのドキュメントを参加にすると良いと思います。
<a href="http://kotlinlang.org/docs/reference/">http://kotlinlang.org/docs/reference/</a>
また、
以下のページでは、
Kotlinをwebで試せるので是非。

<a href="https://try.kotlinlang.org">https://try.kotlinlang.org</a>
