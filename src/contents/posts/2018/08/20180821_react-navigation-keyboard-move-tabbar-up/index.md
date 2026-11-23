---
templateKey: blog-post
language: ja
title: Android React Nativationでキーボードと一緒にタブバーも上がってしまう問題の対策
slug: /2018/08/21/react-navigation-keyboard-move-tabbar-up
createdAt: 2018-08-21 09:16:12
updatedAt: 2018-09-02 13:09:21
thumbnail: /2018/08/20180821_react-navigation-keyboard-move-tabbar-up/thumbnail.png
categories:
  - engineering
  - react
tags:
  - react-navigation
  - react-native
  - react
  - javascript
  - native
related:
  - dummy
---

&nbsp;

ReactNativeで開発をする際ルーティングの為にReactNavigationを使っている方が多いかと思うのですが、

そのReactNavigationのタブバーを何も気にせず使っているとキーボードが出てきたときに（Android限定）タブバーも一緒に押し上げて残念な感じになってしまうというのがあったので、その解決方法を記しておきます。

<div class="adsense"></div>

&nbsp;
<h2>KeyBoardのイベントを検知して、TabBarを非表示にする。</h2>
&nbsp;

解決策としては、KeyBoardが表示されると同時にタブバーを非表示にしてやるだけです。

ただ、TabBarを直接非表示にしたりするAPIは提供されていないので、自前でTabBarをラップした形のコンポーネントを実装してその中で表示・非表示を切り替えます。

以下がWrapperComponentです。
```jsx
import React from 'react'
import { Keyboard } from 'react-native'
import { TabBarBottom } from 'react-navigation'

class TabBarComponent extends React.PureComponent {

  constructor(props) {
    super(props)

     this.state = {
      isVisible: true
    }
    this.keyboardWillShow = this.keyboardWillShow.bind(this)
    this.keyboardWillHide = this.keyboardWillHide.bind(this)
  }

  componentWillMount() {
    this.keyboardEventLisetners = [
    Keyboard.addListener('keyboardDidShow', this.keyboardWillShow)
 Keyboard.addListener('keyboardDidHide', this.keyboardWillHide)
 ]
  }

  componentWillUnmount() {
    this.keyboardEventLisetners.forEach( listener => listener.remove())
  }

  keyboardWillShow = () => {
    this.setState({
      isVisible: false
    })
  }

  keyboardWillHide = () => {
    this.setState({
      isVisible: true
    })
  }

  render() {
    if( !this.state.isVisible ) {
      return
    }
    return
  }
}

export default TabBarComponent

```
&nbsp;

これができたら、TabNavigatorの第二引数で自前のラッパーコンポーネントを指定して完了です。
```jsx
import TabBarComponent from './TabBarComponent.js'

export default TabNavigator({
...
}, {
    initialRouteName: '...',
    tabBarComponent: TabBarComponent,
  })

```
iosではキーボードがタブバーを押し上げるという感じにはならないので、イベントの登録をAndroid限定にしてあげるとより硬い実装にはなるかと思いますが、そちらはお好みでという感じです。

&nbsp;
<h2>まとめ</h2>
&nbsp;

React Nativeはまだまだ発展途上で想定外の動きをしたりOSごとの動作の違いがあったりしてなかなかつらみがありますが、プロジェクトとして動的でなかなか面白いですね。

この記事の問題をネットで調べてみるとAndroidのmanifest.xmlを書き換えれば動くよみたいななのがあったのですが、タブバーのためにアプリ全体の設定を書き換えるのはいかがなものかということでこちらの対策をアップしました。

では。
