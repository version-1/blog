---
templateKey: blog-post
title: NodeJS + PhatomJSでブログの全ページのスクショを取得する。（Sitemapから）
slug: /2017/10/29/node-phantom-take-scsho
createdAt: 2017-10-29 00:59:52
updatedAt: 2018-08-26 11:31:29
thumbnail: ./thumbnail.jpg
categories: 
  - engineering
---

<strong>2017年10月29日追記</strong>

このスクリプトを動かすとPVとしてカウントされてしまうことが
判明しました汗
見事にその時間のPVが跳ね上がり直帰率100%。。。
（IPでフィルタかけてるので大丈夫だと思ったのですが、なぜかダメでした。。）

もし、このスクリプトを動かす場合は十分に気をつけて
開発環境のサイトに対して実行したり（アクセスURLのドメインをローカルホストに置換したり）、
使用してください。

<hr>

どうも、
最近コツコツブログの記事を増やしてきているのですが、
一年弱でだいたい80ページくらいのブログになって来ました。

年内100記事が目標なので、
それを目指して着々と更新を続けていく予定です。
（本当はもっとペースあげたい・・）

と、
そんなところでコツコツと記事を
変えていると途中でCSSを変更したくなってくる時が
まあまああります。

変更するのは良いのですが、
それが全記事にどれくらい影響するかって中々確認しづらいですよね。

そんな時に全ページのキャプチャを取って来て
確認できたら楽だなぁと考えて。
<strong>自動でスクショを取ってくるスクリプトを作ろう！！</strong>
ということになりました。

&nbsp;

<div class="after-intro"></div>

&nbsp;
<h2 class="chapter">処理の流れの説明 - sitemapperとphantomjsを使う -</h2>
&nbsp;

早速手順ですが、
NodeJSと自動化テスト界隈で話題に上るPhantomJSを組み合わせて
作って行きます。

処理の流れとしては、
<ol>
 	<li>sitemapを解析して、ブログの全URLを取得。</li>
 	<li>取得したURL一つ一つに対してPhatomJSを使ってJSを取得していく。</li>
</ol>
&nbsp;

で、
1.のsitemapの解析は、
<a href="https://github.com/hawaiianchimp/sitemapper">sitemappter</a>というモジュールを使用し、

また2のPhantomJSでスクショをとる部分
は<a href="https://github.com/Medium/phantomjs">phantomjs</a>というモジュールを使用します。

これ、ふざけているのではなくNodeJS+PhantomJSの
モジュールはいくつかあるのでこういう説明にしています。。

とりあえず簡単に環境だけ作ってしまいましょう。

&nbsp;

&nbsp;

まずはディレクトリの作成
```bash
mkdir wp-scshots
cd wp-scshots
mkdir output # スクショの出力先

```
&nbsp;

&nbsp;

次に必要なモジュールをnpmでインストール
```bash
npm -y init
npm install --save sitemapper phantomjs

```
&nbsp;

ここまでのPackage.jsonを残しておきます。
```json
{
  "name": "wp-scshots",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" &amp;&amp; exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "phantomjs": "^2.1.7",
    "sitemapper": "^2.1.13"
  }
}

```

&nbsp;

<div class="mid-article"></div>

&nbsp;

<h2 class="chapter">実装</h2>
&nbsp;

&nbsp;

前のセクションで、モジュールのインストールはできたので、
実際に実装を行なっていきます。

まずは、
sitemapからURLを取得する部分

index.js
```javascript
var sitemap = new Sitemapper();
sitemap.fetch('https://ver-1-0.net/sitemap.xml').then(function(sites) {
    sites.sites.forEach(function(val,index,ar){
        console.log(val);
    });
}

```
これだけで、
sitemapに書かれたURLが全て取得できてしまいます。

&nbsp;

&nbsp;

次は、
実際にスクリーンショットを撮る部分ですが
この記事のやり方だと直接phantomjsコマンドを
別プロセスで発行する方法になります。

ので、
スクリーンショットを撮る部分を関数にすると
以下のようになります。
上の方の部分はただの変数・定数定義になるのですが実際にphantomjsで
スクショを撮る部分は中盤あたりあるscreenshotメソッドです。

あらかじめ決めた定数と引数で与えられたURLを
元にコマンドを作成して実行する形になります。

&nbsp;

index.js
```javascript
const Sitemapper = require('sitemapper');
const OUTPUT_FOLDER = './output'; // 保存先のフォルダー
const VIEWPORT_W = '1024'; // viewportの横幅(幅：単位px)
const VIEWPORT_H = '768'; // viewportの高さ(幅：単位px)
const PHANTOM_JS_FILE = 'render.js'; // PhantomJSのパス

const childProcess = require('child_process');
const phantomjs = require('phantomjs');
const binPath = phantomjs.path;


function screenshot(url,index){
    const outputFilePath = `${OUTPUT_FOLDER}/version1_${index}.png`;
    const options = [
        PHANTOM_JS_FILE,
        url,
        outputFilePath,
        VIEWPORT_W,
        VIEWPORT_H
    ];
    const cmd = binPath + ' ' + options.join(' ')
    console.log(childProcess.execSync(cmd).toString());
}


var sitemap = new Sitemapper();
sitemap.fetch('https://ver-1-0.net/sitemap.xml').then(function(sites) {
    sites.sites.forEach(function(val,index,ar){
        console.log(val);
    });
}

```
screenshotメソッドで実行されるコマンドは
```bash
phantomjs [phantomjsを実行するjsファイル] [URL] [出力ファイル名] [VIEWPORTの幅] [VIEWPORTの高さ]
```
になります。
[phantomjsを実行するjsファイル]は

render.js
```javascript
const page = require('webpage').create();
const system = require('system');

// 引数は、system.argsでアクセスできる。
const address = system.args[1];
const output = system.args[2];
const VIEWPORT_W = system.args[3];
const VIEWPORT_H = system.args[4];

page.viewportSize = {
  width: VIEWPORT_W,
  height: VIEWPORT_H,
};
page.open(address, function () {
    window.setTimeout(function () {
        page.render(output);
        phantom.exit();
    }, 200);
});

```
になります。
コマンド引数をphantomjsのオプションに渡して実行する形ですね。

ここまでで来たらあとは、
取得したURLごとにscreenshotメソッドを実行するだけなので、
最初に追加したsitemapを出力しているループの部分に
screenshotメソッドを入れ込んで完成です。

index.js（最終盤）
```javascript
const Sitemapper = require('sitemapper');
const OUTPUT_FOLDER = './output'; // 保存先のフォルダー
const VIEWPORT_W = '1024'; // viewportの横幅(幅：単位px)
const VIEWPORT_H = '768'; // viewportの高さ(幅：単位px)
const PHANTOM_JS_FILE = 'render.js'; // PhantomJSのパス

const childProcess = require('child_process');
const phantomjs = require('phantomjs');
const binPath = phantomjs.path;


function screenshot(url,index){
    const outputFilePath = `${OUTPUT_FOLDER}/version1_${index}.png`;
    const options = [
        PHANTOM_JS_FILE,
        url,
        outputFilePath,
        VIEWPORT_W,
        VIEWPORT_H
    ];
    const cmd = binPath + ' ' + options.join(' ')
    console.log(childProcess.execSync(cmd).toString());
}


var sitemap = new Sitemapper();
sitemap.fetch('https://ver-1-0.net/sitemap.xml').then(function(sites) {
    sites.sites.forEach(function(val,index,ar){
        console.log(`processing ..${val}`);
        screenshot(val,index);
    });
});

```
実行するには
```javascript
node index.js
```
です。

&nbsp;

&nbsp;
<h2 class="chapter">まとめ</h2>
&nbsp;

&nbsp;

はい、一通り説明しましたが、
早速私は自分のサイトで試したところうまくいってそうでした。
私の環境では、
約80ページのスクショを撮るのに10分ほどかかりました。

まあ今の記事数くらいであれば許容範囲という感じでしょうか。
これでイチイチサイトのページを開いてレイアウトの崩れとかをチェックする
必要がなくなりそうです。

今回は、
コマンド実行を同期実行にしましたが、
実行するプロセスを複数にしたりすればもう少し早くできたり
するかもしれませんね。
（最初は全部非同期で試したのですが、プロセスが上がりすぎてかなり重くなりました。。）

また、
phantomjsを子プロセスで動かすというのが
どうもしっくり来ないので、
もう少し良い実装の仕方があるのではとも思います。

とりあえず、目的は達成されたのでよしとします。
以上です！

[after_article]
