---
templateKey: blog-post
title: \[ruby\]rubyのEnumerableクラスの抽出メソッドまとめ、map、find、reject、select
slug: 2018/01/12/ruby-enumerable
description: &nbsp;

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
<p
createdAt: 2018-01-12 15:35:22
updatedAt: 2018-08-26 00:57:02
thumbnail: http://ver-1-0.net/wp-content/uploads/2017/01/5ntkpxqt54y-sai-kiran-anagani.jpg
categories: 
  - engineering
  - rails
  - for-beginner
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
<pre><code class="language-ruby">2.4.1 :003 &gt;   coins = [ 'BTC', 'ETH', 'XRP', 'NEM']
 =&gt; ["BTC", "ETH", "XRP", "NEM"] 
2.4.1 :004 &gt; 
2.4.1 :004 &gt;   coins.map{ |coin| coin.include?('B')}
 =&gt; [true, false, false, false] 
</code></pre>
&nbsp;

&nbsp;

Hashの場合は、key と valueを分割できます。
keyを取り出したり、valueを取り出すにはこうします。

&nbsp;
<pre><code class="language-ruby">2.4.1 :027 &gt;   coins_hash = { btc: 'Bitcoin', eth: 'Ethereum', xrp: 'Ripple', nem: 'XEM' }
 =&gt; {:btc=&gt;"Bitcoin", :eth=&gt;"Ethereum", :xrp=&gt;"Ripple", :nem=&gt;"XEM"} 

</code></pre>
<pre><code class="language-ruby">2.4.1 :032 &gt;   coins_hash.map{ | key, value | value }
 =&gt; ["Bitcoin", "Ethereum", "Ripple", "XEM"] 
2.4.1 :032 &gt;   coins_hash.map{ | key, value | key }
 =&gt;[:btc, :eth, :xrp, :nem]

</code></pre>
&nbsp;

&nbsp;
<h2>find ( detect )  | 最初に条件に一致したものを返却</h2>
&nbsp;

&nbsp;

findは配列やハッシュの個別のオブジェクトの中で最初に真になったものを返却してくれます。
detectというメソッドもありfindの別名になります。

&nbsp;

&nbsp;
<pre><code class="language-ruby">2.4.1 :090 &gt;   coins.find{ |c| c.include?('X') }
 =&gt; "XRP" 
</code></pre>
&nbsp;

ハッシュの場合

&nbsp;
<pre><code class="language-ruby">2.4.1 :084 $gt; coins_hash.find{ | key , value | key.to_s.include?('x') }
 =&gt; [:xrp, "Ripple"]
</code></pre>
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
<pre><code class="language-ruby">2.4.1 :095 &gt;   coins.select{ |c| c.include?('T') }
 =&gt; ["BTC", "ETH"] 
</code></pre>
&nbsp;

ハッシュの場合

&nbsp;
<pre><code class="language-ruby">2.4.1 :117 &gt; coins_hash.select{ |coin| coin.to_s.include?('t') }
 =&gt; {:btc=&gt;"Bitcoin", :eth=&gt;"Ethereum"} 
</code></pre>
&nbsp;

&nbsp;
<h2>reject | 条件に一致しないものを配列で取得</h2>
&nbsp;

&nbsp;

rejectはselectの反対で偽のものを抽出して配列にしてくれます。

&nbsp;
<pre><code class="language-ruby">2.4.1 :118 &gt; coins.reject{ |c| c.include?('T') }
 =&gt; ["XRP", "NEM"]</code></pre>
&nbsp;

ハッシュの場合

&nbsp;
<pre><code class="language-ruby">2.4.1 :121 &gt; coins_hash.reject{ |coin| coin.to_s.include?('t') }
 =&gt; {:xrp=&gt;"Ripple", :nem=&gt;"XEM"} 
</code></pre>
