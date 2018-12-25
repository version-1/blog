---
templateKey: blog-post
title: \[Node.js\]ビットコインの価格をBitFlyer APIを使ってリアルタイムにDBに保存する。
slug: /2017/04/28/node-js-realtime
createdAt: 2017-04-28 23:16:17
updatedAt: 2018-11-08 18:29:35
thumbnail: ./thumbnail.png
categories: 
  - cryptocurrency-blockchain
  - engineering
---

&nbsp;

&nbsp;

今回は徐々に浸透しつつあるビットコインの（個人的な見解ですが）
価格を取得する方法を紹介します！！
お使いのPCにNode.jsがインストールされていれば
すぐにリアルタイムに価格を取得できます。

&nbsp;
<h2>BitFlyerのAPIを使って価格取得</h2>
価格の取得には<a href="https://bitflyer.jp?bf=rorqosjz" target="_blank" rel="nofollow noopener noreferrer">ビットフライヤー</a>のAPIを利用します。<a href="https://px.a8.net/svt/ejp?a8mat=2TAGV9+1IRYQY+3JJ4+62U35" target="_blank" rel="nofollow noopener noreferrer">
</a>
<img src="https://www12.a8.net/0.gif?a8mat=2TAGV9+1IRYQY+3JJ4+62U35" alt="" width="1" height="1" border="0" />

APIの情報はこちらからみれます。
<a href="https://bitflyer.jp/ja/api">https://bitflyer.jp/ja/api</a>

こちらのAPIでは、<a href="https://www.pubnub.com/">PubNub</a>
というサービスを使って
リアルタイムにAPIを取得してきます。

ベースとなるのは、
<a href="https://lightning.bitflyer.jp/docs?lang=ja#realtime-api">こちら</a>にも
記載されたコードです。

<div class="after-intro"></div>

これで1ティックごとに価格を取得できます。
```javascript
// Node.js のサンプル
var PubNub = require('pubnub');
var pubnub = new PubNub({
    subscribeKey: 'sub-c-52a9ab50-291b-11e5-baaa-0619f8945a4f'
});
pubnub.addListener({
    message: function (message) {
        console.log(message.channel, message.message);
    }
});
pubnub.subscribe({
    channels: ['lightning_ticker_BTC_JPY']
});

```
&nbsp;

&nbsp;

これをindex.js などとして
適当なディレクトリに置いて以下コマンドでpubnubモジュール取得
```bash
npm install pubnub --save-dev

```
&nbsp;
```bash
node index.js

```
で実行。

&nbsp;

&nbsp;
<h2 class="chapter">実行例</h2>
&nbsp;

こう言った感じで、価格を表示し続ける
サーバの完成です。
```bash
$node index.js
lightning_ticker_BTC_JPY { product_code: 'BTC_JPY',
  timestamp: '2017-04-28T14:10:50.8892719Z',
  tick_id: 77957,
  best_bid: 147600,
  best_ask: 147799,
  best_bid_size: 0.53973796,
  best_ask_size: 2.35196282,
  total_bid_depth: 8602.3910664,
  total_ask_depth: 1527.97714433,
  ltp: 147600,
  volume: 11264.84506998,
  volume_by_product: 11264.84506998 }
lightning_ticker_BTC_JPY { product_code: 'BTC_JPY',
  timestamp: '2017-04-28T14:10:51.0298905Z',
  tick_id: 77958,
  best_bid: 147600,
  best_ask: 147799,
  best_bid_size: 0.53973796,
  best_ask_size: 2.35196282,
  total_bid_depth: 8602.4940664,
  total_ask_depth: 1527.97714433,
  ltp: 147600,
  volume: 11264.84506998,
  volume_by_product: 11264.84506998 }
lightning_ticker_BTC_JPY { product_code: 'BTC_JPY',
  timestamp: '2017-04-28T14:10:51.1705529Z',
  tick_id: 77960,
  best_bid: 147600,
  best_ask: 147799,
  best_bid_size: 0.53973796,
  best_ask_size: 2.35196282,
  total_bid_depth: 8619.3160664,
  total_ask_depth: 1527.97714433,
  ltp: 147600,
  volume: 11264.84506998,
  volume_by_product: 11264.84506998 }
lightning_ticker_BTC_JPY { product_code: 'BTC_JPY',
  timestamp: '2017-04-28T14:10:51.3267675Z',
  tick_id: 77961,
  best_bid: 147600,
・
・
・

```
以上です！

<strong>ビットコインってどうやって買えるの？</strong>
という方はこちらの記事
まだ知らない？仮想通貨の買い方　ビットコイン、イーサリアム、ネム、リップルetc…

&nbsp;

<strong>ビットコインを使うとどうなるの？</strong>
という方はこちらの記事
<a href="https://ver-1-0.net/2017/05/21/illustration-merit-bitcoin/">ビットコイン急騰中!! ビットコインのメリットまとめてみた</a>

<strong>ブロックチェーンの仕組みに興味がある</strong>方は
こちらの記事
<a href="https://ver-1-0.net/2017/10/18/how-does-blockchain-really-work-i-built-an-app-to-show-you-translate-ja/">マイニングとは？ブロックチェーンの仕組みを解説する記事”How does blockchain really work? I built an app to show you.”を訳してみた</a>

が参考になるかと思います。
よろしければ覗いて見てください！！
