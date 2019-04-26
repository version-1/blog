---
templateKey: blog-post
title: React Navigationでのnavigateをpropsを介さずに行う
slug: /2019/04/27/react-navigation-without-props
createdAt: 2019-04-27 01:29:20
updatedAt: 2019-04-27 01:29:20
thumbnail: /2019/04/20190427_react-navigation-in-store/thumbnail.png
categories:
  - engineering
tags:
  - frontend
  - react
  - react-native
  - react-navigation
---

Rect Nativeでルートを管理するのによくReact Navigationを使うのですが、普通にReact Navigationをインストールすると
画面コンポーネントにバインドされたnavigationインスタンスを使って遷移を行う感じになると思うのですが、 APIの成功・不成功をもとに画面を遷移させたりなどなど画面以外の場所でnavigationさせたい時ってありますよね。

今回はそんな時用のTipsです。参考はこちらです。

[Navigating without the navigation prop](https://reactnavigation.org/docs/en/navigating-without-navigation-prop.html)

<div class="adsense"></div>

## さっそくやってみる

全体の仕組みとしては、topレベルのコンポーネントがnavigateインスタンスへの参照を持っているのでその参照を適当なモジュールに保持して適宜それを呼び出して使うという形です。
[navigation](https://reactnavigation.org/docs/en/app-containers.html)

具体的なコードとしては、以下のような形でrefsを使ってnavigationへの参照が渡せるので、

```jsx
import { createStackNavigator, createAppContainer } from 'react-navigation';
import NavigationService from './NavigationService';

const TopLevelNavigator = createStackNavigator({ /* ... */ })

const AppContainer = createAppContainer(TopLevelNavigator);

export default class App extends React.Component {
  render() {
    return (
      <AppContainer
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    );
  }
}
```

NavigationServiceというその参照を保持するモジュールを用意してAppContainerでその参照をセットするという形です。

実際には、以下のようなモジュールを用意します。

```javascript
// NavigationService.js

import { NavigationActions } from 'react-navigation';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
}

export default {
  navigate,
  setTopLevelNavigator,
};
```

コードをみてわかるようにsetTopLevelNavigatorでnavigateへの参照を保存して、
navigateさせたい時は、`NavigationService.navigate(routeName, params)`で画面遷移させることができる。
という具合です。

下は、サインインが成功したらマイページに遷移させるというコードの例ですね。

```javascript
import NavigationService from './NavigationService'

export const signInAsyncFunciton = async ({ email, password }) => (dispatch) => {
  const acitons = { signIn, signInSuccess, signInError } = actions
  try {
    dispatch(signIn())
    const { data } = await api.fetchHoge({ email, password })
    if (data) {
      // SignIn Success
      dispatch(signInSuccess(data))
      NavigationService.navigate('Mypage')
    }
  } catch (error) {
    dispatch(signInError(error))
  }
}

```

※コードはイメージです。


## まとめ

というわけで、navigationをprops経由しないで行う方法でした。

これを使うと好きなところで画面を操作できるので、自由といえば自由なのですが、あまり乱用するとどこで、
画面を操作してわからなくなるので乱用は禁物ですね。ただログイン後遷移させたい時やリソースを削除した後に、詳細画面から一覧画面に遷移させたい。
などあると思うので使いどころ見極めてできると良いとですね。

では。
