---
templateKey: blog-post
language: ja
title: rubyのEnumerableクラスの抽出メソッドまとめ、map、find、reject、select
slug: /2018/01/12/ruby-enumerable
createdAt: 2018-01-12 15:35:22
updatedAt: 2020-01-03 11:26:42
thumbnail: /2018/01/20180112_ruby-enumerable/thumbnail.png
categories:
  - engineering
  - rails
  - for-beginner
tags:
  - ruby
related:
  - dummy
---

&nbsp;

RubyのEnumerableがごっちゃになっているのと、便利なメソッドが多いので、
まとめてみます。

例に使用しているrubyのversionは2.4.1です。

&nbsp;
<h2>map</h2>
&nbsp;

mapはブロックの結果をまとめた配列を返してくれます。
collectというメソッドもありますが、mapはcollectのエイリアスなので挙動は同じです。

&nbsp;

mapの方が短いのでmapを使いがちです。

下の例では仮想通貨の頭文字の配列の中で、'B'という文字列が
含まれるかを判断して返しています。
```ruby
2.4.1 :003 >   coins = [ 'BTC', 'ETH', 'XRP', 'NEM']
 => ["BTC", "ETH", "XRP", "NEM"]
2.4.1 :004 >
2.4.1 :004 >   coins.map{ |coin| coin.include?('B')}
 => [true, false, false, false]

```
&nbsp;

&nbsp;

Hashの場合は、key と valueを分割できます。
keyを取り出したり、valueを取り出すにはこうします。

&nbsp;
```ruby
2.4.1 :027 >   coins_hash = { btc: 'Bitcoin', eth: 'Ethereum', xrp: 'Ripple', nem: 'XEM' }
 => {:btc=>"Bitcoin", :eth=>"Ethereum", :xrp=>"Ripple", :nem=>"XEM"}


```
```ruby
2.4.1 :032 >   coins_hash.map{ | key, value | value }
 => ["Bitcoin", "Ethereum", "Ripple", "XEM"]
2.4.1 :032 >   coins_hash.map{ | key, value | key }
 =>[:btc, :eth, :xrp, :nem]


```
&nbsp;

&nbsp;
<h2>find ( detect )  | 最初に条件に一致したものを返却</h2>
&nbsp;

&nbsp;

findは配列やハッシュの個別のオブジェクトの中で最初に真になったものを返却してくれます。
detectというメソッドもありfindの別名になります。

&nbsp;

&nbsp;
```ruby
2.4.1 :090 >   coins.find{ |c| c.include?('X') }
 => "XRP"

```
&nbsp;

ハッシュの場合

&nbsp;
```ruby
2.4.1 :084 $gt; coins_hash.find{ | key , value | key.to_s.include?('x') }
 => [:xrp, "Ripple"]

```
&nbsp;

&nbsp;
<h2>select | 条件に一致したものを配列で取得</h2>
&nbsp;

&nbsp;

selectはブロックが真を返したものを配列で返却してくれます。
findメソッドは最初に一致したものを返却してくれますが、selectは真のものすべてを
返却してくれます。

&nbsp;

&nbsp;
```ruby
2.4.1 :095 >   coins.select{ |c| c.include?('T') }
 => ["BTC", "ETH"]

```
&nbsp;

ハッシュの場合

&nbsp;
```ruby
2.4.1 :117 > coins_hash.select{ |coin| coin.to_s.include?('t') }
 => {:btc=>"Bitcoin", :eth=>"Ethereum"}

```
&nbsp;

&nbsp;
<h2>reject | 条件に一致しないものを配列で取得</h2>
&nbsp;

&nbsp;

rejectはselectの反対で偽のものを抽出して配列にしてくれます。

&nbsp;
```ruby
2.4.1 :118 > coins.reject{ |c| c.include?('T') }
 => ["XRP", "NEM"]
```
&nbsp;

ハッシュの場合

&nbsp;
```ruby
2.4.1 :121 > coins_hash.reject{ |coin| coin.to_s.include?('t') }
 => {:xrp=>"Ripple", :nem=>"XEM"}

```
