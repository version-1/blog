---
templateKey: blog-post
title: Kotlin文法-For,Ifなど制御構文編-
slug: 2017/06/24/kotlin-syntax
createdAt: 2017-06-24 11:32:23
updatedAt: 2018-08-26 11:54:53
thumbnail: http://ver-1-0.net/wp-content/uploads/2017/02/スクリーンショット-2017-02-05-22.49.48.png
categories: 
  - engineering
  - for-beginner
---

今回は制御構文について紹介します。

制御構文とはは、
For文などループ文をさします。

それではまず、For文から

[after_intro]
<h2 class="chapter">繰り返し繰り返し - For文</h2>
&nbsp;

for each文のようなものも、
for文で書きます。

&nbsp;
<pre><code class="language-kotlin">fun main(args: Array) {
    var ints = arrayOf(1,2,3,4,5)

    for (item: Int in ints) {
        println(item)
    }
}

</code></pre>
&nbsp;

範囲を指定して書けば、
javaのfor文のようなものも書けます。

&nbsp;
<pre><code class="language-kotlin">for (item: Int in 1..10) {
        println(item)
    }
</code></pre>
&nbsp;
<h2 class="chapter">While文</h2>
最後while文です。
前置のwhileと後置のwhileがあるので、
両方紹介しておきます。

&nbsp;
<pre><code class="language-kotlin">
while (x &gt; 0) {
    x--
}

do {
    val y = retrieveData()
} while (y != null) // y is visible here!
</code></pre>
&nbsp;

&nbsp;
<h2 class="chapter">プログラムの必須構文 - IF文</h2>
<pre><code class="language-kotlin">if (a &gt; b) {
    max = a
} else {
    max = b
}
</code></pre>
はい、特に構文に変更はないです。
が、
以下のように、
三項演算子のように
書くこともできます。
<pre><code class="language-kotlin">val max = if (a &gt; b) a else b</code></pre>
&nbsp;
<pre><code class="language-kotlin">
fun main(args: Array) {
    var a : Int = 2
    var b: Int = 1

    val c = if (a &gt; b) {
        a
    } else {

        b
    }
    println(c)
}

</code></pre>
&nbsp;
<h2 class="chapter">Kotlinで特徴的な - When文</h2>
when文って何？？という方もいるかと思いますが、
case文とかswitch文の代わりになるものですね。
構文は以下の通り

&nbsp;
<pre><code class="language-kotlin">when (x) {
    1 -&gt; print("x == 1")
    2 -&gt; print("x == 2")
    else -&gt; { // Note the block
        print("x is neither 1 nor 2")
    }
}
</code></pre>
上記の場合,
1だったら"x == 1"を出力、
2だったら"x == 2"を出力、
他の場合は・・・
という感じです。

&nbsp;

"1 -&gt;"の比較部分は様々な書き方ができるようで
以下のようにOR条件で書けたり、

&nbsp;
<pre><code class="language-kotlin">when (x) {
    0, 1 -&gt; print("x == 0 or x == 1")
    else -&gt; print("otherwise")
}
</code></pre>
&nbsp;

関数を使ったり

&nbsp;
<pre><code class="language-kotlin">
when (x) {
    parseInt(s) -&gt; print("s encodes x")
    else -&gt; print("s does not encode x")
}
</code></pre>
範囲を指定したり、
<pre><code class="language-kotlin">
when (x) {
    in 1..10 -&gt; print("x is in the range")
    in validNumbers -&gt; print("x is valid")
    !in 10..20 -&gt; print("x is outside the range")
    else -&gt; print("none of the above")
}
</code></pre>
型を比較したり
<pre><code class="language-kotlin">
fun hasPrefix(x: Any) = when(x) {
    is String -&gt; x.startsWith("prefix")
    else -&gt; false
}
</code></pre>
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

