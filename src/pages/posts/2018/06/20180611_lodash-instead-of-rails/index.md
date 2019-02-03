---
templateKey: blog-post
title: Railsの便利メソッドをlodashでやると
slug: /2018/06/11/lodash-instead-of-rails
createdAt: 2018-06-11 23:29:59
updatedAt: 2018-09-02 13:09:21
thumbnail: /2018/06/20180611_lodash-instead-of-rails/thumbnail.png
categories:
  - rails
tags:
  - rails
  - ruby
  - javascript
  - lodash
related:
  - dummy
---

日常的にRailsでサーバ側を書いていても、ふとした時にjs書かないといけない時ってありますよね。
そのほかにも、これまでサーバ側でRuby書いてきたけど、せっかくだからフロント側も勉強したいなみたいな形で
Jsを触り始めることもあるかと思います。

jsもES6以降で便利なメソッドも増えたみたいですが、仕事で使ってみるとついついlodashとかライブラリを使いたくなってしまいます。
そんなこんなで、Railsのメソッドをlodashでやるには？みたいなところをまとめてみました。

&nbsp;

<div class="adsense"></div>
<h2>slice</h2>
&nbsp;

railsのsliceはハッシュから必要なキーだけを取得して返却してくれます。これがActiveRecordのオブジェクトにも
使えたりして便利なので、Jsでも同じことがやりたい！！となると思います。

&nbsp;
<h4>rails</h4>

```ruby
fruit = { apple: 'red', banana: 'yellow', cucumuber: 'green'}
fruit.slice(:apple, :banana)
#  {:apple=>"red", :banana=>"yellow"}

```

<h4>lodash</h4>

```javascript
const fruit = { apple: 'red', banana: 'yellow', cucumuber: 'green'}
_.pick(fruit, ['apple', 'banana'])
// { apple: 'red', banana: 'yellow' }

```
&nbsp;
<h2>except</h2>
&nbsp;

exceptはsliceの逆で、ハッシュのキーから不要なものを取り除いてくれます。
<h4>rails</h4>

```ruby
fruit = { apple: 'red', banana: 'yellow', cucumuber: 'green'}
fruit.except(:apple, :banana)
# {:cucumuber=>"green"}

```

<h4>lodash</h4>

```javascript
const fruit = { apple: 'red', banana: 'yellow', cucumuber: 'green'}
_.omit(fruit, ['apple', 'banana'])
// { cucumuber: 'green' }

```
&nbsp;
<h2>Pluck</h2>
&nbsp;

pluckは配列のハッシュから、指定したキーの配列で返却してくれます。lodashでは、0.4以降pluckは廃止されmapで代用できるようです。
<h4>rails</h4>

```ruby
array = [
 { id: 1, name: 'John', age: 19 },
 { id: 2, name: 'Mary', age: 30 },
 { id: 3, name: 'Smith', age: 25 }
]
array.pluck(:name)
# ["John", "Mary", "Smith"]

```

<h4>lodash</h4>

```javascript
array = [
 { id: 1, name: 'John', age: 19 },
 { id: 2, name: 'Mary', age: 30 },
 { id: 3, name: 'Smith', age: 25 }
]

array.pluck(:name)
_.map(array, 'name')
// ["John", "Mary", "Smith"]

```

<h2>配列の引き算（差集合）</h2>

これはRails(Active Support) というよりはRubyですが、
<h4>Ruby(Rails)</h4>

```ruby
 [1, 2, 3] - [1, 3]
# [2]

```

<h4>loadash</h4>

```javascript
_.diffrence([1,2,3], [1,3])
// [2]

```

<h2>Compact</h2>

compactはnilであるハッシュのキーを取り除いたハッシュを返却します。
微妙にい意味合いは違いますが、lodashでもfalseyなkeyをオブジェクトから取り除いてくれます。

<h4>Rails(Ruby)</h4>

```ruby
fruit = { apple: 'red', banana: nil, cucumuber: 'green'}
fruit.compact
# {:apple=>"red", :cucumuber=>"green"}

```

<h4>lodash</h4>

```javascript
fruit = { apple: 'red', banana: null, cucumuber: 'green'}
_.omitBy(fruit, _.isNull)
// { apple: 'red', cucumuber: 'green' }

```

<h2>ほかにもありそうですが一旦ここまでで</h2>

ちょっとほかにもありそうですが、今思いつくのはここまでですので、一旦ここで区切らせて頂きます。
今思いましたが、ほかにもtapなどなどjsで再現したい関数というのはいくつかあるので続編もできれば
書きたいと思っています。

では、今回は一旦ここまでで

<div class="after-article"></div>
