---
templateKey: blog-post
language: ja
title: JSXに&&やif、三項演算子、mapなどの制御構文を書くのをやめる方法 jsx-control-statements
slug: /2019/02/28/about-jsx-control-statements
createdAt: 2019-02-28 14:14:34
updatedAt: 2019-02-28 14:14:34
thumbnail: /2019/02/20190228_about-jsx-control-statements/thumbnail.png
categories:
  - engineering
tags:
  - react
  - frontend
  - javascript
related:
  - dummy
---


突然ですがReactを書いていると**JSX上に&&を書いたりmapを書いたりif書いたりという感じでJavaScriptの構文が出現しますよね。**
コードで書いてみるとこういう感じです。

```jsx
export default class IFStatementsInJSX extends React.Component {
  render () {
    const { isTrue } = this.props
    return (
      <div>
        { isTrue && <SomeComponent/> }
        <div>
          {
            list.map(item => {
              <ListItem item={item} />
            })
          }
        </div>
      </div>
    )
  }
}
```

&&やif文での分岐が一つだったりとかであればいいんですけど、三項演算子使っていたりとかネストしていたりすると
途端に非常に読みづらいコードになります。

なんとかこれを防げないかと考えていたのですが、<a href="https://github.com/AlexGilleran/jsx-control-statements#alternative-solutions">jsx-control-statements</a>という
babelのプラグインを使うと上記のような構文がJSXチックにかけるようなのでそちらを紹介したいと思います。

<div class="adsense"></div>

## jsx-control-statements

リポジトリはこちらです。

<a href="https://github.com/AlexGilleran/jsx-control-statements#alternative-solutions">jsx-control-statements</a>

jsx-control-statementsはbanbelのプラグインなのですが、babelの設定をするだけで以下の形でif文をjsxライクで書くことができます。

```jsx
<If condition={ true }>
  <span>IfBlock</span>
</If>

// mapの代わり
<For each="item" of={ this.props.items }>
  <span key={ item.id }>{ item.title }</span>
</For>
```

babelの設定自体もconfigにpluginの記述を追加するだけです。


```bash
npm install --save-dev babel-plugin-jsx-control-statements
```

```json
{
  ...
  "plugins": ["jsx-control-statements"]
}
```

もし、babel pluginでtransform-react-inline-elementsを使用している場合は、transform-react-inline-elementより前にjsx-contorl-statementsを記載する必要がある点は注意が必要です。

Ifタグ、Forタグ以外にもChooseタグというCase文をかけるようなものもあるのでぜひ試してみると良いと思います。

**Ifタグ、ForタグはBabelでトランスパイルされるのでimportしたりrequireする必要がない**のですが、lintには引っかかる可能性があります。
ただ、jsx-control-statements用のeslint pluginもあるのでそちらを利用すれば問題ないようです。

[eslint-plugin-jsx-control-statements](https://github.com/vkbansal/eslint-plugin-jsx-control-statements<Paste>)


## まとめ

以上、jsx-control-statementsでJSXから制御構文を追い出す方法について書いてみました。

jsxがこのような制御構文を用意してないのはjsxの責務外だからなんですかね？今度時間があるときに調べてみようかと思います。
では。


