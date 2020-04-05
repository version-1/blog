---
templateKey: blog-post
language: ja
title: ElectronでReact+TypeScript+ES6開発環境を整えてみた
slug: /2019/07/14/electron-react-ts-es6
createdAt: 2019-07-14 16:28:08
updatedAt: 2020-02-19 02:24:08
thumbnail: /2019/07/20190714_electron-react-ts-es6/thumbnail.png
categories:
  - engineering
tags:
  - react
  - webpack
  - typescript
  - electron

---


久しぶりの投稿です。ここのところ色々と変化が起きそうな予感しておりその対応で
こちらを更新できずにいるのですが、できればこちらも定期的に更新できれば良いかなと思っております。

ここのところ個人の開発でelectronを触るのでそこらへんを書こうと思います。
すっごい昔にデスクトップでもアプリ作れたら楽しいよねというのりでちょっとElectronを触ってみてはいたのですが、
electronはその時以来になります。


<div class="related-post">
<ul>
  <li><a href="/2017/04/09/electron-calculator-1" >Electron の勉強がてら電卓を作ってみた~その① - インストール編 -~</a></li>
  <li><a href="/2017/04/10/electron-calculator-2" >Electron の勉強がてら電卓を作ってみた~その② - 実装編- ~</a></li>
</ul>
</div>

今みるとこの記事2017年とかに書いてるんですね。二年前とかなのでそこまで昔ではないのかもしれませんが、個人的にはこの間に
正社員からフリーランスへの転身を経て生活スタイルがだいぶ変わったので、すっごい昔に感じます。

この頃はReactも触っていなかったので生jsで書いていたと思うのですが、今回久しぶりにelectronで何かアプリ作ろうかなと触ってみたら
当然のごとくReact入れたいね。ってなりました。

React入れるとTypeScript入れたいねってなって、create-react-appと少々の設定でTypeScriptを入れてみたりしました。
ここまではなんのこともないのですが、だんだんとメインプロセス周りがimport文でかけないことが気になってきます。

アプリが小さいうちは、メインプロセスが古い書き方担っているのに目をつむることもできるのですが、electronのAPIを使ってwindowをいじったり、
もろもろをしているとだんだんとコード量も増えてきて辛くなってきます。さらには、レンダラープロセスとメインプロセスで共通の定数を使わないといけない
となるとexport.modulesとか古い書き方で書いてあげないと共通で使えないなどの問題が出てきます。

そこで今回は、React + TypeScript + ES6 で動かすElectron用テンプレートリポジトリみたいなものを作りました。

[version-1/electron-react-ts-es6](https://github.com/version-1/electron-react-ts-es6)


jestなどは入れていないですが、普段プロジェクトで慣れているReact + TypeScript + ES6(慣れている人はですが）で気軽にElectronを始めることができます。

<div class="adsense"></div>

## メインプロセスとレンダラープロセス

Electronを深く知らない方は、**メインプロセス**と**レンダラープロセス**というのが何かわからないと思うのですが、
アプリケーションに対して一つだけ存在するプロセスでElectronを起動した時に最初に起動するのがメインプロセスです。

対して、ウィンドウごとに立ち上がるプロセスはレンダラープロセスと呼ばれ、こちらはアプリケーションに対して複数存在するプロセスです。

メインプロセスはその名のごとく、**readyイベント**や**all-window-close**イベントなどを拾ってコールバックを実行したり、新しいウィンドウ（レンダラープロセス）を作成したり、
特定のウィンドウに対して操作を行うなど各レンダラープロセスを取り仕切ることができます。

### メインプロセスのコード例(エントリーポイント)

下記は先ほど紹介したリポジトリのエントリーポイントですが、アプリの起動するタイミングでBrowserWindowのインスタンスを生成し（レンダラープロセスを起動）、全てのウィンドウが閉じられたらアプリ自体を終了する。
というような処理を書いています。

より複雑なアプリを作るとレンダラープロセスでの入力を受けて新しいウィンドウを作るといった処理も必要になるので、
メニューを変更したり、ウィンドウを閉じたりメインプロセスでしかできない処理はこちらに書くことになります。

```javascript
import { app, BrowserWindow } from 'electron'

const onReady = async () => {
  let win: BrowserWindow | null
  win = new BrowserWindow();
  win.loadURL('http://localhost:8080');

  // ChromiumのDevツールを開く
  win.webContents.openDevTools();

  win.on('closed', function() {
    win = null;
  });

}
app.once('ready', onReady)
app.on('window-all-closed', () => { app.quit() })
```

### レンダラープロセスのコード例(エントリーポイント)

一方ElectronのレンダラープロセスはほぼWebサービスのフロント画面と考えてもらえればよく、Web開発のノウハウのほとんどがそのままこちらに転用でき、Reactもレンダラープロセス上で動きます。

```javascript
import React from 'react'
import styled from 'styled-components'
import { GlobalStyle } from 'styles/Index'

const Container = styled.div`
  max-width: 200px;
  height: 100%;
  width: 100%;
  margin: auto;
  display: flex;
  align-items: center;
}
`

const Title = styled.h2`
  text-align: center;
`

const Description = styled.p`
  text-align: center;
`

function App() {
  return (
    <Container>
      <GlobalStyle />
      <div>
        <Title>Hello World!!</Title>
        <Description>This is a sample of ES6 + TypeScript + React for Electron.</Description>
      </div>
    </Container>
  )
}

export default App

```

こちらを見てわかるようにwebでReactを動かすのとほとんど変わりなくコードを書いていくことができます。Reduxを入れたければ、webと同じようにRedux入れれば良いし、Hooksで書きたければHooks
で書くも良しということでここではWeb開発のノウハウがそのまま使えます。

### IPC通信

ここまでで、なんとなくメインプロセスとレンダラープロセスの違いはわかってきたかと思うのですが、実際に開発を行なっていると当然のごとくこのメインプロセスとレンダラプロセスの通信（状態の同期）が
必要になってきます。Electronの場合これを**IPC通信**という方法で実現しているのですが、基本的にメインプロセス側でリスナーを登録して待ち構えて、レンダラープロセスで任意のタイミングでリスナーに対して
リクエストを送るという形になります。

[公式](https://electronjs.org/docs/api/ipc-main#sending-messages)から例を借りてくると

#### メインプロセス

```javascript
const { ipcMain } = require('electron')
ipcMain.on('asynchronous-message', (event, arg) => {
  console.log(arg) // prints "ping"
  event.reply('asynchronous-reply', 'pong')
})

```

#### レンダラプロセス

```javascript
const { ipcRenderer } = require('electron')

ipcRenderer.send('asynchronous-message', 'ping')
ipcRenderer.on('asynchronous-reply', (event, arg) => {
  console.log(arg) // prints "pong"
})

```

のように、メインプロセスで**"asynchronous-message"**というリスナーを登録して、任意のタイミングでレンダラープロセスからリクエストを送る形になります。

というわけでここまでで、ざっくりまとめると、メインプロセスはアプリの親プロセスとしてレンダラープロセスをまとめて、親子の通信はIPC通信という方法を使って
データの同期(通信）を行うというところまで説明できたかと思います。


ここまでだと完全にElectronのアーキテクチャの話になってしまって脇道にそれているのですが、本題に話を戻すと、それなりに複雑なアプリケーションを作るとなると
「レンダラープロセスを取り仕切るメインプロセスのコードって大きくなるよね」そこがrequireとかで書かれていてレンダラープロセスとかと違う下記書き方で実装するとなると
**「レンダラーとメインで共通で使う定数とか共有できなくて辛いよね。」**というのをわかってほしくてここまで長々とメインプロセスとレンダラープロセスについて説明してきました。

ということで、今回はこの問題を解決するべくメインプロセスもレンダラープロセスもES6(特にimport)でかけるテンプレートを作ってみました。

## メインプロセスをES6構文でかけるようにWebpackを設定

前振りが長くなりましたが、ここからはElectronをどうやってES6化して書くかということにフォーカスして説明していきます。

まずはじめに**レンダラープロセス**の方はimport文かけるようにしたり、reactのインストール、TypeScriptのインストールとかは本当に簡単です。

先ほど書いたようにレンダラープロセスはweb開発のノウハウをほぼそのまま引き継げるのでcreate-react-appとかして、Google先生で検索した上位の記事の
見よう見まねでものの数分でES6 + React + TypeScriptの環境を構築することができます。

しかし、肝心の**メインプロセス**の方は、そういった記事も少なく、自らwebpackの世界に乗り出し設定を行いES6の構文を使えるようにしていかなければなりません。
(react-scriptとかレンダラープロセス書く分にはとても便利なのですが、ブラックボックス化されていて設定しんどそうなのでejectしました。）

結果完成したのが先ほども載せたこちらのリポジトリです。

[version-1/electron-react-ts-es6](https://github.com/version-1/electron-react-ts-es6)


Electron + React + TS + ES6(メインプロセスも含め)　の構成で何かアプリ作りたいのであれば割と始めやすいリポジトリになっているかと思います。
JavaScriptのプロジェクトであればだいたい使うであろうlodashやmomentあたりのユーティリティライブラリも入れておきました。(styled-componentも個人的な趣味ですが入れてます)

webpackの設定の肝の部分は**メインプロセスとレンダラープロセスのjsを別々に吐き出す**ことです。

あらかじめメインプロセスのコードはsrc/main配下にまとめておいて、レンダラープロセスのコードはsrc/renderer配下にまとめておきます。
その状態でwebpackを設定すると下記のような設定になります。

```javascript

module.exports = (env = {}) => {
  return [
    {
      name: 'main',
      ...defaultConf(env),
      entry: path.resolve(__dirname, '../src/main'),
      output: {
        path: path.resolve(__dirname, '../public'),
        filename: 'main.js'
      },
      target: 'electron-main'
    },
    {
      // for renderer
      name: 'renderer',
      ...defaultConf(env),
      entry: path.resolve(__dirname, '../src/renderer'),
      output: {
        path: path.resolve(__dirname, '../public'),
        filename: 'renderer.js'
      },
      target: 'web',
    }
  ]
}
```

この設定だとレンダラープロセスのコードはpublic/renderer.js、メインプロセスのコードはpublic/main.jsとして吐き出されます。
Electronではこのようにレンダラープロセスとメインプロセスのコードを別々にバンドルすることでES6化することができます。

また、レンダラープロセス側はwebpack-dev-serverで配信する形にすると開発の時も便利です。
リポジトリでは、http://loalhost:8080 からコードを配信して、開発中にコードを変更したらホットリロードができる構成にしています。

こちらがこのリポジトリで開発する時のコマンドになるのですが（package.jsonのscripts)

```json
"scripts": {
  "start": "yarn build:main && electron .",
  "start:inspect": "yarn build:main && electron --inspect=5858 .",
  "start:inspect-brk": "yarn build:main && electron --inspect-brk=5858 .",
  "develop": "webpack-dev-server --host 0.0.0.0 --hot --config config/webpack.config.js --config-name renderer",
  "build:main": "webpack --config config/webpack.config.js --config-name main"
},
```

自身がElectronの開発を行う際には、`yarn develop`でレンダラープロセスのサーバ(webpack-dev-server)を立ち上げ、
それと並行して別ウィンドウで`yarn start`(見てわかるように一旦ビルドしてビルドされたファイルをもとにelectronを起動しています。)としてメインプロセスを立ち上げています。

この開発環境はレンダラープロセスに限っては、コードをちょっと直しただけで自動でwebpack-dev-serverがホットリロードで再読み込みしてくれるのですが、
メインプロセス側のコードはコードを修正したら`yarn start`で再度サーバを立ち上げ直す必要があります。

理想をいうとメインプロセス側についてもホットリロードできると良いですが一旦ここまででレポジトリをあげておきます。
(ホットリロードしたい方はnodemonなどを使って頂ければ実現できるかと思います）


## まとめ


というわけで、メインプロセスもレンダラープロセスもES6のシンタックスかつTypeScriptで開発が行えるように環境を整えた話を書きました。

javascriptは割と好きなのですが、こういった環境設定が多少面倒くさいですね。。ES6とかこだわらなければそこまで設定もいらないかもしれないのですが、DXというか
開発をしている時の気持ち良さ（というよりストレスレスであることが大事そう）ってやっぱりコードを書く時のモチベーションとかに影響するのでついついこだわってしまいますね。

最近個人でElectronのアプリをつくっていて、自分で作ったアプリがデスクトップで動くのは新鮮で楽しいのですが、ElectronはWebみたいに決まった設計の形みたいなのがなく逐一考えながら
実装していかないといけないので、なかなか大変ですね。メインプロセスをWebでいうサーバサイド（というか一APIとして）作っていくのが良さそうなのですが、同じプラットフォームで動くので
モデルを共有できるとかもなるので、設計考えるのが大変です。（どこかにベストプラクティスがあれば知りたい・・）

ただ、JSは今回のように一旦環境を揃えられるとあとは快適にコードを書いていけることが多いので、環境構築めんどくさいという方はこのリポジトリを参考にしたりフォークしたりしながら使って頂ければと思います。

では。
