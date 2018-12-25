---
templateKey: blog-post
title: Reactでスネークゲームを作ってみた-解説編 環境構築-
slug: /2018/06/29/react-snake-game-2
createdAt: 2018-06-29 08:00:12
updatedAt: 2018-09-02 13:09:21
thumbnail: ./thumbnail.jpg
categories: 
  - engineering
  - react
---

&nbsp;
<h2>目次</h2>
&nbsp;

<a href="https://ver-1-0.net/2018/06/27/react-snake-game/">Reactでスネークゲーム作ってみた。</a>

Reactでスネークゲームを作ってみた-解説編
<ol>
 	<li>環境構築</li>
 	<li>フィールドを作る</li>
 	<li>ヘビを動かす</li>
 	<li>曲がれるようにする</li>
 	<li>壁にぶつかった時の処理</li>
 	<li>えさを表示する</li>
 	<li>えさを食べる処理</li>
 	<li>ステータスを管理する</li>
 	<li>ゲームオーバーの処理を書く</li>
 	<li>スピードを変えられるようにする。</li>
 	<li>最後に</li>
</ol>
&nbsp;
<h2>インストール</h2>
&nbsp;

ひとまず Reactの環境をつくっていきます。

reactの環境構築は手間を省いて、create react appで1コマンドで仕上げます。
(cliをグローバルにインストールする必要があるので2コマンドかも)
<h5>コマンドのインストール</h5>
```
npm install -g create-react-app
```


<h5>アプリの雛形作成</h5>
```bash
create-react-app snake-game
```

オブジェクトの操作などで便利なのでついでに、lodashも入れておきます。

```
yarn add lodash
```

これで環境構築は終了です。
<h2>ディレクトリ構成</h2>
最終的なディレクトリ構成は以下のようになります。

ディレクトリ構成

|--public
|  |--assets
|--src
|  |--components
|  |--styles

cssはsassで書いています。最近ピュアcssに耐えられない体になってきているのでさらっと入れちゃっています。

※cssの解説はあまり詳しく説明しないので、面倒な方はmasterのcssをダウンロードしてつかったり、コピペすると良いと思います。sassをそのまま使いたい方はnode-sassを入れましょう。

```bash
yarn add node-sass
```

&nbsp;
<h2>github pagesについて</h2>
&nbsp;

今回<a href="https://version-1.github.io/react-snake-game/">デモ</a>を公開していますが、github pagesというパッケージを入れるとgithub上での公開がかなり簡単になります。ちょっとしたReactアプリのデモをWebで動かしたいとかだとかなり便利です。

&nbsp;
<h2>まとめ</h2>
&nbsp;

今回は環境構築だけなのであまり面白くありませんがら次回から実際にコードの解説をしていきます。
