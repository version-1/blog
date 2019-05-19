---
templateKey: blog-post
language: ja
title: Gatsbyでエイリアスを切って相対パス地獄から抜け出す方法
slug: /2019/03/05/gatsby-webpack-alias
createdAt: 2019-03-07 10:43:44
updatedAt: 2019-03-07 10:43:44
thumbnail: /2019/03/20190305_gatsby-webpack-alias/thumbnail.png
categories:
  - engineering
tags:
  - react
  - frontend
  - webpack
related:
  - dummy
---

Gatsbyでインストールして普通にコード書き始めるとimport文などが相対パスだらけになって「なんだかなぁ」っていう気持ちになりますよね。

相対パスでそのままコードを書いていると、下みたいな「結局どこ？」みたいなパスの書き方になりがちです。

```javascript
import Hoge from '../../../../hoge'
```

ディレクトリの階層構造が浅いうちは救いもあるのですが、徐々にネストが深くなるにつれて闇が深まっていきます。
そんなときにエイリアスを切って、importをスッキリできると嬉しいですよね。

そう、こんな風に

```javascript
import Hoge from 'path/to/hoge'
```

単純に相対パスが理解しづらいというデメリットもあるのですが、エイリアスを切って絶対パスのような形でアクセスするようにしておくと、
ファイルを移動させたり階層構造をかえる場合にいちいちパスを変更しなくて済むので極力絶対パスでimportしていきたいです。

<div class="adsense"></div>


## Webpackを使ってエイリアスを設定

gatsbyはwebpackを使用しているのでwebpackのエイリアスの機能を使うことができます。

https://webpack.js.org/configuration/resolve/#resolvealias

これをGatsbyに設定してあげればエイリアスからのパスでimportができるようになります。

Gatsbyではwebpackの設定を行うためのcallbackが用意されており、onCreateWebpackConfigというコールバックをgatsby-node.jsに書いてあげればwebpackの設定をいじることができます。

https://www.gatsbyjs.org/docs/add-custom-webpack-config/


これをつかってエイリアスを設定するには以下のようにします。

#### gatsby-node.js

```javascript
exports.onCreateWebpackConfig = ({stage, rules, loaders, plugins, actions}) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        config: path.resolve(__dirname, 'config'),
        assets: path.resolve(__dirname, 'src/assets'),
        components: path.resolve(__dirname, 'src/components'),
        lib: path.resolve(__dirname, 'src/lib'),
        pages: path.resolve(__dirname, 'src/pages'),
        templates: path.resolve(__dirname, 'src/templates'),
        locales: path.resolve(__dirname, 'src/locales'),
      },
    },
  });
};
```

これで相対パス地獄から無事抜け出すことができます。

react-nativeではこれやろうとして結構ハマったのですが、webpackが入ってると簡単にきできますね。
上のコード貼るだけで相対パスから脱出できるのでぜひためしてみてください。
