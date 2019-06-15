---
templateKey: blog-post
language: ja
title: Electron の勉強がてら電卓を作ってみた~その① - インストール編 -~
slug: /2017/04/09/electron-calculator-1
createdAt: 2017-04-09 23:01:23
updatedAt: 2018-08-26 12:13:15
thumbnail: /2017/04/20170409_electron-calculator-1/thumbnail.png
categories:
  - engineering
tags:
  - electron
  - nodejs
  - javascript
related:
  - dummy
---

&nbsp;

今回はWebの技術でデスクトップアプリが作れると噂のElectron
に関する記事です。

こんなツールないかなぁと思って、
探すしてダウンロードして使ってみたり
するのですが、
「イマイチイメージと違うな」
ということが常日頃からあり、
自分で作れたらなぁと思い前々から気になっているのが、
このElectronでした。

せっかく紹介するので、少しElectronについて調べてみました。

&nbsp;
<div class="adsense"></div>
&nbsp;
<h2 class="chapter">Electronについて</h2>


開発元:ソースコード管理サービスでおなじみ<a href="https://github.com/">gitHub</a>

Runtime:Node.js , Chronium

これが基本情報。
情報不足感は否めませんが、
Slack,AtomなどもこのElectronで作られていて、
今熱い技術のようです。

&nbsp;

<a href="https://electron.atom.io/">https://electron.atom.io/</a>

これがelectronのサイトです。

<img class="post-image" src="https://statics.ver-1-0.net/uploads/2017/04/20170409_electron-calculator-1/electron-site.png" alt="electron-site.png"/>
引用元: https://electron.atom.io/

はい、英語です。

&nbsp;

何が書かれているかというと、

思ったより簡単。
Webサイトを作るのと同じ要領で、Desktopアプリも作れます。
Electronはそのためのフレームワークで、
JavaScript, HTML, CSSなどで実装できます。
しかもElectronがhard partsをうまいことしてくれるので
開発者はアプリケーション開発に集中できます。

&nbsp;

&nbsp;

と書いてあります。



と、まあ調査はこれくらいにして、
題にもあるようにまずはインストール。
OSはMacです。

手順は難しくなく、
①node.jsのインストール
②electronのインストール
でインストールは完了ですが、
今回は動作確認もHello Wordlまでは行きましょうか。

&nbsp;

&nbsp;
<h2 class="chapter">インストール ( For Mac )</h2>


それでは早速、インストールから、
この手順ではあとあと、
nodeのバージョンを変更できるように、
nvmもインスートールします。

&nbsp;
#### ①nvmインストール
インストール

```bash
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.1/install.sh | bash

```

インストールできたらバージョン確認

```bash
$nvm --version
0.33.1

```
&nbsp;
#### ①Node.jsインストール

先ほどインストールしたnvmでnodeをインストール
<a href="https://nodejs.org/ja/">https://nodejs.org/ja/</a>
このサイトによると、現在の推奨バージョンが6.10.2だそうなので、
それをインストール

```bash
nvm install 6.10.2
```
&nbsp;
#### ②Electronインストール

```bash
npm -g install electron-prebuilt
```
&nbsp;

npm はnode.jsパッケージ管理ツールですので、
それを使ってElelctronをインストールします。
これだけでElectronを起動できるので、

特に自分で作成したプロダクトをパッケージングする必要がないのであれば、
これだけでOK。

ですが、
このあと作ったアプリをパッケージしたいので、
そちらのツールもインストール。
```bash
npm -g install electron-packager
```
&nbsp;

&nbsp;
#### ③HelloWorld!!
インストールも完了したので、
早速動かしてみましょう。

```bash
mkdir sample
npm init -y

```

これをすると下のようなpackage.jsonファイルが出来上がります。
デフォルトだと下記のようにindex.jsが起動時に
実行されるファイルになります。

```json
{
  "name": "sample",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}

```

まだ、index.jsがないので
作成しましょう。

index.jsはコチラを参考に作成
https://electron.atom.io/docs/tutorial/quick-start/

```javascript
const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

let win

function createWindow () {
  win = new BrowserWindow({width: 800, height: 600})


  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  //　とりあえずデベロッパーツールはいらない、メニューからでも起動できるので
  //win.webContents.openDevTools()

  win.on('closed', () => {
    win = null
  })
}

app.on('ready', createWindow)


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})


```
一緒にindex.htmlも作成
```markup
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Hello World!</title>
  </head>
  <body>
    <h1>Hello World!</h1>
    We are using node <script>document.write(process.versions.node)</script>,
    Chrome <script>document.write(process.versions.chrome)</script>,
    and Electron <script>document.write(process.versions.electron)</script>.
  </body>
</html>

```
それでは、起動
```bash
electron .
```
&nbsp;

<img class="post-image" src="https://statics.ver-1-0.net/uploads/2017/04/20170409_electron-calculator-1/electron-helloworld.png" alt="electron hello world"/>

**無事起動できました！！**

無事インストール＆動作確認済んだので次は
実際に電卓を作ります。
