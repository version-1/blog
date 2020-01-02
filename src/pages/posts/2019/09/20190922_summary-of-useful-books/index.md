---
templateKey: blog-post
language: ja
title: 引っ越しの荷物をまとめながら考えた読んでためになった技術書&その他本のリスト
slug: /2019/09/22/summary-of-useful-books
createdAt: 2019-09-22 02:39:42
updatedAt: 2019-09-22 21:04:48
thumbnail: /2019/09/20190922_summary-of-useful-books/thumbnail.png
categories:
  - engineering
  - freelance
  - column
tags:
  - review
  - book
---

どうも、最近サボリ気味だったブログの更新も週次でやっていきたいなんて考えていますが、
こうしてまた記事を書いているのでなんとか継続できそうな予感がしています。

このところちょっとした用事で引っ越しをすることになったので荷物をまとめていました。
荷物というと家電からPCの周辺機器などなどあるのですが、その中でもやはり本がそれなりの
割合を締めてくるので整理するわけで、読みたいときにパッと手に取りたい本とそうでない本を
仕分けてみるのですが、手に取りたい本の多いこと笑。

今改めてそれぞれの本を見てみると「あぁこれ良い本だよなぁ」という本が数冊あったのでそれらを
まとめて紹介したいと思います。

良い本はやっぱりネットで取り上げられていることも多くかぶる面もありそうですが、とりあえず一斉に
紹介できればと思っています。

<div class="related-post">
  <a href="/2019/03/28/three-phase-reading">難解な本、分厚い本の読み方。本を三段階に分けてよむ。</a>
</div>

## 早速本の紹介

### 技術の本

#### プロを目指す人のためのRuby入門 言語仕様からテスト駆動開発・デバッグ技法まで

<a href="https://www.amazon.co.jp/%E3%83%97%E3%83%AD%E3%82%92%E7%9B%AE%E6%8C%87%E3%81%99%E4%BA%BA%E3%81%AE%E3%81%9F%E3%82%81%E3%81%AERuby%E5%85%A5%E9%96%80-%E8%A8%80%E8%AA%9E%E4%BB%95%E6%A7%98%E3%81%8B%E3%82%89%E3%83%86%E3%82%B9%E3%83%88%E9%A7%86%E5%8B%95%E9%96%8B%E7%99%BA%E3%83%BB%E3%83%87%E3%83%90%E3%83%83%E3%82%B0%E6%8A%80%E6%B3%95%E3%81%BE%E3%81%A7-Software-Design-plus%E3%82%B7%E3%83%AA%E3%83%BC%E3%82%BA/dp/4774193976/ref=as_li_ss_il?ie=UTF8&linkCode=li2&tag=llg01-22&linkId=b9621ca721c0f36fed65a16e4741b052&language=ja_JP" target="_blank"><img border="0" src="//ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=4774193976&Format=_SL160_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=llg01-22&language=ja_JP" ></a><img src="https://ir-jp.amazon-adsystem.com/e/ir?t=llg01-22&language=ja_JP&l=li2&o=9&a=4774193976" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />

<a href="https://amzn.to/336xWAb">Amazon</a>

Rubyの入門書ですが、タイトルの通りRubyの言語仕様（トップレベルオブジェクト継承関係など）からデバッグ技法について丁寧に説明されています。

初心者の方が一読してRubyを理解するのにも良いですし、中級者があれここの仕様どうなってたっけ？みたいなリファレンスとして使うにも良です。
私自身仕事でRubyを使うことも多いのですが、あまり使っていない部分が頭から抜け落ちていたりするのでその都度この本を参照して再度思い出したりしています。

今のRubyを取り巻く環境的にRubyを触る＝Railsを触るということだと思うのですが、普段遣いではほとんどRailsを触ることが多いかと思いますが、
Rubyを触る人は最低でもこちらのような網羅的な知識の書かれた本を持っておいて繰り返し参照するとRubyおよびRailsでかけるコードの幅が広がります。

また、このように情報量の多い本では一回読んだだけでは全て使えるようにならないので繰り返し本に目を通すのが良いです。
日々の仕事やプログラミングで蓄積された経験がこの本を読むことで「なるほどこういうことができるのか！次使ってみよう」というようなアクションありきの
インプットができるので記憶の定着と実用性の高いインプットができると思います。

Rubyを書いていると「Rubyを書いていると思ったらRailsを書いている」状態になってしまう
(Railsを使わないコードで、Railsでしか使えないメソッドを呼び出ししてハマるなど）
こともあるのでRailsガイドやネットの情報に止まらず、
このような"Ruby"の本を一冊持っておくと「RubyでできることとRailsでできること」を理解してコードをかけるようになるかと思います。


#### Ruby on Rails 5 アプリケーションプログラミング

<a href="https://www.amazon.co.jp/Ruby-Rails-5%E3%82%A2%E3%83%97%E3%83%AA%E3%82%B1%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E3%83%97%E3%83%AD%E3%82%B0%E3%83%A9%E3%83%9F%E3%83%B3%E3%82%B0-%E5%B1%B1%E7%94%B0-%E7%A5%A5%E5%AF%9B/dp/4774188832/ref=as_li_ss_il?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&crid=1I7DS74S3WJ26&keywords=ruby+on+rails+5%E3%82%A2%E3%83%97%E3%83%AA%E3%82%B1%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E3%83%97%E3%83%AD%E3%82%B0%E3%83%A9%E3%83%9F%E3%83%B3%E3%82%B0&qid=1569122462&s=books&sprefix=Ruby+on+R,stripbooks,248&sr=1-1&linkCode=li2&tag=llg01-22&linkId=29f02cf2ac1be96625c9c10d2a8ae30c&language=ja_JP" target="_blank"><img border="0" src="//ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=4774188832&Format=_SL160_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=llg01-22&language=ja_JP" ></a><img src="https://ir-jp.amazon-adsystem.com/e/ir?t=llg01-22&language=ja_JP&l=li2&o=9&a=4774188832" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />

<a href="https://amzn.to/353fOsm">Amazon</a>

先に説明したのはRubyの本ですがこちらはRailsの本になります。Railsでできることが一通り書かれているのでパッと全体に目を通して気になる部分をさらに読み進める。
ちょっと暇な時に繰り返し目を通すというような使い方ができるとRailsの習熟に役立てることができると思います。

RailsはTwitterではちらほらオワコンだみたいな意見も見受けられますが、
個人的な意見としてはフルスタックフレームワークとしてここまでライブラリの環境が整備されていて、Railsのルールに沿ってプログラミングをしていけば
これほど素早くシステムを作り上げられるフレームワークは少ないと思うので、まだまだ勉強する価値があるかなと思います。

Rails自体はすでにバージョン6.0がリリースされていますが、一部カバーできていない部分あるかと思いますが基本的な部分はカバーできているはずなので
こちらを買っておいても損ではないです。（同シリーズの6.0があればそちらが良いかも）

#### キタミ式イラストIT塾 基本情報技術者 平成31/01年 (情報処理技術者試験)

<a href="https://www.amazon.co.jp/%E3%82%AD%E3%82%BF%E3%83%9F%E5%BC%8F%E3%82%A4%E3%83%A9%E3%82%B9%E3%83%88IT%E5%A1%BE-%E5%9F%BA%E6%9C%AC%E6%83%85%E5%A0%B1%E6%8A%80%E8%A1%93%E8%80%85-%E5%B9%B3%E6%88%9031-01%E5%B9%B4-%E6%83%85%E5%A0%B1%E5%87%A6%E7%90%86%E6%8A%80%E8%A1%93%E8%80%85%E8%A9%A6%E9%A8%93/dp/4297102110/ref=as_li_ss_il?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&crid=39AYVGT8O7CM4&keywords=%E3%82%AD%E3%82%BF%E3%83%9F%E5%BC%8F%E3%82%A4%E3%83%A9%E3%82%B9%E3%83%88it%E5%A1%BE+%E5%9F%BA%E6%9C%AC%E6%83%85%E5%A0%B1%E6%8A%80%E8%A1%93%E8%80%85&qid=1569121630&s=books&sprefix=%E3%82%AD%E3%82%BF%E3%83%9F%E5%BC%8F,stripbooks,329&sr=1-1&linkCode=li2&tag=llg01-22&linkId=3e36586b98a0f107ea1b91d3252436c7&language=ja_JP" target="_blank"><img border="0" src="//ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=4297102110&Format=_SL160_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=llg01-22&language=ja_JP" ></a><img src="https://ir-jp.amazon-adsystem.com/e/ir?t=llg01-22&language=ja_JP&l=li2&o=9&a=4297102110" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />

<a href="https://amzn.to/30zJHgE">Amazon</a>

意外かもしれませんがIPAが認定している資格の基本情報技術者の参考書になります。

ネットだと資格は割とディスられる傾向になりますが、資格試験の参考書はよくまとまっていてわかりやすく網羅的に解説
しているものも多いので資格取らずとも本を買うというのは全然ありです。

こちらの本は初心者向けで、これまでIT業界にいなかったけどプログラミングの勉強を始めたいなんて人におすすめです。
例え話や図を入れながらわかりやすく解説してくれています。

プログラミングとなるとRailsやReactなどプログラミング言語自体アプリケーションの層の話題になることが多いですが、
初心者のうちにつまずくのは一般的あまり語られないコンピュータの構造(CPUって？メモリって？コンピュータってそもそもどうやって動くのなど）
の話やネットワークの部分なのでこういったIT知識を網羅的に紹介した本があると心強いかと思います。

すでにエンジニアとして働いている人も新人に教える時にどうやって説明しようかな？という時の参考にのぞいたり、
基礎的すぎて人にききづらいときにこっそり参照してみると良いと思います。


#### Java言語で学ぶデザインパターン入門

<a href="https://www.amazon.co.jp/%E5%A2%97%E8%A3%9C%E6%94%B9%E8%A8%82%E7%89%88Java%E8%A8%80%E8%AA%9E%E3%81%A7%E5%AD%A6%E3%81%B6%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E5%85%A5%E9%96%80-%E7%B5%90%E5%9F%8E-%E6%B5%A9/dp/4797327030/ref=as_li_ss_il?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&crid=38902OEUO9M1P&keywords=java%E8%A8%80%E8%AA%9E%E3%81%A7%E5%AD%A6%E3%81%B6%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E5%85%A5%E9%96%80&qid=1569123345&s=books&sprefix=Java%E8%A8%80%E8%AA%9E%E3%81%A7%E5%AD%A6%E3%81%B6%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3,office-products,387&sr=1-1&linkCode=li2&tag=llg01-22&linkId=e7c0c48a81174e0749d0219a65091f22&language=ja_JP" target="_blank"><img border="0" src="//ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=4797327030&Format=_SL160_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=llg01-22&language=ja_JP" ></a><img src="https://ir-jp.amazon-adsystem.com/e/ir?t=llg01-22&language=ja_JP&l=li2&o=9&a=4797327030" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />

<a href="https://amzn.to/2V6s8Ue">Amazon</a>

こちらは中級者向けという感じですが、エンジニアとして仕事するのであれば持っておきたい本の一つだと個人的には思っています。
割と有名な本ですが一応説明しとくと、GoF(詳しくはググってください）の23のオブジェクト指向プログラミングにおける設計のパターンを一つずつ解説している本になります。

23個すべてを頭に入れておくのは結構しんどいので完コピせよとは思いませんが、Singleton, Facade, Strategy, Factory, Observer, Template Method, Composition, Decolatorなどなど
有名どころはおさえておくとどの言語を書く時にも役立ちます。

またこれらの知識が公式ドキュメントで暗黙的な前提知識として語られていることもあるので、これらを知っていないと
ドキュメントを読むのが辛くか理解が浅くなってしまうというリスクを回避するためにも要点はおさえておきたい所です。

またデザインパターン自体がオブジェクト指向の良い例を集め具体例の集合体みたいなものなのでオブジェクト指向を具体例から理解するのにちょうど良いリファレンスだと思います。
自身もこれを読み進めることで「あ、良く設計されたコードってこういうことを言うのね」みたいなを実感できました。

本自体が分厚く一気に倒すのは結構骨が折れるので、今日はSingletonを倒そう、明日はStrategyを倒そうみたいな感じで一つずつ倒すようにしていったら
日常で遭遇するものはだいたい実際に活用する時には調べながらやるけど、頭にインデックスを作れているくらいにはなったかなという感じです。

#### プリンシプル オブ プログラミング3年目までに身につけたい一生役立つ101の原理原則

<a href="https://www.amazon.co.jp/%E3%83%97%E3%83%AA%E3%83%B3%E3%82%B7%E3%83%97%E3%83%AB-%E3%82%AA%E3%83%96-%E3%83%97%E3%83%AD%E3%82%B0%E3%83%A9%E3%83%9F%E3%83%B3%E3%82%B03%E5%B9%B4%E7%9B%AE%E3%81%BE%E3%81%A7%E3%81%AB%E8%BA%AB%E3%81%AB%E3%81%A4%E3%81%91%E3%81%9F%E3%81%84%E4%B8%80%E7%94%9F%E5%BD%B9%E7%AB%8B%E3%81%A4101%E3%81%AE%E5%8E%9F%E7%90%86%E5%8E%9F%E5%89%87-%E4%B8%8A%E7%94%B0-%E5%8B%B2/dp/4798046140/ref=as_li_ss_il?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&keywords=%E3%83%97%E3%83%AA%E3%83%B3%E3%82%B7%E3%83%97%E3%83%AB%E3%82%AA%E3%83%96%E3%83%97%E3%83%AD%E3%82%B0%E3%83%A9%E3%83%9F%E3%83%B3%E3%82%B0&qid=1569124266&s=books&sr=1-1&linkCode=li2&tag=llg01-22&linkId=b685a2134b0a8d8bf1c55cf0d3283ed5&language=ja_JP" target="_blank"><img border="0" src="//ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=4798046140&Format=_SL160_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=llg01-22&language=ja_JP" ></a><img src="https://ir-jp.amazon-adsystem.com/e/ir?t=llg01-22&language=ja_JP&l=li2&o=9&a=4798046140" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />

<a href="https://amzn.to/34Z2KEx">Amazon</a>

こちらはプログラミングにおける設計思想や理論についてひたすら紹介されている本です。タイトルの通り3年目までに身に付けたい内容がブワッと書かれている
感じですね。抽象的な内容が多いのである程度実務経験がないと実践は難しいのですが、日々コードを書く際に気をつけたことが良いリストがつめこまれています。

また、業界で良く使われる専門用語集のようでもあり、この本を読んでおくと技術的なブログを読むと時の文脈を理解しながら読めるようになるので一度は目を通して
置けると良いかと重ます。

ボーイスカウトの原則、技術的負債、割れた窓の法則、車輪の再発明、DRY、関心の分離などなどが紹介されていますがこれらの単語で良く知らない言葉がある方は
購入して一読されるのをおすすめします。

#### リーダブルコード ―より良いコードを書くためのシンプルで実践的なテクニック

<a href="https://www.amazon.co.jp/%E3%83%AA%E3%83%BC%E3%83%80%E3%83%96%E3%83%AB%E3%82%B3%E3%83%BC%E3%83%89-%E2%80%95%E3%82%88%E3%82%8A%E8%89%AF%E3%81%84%E3%82%B3%E3%83%BC%E3%83%89%E3%82%92%E6%9B%B8%E3%81%8F%E3%81%9F%E3%82%81%E3%81%AE%E3%82%B7%E3%83%B3%E3%83%97%E3%83%AB%E3%81%A7%E5%AE%9F%E8%B7%B5%E7%9A%84%E3%81%AA%E3%83%86%E3%82%AF%E3%83%8B%E3%83%83%E3%82%AF-Theory-practice-Boswell/dp/4873115655/ref=as_li_ss_il?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&keywords=%E3%83%AA%E3%83%BC%E3%83%80%E3%83%96%E3%83%AB%E3%82%B3%E3%83%BC%E3%83%89&qid=1569133900&s=books&sr=1-1&linkCode=li2&tag=llg01-22&linkId=a421dbb1660c18b4c995e52f3a3589af&language=ja_JP" target="_blank"><img border="0" src="//ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=4873115655&Format=_SL160_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=llg01-22&language=ja_JP" ></a><img src="https://ir-jp.amazon-adsystem.com/e/ir?t=llg01-22&language=ja_JP&l=li2&o=9&a=4873115655" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />

<a href="https://amzn.to/30dYzpy">Amazon</a>

こちらもプログラミングをする上でのお作法的な話にはなりますがリーダブルコードの方がプリンシプルオブプログラミングよりは、命名の大切さやインデントを揃える
ネストを避ける、コードを小さく保つなどの”読みやすい”コードをかくための方法が紹介されています。

プリンシプルオブプログラミングが設計などの話に関しても踏み込んでいるに対して、こちらは適切な命名を元にコードを共通化し、一度に一つのことを行うモジュールをつなげて
コードを読みやすくするという部分に焦点を絞ってまとめてあります。

コメントに関する考え方や命名の大事さなどが説かれているので一度は目を通しておくと良いでしょう。


#### 関数型プログラミングの基礎 JavaScriptを使って学ぶ

<a href="https://www.amazon.co.jp/%E9%96%A2%E6%95%B0%E5%9E%8B%E3%83%97%E3%83%AD%E3%82%B0%E3%83%A9%E3%83%9F%E3%83%B3%E3%82%B0%E3%81%AE%E5%9F%BA%E7%A4%8E-JavaScript%E3%82%92%E4%BD%BF%E3%81%A3%E3%81%A6%E5%AD%A6%E3%81%B6-%E7%AB%8B%E5%B7%9D%E5%AF%9F%E7%90%86/dp/4865940596/ref=as_li_ss_il?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&crid=ECVHBPYMF4PS&keywords=%E9%96%A2%E6%95%B0%E5%9E%8B%E3%83%97%E3%83%AD%E3%82%B0%E3%83%A9%E3%83%9F%E3%83%B3%E3%82%B0%E3%81%AE%E5%9F%BA%E7%A4%8E&qid=1569133961&s=books&sprefix=%E9%96%A2%E6%95%B0%E5%9E%8B,stripbooks,274&sr=1-1&linkCode=li2&tag=llg01-22&linkId=108a73704f6757e8c56b3dc919876f11&language=ja_JP" target="_blank"><img border="0" src="//ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=4865940596&Format=_SL160_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=llg01-22&language=ja_JP" ></a><img src="https://ir-jp.amazon-adsystem.com/e/ir?t=llg01-22&language=ja_JP&l=li2&o=9&a=4865940596" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />

<a href="https://amzn.to/2Ii5rXX">Amazon</a>

RubyやPHPなどのバックエンドのコードを書いているとあまり必要ないのかもしれませんが（多くはオブジェクト指向にのっとった形で開発するので）、
フロントのコードを変えてくると関数型プログラミングの考え方が役に立ちます。ReactやVueなどのライブラリではコンポーネント(関数）にデータを与えると
必要なコンポーネントが描画され、データが変わると見た目やテキストが変わり、同じデータを与えたら全く同じ結果になるというのが基本の考え方になっています。

変数をイミュータブルに保ったり、高階関数の考え方はJavaScriptを使う上で必要不可欠なのでフロントをやりたい方は一度関数型プログラミングの基礎に
触れておくと良いかと思います。

こちらの本は割と身近な関数型言語であるJavaScript（ここら辺は色々な意見ありそうですが）を使って関数型プログラミングとはなんぞやということを
解説してくれています。

#### 実践Vim　思考のスピードで編集しよう！

<a href="https://www.amazon.co.jp/%E5%AE%9F%E8%B7%B5Vim-%E6%80%9D%E8%80%83%E3%81%AE%E3%82%B9%E3%83%94%E3%83%BC%E3%83%89%E3%81%A7%E7%B7%A8%E9%9B%86%E3%81%97%E3%82%88%E3%81%86%EF%BC%81-%E3%82%A2%E3%82%B9%E3%82%AD%E3%83%BC%E6%9B%B8%E7%B1%8D-%EF%BC%A4%EF%BD%92%EF%BD%85%EF%BD%97-%EF%BC%AE%EF%BD%85%EF%BD%89%EF%BD%8C-ebook/dp/B00HWLJI3U/ref=as_li_ss_il?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&keywords=%E5%AE%9F%E8%B7%B5Vim&qid=1569134305&s=books&sr=1-1&linkCode=li2&tag=llg01-22&linkId=e3c4198302ab7f5fc7c8dbfed349236f&language=ja_JP" target="_blank"><img border="0" src="//ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B00HWLJI3U&Format=_SL160_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=llg01-22&language=ja_JP" ></a><img src="https://ir-jp.amazon-adsystem.com/e/ir?t=llg01-22&language=ja_JP&l=li2&o=9&a=B00HWLJI3U" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />

<a href="https://amzn.to/336L0FJ">Amazon</a>

私の普段遣いのエディタはVimで様々なプラグインを入れていて快適にテキストの編集ができるようにはしているのですが、こちらの本では
Vimのデフォルトの機能を最大限り活用するための様々なTipsが紹介されています。

例えば、vimにはビジュアルモードと挿入モードという二つのモードを行き来しながら編集を行なっていくのですがvimではc -> i -> w というたった3つのキーを連続で
押すことで単語レベルで文字列を削除した後に挿入モードに移れ(書き換えが楽）たり、ヴィジュアルモードでドットを押すと前の操作を繰り返すことができるので
これを使って操作を自動化したり、マクロという機能を使って操作を記録して作業を自動化できるといったことがリストになって紹介されています。

VimmerやこれからVimmerになろうとしている方にオススメの一冊です。

#### SQLアンチパターン

<a href="https://www.amazon.co.jp/SQL%E3%82%A2%E3%83%B3%E3%83%81%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3-Bill-Karwin/dp/4873115892/ref=as_li_ss_il?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&keywords=SQL%E3%82%A2%E3%83%B3%E3%83%81%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3&qid=1569134389&s=books&sr=1-1&linkCode=li2&tag=llg01-22&linkId=a99cc7ae0a73b2c89c51d75f17dfe278&language=ja_JP" target="_blank"><img border="0" src="//ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=4873115892&Format=_SL160_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=llg01-22&language=ja_JP" ></a><img src="https://ir-jp.amazon-adsystem.com/e/ir?t=llg01-22&language=ja_JP&l=li2&o=9&a=4873115892" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />

<a href="https://amzn.to/30dZqGM">Amazon</a>

名前の通りSQLにおけるアンチパターンを紹介している本です。ある程度の規模のシステムを設計してて、納期が近かったりするとうっかりこちらの本に
あるようなパターンを作り込んでしまっている場合があるのですが、定期的にこちらの目次を見て自分の関わっているシステムがアンチパターンに陥って
ないかどうかを確認したい所です。

まずはアンチパターンにどのようなものがあるかを知っておかないと防げるものも防げないのでこちらの本で一度確認させれると良いかと思います。

### その他

持っている本が技術書ばかりですが、他にもよかった本がいくつかあるので紹介させていただきます。

#### 音声ダウンロード付】実践IELTS英単語3500

<a href="https://www.amazon.co.jp/%E3%80%90%E9%9F%B3%E5%A3%B0%E3%83%80%E3%82%A6%E3%83%B3%E3%83%AD%E3%83%BC%E3%83%89%E4%BB%98%E3%80%91%E5%AE%9F%E8%B7%B5IELTS%E8%8B%B1%E5%8D%98%E8%AA%9E3500-%E5%86%85%E5%AE%AE-%E6%85%B6%E4%B8%80/dp/4010941855/ref=as_li_ss_il?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&keywords=IELTS+%E5%9F%BA%E7%A4%8E%E8%8B%B1%E5%8D%98%E8%AA%9E&qid=1569134518&s=books&sr=1-2-fkmr1&linkCode=li2&tag=llg01-22&linkId=71da38deb4167411d4b52e52fe43a2a5&language=ja_JP" target="_blank"><img border="0" src="//ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=4010941855&Format=_SL160_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=llg01-22&language=ja_JP" ></a><img src="https://ir-jp.amazon-adsystem.com/e/ir?t=llg01-22&language=ja_JP&l=li2&o=9&a=4010941855" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />

<a href="https://amzn.to/30ik6xy">Amazon</a>

単語帳です。近々IELTSを受ける予定なのでこちらを購入して、まだ完全に覚えてはいないのですが、音声付きというのが良いです。
単語を覚えるときには音と一緒に覚えた方が記憶に残りやすいし、会話で単語を聞いた時のイメージの湧き方が違うので単語帳はいつも音声付きの
ものを使うようにしています。


#### 反省させると犯罪者になります

<a href="https://www.amazon.co.jp/%E5%8F%8D%E7%9C%81%E3%81%95%E3%81%9B%E3%82%8B%E3%81%A8%E7%8A%AF%E7%BD%AA%E8%80%85%E3%81%AB%E3%81%AA%E3%82%8A%E3%81%BE%E3%81%99-%E6%96%B0%E6%BD%AE%E6%96%B0%E6%9B%B8-%E5%B2%A1%E6%9C%AC-%E8%8C%82%E6%A8%B9/dp/4106105209/ref=as_li_ss_il?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&crid=1ANTH4WV4VEGY&keywords=%E5%8F%8D%E7%9C%81%E3%81%95%E3%81%9B%E3%82%8B%E3%81%A8%E7%8A%AF%E7%BD%AA%E8%80%85%E3%81%AB%E3%81%AA%E3%82%8A%E3%81%BE%E3%81%99&qid=1569134570&s=books&sprefix=%E5%8F%8D%E7%9C%81%E3%81%95%E3%81%9B%E3%82%8B%E3%81%A8,stripbooks,703&sr=1-1&linkCode=li2&tag=llg01-22&linkId=82fcefff373a673c947395c39442b57b&language=ja_JP" target="_blank"><img border="0" src="//ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=4106105209&Format=_SL160_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=llg01-22&language=ja_JP" ></a><img src="https://ir-jp.amazon-adsystem.com/e/ir?t=llg01-22&language=ja_JP&l=li2&o=9&a=4106105209" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />

<a href="https://amzn.to/2Igf75y">Amazon</a>

なかなかショッキングなタイトルなのですが、受刑者と長く関わった経験から問題行動→即反省を求めるような風潮に警鐘をならすような本になっています。

本の中では、犯罪などの問題行動を起こした後に沸き起こる感情がまず最初に反省であるべきということが不自然で、人はまず問題行動の後に「誰々に迷惑をかけてしまい申し訳ない」
と思うより「あぁなんあんなことしたんだろう・・・」「あいつのせいで・・・」など反省とは別の後悔や他人を責める感情が自然であるということが指摘されています。

本冒頭では、筆者自身が接触事故を起こした際の感情を例に上記のことを説明していますが、自分が対物の事故をおこしてしまった時も「同乗者に申し訳ない・・・」という感情より
「なんであそこに石があるのに気づけなかったんだろう・・」などなど「こんなところで事故るなんてついてないなどなど」割と自己本位なことを考えていた記憶が蘇り、実感として確かにそうかもしれないと思わされました。

こちらの本は、タイトルのショッキングさや一般的にあまり言われていない話でもうちょっと知りたいと思って買った本なのですが、
読んでみるともう少し生々しい話や実例なども交えて説明していたりして読んでいて非常に気づきがありました。

刑務所での話が主になりますが人の本質的なところを語っているようで面白いので興味のある人は一度読んでみると良いかと思います。

#### なぜあなたの仕事は終わらないのか

<a href="https://www.amazon.co.jp/%E3%81%AA%E3%81%9C%E3%80%81%E3%81%82%E3%81%AA%E3%81%9F%E3%81%AE%E4%BB%95%E4%BA%8B%E3%81%AF%E7%B5%82%E3%82%8F%E3%82%89%E3%81%AA%E3%81%84%E3%81%AE%E3%81%8B-%E3%82%B9%E3%83%94%E3%83%BC%E3%83%89%E3%81%AF%E6%9C%80%E5%BC%B7%E3%81%AE%E6%AD%A6%E5%99%A8%E3%81%A7%E3%81%82%E3%82%8B-%E4%B8%AD%E5%B3%B6%E8%81%A1/dp/4905073413/ref=as_li_ss_il?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&crid=24PQXE7H9JDED&keywords=%E3%81%AA%E3%81%9C%E3%81%82%E3%81%AA%E3%81%9F%E3%81%AE%E4%BB%95%E4%BA%8B%E3%81%AF%E7%B5%82%E3%82%8F%E3%82%89%E3%81%AA%E3%81%84%E3%81%AE%E3%81%8B&qid=1569134638&s=books&sprefix=%E3%81%AA%E3%81%9C%E3%81%82%E3%81%AA%E3%81%9F%E3%81%AE,stripbooks,282&sr=1-1&linkCode=li2&tag=llg01-22&linkId=114689e1777fa3d7a398f6b58a054690&language=ja_JP" target="_blank"><img border="0" src="//ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=4905073413&Format=_SL160_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=llg01-22&language=ja_JP" ></a><img src="https://ir-jp.amazon-adsystem.com/e/ir?t=llg01-22&language=ja_JP&l=li2&o=9&a=4905073413" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />

<a href="https://amzn.to/30lVRxu">Amazon</a>

こちらは最近チラチラネットの動画でお顔を拝見する中島聡さんの本です。仕事術の本として読んでいてい面白いのですが、中島聡さんのマイクロソフト時代のエピソード
の話などがあって面白いです。

本書でメインで語られている「ロケットスタート仕事術」ですが、これには結構同意していてエンジニアって頼まれた仕事だけやっていると本当に発注元が必要と
思う機能を実装するだけの仕事に終始してしまったり、システムの見積もり自体が難しいのでプログダクトの価値にクリティカルなもの以外は一定程度のバッファをとって納品するのが
ベストだと思っているのですが、これがまさにそれを体現する仕事術で全面的に賛成したい仕事の進め方でした。

エンジニア界隈だと業務時間外に勉強しないといけないのか！みたいな話がありますが、個人レベルでは要は業務時間外に勉強しなくて済むような仕組みを作るか、
キャリアアップを諦めて少ない遺産を取り潰しながら仕事するかという選択な問題な気がしています。

業務時間外に勉強したくないのであれば時間内に勉強できるような仕組みを作れば良いだけで、この「ロケットスタート仕事術」はそれのヒントになるのかなと思っています。
ロケットスタート仕事術では、見積もり期間の前半で全力でものを仕上げて後半は仕様の追加等なければ流すという内容なので、そこで勉強したい人は後半の空いている時間で勉強すれば良いということです。

ちょっと色々書きましたが、仕事術としても当時のMSの状況を知る上でも面白いのでおすすめです。

中島聡さんのブログ自体もなかなか読み応えがあるのでおすすめです。

[Life is beautiful](https://satoshi.blogs.com/life/)

#### 自分の時間を取り戻そう―――ゆとりも成功も手に入れられるたった1つの考え方

<a href="https://www.amazon.co.jp/%E8%87%AA%E5%88%86%E3%81%AE%E6%99%82%E9%96%93%E3%82%92%E5%8F%96%E3%82%8A%E6%88%BB%E3%81%9D%E3%81%86%E2%80%95%E2%80%95%E2%80%95%E3%82%86%E3%81%A8%E3%82%8A%E3%82%82%E6%88%90%E5%8A%9F%E3%82%82%E6%89%8B%E3%81%AB%E5%85%A5%E3%82%8C%E3%82%89%E3%82%8C%E3%82%8B%E3%81%9F%E3%81%A3%E3%81%9F1%E3%81%A4%E3%81%AE%E8%80%83%E3%81%88%E6%96%B9-%E3%81%A1%E3%81%8D%E3%82%8A%E3%82%93/dp/4478101558/ref=as_li_ss_il?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&keywords=%E8%87%AA%E5%88%86%E3%81%AE%E6%99%82%E9%96%93%E3%82%92%E5%8F%96%E3%82%8A%E6%88%BB%E3%81%9D%E3%81%86&qid=1569134700&s=books&sr=1-1&linkCode=li2&tag=llg01-22&linkId=f16cb65de51f4abbdb6a035a990f2048&language=ja_JP" target="_blank"><img border="0" src="//ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=4478101558&Format=_SL160_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=llg01-22&language=ja_JP" ></a><img src="https://ir-jp.amazon-adsystem.com/e/ir?t=llg01-22&language=ja_JP&l=li2&o=9&a=4478101558" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />

<a href="https://amzn.to/30CmL07">Amazon</a>

こちらはちきりんさんの有名な本です。

個人的にちきりんさんの本が本質をついているのに簡単な表現を使いながらわかりやすく言いたいことをまとめているのに驚いていて、
いくつか本を購入しているのですが、こちらは正社員時代に読んでなるほどと思った本になります。

まず生産性という考え方をしっかり説明するところから、実際に4人のモデルケースを示しながらそれぞれのケースで仕事を効率化して生産性を高めて
「自分の時間」をいかに増やしていくかということを示す本になります。

個人的にこの本で面白いと思ったのは、男性サラリーマンや共働きの女性などの一般的に家事や長時間労働に悩まされていそうな層以外に起業家をモデルケース
に取り上げている点になります。

一般的に長時間労働が問題視される男女問はず忙しい社会であるというのは理解されているのですが、
起業家などは「好きでやっているんでしょ」とか「仕事とプライベート関係ないんでしょ」といった雰囲気のある層にも「自分の時間を取り戻そう」という提案をしているところが面白いと思いました。

個人的に起業してある程度組織ができてくると自分が作ったはずなのにその組織に縛られてしまうみたいなことは
まぁまぁあると思っていてそれで悩んでいる人も一定程度いると思うのですが、そこをモデルケース組み込んで提案しているのは新鮮でした。

こちらの本を読むとそもそも「生産性ってなんだっけ？」というところから考えることができるのでおすすめです。

#### マーケット感覚を身につけよう---「これから何が売れるのか?」わかる人になる5つの方法

<a href="https://www.amazon.co.jp/%E3%83%9E%E3%83%BC%E3%82%B1%E3%83%83%E3%83%88%E6%84%9F%E8%A6%9A%E3%82%92%E8%BA%AB%E3%81%AB%E3%81%A4%E3%81%91%E3%82%88%E3%81%86-%E3%80%8C%E3%81%93%E3%82%8C%E3%81%8B%E3%82%89%E4%BD%95%E3%81%8C%E5%A3%B2%E3%82%8C%E3%82%8B%E3%81%AE%E3%81%8B-%E3%80%8D%E3%82%8F%E3%81%8B%E3%82%8B%E4%BA%BA%E3%81%AB%E3%81%AA%E3%82%8B5%E3%81%A4%E3%81%AE%E6%96%B9%E6%B3%95-%E3%81%A1%E3%81%8D%E3%82%8A%E3%82%93/dp/4478064784/ref=as_li_ss_il?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&crid=1ZC9X2DWBBWYG&keywords=%E3%83%9E%E3%83%BC%E3%82%B1%E3%83%83%E3%83%88%E6%84%9F%E8%A6%9A%E3%82%92%E8%BA%AB%E3%81%AB%E3%81%A4%E3%81%91%E3%82%88%E3%81%86&qid=1569134752&s=books&sprefix=%E3%83%9E%E3%83%BC%E3%82%B1%E3%83%83%E3%83%88%E6%84%9F%E8%A6%9A%E3%82%92,stripbooks,261&sr=1-1&linkCode=li2&tag=llg01-22&linkId=fb34b7c50ed93a3d6b8a8630501655a6&language=ja_JP" target="_blank"><img border="0" src="//ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=4478064784&Format=_SL160_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=llg01-22&language=ja_JP" ></a><img src="https://ir-jp.amazon-adsystem.com/e/ir?t=llg01-22&language=ja_JP&l=li2&o=9&a=4478064784" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />

<a href="https://amzn.to/2V7S6qx">Amazon</a>

こちらはフリーランスになってからと、なる直前になるほどと思った本です。

マーケット感覚とは
* 商品やサービスが売買されている現場の、リアルな状況を想像できる能力
* 顧客が、市場で価値を取引す場面を、直感的に思い浮かべられる能力

とのことなのですが、フリーランスともなるとやっぱりお客さんがどういったことをメリットと感じて契約してくれるのかというところを
考えないとダメだよねと思っているのですが、エンジニアのフリーランスだと間にエージェントが入ってくれたりしてなんとなくやれちゃう
風潮はあると思います。

そんなかで、エージェント抜いて仕事取りたいだとか、単価あげたいという風に思った時にここら辺の感覚は大事になってくると思います。
エンジニアはシステム開発のお手伝いをすることでそのフィーをもらうことで価値の交換をしているのですが、単純な技術力だけだとお客さん側自体が
エンジニアでないことも多く区別がつかず報酬が平準化してしまいます。

エンジニアとしてベースの技術力を高めることは必要不可欠ではあるのですが、技術力だけが単価に直結すると考えるのは少し視野が狭いかとも思うので、
フリーランスとして生活するのであれば自分がフリーランスとしてどのような価値を提供していてるのか？または他に提供できる価値はあるか？という視点で
日々の仕事を見返せると良いかと思います。

この本はその考えるキッカケになるかと思うので手にとってみると良いかと思います。


#### Illustrator しっかり入門 増補改訂 第２版 【CC完全対応】［Mac & Windows 対応］

<a href="https://www.amazon.co.jp/Illustrator-%E3%81%97%E3%81%A3%E3%81%8B%E3%82%8A%E5%85%A5%E9%96%80-%E5%A2%97%E8%A3%9C%E6%94%B9%E8%A8%82-%E3%80%90CC%E5%AE%8C%E5%85%A8%E5%AF%BE%E5%BF%9C%E3%80%91%EF%BC%BBMac-Windows/dp/479739725X/ref=as_li_ss_il?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&keywords=illustrator+%E3%81%97%E3%81%A3%E3%81%8B%E3%82%8A%E5%85%A5%E9%96%80&qid=1569134859&s=books&sr=1-1&linkCode=li2&tag=llg01-22&linkId=102c9a0001fb5a19c7a6106023a00d94&language=ja_JP" target="_blank"><img border="0" src="//ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=479739725X&Format=_SL160_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=llg01-22&language=ja_JP" ></a><img src="https://ir-jp.amazon-adsystem.com/e/ir?t=llg01-22&language=ja_JP&l=li2&o=9&a=479739725X" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />

<a href="https://amzn.to/30DiVUD">Amazon</a>

タイトル通りIllustlatorの入門書です。ネット上には断片的な情報や動画などはあるのですがとりあえず基本的なところを総ざらいするのであれば
本が一番良いかなと思い購入しました。

自分でアプリ作ったりブログを作ったりしているとロゴ作ったりサムネイル作ったりをIllustlatorでやるので、
もっとちゃんと知れると便利だなということでネットでデザイナーさんが進めているものを購入しました。

先に紹介したRailsの本のように機能が一通り紹介されているので、それとどうように網羅的にツールの機能を把握するのと使うところをつまみ読みする用途で使っています。

#### UI デザイナーのための Sketch 入門＆実践ガイド

<a href="https://www.amazon.co.jp/UI%E3%83%87%E3%82%B6%E3%82%A4%E3%83%8A%E3%83%BC%E3%81%AE%E3%81%9F%E3%82%81%E3%81%AESketch%E5%85%A5%E9%96%80-%E5%AE%9F%E8%B7%B5%E3%82%AC%E3%82%A4%E3%83%89-%E6%94%B9%E8%A8%82%E7%AC%AC2%E7%89%88-%E5%90%89%E7%AB%B9-%E9%81%BC/dp/4802511159/ref=as_li_ss_il?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&keywords=UI+%E3%83%87%E3%82%B6%E3%82%A4%E3%83%8A%E3%83%BC%E3%81%AE%E3%81%9F%E3%82%81%E3%81%AE+Sketch+%E5%85%A5%E9%96%80%EF%BC%86%E5%AE%9F%E8%B7%B5&qid=1569134982&s=books&sr=1-1&linkCode=li2&tag=llg01-22&linkId=b276b77f6637d63d01df3a4f8815640c&language=ja_JP" target="_blank"><img border="0" src="//ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=4802511159&Format=_SL160_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=llg01-22&language=ja_JP" ></a><img src="https://ir-jp.amazon-adsystem.com/e/ir?t=llg01-22&language=ja_JP&l=li2&o=9&a=4802511159" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />

<a href="https://amzn.to/2V9rNQX">Amazon</a>

こちらもIllustlatorの同じ目的で購入した本です。やっぱりSketchは使われているだけでワイヤーフレーム的な複数画面をデザインする時はシンボルなどの機能が
あって便利なので、Illustratorと合わせてこちらの本を購入しました。

### 番外編

#### ブックタワー

<a href="https://www.amazon.co.jp/%E3%83%AB%E3%83%8D%E3%82%BB%E3%82%A4%E3%82%B3%E3%82%A6-%E3%82%BF%E3%83%AF%E3%83%BC%E3%82%B7%E3%82%A7%E3%83%AB%E3%83%95-Shateau-%E3%82%B7%E3%83%A3%E3%83%88%E3%83%BC-SHT-130/dp/B001V9KFQ8/ref=as_li_ss_il?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&keywords=SHT130(A)&qid=1569135066&s=books&sr=8-1&linkCode=li2&tag=llg01-22&linkId=7f0d0b19684eda6131b8adb9450c6015&language=ja_JP" target="_blank"><img border="0" src="//ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B001V9KFQ8&Format=_SL160_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=llg01-22&language=ja_JP" ></a><img src="https://ir-jp.amazon-adsystem.com/e/ir?t=llg01-22&language=ja_JP&l=li2&o=9&a=B001V9KFQ8" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />

<a href="https://amzn.to/2Ve39hV">Amazon</a>

これは番外編ですが、本からちょっと引いて本棚の紹介です。

先にも本は繰り返し読むというようなことをかいておいたのでできるだけ取り出しやすい位置に本を置いておきたいのですが、
そのまま机においておくとどこかちらかった感じになってしまい見栄えがあまりよくないです。

が、このブックタワーだと暇な時にちょっと本をとったり、積み上げたりするのがかなり気軽にできます。

本棚にしまうのも億劫な人にはこちらのブックタワーを使われることおすすめしておきます。

## まとめ

というわけで引っ越しを間近に控えた中で読んでよかった本をリストにまとめてみました。
一部本棚という番外編もまとめてみましたが、気になるものがあったらぜひ購入してみてください。

