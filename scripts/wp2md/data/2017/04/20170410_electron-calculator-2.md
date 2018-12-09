---
templateKey: blog-post
title: Electron の勉強がてら電卓を作ってみた~その② - 実装編- ~
slug: 2017/04/10/electron-calculator-2
description: &nbsp;

<a href="https://ver-1-0.net/2017/04/09/electron-calculator-1/">前回</a>
の記事では、
Electronのインストールまでやりました。


今回は実際にElectronで電卓を作って行きます。
今回肝となるのは、
<strong>IPC通信</strong>というものです。

&nbsp;

&nbsp;

Webの世界だと、
Httpを使って、サーバとクライアント間で通信を行うのですが、
ElectronはこのIPC通信というものでデータのやりとりを
行うようです。

&
createdAt: 2017-04-10 01:27:49
updatedAt: 2018-08-26 12:10:42
thumbnail: http://ver-1-0.net/wp-content/uploads/2017/03/スクリーンショット-2017-03-23-13.10.10.png
categories: 
  - engineering
---

&nbsp;

<a href="https://ver-1-0.net/2017/04/09/electron-calculator-1/">前回</a>
の記事では、
Electronのインストールまでやりました。


今回は実際にElectronで電卓を作って行きます。
今回肝となるのは、
<strong>IPC通信</strong>というものです。

&nbsp;

&nbsp;

Webの世界だと、
Httpを使って、サーバとクライアント間で通信を行うのですが、
ElectronはこのIPC通信というものでデータのやりとりを
行うようです。

&nbsp;

&nbsp;

なんか難しいことを
言っている気がするのですが、
百聞は一件にしかずで
実際にコードをみてみましょう。
[after_intro]
&nbsp;
&nbsp;
<h2 class="chapter">計算機の完成系</h2>


画面はこんな感じ
<a href="http://ver-1-0.net/wp-content/uploads/2017/04/スクリーンショット-2017-04-10-1.26.51.png"><img class="alignnone size-medium wp-image-311" src="http://ver-1-0.net/wp-content/uploads/2017/04/スクリーンショット-2017-04-10-1.26.51-257x300.png" alt="電卓" width="257" height="300" /></a>

&nbsp;

&nbsp;

<h2 class="chapter">それでは実装</h2>

今回のディレクトリ構成は以下の通り
<a href="http://ver-1-0.net/wp-content/uploads/2017/04/スクリーンショット-2017-04-10-0.24.25.png"><img class="alignnone size-medium wp-image-293" src="http://ver-1-0.net/wp-content/uploads/2017/04/スクリーンショット-2017-04-10-0.24.25-298x300.png" alt="ディレクトリ構成" width="298" height="300" /></a>
※今回はjqueryも使用しています。

&nbsp;

&nbsp;

起動ポイントであるmain.jsがメインプロセス、
app以下のファイルがそれぞれレンダラプロセスや画面表示の変更を行います。

&nbsp;

&nbsp;

まず、main.js
<pre><code class="language-javascript">'use strict';

var electron = require('electron');
var app = electron.app;
var BrowserWindow = electron.BrowserWindow;

var mainWindow = null;
var calc = require('./app/calculate.js');


app.on('window-all-closed', function() {
    if (process.platform != 'darwin')
    app.quit();
});

app.on('ready', function() {

    // bootChronium
    mainWindow = new BrowserWindow({width: 250, height: 310});
    mainWindow.setResizable(false);
    mainWindow.loadURL('file://' + __dirname + '/public/index.html');
    // mainWindow.openDevTools();
    mainWindow.on('closed', function() {
        mainWindow = null;
    });
});

const {ipcMain} = require('electron');


// IPC通信のレンダラープロセスからのリクエストに対してレスポンスを返す。
ipcMain.on('push-num-button', (event, arg) =&gt; {
    console.log(arg);
    if (arg.operand === 'ac' || arg.operand === 'reverse' ){
        //ACや +/- が押された場合
        arg.result = calc[arg.operand]();
    }else{
        if ( arg.operand === 'append'  ){
            // 数字が押された場合
            if ( !calc.is_append){
                calc.is_append = true;
                calc.sum = 0;
            }
            arg.result = calc.append(arg.input);
        }else if (arg.input == '.') {
            // 小数点が押された場合
            arg.result = calc.point();
        }else{
            // 数字以外が押された場合
            // (AllClear や +/- 以外)
            if ( Number(calc.sum) != 0
                 &amp;&amp; Number(calc.reserve) != 0
                 &amp;&amp; calc.operand != 'reverse'  ){
                //計算を実行
                calc[calc.operand](calc.sum);
            }

            arg.result = calc.sum;      //電卓のディスプレイに表示
            calc.operand = arg.operand; //演算子を保存
            calc.reserve = calc.sum;    //これまでの計算結果を保持
            if (calc.operand != 'equal' ){
                calc.reset();
            }

        }
    }
    console.log(calc);
    event.returnValue = arg;
});
</code></pre>
&nbsp;

&nbsp;

そして、こちらがメインプロセスにリクエストを送る
function.js
<pre><code class="language-javascript">'use strict';
var $ = require('jquery');
const {ipcRenderer} = require('electron')

//electron によりhtmlが描画されてから実行
$(document).ready(function(){
  $("button").on('click',function(){

    var num = $(this).html();
    var result = $('#result').val();
    var operand = $(this).attr('class').split(' ')[0];
    operand = operand === 'num' ? 'append' : operand;
    pushNumButton(num , result,operand);
  });

});

function pushNumButton(input , result ,operand ) {
  // json形式でリクエストを送信
  var data = { input: input , result: result , operand: operand};
  var response = ipcRenderer.sendSync('push-num-button', data);
  // レスポンス結果を元にディスプレイに変更。
  $('#result').val(response.result);
}
</code></pre>
&nbsp;

&nbsp;

&nbsp;

説明すると、
function.jsに
ボタンが押された時にイベントが発生すると
<strong>pushNumButton</strong>というfunctionが呼ばれます。

&nbsp;

そして、その<strong>pushNumButton</strong>がメインプロセスに
<strong>'push-num-button'</strong>というイベントを発生させ、
メインプロセス(<strong>main.js</strong>)の対応する関数が
そのリクエストに対してレスポンスを返すというような構造になっています。

処理の順番としては、
<pre>画面でボタンが押される(<strong>index.html</strong>)
-&gt; function.jsに書かれたclickイベントが発火しメインプロセスにリクエストを送る。
-&gt; main.jsに書かれたプログラムが<strong>'push-num-button'</strong>イベントをキャッチし、
そのリクエストに対してレスポンスを返す。</pre>
もっと具体的にすると。
<pre>1のボタンが押される
-&gt; 1という数字が押されたことをメインプロセスに送信
-&gt; メインプロセスに保持されたデータに1を加え、電卓に表示すべき数字を返す。
</pre>
というような流れになります。

この基本的な流れを抑えたらあとは、
試行錯誤を繰り返し電卓を作るのみです。
（丸投げw）

ソースはここに置いたので、
もしよければ試してみてください。
<a href="https://github.com/version-1/calculator">https://github.com/version-1/calculator</a>

cloneしてきて、
<pre><code class="language-bash">cd calculator
electron src
</code></pre>
で起動できます。
