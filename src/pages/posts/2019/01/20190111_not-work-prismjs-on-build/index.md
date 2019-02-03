---
templateKey: blog-post
title: Gatsbyビルドでprismjsのsyntax hilightが効かなかった話
slug: /2019/01/11/not-work-prismjs-on-build
createdAt: 2019-01-11 11:12:15
updatedAt: 2019-01-11 11:12:15
thumbnail: /2019/01/20190111_not-work-prismjs-on-build/thumbnail.png
categories:
  - engineering
  - react
tags:
  - dummy
---

最近、当サイトをGatsby+Netlifyでリプレースしたのですが、


[WordpressブログをGatsby+Netlifyでリプレースした話。](http://localhost:8000/2019/01/10/blog-renewal-by-gatsby)

もともとのWordpressから記事を移行しもろもろレイアウト変えたりの実装
を終えていざNetlifyにデプロイしてみたところ、
なぜかPrismjsのSyntaxHilightが聞いていない状態に気づき絶望しました。

原因はpurgecssという使っていないcssをビルド時に取り除いてくれるプラグイン
が原因でした。

わかってみるとなんてことのないものなのですが、手元ではハイライトされているのに、
デプロイするとハイライトが効かないという非常に気持ち悪い挙動だったので
同じように困る人がいないように記事にまとめます。


## Purgecssとは？

https://www.purgecss.com://www.purgecss.com/

Purgecssとは、使っていない不要なCSSを取り除いてくれるライブラリです。
webpackのプラグインとしてかませて、ビルド時にcssを軽くしてくれます。

今回は、gatsbyのプラグインとして利用しており最初からインストールされて
いたので「なんかあるなー」とは思っていましたが、prismjsシンタックスハイライト
が効かない問題が表面化するまでは特に気に止めていませんでした。

https://www.gatsbyjs.org/packages/gatsby-plugin-purgecss/

プラグイン時の設定で開発時でもpurgecssを動かすかどうか決められるのですが、
デフォルトではビルド時しか動かないので、ビルドするまで気づかなかったという
感じです。

## 原因特定の経緯

prismjsがビルド時に効かない問題の事象ときてはdevelop時は普通に動くけどbuild時には動かないという所だったので、
それぞれの条件でどういう所に差異があるのかなとか考えながら色々と見ていると、
gatsby-config内にpurgecssといういかにもcssをいじっているそうな奴がいたので
コメントアウトしてビルドすると見事にシンタックスハイライトが効くようになりました。

原因が判明した後にビルドの出力をみてみると、こんな感じで結果を出力してくれてました。
（purgeしたら75%もサイズが小さくなってますね。）

<image class="post-image" src="https://statics.ver-1-0.net/uploads/2019/01/20190111_not-work-prismjs-on-build/purge-result.png" alt="perge result" />

さらに良く調べてGatsbyのプラグインのページでドキュメントを確認すると、
purgeした結果を出力できるようです。

gatsby-configでprintRejected、printAllをtrueにすると取り除かれたcssを確認できます。

##### gatsby-config.js

```javascript
{ 
  resolve: `gatsby-plugin-purgecss`,
  options: {
    printRejected: true,
    printAll: true
  }
}
```

この設定で再度ビルドすろと、
cssフレームワークとしてmaterializeを入れているのでそこらへんの使用していないセレクタ達がバスバスpurgeされていて、
見事にprismjsもパージされていました。


## Prismjsを取り除かないように設定

原因がわかったのでPrismjsが取り除かれないように設定します。
ignoreオプションが用意されているのでそこにprismjsを加えて完了です。

```diff
{ 
  resolve: `gatsby-plugin-purgecss`,
  options: {
    printRejected: true,
    printAll: true,
+    ignore: ['node_modules/prismjs/']

  }
}
```

## Selectorベースで取り除かないように設定

ライブララリベースだとprismjsがごっそりpurgeされていたのですが、
自分で書いたcssでもいくつか取り除かれてしまっているのがあったので、
whitelistにセレクタのパターンを書いてこちらも取り除かれないようにしました。


```diff
{ 
  resolve: `gatsby-plugin-purgecss`,
  options: {
    printRejected: true,
    printAll: true,
    ignore: ['node_modules/prismjs/'],
    whitelistPatternsChildren: [/^post/, /^sns-buttons/]
  }
}
```

詳しいオプションの設定はこちらで確認いただければと思います。
https://www.gatsbyjs.org/packages/gatsby-plugin-purgecss/


## まとめ

以上、Prismjsがビルドした時に効かなかった話でした。

取り込んでいるプラグインくらい把握しておけという話ではあるので、Gatsby使っているところでの
つまずきぽいんだったのでまとめておきます。

