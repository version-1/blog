---
templateKey: blog-post
title: Go言語の文法を勉強して印象にのこったところまとめ。その4。
slug: /2019/02/26/get-start-go-4
createdAt: 2019-02-26 11:21:32
updatedAt: 2019-02-27 13:09:03
thumbnail: /2019/02/20190226_get-start-go-4/thumbnail.png
categories:
  - engineering
tags:
  - go
  - serverside
  - learning
---

Go の文法のまとめをちょこちょことしてみましたが、今回で一通りはまとめ終わりそうです。当たり前のことではあるんですが、これをまとめた所で言語を書けるようにはならないですね。
こないだ Go の雰囲気をざっくり感じ取れたと思ったのでいざ Go を書いてみようと思ったのですが、全然ダメでしたね。

書こうとした瞬間に手が止まって「あれ、手が動かない」ってなりました。普段書き慣れている Ruby や JavaScript は色々な関数も知っているし、文法も頭に入っているので
8 割スラスラ 2 割ネットで調べてみたいな感じで書けるのですが Go は慣れてないので一瞬で手が止まりました。Go の基礎の本を読んだ後いざ書こうと PC に向かってみましたが全然ダメです笑。

プログラミングは理論と実践が大事なのでやっぱり活字を読むのと実際にコードを両立していかないとダメですね。

<div class="adsense"></div>

<div class="related-post">
  <ul>
    <li><a href="/2019/01/21/get-start-go">Go言語の文法を勉強して印象にのこったところまとめ。</a></li>
    <li><a href="/2019/02/14/get-start-go-2">Go言語の文法を勉強して印象にのこったところまとめ。その2</a></li>
    <li><a href="/2019/02/18/get-start-go-3">Go言語の文法を勉強して印象にのこったところまとめ。その3</a></li>
  </ul>
</div>

## オススメの本

今回もこちらの本を参考にまとめていきます。記事を途中で書いていて気づいたのですが本で使用している go のバージョンが 1.4 とちょっと古いので微妙に挙動が違うかもしれません。。

こちらの本を使って勉強した後は公式のドキュメントなどみながら現バージョンとの違いもおさえておく必要がありそうです。

[改訂 2 版 基礎からわかる Go 言語](https://amzn.to/2CA6kaU)

<a href="https://www.amazon.co.jp/%E6%94%B9%E8%A8%822%E7%89%88-%E5%9F%BA%E7%A4%8E%E3%81%8B%E3%82%89%E3%82%8F%E3%81%8B%E3%82%8B-Go%E8%A8%80%E8%AA%9E-%E5%8F%A4%E5%B7%9D-%E6%98%87/dp/4863541783/ref=as_li_ss_il?ie=UTF8&qid=1548033254&sr=8-1&keywords=%E5%9F%BA%E7%A4%8E%E3%81%8B%E3%82%89%E3%82%8F%E3%81%8B%E3%82%8BGo&linkCode=li2&tag=llg01-22&linkId=e8ed2f069df15a718c5cb35e0bc33965&language=ja_JP" target="_blank"><img border="0" src="//ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=4863541783&Format=_SL160_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=llg01-22&language=ja_JP" ></a><img src="https://ir-jp.amazon-adsystem.com/e/ir?t=llg01-22&language=ja_JP&l=li2&o=9&a=4863541783" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />

## 文法のまとめ

## 並列処理

go はゴルーチンと呼ばれる。並列処理を、簡易的に実装する機構を持っています。Go 言語では go 文を使用して関数をゴルーチンとして呼び出すか通常の関数として呼び出すかを区別します。

go 文の書式は

```go
go 関数呼び出し
```

とするだけです。

呼び出し側からみたゴルーチンの通常の関数呼び出しと違う点は、ゴルーチンとして実行された関数の終了を待たないことです。

メイン関数内で、ゴルーチンを実行した場合ゴルーチンが終わるより先にメイン関数の処理が終わってしまうと、プログラム自体がゴルーチンを待たずに終了してしまうので注意が必要です。

### チャネル

ゴルーチンは非同期的に処理され、戻り値を受け取れないため、処理結果が必要な場合は後で説明するチャネルを使用します。

チャネルはゴルーチン間の通信に使われます。
チャネルの書式は送信専用、受信専用の書式がありそれぞれ chan キーワードと矢印キーワードで送受信の制限を記述します。

```go
chan
chan <-
<- chan
```

チャネルはスライスおよびマップと同じく参照型の一種であり、他の参照型と同様に値を悪性するには「make」組み込み関数を使用します。

```go
make(chan 要素型, キャパシティ)
make(chan 要素型)
```

チャネルへの値の送受信は<-演算子を使用します。

```go
チャネル <- 送信する値 // 送信
<- チャネル            // 受信
```

使用しなくなったチャネルは close 組み込み関数でクローズします。クローズ済みのチャネルに値を受信することはできず、クローズ済みのチャネルから
受信しようとすると、クローズ直前までに送信されていたチャネルでバッファリングされている値がなくなるまで受信できます。

チャネルがクローズされたかどうか知りたい場合は受信操作から返される 2 番目の返り値が false であればクローズ済みと判断することができます。

```go
close(チャネル)
```

これらをまとめたサンプルのコードが以下です。

```go
package main

func main() {
  channel := make(chan int) // チャネルの作成
  go func(s chan <- int) {
    for i:= 0; i < 5; i++ {
      s <- i // チャネルの送信
    }
    close(s) // チャネルのクローズ
  }(channel)

  for {
    value, ok := <- channel // チャネルの受信

    if !ok {
      // チャネルがクローズされていた場合
      break
    }

    fmt.Println(value)
  }
}
```


#### チャネルを利用した同期

チャネルは受信時にバッファリングが空（どの値も送信されていない状態）では、処理をロックする性質があるのでこれを利用してゴルーチン間で
同期的な処理を実現することができます。

この性質を利用したコードが以下で、以下のコードではゴルーチンを3つだけ起動した後にチャネルの受信処理を置いてゴルーチンが同期的に処理されるような実装を行なっています。

```go
package main

import (
  "fmt"
  "math/rand"
  "time"
)

const goroutines = 3

func main() {
  c := make(chan int)

  for i := 0; i < goroutines; i++ {
    go func(s chan<- int, i int) {
      time.Sleep(time.Duration(rand.Int63n(10)) * time.Second)
      fmt.Println("処理完了", i)

      s <- 0
    }(c, i)
  }

  for i := 0; i< goroutines; i++ {
    // ゴルーチンから値が送信されていない場合に値が送信されるまで待機
    <-c
  }
  fmt.Println("すべて完了")
}
```

#### 値の共用

ゴルーチン間で値を共用するときもグローバル変数などを用いることなく、「チャネル」を使用するのが一般的です。

今日変数の代わりとなる値をチャネルで引回すことによって、複数の「ゴルーチン」で値に同時にアクセスをしてしまうことを防ぎます。

```go

package main

import (
  "fmt"
  "os"
)

const goroutines = 10

func main() {
  counter := make(chan int, 1)

  for i := 0;i < goroutines; i++ {
    go func(counter chan int) {
      // チャネルから値を取り出す
      value := <-counter
      value++
      fmt.Println("counter:", value)

      if value == goroutines {
        os.Exit(0)
      }

      // 更新した値をチャネルに戻す
      counter <- value
    }(counter)
  }

  counter <- 0

  for {}
}
```

#### select 文

select 文を使うと複数のチャネルに対して同時に送受信を行うことができます。select 文は switch 文と似ており case 節も一緒に書いていきます。
select 文は case 節に指定したチャネルのうちどれかが通信可能になるまで待機し、どれかが通信可能になると実際に通信を行なった後 case 節内の処理を実行します。

```go
select {
  case 通信式:
    // case節内の通信式が実行された後にされる処理
  case 通信式:
    // case節内の通信式が実行された後にされる処理
  default:
    // それ以外
}
```

select文を使ったサンプルコードは以下になります。

```go
package main
import (
  "fmt"
  "os"
)

func main() {
   ch1 := make(chan int)
   ch2 := make(chan string)

   go func() {
     for i := 0; i< 10; i++ {
       select {
         case ch1 <- 0:
            fmt.Println("ch1")
         case ch2 <- "test":
            fmt.Println("ch2")
       }
     }

     os.Exit(0)
   }()

   for {
     select {
       case val := <-ch1:
         fmt.Println("receive from ch1", val)
       case text := <-ch2:
         fmt.Println("receive from ch2", text)
     }
   }
}
```

select文の注意点として、selext文ではfallthrough文を使用することができず、select文内に実行可能なcase節が複数ある場合は**ランダムに実行**（なぜ？？）される点が注意です。

## まとめ

以上でゴルーチンのまとめ終わりです。上から順番に実行されるコードであると理解は容易なのですが、JavaScriptのPromise, async/awaitしかりゴルーチンしかりで
これらはちょっと頭使わないと理解が難しいですね。

こういったコードはひたすらコードにふれて慣れていくしかないですね。
Goの文法のまとめも終わったのでそろそろコードを書き始めます。

では。

