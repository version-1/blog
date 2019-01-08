---
templateKey: blog-post
title: Kotlin + SpringBoot のhtml、css変更後の再起動が面倒臭い。。の対処法
slug: /2017/06/24/problem-boot-server-in-spring
createdAt: 2017-06-24 13:21:57
updatedAt: 2018-08-26 11:52:44
thumbnail: /2017/06/20170624_problem-boot-server-in-spring/thumbnail.jpg
categories:
  - engineering
---

&nbsp;

&nbsp;

先日休日に
Kotlin+SpringBootを
いじっていたら

ある問題でストレスが溜まったのでこんなツイートをしてみました。

&nbsp;

&nbsp;

<img class="post-image" src="https://statics.ver-1-0.net/uploads/2017/06/20170624_problem-boot-server-in-spring/springboot.png" alt="springboot-tweet"/>

&nbsp;

そしたら、
世の中良い人はやっぱりいて、
解決策を教えてくださる人が現れました。

&nbsp;
<h2>「spring-boot-devtoolsを
入れてくださいと。」</h2>
&nbsp;

教えてくださったのが、
SpringBootに関して著書のある
槇 俊明さんだったので、
（感謝の返信をしてから気づきました汗）
迷うことなく、

gradleのdependenciesに追加しました。
```groovy
compile("org.springframework.boot:spring-boot-devtools")

```
&nbsp;

&nbsp;

しかし、
これを追加してみただけではダメ
だったようで、
さらに調べたら
以下のようなページを見つけました。

<a href="https://dzone.com/articles/continuous-auto-restart-with-spring-boot-devtools">https://dzone.com/articles/continuous-auto-restart-with-spring-boot-devtools</a>

&nbsp;

方法としては、
1. あるウィンドウでgradle build --continuousで継続的にビルド
2. 別のウィンドウでgradle bootRunしてアプリケーションを動かす。
になります。

&nbsp;

これをすると
①がファイルの変更を検知してビルド、
②で起動したアプリケーションの再起動が
自動で行われるので、
いちいちウィンドウを切り替えて手動でSpringを再起動させる手間が省けます。

&nbsp;

twitterで教えを受けて、
自分で調べてやってみましたが、
これでいいんですかね。

とりあえず手動でSpringを再起動する手間が省けるので、
状況は改善されました。
ご報告まで

&nbsp;

<a href="http://amzn.to/2t1j6fm">はじめてのSpring Boot―「Spring Framework」で簡単Javaアプリ開発 (I・O BOOKS)</a>

<a href="https://www.amazon.co.jp/%E3%81%AF%E3%81%98%E3%82%81%E3%81%A6%E3%81%AESpring-Boot%E2%80%95%E3%80%8CSpring-Framework%E3%80%8D%E3%81%A7%E7%B0%A1%E5%8D%98Java%E3%82%A2%E3%83%97%E3%83%AA%E9%96%8B%E7%99%BA-I%E3%83%BB-BOOKS/dp/4777518655/ref=as_li_ss_il?ie=UTF8&amp;linkCode=li2&amp;tag=llg01-22&amp;linkId=cb2f914bd2edcfe09725b49c16ffc363" target="_blank" rel="noopener noreferrer"><img src="//ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&amp;ASIN=4777518655&amp;Format=_SL160_&amp;ID=AsinImage&amp;MarketPlace=JP&amp;ServiceVersion=20070822&amp;WS=1&amp;tag=llg01-22" border="0" /></a><img style="border: none !important; margin: 0px !important;" src="https://ir-jp.amazon-adsystem.com/e/ir?t=llg01-22&amp;l=li2&amp;o=9&amp;a=4777518655" alt="" width="1" height="1" border="0" />
