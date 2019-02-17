---
templateKey: blog-post
title: webpack2からwebpack4バージョンアップで出たエラーとその解決法まとめ
slug: /2019/02/17/migration-to-webpack4
createdAt: 2019-02-17 12:03:41
updatedAt: 2019-02-17 12:03:41
thumbnail: /2019/02/20190217_migration-to-webpack4/thumbnail.png
categories:
  - engineering
tags:
  - frontend
  - webpack
  - javascript
related:
  - dummy
---



今回たまたまvueを使ったプロジェクトでwebpack2からwebpack4からバージョンをあげる機会があったので
webpackをバージョンアップする際に出たエラーとその解決策をまとめてみます。


## webpackをあげてみて


最初に感想を書いておくと作業着手前は、package.jsonのバージョンを書き換えてぺろっと
npm installしていくつかエラー解消したらいけるかなと思っていたんですがそんなに甘くなかったですね。

babel-loaderのバージョンが6系ではwebpack4で使えなかったのでbabel-loaderを勢い余って
v8系にしたらbabelのバージョンも7にしなきゃいけないなってなってwebpack&babelのバージョンアップ
をおこなったのでまあまあな仕事になりました。

他にもfile-loaderやvue-loaderなどのバージョンも4系と合わなかったのでそれらも
ガバッとバージョンアップして見事な芋づる式バージョンアップとなりました。


<div class="adsense"></div>


## 移行にあたってまずやったこと

&nbsp;
バージョンアップにあたっては基本的に先にwebpackのバージョンを4にあげてあとは
ビルドが成功するまでひたすらエラーを解消していくスタイルで計画していたのですが、
まぁそれだと効率の悪さは否めないので先におとなしく公式のドキュメントを参照しました。

ここにwebpack3 -> webpack4の移行手順の説明みたいなものがあります。
https://webpack.js.org/migrate/4/

基本方針としては遭遇したエラーを順番に倒していく方式なのですがここのドキュメントでわかることはあらかじめ潰しておきました。

### modeオプションの付加

webpack4ではモードオプションを設定できて、productionモードでビルドするとデフォルトで
uglifyなどをやってくれるそうです。詳しい設定の仕方や挙動の違いはこちらを参照するのが良いと思います。

https://webpack.js.org/concepts/mode/

モードオプションはwebpack実行時に-mオプションでモードをを指定できたり、こういう感じで
書くことでwebpackのmodeごとに振る舞いをかき分けたりすることができるそうです。

```js
module.exports = (env, argv) => {

  if (argv.mode === 'development') {
    config.devtool = 'source-map';
  }

  if (argv.mode === 'production') {
    //...
  }

  return config;
};

```


### webpack-cliのセットアップ

webpack4からcliがwebpack-cliとして別パッケージにくくり出されたそうなので
webpack-cliもインストールしておきました。

```bash
npm install -D webpack-cli
```

### 不要なプラグインの削除

以下の4つのプラグインはproductionモードのデフォルト

```
* NoEmitOnErrorsPlugin
* ModuleConcatenationPlugin
* DefinePlugin
* UglifyJsPlugn
```

これはdevelopmentモードのデフォルト

```
* NamedModulesPlugin
```


次の二つはdeprecate and removed

```
* NoErrorsPlugin
* NewWatchingPlugin
```

なので、こららのプラグインがプロジェクトのwebpack.config.jsに含まれる場合は
削除します。


## バージョンアップ後に出たエラーとその対策


先に書いたように移行手順を読んで先に潰せるものは潰しておいて、あとは未知のエラー
と戦っていく作業でした。


### Cannot read property 'fileLoader' of undefined


単純にfile-loaderのバージョンが古かったようです。
leafletあたりからエラー吐かれていました。

https://github.com/tcoopman/image-webpack-loader/issues/153

```bash
npm install file-loader@[最新バージョン]
```



### TypeError: Cannot read property ‘stylus’ of undefined


https://github.com/shama/stylus-loader/issues/189
https://github.com/shama/stylus-loader/pull/190/files<Paste>

stylus-loaderのマイナーバージョンが1小さいだけでエラーになっていました。。
これもバージョンアップで回避です。3.0.2にあげたら解消しました。



### dynamic importでパースエラー

ビルドしたところ[dynamic import](https://qiita.com/tonkotsuboy_com/items/f672de5fdd402be6f065)しているところでパースエラーとなっていました。
プロジェクトではこの**preset-stage-2**を使っていて移行のために下記ドキュメントの通り
設定を行なっていたので大丈夫なはずなのですが、それでもだめでした。

https://github.com/babel/babel/blob/master/packages/babel-preset-stage-2/README.md


解決策はここにあって、

https://github.com/webpack/webpack/issues/8656

wepback4.28にダウングレードしたら動いたという書き込みもあるのですが
それは最終手段で他に良い方法があればという感じで読み進めるとwebpackがacorn@^6.05に依存している
ようなのでインストールが必要なようでした。

さらに, webpackがacorn, acorn-dynamic-importに依存しており

```
npm dedupe
```

をしないと
それぞれ同じバージョンのものを参照しないのでエラーとなっているようでした。

https://github.com/webpack/webpack/issues/8656#issuecomment-456010969

とりあえず、

```bash
npm install -D acorn@^6.0.6
npm dedupe
```

したら動くようになりました。


### Cannot read property 'vue' of undefined


https://github.com/vuejs/vue-loader/issues/1177

webpack4系はvue-loader@14.2.2 以上じゃないとだめだそうなのでこちらもバージョンアップ

### Cannot read property 'context' of undefined


今度はcss-loaderをアップデートせよとのこと

https://stackoverflow.com/questions/50418896/webpack-4-css-modules-typeerror-cannot-read-property-context-of-undefined

回答では **^0.28.11**で良いと書いていますが問題なくビルドできればバージョン新しい方がよいので
1系を入れました。


### ビルド時にwarningが噴出

```
No parser and no filepath given, using 'babel' the parser now but this will throw an error in the future. Please specify a parser or a filepath so one can be inferred.
```


ビルド時にこんなwarningが噴出されはじめたので調べるとこんなのが出てきたので

https://github.com/rails/webpacker/issues/1734


vue-loader v15にあげよとのこと。「えっさっき14にあげたばかり」との気持ちはぬぐいきれませんでしたが
しかたなくバージョンアップ。

バージョンアップの手順はこちら

https://vue-loader.vuejs.org/migrating.html#notable-breaking-changes

僕のプロジェクトでは、こうやってプラグインを足すのと

```javascript
// webpack.config.js
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  // ...
  plugins: [
    new VueLoaderPlugin()
  ]
}
```


pugとcssの設定をドキュメントの通りにやったら問題なくビルドできるようになりました。


## まとめ


以上webpack4へのバージョンアップで出たエラーとその解決策を紹介しました。vue-loaderを
v15にあげるるのはさらっと書きましたが普通に二、三時間くらいはまりました。ずっと「pugがパースできない！！！」と
思い込んでいたのですがよくよくみるとstylusが読み込めていなかったというしょうもないミスに気づくのに時間がかかり
だいぶ無駄な時間を消費しました。

バージョンアップさぼっているとさぼっているだけやっぱり大変になりますね。他のライブラリが対応していないとか芋づる式バージョンアップになると
なかなかしんどいです。開発に一生懸命になるとバージョンアップとか環境整備とかがおざなりになって負債になるので、複数人が気付いた時にこまめにバージョンアップ
するっていうようにした方が平和なプロジェクト運営できそうなきがしますね。

では。
