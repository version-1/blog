---
templateKey: blog-post
language: ja
title: Ruby のmethods メソッドをJavaScript で実装する
slug: /2024/07/29/ruby-methos-method-on-js
createdAt: 2024-07-29 20:25:07
updatedAt: 2024-07-29 20:25:07
thumbnail: /2024/07/20240729_ruby-methods-method-on-js/thumbnail.png
categories:
  - engineering
tags:
  - javascript
  - ruby
---

突然ですが、ruby のmethos メソッドって便利ですよね。
コードを書いているときにそのオブジェクトで呼ぶことができるすべてのメソッドやプロパティを
羅列してくれて検索までできるので、デバッグの時に重宝しています。

それとはまた別に、Rails などフレームワーク独自のメソッドを調べるときにも有効なのでコードリーディングやライブラリの理解の手助けにもなります。
正規のルートではドキュメントを読んだり、ソースコードを参照するのがよいですが、そこまで深入りする必要のないライブラリや
記憶があやふやなメソッド名を調べる時にはかなり役立ってくれます。


## Ruby のmethods メソッドとは

ということで簡単にRuby のmethods メソッドを簡単に紹介すると下記のようになります。

[Object#method](https://ruby-doc.org/3.2.2/Object.html#method-i-methods)

> Returns a list of the names of public and protected methods of obj. This will include all the methods accessible in obj’s ancestors. If the optional parameter is false, it returns an array of obj’s public and protected singleton methods, the array will not include methods in modules included in obj.

要はレシーバーからアクセス可能なプロパティやメソッドをArrayオブジェクトで返却してくれるものです。

このメソッドは オブジェクトの始祖であるObject クラスで実装されているので Object クラスを継承したすべてのクラスで使用することができます。


**サンプルコード**

```ruby
class Hoge
  attr_accessor :fuga

  def bar
    puts ''
  end
end

puts Hoge.new.methods     // => [:bar, :fuga=, :fuga, :hash, :singleton_class, :dup, ...]
puts Hoge.new.grep /fuga/ // => [:fuga=, :fuga]
```

例のように Array オブジェクトが返ってくるので grep メソッドでメソッドの一覧を検索することも可能で非常に便利です。

ということで、これと同じことが JS でできないか考えてやってみました。

## 実装

下記が実際のコードです。

クラス名はなんでも良いのですが、一旦 PropertyFinder と命名しています。

```javascript
class PropertyFinder {
    constructor(receiver) {
      this.receiver = receiver
    }

    grep(regexp, options = {}) {
      let res = []
      if (typeof regexp === 'string') {
        return this.find((name) => name.includes(regexp))
      }
      if (regexp instanceof RegExp) {
        return this.find((name) => regexp.test(name))
      }
      return []
    }

    toString() {
      return this.find(() => true)
    }

    find(detect) {
      const list = Object.getOwnPropertyNames(this.receiver).filter(it => detect(it))
      if (!this.receiver.__proto__) {
        return list
      }
      const ancestors = new PropertyFinder(this.receiver.__proto__).find(detect)
      return [...list, ...ancestors]
    }
}
```

コードの解説はあとにして一旦使い方から

クラスが定義できたら下記のようにして、Object クラスのプロパティに関数を差し込みます。

```javascript
Object.prototype.methods = function () {
    return new PropertyFinder(this)
}
```

これをすることで Object クラスを継承するクラスのインスタンスで methods メソッドを使用できるようになります。
ただ、こちらに関しては後に注意を書くのでそちらにご留意の上、自己責任でお使いください。

下記がその実行例です。

```javascript

class Hoge {
  fuga() {
    console.log('fuga')
  }
}

console.log(new Object().methods().toString()) // => ['constructor', 'constructor', '__defineGetter__', '__defineSetter__', 'hasOwnProperty' ...]
console.log([].methods().toString())           // => ['length', 'length', 'constructor', 'at', 'concat', ...]
console.log(new Hoge().methods().grep(/fuga/)  // => ['fuga']

```

## 使用上の注意

**こちらのコードはプロダクションのコードで採用するには、おすすめされないコードになっています。**

上位のクラスにプロパティを追加するモンキーパッチというアンチパターンで、将来的な JS 側の仕様変更の際にトラブルになる可能性があります。
用法・用量を守ってご使用ください。

参考: [The cons of monkey patching](https://www.audero.it/blog/2016/12/05/monkey-patching-javascript/#the-cons-of-monkey-patching)

## コードの解説

コードの解説に移っていきます。

PropertyFinder のメソッドとして一番重要なメソッドは `find` メソッドになります。
このメソッドが与えられたオブジェクトのプロトタイプチェーンを遡り実行可能なプロパティを検索し、リストとして返却してくれます。

あとの`toString`, `grep` はそれを使うだけのメソッドなので特に解説は行いません。

### プロトタイプチェーン

プロトタイプチェーンは聞きなれない方もいるかもしれませんが、 Object クラスから脈々と受け継がれてきたプロパティの遺伝子です。

[継承とプロトタイプチェーン| MDN ](https://developer.mozilla.org/ja/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)


詳しい話は、MDNのドキュメントに譲りますが、実は、JavaScript の継承という仕組みがプロトタイプチェーンによって支えられています。

普段意識はしないですが、なにかしらのプロパティを参照する際には

1. レシーバー自身にそのプロパティがあるか？
2. 親クラスのインスタンスにそのプロパティがあるか？
3. 2. の親クラスのインスタンスにぷろぱてぃがあるか？

というように先祖を遡りながらプロパティを検索し、ヒットすればそれを返却するというしくみになっています。

### find メソッドでやっていること

上記をふまえて、その仕組み自体を PropertyFinder に実装すると参照できるプロパティのリストが得られます。

こちらがその実装で親のプロパティを参照するには、`__proto__` プロパティを参照すればよいので下記のように、`__proto__` を再帰的に探索してリストを得ています。

```javascript
    find(detect) {
      const list = Object.getOwnPropertyNames(this.receiver).filter(it => detect(it))
      if (!this.receiver.__proto__) {
        return list
      }
      const ancestors = new PropertyFinder(this.receiver.__proto__).find(detect)
      return [...list, ...ancestors]
    }
```

これで、PropertyFinder の解説は以上です。


## まとめ

これでコード等々や試してみたことの説明は終わりになります。

今回は実験的というかお遊びみたいなものなのですが、多少知識が必要なものなどもあったので参考にしたり応用してみていただけるとうれしいです。

