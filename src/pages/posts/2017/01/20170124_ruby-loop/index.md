---
templateKey: blog-post
title: Rubyのループ ( while, times ,for , each , step, upto などなど)
slug: /2017/01/24/ruby-loop
createdAt: 2017-01-24 23:00:46
updatedAt: 2018-08-26 12:41:41
thumbnail: /2017/01/20170124_ruby-loop/thumbnail.jpg
categories:
  - engineering
  - for-beginner
tags:
  - dummy
related:
  - dummy
---

Rubyのループって便利ですよね!!

timesとか簡単に回数指定してかけるし、
日付の配列を作ってループさせたりできるし。

というわけでRubyのループの構文に絞って紹介していきます。

<div class="adsense"></div>
&nbsp;
<h3>While 文</h3>
while文。
条件式がTrueである限りループし続けます。
ある一定の条件で抜けたい場合は、breakを挿入します。

```ruby
idx = 0
while idx < 2 do
  pp idx
end

```
&nbsp;
<h3>Times 文</h3>
Times文。
指定した回数だけ処理を繰り返す事ができます。
下に紹介した例ではidxは 0,1,2,3・・・・108となります。

```ruby
108.times do |idx|
pp "ボーン"
end

```

&nbsp;
<h3>for 文</h3>
for文。
指定した回数だけ処理を繰り返す事ができます。
下に紹介した例ではidxは a,b,c~zとなります。
う〜ん便利。これでアルファベットを覚えずにすみますね。

```ruby
for alphabet in 'a'..'z' do
  printf "#{alphabet}\n"
end

```
&nbsp;
<h3>each 文</h3>

いわゆるforeach文ですね。

```ruby
array = [ "I", "Have" , "A" , "Pen!!!" ]
array.each do | val |
  p array
end

```
ハッシュについて使ってあげると
添え字も取得できます。

```ruby
h = {
 "セ・リーグ" => [ "巨人", "阪神", "中日" , "ヤクルト" , "広島","横浜" ],
 "パ・リーグ" => [ "ソフトバンク", "ロッテ", "日ハム" , "オリックス" , "西武","楽天" ]
 }
h.each do | key , val |
  p key
  p val
end

```
&nbsp;

```ruby
$ruby test.rb
"セ・リーグ"
["巨人", "阪神", "中日", "ヤクルト", "広島", "横浜"]
"パ・リーグ"
["巨人", "阪神", "中日", "ヤクルト", "広島", "横浜"]

```
<strong>これは大分使います!!</strong>

&nbsp;
<h3>step , upto , downto</h3>
upto は以下のように書くと20~30まで実行というようになります。

```ruby
20.upto(30) do |idx|
   p idx
end
```

downto というのもある
```ruby
20.upto(30) do |idx|
   p idx
end

```
さらに極め付けはstepです。
1から100までは2つずつカウントしてくれます。

```ruby
1.step(100, 2) do |odd|
   p odd
end

```
&nbsp;
<h3>おまけ</h3>
個人的にすごいなと思うのは
日付、時刻のカウントですかね。

例) 1~3月の日付を全て表示
```ruby
require "date"
jan = Date.parse("2017/1/1")
march_end = Date.parse("2017/3/31")
(jan..march_end).each do | day |
	  p day.strftime("%Y/%m/%d")
end

```
例) 1日を30分単位で出力
```ruby
require "time"
first = Time.parse("2017/1/1 00:00:00")
last = Time.parse("2017/1/1  23:59:59")

(first.to_i..last.to_i).step( 30 * 60  ) do | t |
          p Time.at(t)
end

```
以上!!
