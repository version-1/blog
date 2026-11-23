---
templateKey: blog-post
language: ja
title: Go言語でのデータ操作+構造体、関数のチートシート
slug: /2021/04/18/go-data-opeartion-cheetsheet
createdAt: 2021-04-18 22:23:11
updatedAt: 2021-04-18 22:23:11
thumbnail: /tags/go.png
categories:
  - engineering
tags:
  - go
---

個人的にプログラミング言語を学ぶ時には、それぞれのデータ形式の操作方法 + クラス、関数などの文法を
おさえておくと、何かしらのアプリケーションを書き始める時に役立つと思っています。

と言った所でGo言語でそれらの情報をまとめてみました。

どのプログラミング言語にも大体、文字列、数値、配列、マップのようなデータ型が存在するので、
それらについてプログラムを書く上でよく使う書き方を勉強していくと効率が良いです。
さらに、プラスアルファでクラスや関数などの文法もおさえて置けるとよいです。

そして、それぞれのデータ形式のCRUDの方法を意識しながら学習して行けるとうまく整理して学習できるかと思います。

1. CREATE (初期化方法)
2. UPDATE (置換、部分文字列の取り出し、インクリメントなど) 
3. READ (要素の列挙、型変換など) 
4. DELETE (キーの削除、要素の削除など) 

というわけで数値から順番にみていきます。

## 数値

数値、文字列間の変換は頻出も頻出ですが、桁数指定、0埋めなども結構使うのでそれらをまとめました。

### 文字列への変換

```go
str := strconv.Itoa(123)
fmt.Println(str)
// => "123"
```

### 文字コードからStringへの変換

```go
a := string(rune(65))
b := string(rune(66))
c := string(rune(67))
fmt.Println(a, b, c)
// => A B C
```

### 小数点の切り上げ

```go
fmt.Print(math.Ceil(1.1), math.Ceil(1.9))
// => 2 2
```

### 小数点の切り捨て

```go
fmt.Print(math.Floor(1.1), math.Floor(1.9))
// => 1 1
```

### 小数点の四捨五入

```go
fmt.Print(math.Round(1.1), math.Round(1.9))
// => 1 2
```

## 累乗

```go
fmt.Print(math.Pow(2, 1), math.Pow(2, 2), math.Pow(2, 3))
// => 2 4 8
```

### 0埋め

```go
str := fmt.Sprintf("%05d", 123)
fmt.Print(str)
// => 00123
```

### 桁数指定切り上げ/切り捨て/四捨五入

```go
// 2桁で切り上げ/切り捨て/四捨五入
x := 12.3456
fmt.Println(math.Floor(x*100)/100, math.Round(x*100)/100, math.Ceil(x*100)/100)
// => 12.34 12.35 12.35
```

## String/Byte

おそらくコードを書いていて最も使うデータ型である string ですが、
小文字大文字変換、文字列の切り出し、配列への変換などがあるのでそれらを中止にまとめました。

### Stringから文字コード

```go
fmt.Println(rune("A"[0])) // 65
fmt.Println(rune("B"[0])) // 66
fmt.Println(rune("C"[0])) // 67
```
### StringからByte配列

```go
fuga := []byte("ABC")
fmt.Println(fuga)
// => 65 66 67
```

### 部分文字列の取得

```go
fuga := "ABC"
firstChar := string(fuga[0])
fmt.Printf("type: %T, value: %s\n", firstChar, firstChar)
partial := fuga[0:2]
fmt.Printf("type: %T, value: %s\n", partial, partial)
// => type: string, value: A
//    type: string, value: AB
```

### 小文字に変換

```go
str := "ABC"
fmt.Printf(strings.ToLower(str))
// => "abc"
```

### 大文字に変換

```go
str := "abc"
fmt.Printf(strings.ToUpper(str))
// => "ABC"
```

### スライスに変換

```go
str := "apple,banana,pineapple"
split := strings.Split(str, ",")
fmt.Printf("type: %T, value: %s", split, split)
// => type: []string, value: [apple banana pineapple]
```

### リピート

```go
str := strings.Repeat("abc", 3)
fmt.Println(str)
// => abcabcabc
```

## スライス・配列

スライスというデータ型がgoの特徴的な型だとは思いますが、RubyやJavaScriptから来た物からすると、filterやmapに相当するものが
組み込みであるのか気になって調べたのですが、どうやらないらしくそこはちょっと欲しいなという気持ちになりました。
こういった所もGoらしいと思いながら色々と調べてまとめています。

### 配列の初期化

```go
var arr1[3] string
arr1[0] = "Apple"
arr1[1] = "Google"
arr1[2] = "Facebook"
fmt.Printf("type: %T, value: %v \n", arr1, arr1) // type: [3]string, value: [Apple Google Facebook] 

arr2 := [3]int{1, 2, 3}
arr3 := [...]bool{true, false}

fmt.Printf("type: %T, value: %v \n", arr2, arr2) // type: [3]int, value: [1 2 3] 
fmt.Printf("type: %T, value: %v \n", arr3, arr3) // type: [2]bool, value: [true false] 
```

### スライスの初期化

```go
s1 := []int{}
s2 := []int{1, 2, 3}
s3 := []string{"a", "b", "c"}
fmt.Printf("type: %T, value: %v \n", s1, s1) // => type: []int, value: [] 
fmt.Printf("type: %T, value: %v \n", s2, s2) // => type: []int, value: [1 2 3] 
fmt.Printf("type: %T, value: %v \n", s3, s3) // => type: []string, value: [a b c] 
```

### 要素数でループ

```go
s1 := []int{1, 2, 3}
for i, v := range s1 {
	fmt.Println(i, v)
}
// => 0 1
//    1 2
//    2 3
```

### Find

```go
func Find(list []string, target string) (string, int) {
	for i, v := range list {
		if v == target {
			return v, i
		}
	}
	return "", -1
}

res, i := Find([]string{"a", "b", "c"}, "c")
if i == -1 {
	fmt.Printf("%s is missing in the list", "c")
}
fmt.Println(res, i)
// => c 2
```

### Sample

```go
list := []int{1, 2, 3}
index := rand.Intn(len(list))
fmt.Println(list[index])
```

### ソート

文字列や数値のソートであればサクッと書けるのですが、構造体やmapをソートするには、インターフェースの実装が必要そうなのでまた別の機会に書きます。

```go
i := []int{3, 1, 4}
sort.Sort(sort.IntSlice(i))
fmt.Println(i) // [1 3 4]

s := []string{"def", "aaa", "abc"}
sort.Strings(s)
fmt.Println(s) // [aaa abc def]
```

### 部分を取り出し

```go
hoge := []int{1, 2, 3, 4, 5, 6}
first := 1
last := 3
fmt.Println(hoge[3:5], hoge[first:last])
// => [4 5] [2 3]
```

### 結合

```go
a1 := []int{1, 2, 3}
a2 := []int{4, 5, 6}
a3 := append(a1, a2...)
fmt.Println(a3)
// => [1 2 3 4 5 6]
```
#### Join
	
```go
str := strings.Join([]string{"a", "b", "c"}, ",")
fmt.Println(str)
```

## map

### 初期化

```go
m := make(map[string]int) 
fmt.Println("type: %T, value: %v", m)
// => type: map[string]int, value: map[] 

m2 := map[string]int{
	A: 1,
	B: 2,
	C: 3
}
fmt.Println("type: %T, value: %v", m2)
// => mtype: map[string]int, value: map[A:1 B:2 C:3] 2

```

### Key/Value でループ

```go
m := map[string]int{
		"A": 1,
		"B": 2,
		"C": 3,
}
for k, v := range m {
	fmt.Printf("key: %s, value: %d \n", k, v)
}
// => key: A, value: 1 
//    key: B, value: 2 
//    key: C, value: 3 
```

### 要素の削除

```go
m := map[string]int{
		"A": 1,
		"B": 2,
		"C": 3,
}

delete(m, "A")
delete(m, "B")

fmt.Printf("key: %V, value: %v \n", m, m)
// => key: C, value: 3 
```

### 要素があるか

```go
m := map[string]int{
	"A": 1,
	"B": 2,
	"C": 3,
}
var hasAKey bool
if _, ok := m["A"]; ok {
	hasAKey = true
}

var hasDKey bool
if _, ok := m["D"]; ok {
	hasDKey = true
}
fmt.Println(hasAKey, hasDKey)
// => true false 
```

## 日付

### 初期化

```go
t := time.Date(2001, 5, 20, 23, 59, 59, 0, time.UTC)
```

### 現在日付

```go
t := time.Now()
fmt.Println(
	t,            // 2009-11-10 23:00:00 +0000 UTC m=+0.000000001
	t.Year(),     // 2009
	t.Month(),    // November
	t.Day(),      // 10
	t.Hour(),     // 23
	t.Minute(),   // 0
	t.Second(),   // 0
	t.Weekday(),  // Tuesday
)
```

### 比較

```go
past := time.Now().Add(-time.Second)
now := time.Now()

if past.After(now) {
	fmt.Println("Past is after now")
}

if past.Before(now) {
	fmt.Println("Past is before now")
}

if now.Before(now) {
	fmt.Println("Now is before now")
}

if now.After(now) {
	fmt.Println("Now is after now")
}
// => Past is before now.
```

### 加減

```go
date := time.Date(2021, 4, 1, 8, 0, 0, 0, time.UTC)
fmt.Println(date) // 2021-04-01 08:00:00 +0000 UTC

t1 := date.Add(time.Duration(5) * time.Second)
fmt.Println(t1)   // 2021-04-01 08:00:05 +0000 UTC
t2 := date.Add(time.Duration(5) * time.Hour)
fmt.Println(t2)   // 2021-04-01 13:00:00 +0000 UTC

t3 := date.Add(-time.Duration(5) * time.Second)
fmt.Println(t3)   // 2021-04-01 07:59:55 +0000 UTC
t4 := date.Add(-time.Duration(5) * time.Hour)
fmt.Println(t4)   // 2021-04-01 03:00:00 +0000 UTC
```

### フォーマット

https://qiita.com/ruiu/items/5936b4c3bd6eb487c182

```go
date := time.Date(2021, 4, 1, 8, 0, 0, 0, time.UTC)
const layout = "2006-01-02 15:04:05 Mon"
fmt.Println(date.Format(layout)) // 2021-04-01 08:00:00 Mon
```

### パース

```go
str := "Apr 1 12:34:56 JST 2021"
layout := "Jan 2 15:04:05 MST 2006"
t, _ := time.Parse(layout, str)
fmt.Println(t) // 2021-04-01 12:34:56 +0000 JST
```

### Unix Timeへ変換

```go
t := time.Date(1970, 1, 1, 0, 0, 0, 0, time.UTC)
fmt.Println(t.Unix())          // 0
fmt.Println(time.Now().Unix()) // 1257894000
```

### Unix Timeから日付オブジェクトに変換

```go
t := time.Unix(1234567890, 0)
fmt.Println(t) // 2009-02-13 23:31:30 +0000 UTC
```

## 構造体

### 初期化

```go
type Obj struct {
	ID int
	Name string
}

// 宣言された構造体を初期化
fmt.Println(Obj{1, "Taro"})
fmt.Println(Obj{ID: 1, Name: "Taro"})

// newで初期化
fmt.Println(new(Obj))

// 無名構造体
fmt.Println(struct {
	ID   int
	Name string
}{1, "Taro"})
```

### メソッド宣言

```go
type A struct {
	data string
}

type B struct {
	data string
}

// 値メソッド
func (o A) setValue(value string) {
	o.data = value
}

func (o A) Value() string {
	return o.data
}

// ポインタメソッド
func (o *B) setValue(value string) {
	o.data = value
}

func (o *B) Value() string {
	return o.data
}

a := A{
	data: "Hoge",
}

b := B{
	data: "Hoge",
}

fmt.Println(a.Value())
fmt.Println(b.Value())

a.setValue("Fuga")
b.setValue("Fuga")

// ポインタメソッドの方だけdataの値が書き換わる
fmt.Println(a.Value())
fmt.Println(b.Value())
// => Hoge
//    Hoge
//    Hoge
//    Fuga
```

## 関数　

GOの特徴としては、複数返り値や名前付き返り値などがユニークな所ですが、引数のデフォルト値を設定するような構文は今の所ないようです。

### 初期化

```go

// 引数なし
func Hello() {
	fmt.Println("Hello")
}

// 引数あり
func Hey(msg string) {
	fmt.Printf("Hey, %s \n", msg)
}

// 複数返り値
func Divide(a int, b int) (int, error) {
	if b == 0 {
		return 0, fmt.Errorf("Zero divided")
	}
	return a / b, nil
}

// 名前付き返り値
func MaxMin(list []int) (max int, min int) {
        if len(list) == 0 {
		return max, min
        }
        max = list[0]
        min = list[0]
	for _, item := range list {
		if max < item {
			max = item
		}
		if min > item {
			min = item
		}
	}
	return max, min
}

Hello()                               // Hello
Hey("boy")                            // Hey, boy

res1, err1 := Divide(4, 2)
fmt.Println(res1, err1)               // 2 <nil>
res2, err2 := Divide(4, 0)
fmt.Println(res2, err2)               // 0 Zero divied

fmt.Println(MaxMin([]int{1, 2, 3}))   // 3 1
```

### 可変長引数

```go
func sum(nums ...int) (total int) {
	for _, num := range nums {
		total += num
	}
	return
}

fmt.Println(sum(1, 2, 3, 4, 5))
// => 15
```

### 無名関数

```go
hello := func(name string) { fmt.Printf("Hello, %s", name) }
hello("there")
// => "Hello, there"
```

### 即時関数

```go
(func(name string) { fmt.Printf("Hello, %s", name) })("there")
// => "Hello, there"
```

### 高階関数

```go
func add(a int) func(int) int {
	return func(b int) int {
		return a + b
	}
}

fmt.Println(add(1)(2)) // => 3
```


```go
func add(a int) func(int) int {
	return func(b int) int {
		return a + b
	}
}

fmt.Println(add(1)(2)) // => 3
```
