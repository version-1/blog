---
templateKey: blog-post
language: ja
title: Go言語で数独（ナンプレ）を解くコードを書いてみた
slug: /2019/03/11/go-numpre
createdAt: 2019-03-11 10:34:23
updatedAt: 2019-03-11 10:34:23
thumbnail: /2019/03/20190311_go-numpre/thumbnail.png
categories:
  - engineering
tags:
  - go
  - serverside
  - product
related:
  - dummy
---


改めてアルゴリズムを勉強したり、英語のリソースを漁ってみるとかなりシンプルな解法があったのでそちらを紹介します。
コードはこちらです。ざっくり100行くらいでほとんどの数独の問題が解けるはずです。

[https://github.com/version-1/go-numpre](https://github.com/version-1/go-numpre)

再帰を使って実装しているのですが、再帰を使うと本当信じられないほど短いコードで実装できますね。
実装にあたってはこちらの動画を参考にしました。

[Python Sudoku Solver - Computerphile](https://www.youtube.com/watch?v=G_UYXzGuqvM&t=451s)

## ↓↓↓ 以下元の古い記事

最近Goの勉強をしており（とはいえ割とマイペースではありますが）これらの記事をあげたりしているのですが、

<div class="related-post">
  <ul>
    <li><a href="/2019/01/21/get-start-go">Go言語の文法を勉強して印象にのこったところまとめ。</a></li>
    <li><a href="/2019/02/14/get-start-go-2">Go言語の文法を勉強して印象にのこったところまとめ。その2。</a></li>
    <li><a href="/2019/02/18/get-start-go-3">Go言語の文法を勉強して印象にのこったところまとめ。その3。</a></li>
    <li><a href="/2019/02/26/get-start-go-4">Go言語の文法を勉強して印象にのこったところまとめ。その4。</a></li>
  </ul>
</div>


これらの記事にほとんどといっていいほどコードを書いていなかったので今回は実際にコードを書いてみました。
タイトルは若干盛っている部分もあるのですが、今回書いたコードでは**初級レベル**の数独の問題だったら解けるコードです。

数独にはある決まった解き方でマスに入る数字を限定して解いていくのですが、数独もある程度のレベルになると数字が限定できなくなり別の解き方で数独をとく必要がでてきます。なので、今回は数独のルールにのっとって数字を限定して解く解法で答えをだせる問題を解くコードになります。

もっと難しい問題を解けるプログラムを組みたい場合は、こちらの記事を参考にされると良いと思います。
（気が向けばこちらのコードも書いてみたい）

[数独のアルゴリズムを考える](https://www.slideshare.net/atmarksharp/ss-45348313)


<div class="adsense"></div>

## 数独（ナンプレ）とは？

ナンプレとは9 * 9 マスのマスにあるいくつかの数字があらかじめ埋められており、ルールにしたがって
数字を埋めていき最終的にルール通りにマスを埋めていくパズルです。


数独のルールというのは、大きく3つで

1. 縦1列に1から9までの数字がひとつずつ入る。
2. 横1列に1から9までの数字がひとつずつ入る。
3. 9 * 9 のマスを9つに分割した3 * 3のマスにも1から9までの数字がひとつずつ入る。

というようになっています。


はじめは下の画像のようになっており

<img class="post-image half-width" src="https://statics.ver-1-0.xyz/uploads/2019/03/20190311_go-numpre/question.png" alt="ナンプレ問題" />

全部時終わると以下のようになります。

<img class="post-image half-width" src="https://statics.ver-1-0.xyz/uploads/2019/03/20190311_go-numpre/answer.png" alt="ナンプレ回答" />

そして、こちらが実際に数独を解いている様子。

<img class="post-image" src="https://statics.ver-1-0.xyz/uploads/2019/03/20190311_go-numpre/numpre.gif" alt="ナンプレ" />

今回はこのようにコードをGo言語で書いたのでそれの解説をしていきます。


## 数独をGo言語で解く意義

Go言語で解く意義ですが、特に意味はありません。単に私自身勉強中だからです。

個人的に採用している勉強法として新しい言語を学ぶ時は、

1. 文法事項に目を通す
2. 簡単なアプリケーションを作ってみる

というような順序で普段から勉強しているのでGo言語の教材として数独を解くコードを書いています。
プログラミング初心者の時から基本的にこうして勉強しているのですが、この本の勉強方法を参考にしているところもあるかもしれません。

<a href="https://amzn.to/2TAUSX2">SOFT SKILLS ソフトウェア開発者の人生マニュアル </a>

プログラミングは理論でわかっていても実際どのような挙動になるかわかっていたり、こういうロジックを書く場合は
こういう書き方をするというのが瞬時にでてくるようにならないと実際にコードをかけるようにならないので2.の段階
では最初に作りたいものがあって、それを作るために必要なものを調べていくという流れで勉強を進めていきます。

その過程で初めて知ったことは予想と違った動きをした場合は、それを記憶にとどめて徐々に言語に慣れていくというスタンスをとっています。

少々本筋とはずれた話題になりましたが、次からは本題に戻り実際のコードの解説になります。


## コードの解説

色々と前置きありましたが、ここからコードの説明をしておきます。リポジトリは以下に置いておきます。

https://github.com/version-1/go-numpre

コードは以下です、意外と200行行かないですみました。特にファイルを分割せずだらっと長く書くスタイルで書いています。

(始めたばかりでまずい書き方しているところもあるかもしれないのですが、ひとまずこれくらいで気づいたら改善していきます。)


```go
package main

import (
  "flag"
  "fmt"
  "strconv"
  "strings"
)

type Result struct {
  N         int
  X         int
  Y         int
  Ok        bool
  Value     int
  Candidate []int
  Empty     int
  Field     [][]int
}

func main() {
  const size = 9
  const maxTry = 1000
  flag.Parse()
  numStr := flag.Arg(0)
  field := load(numStr, size)

  fmt.Println("")
  fmt.Println("[START]")
  empty := counting(field, size)
  result := Result{Field: field}
  printResult(result, size, false)
  n := 0
  for empty > 0 || n < maxTry {
    for i := 0; i < size; i++ {
      for j := 0; j < size; j++ {
        n++
        cursorValue := field[i][j]
        if cursorValue == 0 {
          candidate := buildCandidate(size)
          value, ok, filteredCandidate := filter(field, j, i, size, candidate)
          if ok {
            field[i][j] = value
            empty--
          }
          result = Result{N: n, X: j, Y: i, Ok: ok, Value: value, Candidate: filteredCandidate, Empty: empty, Field: field}
          printResult(result, size, true)
        }
      }
    }
  }

  if empty == 0 {
    fmt.Println("[END]")
  } else {
    fmt.Println("[FAILED]")
  }
  printResult(result, size, false)

}

func load(numStr string, size int) [][]int {
  field := [][]int{}
  for i := 0; i < size; i++ {
    start := i * size
    end := start + size
    array := []int{}
    row := numStr[start:end]
    for _, v := range strings.Split(row, "") {
      value, _ := strconv.Atoi(v)
      array = append(array, value)
    }
    field = append(field, array)
  }

  return field
}

func printResult(r Result, size int, header bool) {
  if header {
    fmt.Println("")
    fmt.Println("n :", r.N)
    fmt.Println("(x, y) :", r.X+1, r.Y+1)
    fmt.Println("ok :", r.Ok)
    fmt.Println("value :", r.Value)
    fmt.Println("empty :", r.Empty)
    fmt.Println("candidate :", r.Candidate)
  }
  for i := 0; i < size; i++ {
    fmt.Println(r.Field[i])
  }
}

func counting(field [][]int, size int) int {
  n := 0
  for i := 0; i < size; i++ {
    for j := 0; j < size; j++ {
      if field[i][j] == 0 {
        n++
      }
    }
  }
  return n
}

func buildCandidate(size int) []int {
  candidate := []int{}
  for i := 0; i < size; i++ {
    candidate = append(candidate, i+1)
  }
  return candidate
}

func filter(field [][]int, x int, y int, size int, candidate []int) (int, bool, []int) {
  _candidate := make([]int, len(candidate))
  copy(_candidate, candidate)
  funcs := []func([][]int, int, int, int, []int) []int{filterVertical, filterHorizontal, filterBox}
  for _, cb := range funcs {
    _candidate = cb(field, x, y, size, _candidate)
    if len(_candidate) == 1 {
      return _candidate[0], true, _candidate
    }
  }

  return 0, false, _candidate
}

func filterVertical(field [][]int, x int, y int, size int, candidate []int) []int {
  _candidate := make([]int, len(candidate))
  copy(_candidate, candidate)
  for i := 0; i < size; i++ {
    value := field[i][x]
    if y != i && value != 0 {
      _candidate = remove(_candidate, value)
    }
  }
  return _candidate
}

func filterHorizontal(field [][]int, x int, y int, size int, candidate []int) []int {
  _candidate := make([]int, len(candidate))
  copy(_candidate, candidate)
  for i := 0; i < size; i++ {
    if x != i && field[y][i] != 0 {
      _candidate = remove(_candidate, field[y][i])
    }
  }
  return _candidate
}
```

### 処理の流れ


処理の流れは、

1. コマンドライン引数より問題の読み込み
2. 最初のマスの状態を表示
3. 1マス目（[x = 0, y = 0], [x = 1, y = 0], [x = 2, y = 0] ...)から順にマスの値を取得
4. 3が空の値(0)だったら、ルールを使って候補をフィルタリング
5. 4.の結果候補が一つに決まったらマスに数字を入れる。
6. 処理後のマスの状態を表示
7. 空の値がなくなるまで3~6を繰り返す。
8. 最終的な状態を表示して終了。

となります。goの処理はmain関数から始まるので処理の流れはmain関数にべたっと書いています。

下記インラインで上の処理をコードに合わせてコメントに書いています。

```go
func main() {
  const size = 9
  const maxTry = 1000
  flag.Parse()
  numStr := flag.Arg(0)
  // 1. コマンド引数から問題を読み込み
  field := load(numStr, size)

  // 2. 最初の状態を表示
  fmt.Println("")
  fmt.Println("[START]")
  empty := counting(field, size)
  result := Result{Field: field}
  printResult(result, size, false)
  n := 0
  // 8. 空の値がなくなるまでループ（無限ループ対策として、試行回数が1000回を超えたら失敗としてループを抜ける）
  for empty > 0 || n < maxTry {
    for i := 0; i < size; i++ {
      for j := 0; j < size; j++ {
        n++
        // 3. 左上のマスから順番に値を取得
        cursorValue := field[i][j]
        if cursorValue == 0 {
          candidate := buildCandidate(size)
          // 4. ルールを適用して値を取得
          value, ok, filteredCandidate := filter(field, j, i, size, candidate)
          // 5. 候補が絞れたらマスに結果を反映
          if ok {
            field[i][j] = value
            empty--
          }
          // 6. 処理結果を表示
          result = Result{N: n, X: j, Y: i, Ok: ok, Value: value, Candidate: filteredCandidate, Empty: empty, Field: field}
          printResult(result, size, true)
        }
      }
    }
  }

  // 8. 処理結果を表示
  if empty == 0 {
    fmt.Println("[END]")
  } else {
    fmt.Println("[FAILED]")
  }
  printResult(result, size, false)

}
```


### 候補の絞り込みについて解説

前の項目では全体の処理の流れを説明することがメインだったのであまり詳しく説明しなかったのですが、
この数独を解くキモの所の回答の候補を絞り込む部分をサッと説明してしまったのでここではもう少し詳しく説明していければと思います。

先に説明した通り数独には縦、横と3 * 3のマスにそれぞれ1から9までの数字が入るというルールを盛ってそれぞれの81マスに入る数値を絞り込んでいきます。

今回のコードでは

1. 縦のルール(filterVartical関数)
2. 横のルール(filterHorizontal関数)
3. 3*3のマスのルール(filterBox関数)

を適用して候補を絞り込み最終的に取りうる値が1つになったら二つ目の返り値でtrueを返すような仕組みにしてます。

今回のコードではそれぞれのルールで適用する関数に切り分けたので、それぞれの関数を順番に候補（1から9の数字の配列）に適用していって、
最終的に配列の長さが１になったらマスを埋めるという方法をとっています。

幾分Goに不慣れなので関数の配列を作るのにちょっとハマりましたが、おかげで当初の

```go
func filter(field [][]int, x int, y int, size int, candidate []int) (int, bool, []int) {
  _candidate := make([]int, len(candidate))
  copy(_candidate, candidate)
  _candidate = filterVartical(field, x, y, size, _candidate)
  if len(_candidate) == 1 {
    return _candidate[0], true, _candidate
  }
  _candidate = filterHorizontal(field, x, y, size, _candidate)
  if len(_candidate) == 1 {
    return _candidate[0], true, _candidate
  }
  _candidate = filterBox(field, x, y, size, _candidate)
  if len(_candidate) == 1 {
    return _candidate[0], true, _candidate
  }

  return 0, false, _candidate
}
```

のような重複の多い残念なコードよりは幾分ましになりました。

あらかじめそれぞれの関数のコードのインターフェースを揃えておいたので、数独のルールを適用する部分が割とすっきり書くことができました。
それぞれの関数の中身はコードを見ればわかるとは思うのですが、ループを回して

1. 縦、横、3*3の中を走査
2. 0以外の数値かつ今カーソルのあるマスでない場合はマスの値で候補から除外する

ということをやっています。

ここまでで、数独のルールによる絞りこみと全体の処理の流れを説明しましたがいかがでしたでしょうか？
ステップ数もそこまでなく、解説する必要があるのはここくらいな気がしたので若干説明のバランスの悪さはいなめないですが、
説明はここまでとします。



## まとめ

以上、「Go言語で数独を解くコード」を書いてみたでした。

現状では、簡単な問題しか解けませんが、簡単な問題でもこのプログラムさんは一瞬で回答を導きだしてくれます。

Go言語の勉強のためにコードを書いてみましたが、数独をコードで書くと配列だったりスライス、文字列操作などの
処理を書くことが多く、それらの文法に馴染めたのではないかと思います。

先を見るとGoでWebAPI作るくらいのところまでやりたいのですが、まだ構造体とかインターフェース、パッケージとインポートなどの
挙動を確かめられていないので、このプログラムを強化しつつ色々と学んでいきたいと思います。

では。

