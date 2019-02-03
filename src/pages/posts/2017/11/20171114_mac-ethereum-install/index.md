---
templateKey: blog-post
title: Macにイーサリアムをインスールして、送金してみる（テストネットワーク）
slug: /2017/11/14/mac-ethereum-install
createdAt: 2017-11-14 08:00:21
updatedAt: 2018-08-26 11:20:41
thumbnail: /2017/11/20171114_mac-ethereum-install/thumbnail.png
categories:
  - cryptocurrency-blockchain
  - engineering
tags:
  - dummy
related:
  - dummy
---

&nbsp;

&nbsp;

イーサリアムでのアプリケーション開発を
入りの部分だけ勉強したのでまとめます。

また、
タイトルに送金とあるので、
<strong>「え、お金使うの？？」</strong>と不安になってしまう部分がある
かと思いますが、
安心してください、この記事では、
テストネットワークと言う自分しか存在しないチェーン上
での作業になるので、
実際にお金を動かしたりすることはありません。

<div class="adsense"></div>

それでは、
まずはイーサリアムって何という人へ

&nbsp;

&nbsp;
<h2 class="chapter">Ethereum - イーサリアム - とは</h2>
&nbsp;

ビットコインと同じような中央の管理組織を持たない仮想通貨で、
<strong>時価総額は3兆3913億円（2017年11月13日時点）</strong>にものぼり
ビットコインの次に時価総額の大きな通貨となっています。

ビットコインとは違いイーサリアムブロックチェーン上にコントラクトを
保存できると言うことです。
コントラクトは<strong>Solidity</strong>と言うjavascriptライクな言語で記述することができ、
<strong>アプリケーションをブロックチェーン上に登録することが可能です。</strong>

そのコントラクトの実行には、
手数料が発生し、それらがイーサリアムのマイナーの
収入になります。

イーサリアムブロックチェーン上には、
すでに複数の分散型のアプリケーションが構築されており、
それらはこちらのサイトに公開されてあります。
<a href="https://www.stateofthedapps.com/">State of the ÐApps — 821 Projects Built on Ethereum</a>

ちなみに、
<strong>中央の管理組織を持たないことを生かしたソーシャルメディアである</strong>
<a href="https://akasha.world/">Akasha</a>
や
<strong>音楽業界の著作権管理と印税の支払いを自動化するプラットフォームである</strong>
<a href="https://ujomusic.com/">Ujomusic</a>
などのプロジェクトが紹介されています。

&nbsp;

ブロックチェーンの仕組みがいまいちと言う方は、
こちらの記事が参考になると思います。
https://ver-1-0.net/2017/10/18/how-does-blockchain-really-work-i-built-an-app-to-show-you-translate-ja/

&nbsp;

&nbsp;
<h2 class="chapter">Etheriumクライアントをインストール</h2>
&nbsp;

それでは早速Ethereumに接続する
クライアントツールが必要なので
インストールをしていきます。

クライアントツールもいくつか種類はあるのですが、
今回は一番よく使われているであろう、
<strong>go-ethereum</strong>を利用します。

通称gethです。
<strong>読み方はそのままゲスで大丈夫です。</strong>
躊躇せず読んじゃってください。

Macにインストールする場合のコマンドは
こちらになります。

&nbsp;
```bash
brew tap ethereum/ethereum
brew install ethereum

```
&nbsp;

エラーがなくインストールできていれば完了です。
インストールできるているかは下記のように
確認しましょう。

&nbsp;
```bash
$geth version
Geth
Version: 1.7.2-stable
Git Commit: 1db4ecdc0b9e828ff65777fb466fc7c1d04e0de9
Architecture: amd64
Protocol Versions: [63 62]
Network Id: 1
Go Version: go1.9.2
Operating System: darwin
GOPATH=
GOROOT=/usr/local/Cellar/go/1.9.2/libexec

```
&nbsp;

&nbsp;
<h2 class="chapter">Gethを起動してテストネットワークに接続する</h2>
&nbsp;

今回接続するのはローカルプライベートテストネットなので、
冒頭で説明したように、
お金の心配だったり他の方に迷惑をかける恐れは
ないので、そのまま安心してお進みください。

&nbsp;
<h3>データディレクトリを作成</h3>
送受信したブロックのデータやアカウント情報を格納するための、
ディレクトリを作成します。
```bash
mkdir my-first-eth
```
&nbsp;
<h3>Genesisファイルを作成</h3>
&nbsp;

Genesisファイルは、
ブロックチェーンの一番最初のブロックチェーンの
情報をかいた設定ファイルのようなものです。
ローカルプライベートテストネットを利用する場合は、
ゼロからブロックチェーンを構築するため、
このファイルが必要となります。

&nbsp;

myGenesis.json
```json
{
"nonce": "0x0000000000000042",
"mixhash": "0x0000000000000000000000000000000000000000000000000000000000000000",
"difficulty": "0x400",
"alloc": {},
"coinbase": "0x3333333333333333333333333333333333333333",
"timestamp": "0x0",
"parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
"extraData": "0x",
"gasLimit": "0x8000000",
"config": {}
}

```
&nbsp;
<h3>Gethの初期化</h3>
作成したGenesisファイルで初期化をします。
```bash
geth --datadir /your/env/path/my-first-eth init /your/env/path/myGenesis.json
```
&nbsp;
<h3>Gethの起動</h3>
起動のコマンドはこちらになります。
```bash
geth --networkid 10 --nodiscover --maxpeers 0 --datadir /your/env/path/my-first-eth console 2>> geth.log
```
&nbsp;

それぞれのオプションを説明すると

<b>--networkid</b>
ネットワーク識別子。0 ~ 3 は予約済みですので、
指定する際は他の値を指定します。

<b>--nodiscover</b>
起動したノードを他のノードから検出できないようにします。

<b>--maxpeers</b>
起動したノードに接続できるノードの数です。0を指定すると、
他のノードとは接続しなくなります。

<b>console</b>
対話型のJavaScriptコンソールを呼び出します。

問題なければ対話型のコンソールが表示され、
プロンプトが現れます。

ここまででgethの起動は完了です。


<div class="mid-article"></div>

<h2 class="chapter">アカウントの作成</h2>

イーサリアムを送金する必要があるので、
アカウントを作成する必要があり、
作成するユーザーのことはEOA ( Externally Owned Account)と
呼ばれます。

コマンドは以下になります。
引数の文字列はパスワードになるので、
忘れないようにしましょう。
```go
personal.newAccount("password")
```
&nbsp;

送金を行うには、
送り手と受け手が必要ですので、
もう一つアカウントを作成します。
```go
personal.newAccount("drowssap")
```

アカウントを作成した際に表示された文字列は、
作成したアカウントのアドレスになります。
送金を行う際はこのアドレスを利用して、送金を行うことになります。

作成したアカウントを確認します。
```go
> personal.newAccount("password")
"0x73c935b7ade47b3a3efa29769e4db1cc91aa2e88"
>
>
>
> personal.newAccount("drowssap")
"0x0c792c39d206ae2d2a0df7b7db7d365c3067a137"
>
>
> eth.accounts
["0x73c935b7ade47b3a3efa29769e4db1cc91aa2e88", "0x0c792c39d206ae2d2a0df7b7db7d365c3067a137"]
```

&nbsp;
<h2 class="chapter">残高の確認・マイニング</h2>
下記のコマンドで残高を確認できますが、
まだマイニングを行なっていないため残高は0となっています。
```go
< eth.getBalance(eth.accounts[0])
0
```
&nbsp;

ブロックチェーンのブロック数も0になっています。
```go
< eth.blockNumber
0

```
&nbsp;

この状態では、
まだローカルのブロックチェーン上に一つのブロックも生成されて
いない状態なので、
マイニングでブロックを生成していきます。
```go
< miner.start(1)
null

```

しばらくするとブロックが生成されてきます。
```go
<  miner.stop()
true

```

そして残高を確認してみると
```go
< eth.getBalance(eth.accounts[0])
195000000000000000000
> web3.fromWei(eth.getBalance(eth.accounts[0]),"ether")
195

```
195ETHが最初に作成したアカウントに
入金されています。
これでマイニング成功です。
※もちろん、これはテスト環境でのみ使える通貨で金銭的な価値はありません。

ここまで準備ができたので最後は送金を行います。

&nbsp;
<h2 class="chapter">送金</h2>

はじめにアカウントの残高を確認します。
```go
> eth.getBalance(eth.accounts[0])
195000000000000000000
>
>
> eth.getBalance(eth.accounts[1])
0
>

```

残高を確認すると、
account1には195ETH、
account2には0ETHであることがわかります。

また、送金を行うには
<strong>アカウントのロック解除が必要</strong>ですので、
コマンドでロックを解除します。
```go
personal.unlockAccount(eth.accoutns[0],'password',0)
```

それでは、
account1からaccount2に100ETHを送ってみます。
```go
> eth.sendTransaction({from: eth.accounts[0], to: eth.accounts[1], value: web3.toWei(100,"ether") })
"0xd404f7d67c0df7c8388db84efe9f1523f6134b18b5b615121ee236281e5db9d8"
>
>
>
> eth,getTransaction("0xd404f7d67c0df7c8388db84efe9f1523f6134b18b5b615121ee236281e5db9d8")
ReferenceError: 'getTransaction' is not defined
    at <anonymous>:1:5

> eth.getTransaction("0xd404f7d67c0df7c8388db84efe9f1523f6134b18b5b615121ee236281e5db9d8")
{
  blockHash: "0x0000000000000000000000000000000000000000000000000000000000000000",
  blockNumber: null,
  from: "0x73c935b7ade47b3a3efa29769e4db1cc91aa2e88",
  gas: 90000,
  gasPrice: 18000000000,
  hash: "0xd404f7d67c0df7c8388db84efe9f1523f6134b18b5b615121ee236281e5db9d8",
  input: "0x",
  nonce: 0,
  r: "0xc69cac899af8c2e914f3dda00379bd9c6df4478e465d96e5521042b0f6ce1120",
  s: "0x677930addcbeb8299e0ff52a1e7fe79cd4db2b10714b3706faf08b8aa2e84b9e",
  to: "0x0c792c39d206ae2d2a0df7b7db7d365c3067a137",
  transactionIndex: 0,
  v: "0x1b",
  value: 100000000000000000000
}
>
```
&nbsp;

これで送金は完了しました。

が、
残高を確認してみると
残高が移動していないように見えます。
```go
> eth.getBalance(eth.accounts[0])
195000000000000000000
>
>
>
> eth.accounts[1]
"0x0c792c39d206ae2d2a0df7b7db7d365c3067a137"
> eth.getBalance(eth.accounts[1])
0
>
```
&nbsp;

これは、
送金をしたあとに<strong>マイニングで取引が</strong><strong>承認されていないためです。</strong>
再度マイニングを行い、
残高を確認してみると100ETHがaccount2の残高に
反映されていることが確認できます。
```go
> miner.start(1)
null
>
> miner.stop()
true
>
>
> eth.getBalance(eth.accounts[1])
100000000000000000000
> web3.fromWei(eth.getBalance(eth.accounts[1]),'ether')
100
>
```
&nbsp;

これでイーサリアムの送金はできました！

以上です！！
<div class="cstmreba">
<div class="booklink-box">
<div class="booklink-image"><a href="http://www.amazon.co.jp/exec/obidos/asin/4798151343/llg01-22/" target="_blank" rel="nofollow noopener"><img style="border: none;" src="https://images-fe.ssl-images-amazon.com/images/I/51ZDMhsrXWL._SL320_.jpg" /></a></div>
<div class="booklink-info">
<div class="booklink-name">

<a href="http://www.amazon.co.jp/exec/obidos/asin/4798151343/llg01-22/" target="_blank" rel="nofollow noopener">はじめてのブロックチェーン・アプリケーション Ethereumによるスマートコントラクト開発入門 (DEV Engineer's Books)</a>
<div class="booklink-powered-date">posted with <a href="https://yomereba.com" target="_blank" rel="nofollow noopener">ヨメレバ</a></div>
</div>
<div class="booklink-detail">渡辺 篤,松本 雄太,西村 祥一,清水 俊也 翔泳社 2017-08-03</div>
<div class="booklink-link2">
<div class="shoplinkamazon"><a href="http://www.amazon.co.jp/exec/obidos/asin/4798151343/llg01-22/" target="_blank" rel="nofollow noopener">Amazonで購入</a></div>
<div class="shoplinkkindle"><a href="http://www.amazon.co.jp/exec/obidos/ASIN/B07416W2PY/llg01-22/" target="_blank" rel="nofollow noopener">Kindleで購入</a></div>
<div class="shoplinkrakuten"><a href="https://hb.afl.rakuten.co.jp/hgc/163854b7.d97e8d5b.163854b8.3c41ae34/?pc=http%3A%2F%2Fbooks.rakuten.co.jp%2Frb%2F15008160%2F%3Fscid%3Daf_ich_link_urltxt%26m%3Dhttp%3A%2F%2Fm.rakuten.co.jp%2Fev%2Fbook%2F" target="_blank" rel="nofollow noopener">楽天ブックスで購入</a></div>
<div class="shoplinkseven"><a href="https://px.a8.net/svt/ejp?a8mat=2TXHHI+FDP7OQ+2N1Y+BW8O2&amp;a8ejpredirect=http%3A%2F%2F7af-ent.omni7.jp%2Frelay%2Faffiliate%2FentranceProcess.do%3Furl%3Dhttp%253A%252F%252F7net.omni7.jp%252Fsearch%252F%253FsearchKeywordFlg%253D1%2526keyword%253D4-79-815134-2%252520%25257C%2525204-798-15134-2%252520%25257C%2525204-7981-5134-2%252520%25257C%2525204-79815-134-2%252520%25257C%2525204-798151-34-2%252520%25257C%2525204-7981513-4-2" target="_blank" rel="nofollow noopener">7netで購入</a><img src="https://www17.a8.net/0.gif?a8mat=2TXHHI+FDP7OQ+2N1Y+BW8O2" alt="" width="1" height="1" border="0" /></div>
</div>
</div>
<div class="booklink-footer"></div>
</div>
</div>

<div class="adsense"></div>
