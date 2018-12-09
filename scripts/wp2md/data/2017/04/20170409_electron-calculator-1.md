---
templateKey: blog-post
title: Electron の勉強がてら電卓を作ってみた~その① - インストール編 -~
slug: 2017/04/09/electron-calculator-1
description: &nbsp;

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
[after_intro]
&nbsp;
<h2 class="chapter">Electronについて</h2>


開発元:ソー
createdAt: 2017-04-09 23:01:23
updatedAt: 2018-08-26 12:13:15
thumbnail: http://ver-1-0.net/wp-content/uploads/2017/03/スクリーンショット-2017-03-23-13.10.10.png
categories: 
  - engineering
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
[after_intro]
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

<a href="http://ver-1-0.net/wp-content/uploads/2017/03/スクリーンショット-2017-03-23-13.17.07.png"><img class="alignnone size-large wp-image-273" src="http://ver-1-0.net/wp-content/uploads/2017/03/スクリーンショット-2017-03-23-13.17.07-1024x401.png" alt="" width="700" height="274" /></a>
引用元:https://electron.atom.io/

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
<h5>①nvmインストール</h5>
インストール
<pre><code class="language-bash">curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.1/install.sh | bash
</code></pre>
インストールできたらバージョン確認
<pre><code class="language-bash">$nvm --version
0.33.1
</code></pre>
&nbsp;
<h5>①Node.jsインストール</h5>
先ほどインストールしたnvmでnodeをインストール
<a href="https://nodejs.org/ja/">https://nodejs.org/ja/</a>
このサイトによると、現在の推奨バージョンが6.10.2だそうなので、
それをインストール
<pre><code class="language-bash">nvm install 6.10.2</code></pre>
&nbsp;
<h5>②Electronインストール</h5>
<pre><code class="language-bash">npm -g install electron-prebuilt</code></pre>
&nbsp;

npm はnode.jsパッケージ管理ツールですので、
それを使ってElelctronをインストールします。
これだけでElectronを起動できるので、

特に自分で作成したプロダクトをパッケージングする必要がないのであれば、
これだけでOK。

ですが、
このあと作ったアプリをパッケージしたいので、
そちらのツールもインストール。
<pre><code class="language-bash">npm -g install electron-packager</code></pre>
&nbsp;

&nbsp;
<h5>③HelloWorld!!</h5>
インストールも完了したので、
早速動かしてみましょう。
<pre><code class="language-bash">mkdir sample
npm init -y 
</code></pre>
これをすると下のようなpackage.jsonファイルが出来上がります。
デフォルトだと下記のようにindex.jsが起動時に
実行されるファイルになります。
<pre><code class="language-json">{
  "name": "sample",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" &amp;&amp; exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
</code></pre>
まだ、index.jsがないので
作成しましょう。

index.jsはコチラを参考に作成
https://electron.atom.io/docs/tutorial/quick-start/
<pre><code class="language-javascript">const {app, BrowserWindow} = require('electron')
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

  win.on('closed', () =&gt; {
    win = null
  })
}

app.on('ready', createWindow)


app.on('window-all-closed', () =&gt; {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () =&gt; {
  if (win === null) {
    createWindow()
  }
})

</code></pre>
一緒にindex.htmlも作成
<pre><code class="language-markup">&lt;!DOCTYPE html&gt;
&lt;html&gt;
  &lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;Hello World!&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;h1&gt;Hello World!&lt;/h1&gt;
    We are using node &lt;script&gt;document.write(process.versions.node)&lt;/script&gt;,
    Chrome &lt;script&gt;document.write(process.versions.chrome)&lt;/script&gt;,
    and Electron &lt;script&gt;document.write(process.versions.electron)&lt;/script&gt;.
  &lt;/body&gt;
&lt;/html&gt;
</code></pre>
それでは、起動
<pre><code class="bash">electron . </code></pre>
<a href="http://ver-1-0.net/wp-content/uploads/2017/04/スクリーンショット-2017-04-09-22.56.09.png"><img class="alignnone size-medium wp-image-283" src="http://ver-1-0.net/wp-content/uploads/2017/04/スクリーンショット-2017-04-09-22.56.09-300x225.png" alt="Electron sample" width="300" height="225" /></a>
<h3>無事起動できました！！</h3>
無事インストール＆動作確認済んだので次は
実際に電卓を作ります。
