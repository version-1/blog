---
templateKey: blog-post
language: ja
title: NAS(ネットワークHDD)を使って"KonMari"してMackbook Proの容量を30GB近くあけた話
slug: /2019/09/09/exec-konmari-with-nas
createdAt: 2019-09-09 15:15:27
updatedAt: 2019-09-09 15:15:27
thumbnail: /2019/09/20190909_exec-konmari-with-nas/thumbnail.png
categories:
  - engineering
tags:
  - work
  - lifehack
---

最近こんな記事を見つけて英語圏ではこんまりは動詞なんだなぁと感慨深かったのですが、(ちょっと古いですがFacebookするみたいな感じですかね)

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">ときめかない社員はレイオフされちゃうのか😭 <a href="https://t.co/Mhiffc4uMG">https://t.co/Mhiffc4uMG</a></p>&mdash; version1 (@version1_2017) <a href="https://twitter.com/version1_2017/status/1170925813283225600?ref_src=twsrc%5Etfw">September 9, 2019</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

そういえば最近NASを使ってMacBookの容量をこんまりしたら随分と快適になったなぁというのがあったのでその話を記事にまとめてみます。

<div class="adsense"></div>

## NASって

IT業界にいても意外とNASという言葉を知らない人も多いのかなぁと思うのですがネットワークHDDのことです。
外付けのHDDはUSBで繋いでデータ通信しますが、それを無線でやるやつです。

NASがあると家のWiFi環境下でデータ通信ができるので、家の中にいればスマートフォンやPCと連携した様々な便利な使い方ができたりします。

<a href="https://www.buffalo.jp/topics/knowledge/detail/nas-life.html">NASってなに | バッファロー - Buffalo</a>


## MacBookProの容量256GBは限界？

今使っているMacBookProの容量は256GBなのですが、すでに対策前の空き容量が10GB程度しかありません。。

残り10GBならまだ意外と使えるかと思いきやXcodeのアップデートに容量が足りないと言われるし、Slack,Docker,Node,Chromeなんかを同時に立ち上げた日にはメモリが、
足りずにスワップファイルをガンガン吐き出して気づいた時には空き容量が2GBしかないなんてことが頻発してました。

やはり256GBでは限界かと思っていた矢先仕事柄データが吹っ飛んだりすると業務にかなり支障が出るのでバックアップをとっておこうと思ってあったNASがあるのを思い出し、
NASを使ってこんまりしてみたところなんと30GB近く削減し、だいぶ余裕をもって作業ができるようになりました。

MacBookを新たに買い換えて512GBのSSDなどにすると20万弱かかってしまうところを新たなNASの購入(あとで紹介しますが1万円程度)だけで済ませられたのでかなり得した気分になりました。

##  NASを使ってMacBookの容量削減

NASとかいう難しい単語が出てくると何やら難しいことをしてそうですが、要は外付けのHDDにPCの重いファイルを追いやったということです。

NASはこちらのバッファローのNASです。

<a href="https://amzn.to/34KN5sg">BUFFALO NAS スマホ/タブレット/PC対応 ネットワークHDD 2TB LS210D0201G</a>

<a href="https://www.amazon.co.jp/gp/product/B07GT1G71N/ref=as_li_ss_il?ie=UTF8&psc=1&linkCode=li2&tag=llg01-22&linkId=9dc419772964ab20174900c9f027a755&language=ja_JP" target="_blank"><img border="0" src="//ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B07GT1G71N&Format=_SL160_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=llg01-22&language=ja_JP" ></a><img src="https://ir-jp.amazon-adsystem.com/e/ir?t=llg01-22&language=ja_JP&l=li2&o=9&a=B07GT1G71N" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />

1万円するのでちょっとためらうかもしれませんが、これ一つ家に置いておけばPCのバックアップやスマホのバックアップなどを
このHDDに保存しておけますし、常に使うわけではない容量の大きいファイルをこちらにうつしておけばlaptopの容量も削減できます。

僕は2TBのものを買いましたが、記事を買いている時にみてみると1TBも2TBも全然値段かわらないみたいです。
バックアップファイルのことを考えると1TBだとちょっと不安なので2TBを購入しました。

### MacBook ProからNASに移動する対象のファイル

今回PCの容量を開ける時にMacbookから移動したファイルは

* スマホのバックアップファイル（10GB弱)
* iTunesの音声ファイル(20GB程度）

です。スマホのバックアップファイルはまぁなるほどという感じだとおもうのですが、
iTunesの音声ファイルが特におすすめです。音声ファイルというとちょっと無機質な感じですが
昔から秘伝のタレのようにつくりあげられた好きなミュージシャンの曲のリストたちです。

音楽って普段聞かないけど、なぜか急に無性に聞きたくなるときとか気分を変えて昔のアルバムかけてみたりとかする時が
ありなかなか消せなかったりします。長年積み上げていくと本当にバカにならないくらいかさばります。

ファイルを移動する前は、**「聞きたい時に毎回HDDから吸い上げて聞くのちょっと怠いな」**と思っていたのですが、
調べてみるとiTunesのミュージックの保存先は自分で設定できるし、PCをNASに接続しておけばNASのディレクトリをマウント（PCのディレクトリのように扱えるようにする）
できるので、**PCを立ち上げてNASの中にある曲を直接聞く**なんてことができます。


### iTunesでNASにある曲を聞くための設定方法

手順としては

1. PCにあるファイルをNASの特定のフォルダに移動
2. iTunesの曲のリストを削除
3. iTunesで音声ファイルの保存先の設定で1.のフォルダを指定
4. iTunesのメニューからライブラリに追加でNASに移したファイルを指定して読み込み


となります。

2.の部分で曲のリストを削除するときは、iTunesのライブラリから削除するのであって**ファイル自体を消すわけではない**ので注意してください。
iTunesから右クリック削除で最初に「本当に消しますか？」と着替えてyes、次に「パソコンからファイルを消しますか？」と聞かれるのでここでNoを選べば
iTunesのライブラリから削除するだけですみます。

またPCとNASの接続方法やマウント方法は各端末のマニュアルにしたがって頂ければと思います。


#### 1. NASの特定のフォルダに移動

こちらはタイトル通り、iTunesのフォルダに保存されているファイルをNASの特定のフォルダに移動します。
サイズがでかい場合は何回かステップを分けて移動すると良いかと思います。

iTunesの音楽ファイルは「Finder > Music > iTunes > iTunes Media > Music」配下にアーティストごと置いてあるので
Music配下のフォルダを階層ごとNASのディレクトリに移動します。



#### 2. iTunesの曲のリストを削除

音声ファイルを再読み込みをするのに一旦iTunesのライブラリから曲を削除します。この時に先に書いたようにファイルごと削除してしまわないように気をつけてください。

当初iTunesの音声ファイルの保存先を移動したらいい感じに読み込んでくれるのかなと思ったのですが、
保存先を変更した後に曲を再生するとファイルが見つかりませんとなってうまく行かなかったので、保存先を変更する前に一度
ファイルをライブラリから削除しておくと良いと思います。


#### 3. iTunesの保存先を変更

iTunesの保存先の変更はiTunesからできます。 「iTunes メニュー > 環境設定 > 詳細 > フォルダの場所「変更...」」から変更できます。


#### 4. NASに移動したファイルの読み込み

「iTunes メニュー > ファイル > ライブラリに追加」からNASに移動したファイルを指定してNASのファイルを読み込みます。





以上、ここまでの手順でiTunesの音声ファイルをNASに移動してPCの容量を空けながら、お気に入りの音楽を聞くことができるようになります。



## まとめ

今回は、iTunesの音声ファイルを移動する方法でのNASの活用方法を紹介しましたが、まだまだNASを活用して容量をあけることがで来そうな気がします。

ストレージは本当に容量を大きくすれば大きくしただけスペースを埋めてしまうので本当に際限ないです。特にストレージがSSDとかになると結構
コストもかかってくるのでHDDとうまく使い分けてコスパよく運用できると良さそうです。

PCの中でもよく使うファイルと時々使うファイルが分かれるので、そこをうまく切り分けて使用頻度の少ないものはNASに移すということができると良さそうですね。

では。
