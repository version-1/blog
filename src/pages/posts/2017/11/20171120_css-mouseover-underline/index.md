---
templateKey: blog-post
title: CSSでマウスオーバーした時にうにょーんって下線が伸びるようにする
slug: /2017/11/20/css-mouseover-underline
createdAt: 2017-11-20 12:58:23
updatedAt: 2018-08-26 01:10:28
thumbnail: /2017/11/20171120_css-mouseover-underline/thumbnail.png
categories:
  - engineering
  - design
---

&nbsp;

cssでマウスオーバした時に下線
をうにょーんってさせるアニメーションです。
<p class="codepen" data-height="500" data-theme-id="0" data-slug-hash="gXoVEX" data-default-tab="css,result" data-user="version1" data-embed-version="2" data-pen-title="gXoVEX">See the Pen <a href="https://codepen.io/version1/pen/gXoVEX/">gXoVEX</a> by version1 (<a href="https://codepen.io/version1">@version1</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

それぞれ、Spring,Summer,Autumn,Winterの文字の
上にマウスを当てるとアンダーラインが引かれるようになっています。


demoにはcodepenを利用しています。
興味ある方はこちらもどうぞ
<a href="https://ver-1-0.net/2017/09/02/codepen/">CodePen – webサービスのデザインを考えるときにおすすめの海外サイト</a>
&nbsp;

&nbsp;

cssについて、
簡単に説明すると肝になっているのは、
```css
.list-item::after{
   content: '';
   display:block;
   width:0;
   margin: 6px auto 0;
   border-bottom: 1px solid  white;
   transition: width 0.3s ease-in-out;
}

.list-item:hover::after{
  width: 100%;
}

```
ここの部分です。

&nbsp;

<div class="mid-article"></div>

&nbsp;

&nbsp;

&nbsp;
<h2 class="chapter">after擬似要素で見えない下線を指定する</h2>
&nbsp;

まずは、
:after擬似要素で、それぞれSpringなど季節の
文字の後にwidth:0で下のボーダーだけが存在する要素を
入れ込みます。

その後に、
.list-item:hover::afterで
マウスオーバーされた時のスタイルを指定して
いきます。
ここではwidth:100pxが指定させているので、
下線が表示されるようになります。

&nbsp;
<h2 class="chapter">transformでうにょーんを表現する</h2>
&nbsp;

注意点として、
transitionで最初borderのwidthが0である部分から、
マウスオーバーされてwidthが100%になるまでの、
時間を指定する必要があります。

この例では、
0.3秒かけて変化させるという指定を
行なっているので、
実際のサンプルのような動きになります。
(指定しないといきなり下線が表示される感じになります。)

&nbsp;
<h2 class="chapter">aタグをinline-blockで指定する</h2>
&nbsp;

また、
aタグでdisplay:inline-blockを
指定していますが、
```css
a {
  color:white;
  display: inline-block;
  font-size:30px;
  text-decoration:none;
}

```
これを指定しないと、
文字幅でなく、画面の横幅全体に下線が
広がってしまうので注意してください。

<div class="after-article"></div>
