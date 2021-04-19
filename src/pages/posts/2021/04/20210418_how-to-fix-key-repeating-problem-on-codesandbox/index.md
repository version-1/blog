---
templateKey: blog-post
language: ja
title: CodeSandboxでキーリピーティングができない問題の対処法
slug: /2021/04/18/how-to-fix-key-repeating-problem-on-codesandbox
createdAt: 2021-04-18 21:16:53
updatedAt: 2021-04-18 21:16:53
thumbnail: /2021/04/20210418_how-to-fix-key-repeating-problem-on-codesandbox/thumbnail.png
categories:
  - engineering
tags:
  - lifehack
  - tool
  - codesandbox
---

普段、フロントエンドのコードを書くのにCodeSandboxを使っていますが、ちょっとした問題があったので、この記事ではその解決方法をご紹介します。

## 問題: CodeSandboxのVimキーバインドでキーリピートが効かない

私は普段コードを書くときにvimを使っているので、ご多分にもれず、CodeSandboxでもvimのキーバインドを使っています。

Vimのキーバインドを設定すると、キーリピーティングが効かなくなり、`j`キーを押してもカーソルが下に移動せず、キーを連打しないと移動しなくなってしまい、非常に困っていました。

## 解決策

ターミナルで下記コマンドを実行してください。

```bash
defaults write -g ApplePressAndHoldEnabled -bool false
```

現在のCodeSandboxはVSCodeの設定を継承しているようで、VSCodeでVim Keybindingを使いたい場合、ターミナルでMacの設定を変更する必要があるのですが、CodeSandboxではターミナルを使う条件が限定されているようで、それができません。

VSCodeの設定は[こちら](https://marketplace.visualstudio.com/items?itemName=vscodevim.vim)に書いてあります。

Macには、キーを押したときの動作をアプリケーションごとに設定する仕組みがあるようですが、キーリピートを有効にするには、この設定`ApplePressAndHoldEnabled`を無効にする必要があります。

VSCodeでは、ローカルターミナルでコマンドを実行することで、この設定を無効にすることができるのですが、CodeSandboxでは同じことができなかったので、一度、グローバル設定の`ApplePressAndHoldEnabled`をオフにしています。
（反映にはコンピュータの再起動が必要です。）

何か問題があれば元に戻せばいいので、ワークアラウンドとしてグローバル設定をオフにしました。

```bash
defaults write -g ApplePressAndHoldEnabled -bool true
```

Chromeを対象に範囲を限定して設定してみてもうまくいかなかったので、過不足なく動くようにするにはう少し追加の設定が必要なのかと思います。

いざとなれば戻せるのであまり問題にならないと思っていますが、グローバルな設定を変更することになりますので、注意して使用していただければと思います。
