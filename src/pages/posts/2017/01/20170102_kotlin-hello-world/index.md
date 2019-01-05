---
templateKey: blog-post
title: KotlinでHello world!!
slug: /2017/01/02/kotlin-hello-world
createdAt: 2017-01-02 11:01:49
updatedAt: 2018-08-26 12:59:34
thumbnail: /2017/01/20170102_kotlin-hello-world/thumbnail.jpg
categories:
  - engineering
  - for-beginner
---

KotlinでHello Worldしてみる。
OSは Mac OS 上に立てたゲストOS のLubuntu バージョンは16.10

①とりあえずJavaをインストール
Oracle's PPAを追加してからapt-get
```bash
sudo add-apt-repository ppa:webupd8team/java
sudo apt-get update
sudo apt-get install oracle-java8-installer

```
参考URL
<a href="http://kiy271.hatenablog.com/entry/2014/09/05/230624">http://kiy271.hatenablog.com/entry/2014/09/05/230624</a>

<div class="adsense"></div>


②コンパイラをインストール
<a href="https://kotlinlang.org/docs/tutorials/command-line.html">https://kotlinlang.org/docs/tutorials/command-line.html</a>
```bash
curl -s https://get.sdkman.io | bash
ログアウトしてから
sdk install kotlin

```
③Hello World!!

まずは、Hello.ktを作って
<strong>hello.kt</strong>
```kotlin
fun main(args: Array) {
    println("Hello, World!")
}

```
コンパイルして実行。
jarファイルができるので、
いつものjavaコマンドで実行。
```bash
kotlinc hello.kt -include-runtime -d hello.jar
java -jar hello.jar

```
&nbsp;

できた。
```bash
java -jar hello.jar
Hello, World!

```
sdkmanを使うとHelloWorldまでは、10分くらいでできてしまいますね。
この後はここのチュートリアルなどをして慣れる感じですかね。

<div class="adsense"></div>

&nbsp;
<h2>kotelin HelloWorld 補足1</h2>
できたjarの中を見てみると
kotlin/~ というKotelinランタイムのクラスファイルが格納されている。

```bash
jar -tvf hello.jar
    76 Tue Jan 03 11:06:36 JST 2017 META-INF/MANIFEST.MF
   953 Tue Jan 03 11:06:36 JST 2017 HelloKt.class
    29 Tue Jan 03 11:06:36 JST 2017 META-INF/main.kotlin_module
   767 Mon Dec 26 15:28:40 JST 2016 kotlin/ArrayIntrinsicsKt.class
  1296 Mon Dec 26 15:28:40 JST 2016 kotlin/Deprecated.class
  1249 Mon Dec 26 15:28:40 JST 2016 kotlin/DeprecationLevel.class
   730 Mon Dec 26 15:28:40 JST 2016 kotlin/ExtensionFunctionType.class
   405 Mon Dec 26 15:28:40 JST 2016 kotlin/Function.class
   476 Mon Dec 26 15:28:44 JST 2016 kotlin/KotlinNullPointerException.class

```
これをjarに含めたくない場合は-include-runtimeのオプションを外してコンパイルする。
```bash
kotlinc hello.kt -d hello.jar
jar tvf hello.jar
    76 Tue Jan 03 11:21:24 JST 2017 META-INF/MANIFEST.MF
   953 Tue Jan 03 11:21:24 JST 2017 HelloKt.class
    29 Tue Jan 03 11:21:24 JST 2017 META-INF/main.kotlin_module

```
<h2>kotelin HelloWorld 補足2 Vimでkotlin</h2>
vimのkotlin用プラグインをインストール
<a href="https://github.com/udalov/kotlin-vim">https://github.com/udalov/kotlin-vim</a>

&nbsp;
