---
templateKey: blog-post
title: React Nativeでのルート管理ライブラリReact Navigationの使い方を整理。
slug: /2019/01/19/summary-of-react-navigation
createdAt: 2019-01-19 12:56:39
updatedAt: 2019-01-19 12:56:39
thumbnail: /2019/01/20190119_summary-of-react-navigation/thumbnail.png
categories:
  - engineering
  - react
tags:
  - react-native
  - react-navigation
  - react
  - javascript
  - native
related:
  - dummy
---

これまで仕事でReact Navigationを使う機会はあったのですが、
この度再度ReactNavigationをインストールから実際に使うところまでを経験
できたので改めて使い方を整理します。

<div class="adsesne"></div>


## インストール

元はこちら

https://reactnavigation.org/docs/en/getting-started.html

インストールは現状最新版の3系を入れていきます。

まずはadd, expoは使っていないのでreact-native-getsture-handlerも合わせて
インストールします。

```
yarn add react-navigation
yarn add react-native-gesture-handler
react-native link react-native-gesture-handler
```

iOSはこれで終わりですが、Android用には別でMainActivity.java
に必要なコードを足していきます。

```diff
package com.reactnavigation.example;

import com.facebook.react.ReactActivity;
+ import com.facebook.react.ReactActivityDelegate;
+ import com.facebook.react.ReactRootView;
+ import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;

public class MainActivity extends ReactActivity {

  @Override
  protected String getMainComponentName() {
    return "Example";
  }

+  @Override
+  protected ReactActivityDelegate createReactActivityDelegate() {
+    return new ReactActivityDelegate(this, getMainComponentName()) {
+      @Override
+      protected ReactRootView createRootView() {
+       return new RNGestureHandlerEnabledRootView(MainActivity.this);
+      }
+    };
+  }
}
```


これでひとまずはインストール完了です。

## 使い方

React NavigationではcreateStackNavigatorというメソッドで
ルーティングを定義するのが基本の使い方です。

StackNavigatorでルーティングを定義するまえに親玉のコンポーネントをcreateAppContainerを
使って作っていきます。

```javascript
const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

const AppNavigator = createStackNavigator({
  Home: HomeScreen
});
```
&nbsp;

createAppContainerにはcreateStackNavigatorで作成したコンポーネントを渡し、
アプリ起動後最初に呼ばれるAppコンポーネントでは、createAppContainerで作成した
AppContainerのみを返却するようにします。

これでHomeScreenコンポーネントの内容がアプリ起動時に表示されます。


### Stack Navigatorの基本的な使い方


Stack Navigator(Webで言うところのルート定義のようなもの)は、ルート名をキーにしたオブジェクトを
引数に渡すことで定義を行なっていきます。

先ほどのHomeという根本のコンポーネント以外定義していないところに新たなルーティングを足すには、
以下のようにしていきます。

&nbsp;


```diff

const AppNavigator = createStackNavigator({
  Home: HomeScreen,
+  Details: DetailsScreen
});
```
&nbsp;

ここではDetailsScreenというコンポーネントをDetailsというルーティングとして追加しています。
例ではルーティングの書き方として一番簡易的なものですが、より詳細に定義したい場合はルーティングの
バリュー部分をオブジェクトで以下のように渡してあげるとより細かな設定が可能です。

&nbsp;

```javascript
const AppNavigator = createStackNavigator({
  Home: HomeScreen,
  Details: {
    screen: DetailsScreen,
    naviagtionOptions: {
    	title: '詳細'
    }
  }
});
```
&nbsp;

screenキーでルーティングで使用するコンポーネントを指定して、navigationOptionsでタイトルなどの細かな指定をすることができます。
navigationOptionsの細かい設定はこちらに書いてあります。

https://reactnavigation.org/docs/en/stack-navigator.html#navigationoptions-for-screens-inside-of-the-navigator


createStackNavigatorは第二引数でStackNavigatorのオプションを渡すことができます。
第二引数では、遷移時のスクリーンをモーダルで出すのかや、ヘッダーのタイプ、遷移時のコールバックを定義できます。

### 画面の移動

遷移を行うには、StackNavigatorで指定されたコンポーネント（さきほどのHomeScreenやDetailScreen)は自動的にnavigationという
stateがバインドされるので、それを使って画面遷移を行なっていきます。

先ほどの例のDetailsに遷移したい場合の構文は以下です。
&nbsp;

```javascript
this.props.navigation.navigate('Details')
```
&nbsp;

propsで渡されたnavigationのnavigateメソッドにルーティングのキーを渡して画面を遷移させます。

&nbsp;

```jsx
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button } from 'react-native-elements';

export default class Home extends React.Component {
  render() {
    return (
      <View>
      	<Button
      	title="Got to Details"
      	onPress={() => this.props.navigation.navigate('Details')}
      	/>
      </View>
    );
  }
}
```

&nbsp;
React Navigationで特に考えずに画面を遷移するとデフォルトでヘッダに戻るボタンが付いてきますが、
意識的に画面を前の画面に戻したい場合は、

```
this.props.navigation.goBack()
```
&nbsp;

goBackには引数を渡さずに実行すると今のルートを消して前の画面にもどるのですが、
引数としてRouteを渡すと特定のRouteの一個前の画面に戻れるようで、

スクリーンA
スクリーンB
スクリーンC
スクリーンD ← 現在地

というスクリーンがすでにスタックされており、今Dの画面を開いているが、Aに戻りたいという場合は
goBack('スクリーンB')とするとD, C, Bをポップ（スタックから取り除いて）AのRouteにたどり着けるようです。

またはこの例だとStackの一番先頭のスタックに戻れれば良いのでpopToTopというAPIを使うという代替手段もあるようです。

navigation propsには画面を遷移させたり、パラメータを渡したりするAPIを備えているので詳細な使い方は
こちらを参照すると良いと思います。

https://reactnavigation.org/docs/en/navigation-prop.html



### 遷移時のパラメータの受け渡し

Webのルーティングではurlに乗せて、リソースのIDなどを画面間で受け渡しできますがReact Navigationではparamsを通して受け渡しを行います。
遷移時のパラメータはnavigateメソッドの第二引数で定義ができ、
&nbsp;

```javascript
this.props.navigation.navigate('Details', { id: 1234 })
```

&nbsp;

このようにDetails画面にidというパラメータを引き渡すことができます。
実際にこのパラメータを受け取る場合はgetParamを使います。

&nbsp;

```javascript
const id = this.props.navigation.getParam('id')
```

&nbsp;

遷移時のパラメータはnavigatio.stateに保持されているので直接アクセスすれば
値を取得することもできるのですが、パラメータが全く設定されていない場合にnull落ちするので
getParamを利用してパラメータを取得することが推奨されています。

```javascript

# OK
const id = this.props.navigation.getParam('id')

# NG paramsが設定されていない場合にnull落ちする
const id = this.props.navigation.state.params.id
```

### ヘッダーのカスタマイズ

先にも少し書きましたが、createStackNavigatiorのオプションでヘッダーのカスタマイズを行うことができます。
React Navigationはデフォルトで戻るボタンをヘッダにつけてくれたりしますが、そもそもいらないという時や
戻る部分の文言やアイコンを変えたいという場合にはnavigationOptionsを使ってヘッダの要素をカスタマイズできます。

https://reactnavigation.org/docs/en/stack-navigator.html#navigationoptions-for-screens-inside-of-the-navigator


### タブバー

![React Navigation Sample](https://statics.ver-1-0.net/uploads/2019/01/20190119_summary-of-react-navigation/react-navigation-sample.gif)


アプリなどだとこのgifのようなタブバーを設置することがあると思うのですが、それもReactNavigationを使って実現可能です。

タブバーを使う場合はcreateBottomTabNavigatorを使用して以下のように書くことができます。

&nbsp;


```javascript
const HomeStack = createStackNavigator(
  {
    Home,
    Details,
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      tabBarIcon: <Icon name="home" />,
    },
  }
);

const MypageStack = createStackNavigator(
  {
    Mypage,
    Details,
  },
  {
    initialRouteName: 'Mypage',
    navigationOptions: {
      tabBarIcon: <Icon name="person" />,
    },
  }
);


const postLoginNavigator = createBottomTabNavigator({
  Home: HomeStack,
  Mypage: MypageStack,
});
```

&nbsp;

createBottomTabNavigatorを使用しているのはコードの一番下部分なのですが、
あらかじめStackNavigatorでそれぞれのTabでのルーティングを定義しておいてそれぞれを
createBottomTabNavigatorに渡してタブを実現しています。

タブにはアイコンを設置するのが一般的かとは思いますが、アイコンはnavigationOptionsで
設定をしています。


さらに例のGifでは、ログイン前と後でタブを出しわけしているのでログイン画面のルーティングを
付け足したStackNavigatorを追加しています。

&nbsp;

```javascript

const postLoginNavigator = createBottomTabNavigator({
  Home: HomeStack,
  Mypage: MypageStack,
});

+ const AppNavigator = createStackNavigator({
+   Login,
+   PostLogin: postLoginNavigator
+ },{
+   mode: 'modal',
+   headerMode: 'none',
+   initialRouteName: 'Login'
+ })
```

&nbsp;

ここではheaderModeやmodeオプションを付与していますが、headerModeをnoneにしないと
ログインした後の画面でヘッダーが二つになって（StackNavigatorがネストしているので）しまうので
ヘッダは出さないようにしています。またログイン時にしたから浮き出るようなアニメーションになっているのも
modeがmodal指定になっているからでStackNavigatorではこれらの制御も行うことができます。

以下App.jsの部分だけですが、Gifに使ったコードを載せておきます。

&nbsp;

```javascript
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator,
} from 'react-navigation';
import { Icon } from 'react-native-elements';
import DetailsScreen from './src/screens/DetailsScreen';
import HomeScreen from './src/screens/HomeScreen';
import MypageScreen from './src/screens/MypageScreen';
import LoginScreen from './src/screens/LoginScreen';

const Home = {
  screen: HomeScreen,
  navigationOptions: ({ navigation }) => {
    return {
      title: 'ホーム',
    };
  },
};

const Details = {
  screen: DetailsScreen,
  navigationOptions: ({ navigation }) => {
    return {
      title: '詳細',
    };
  },
};

const Mypage = {
  screen: MypageScreen,
  navigationOptions: ({ navigation }) => {
    return {
      title: 'マイページ',
    };
  },
};

const Login = {
  screen: LoginScreen,
  navigationOptions: ({ navigation }) => {
    return {
      title: 'ログイン',
    };
  },
}

const HomeStack = createStackNavigator(
  {
    Home,
    Details,
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      tabBarIcon: <Icon name="home" />,
    },
  }
);

const MypageStack = createStackNavigator(
  {
    Mypage,
    Details,
  },
  {
    initialRouteName: 'Mypage',
    navigationOptions: {
      tabBarIcon: <Icon name="person" />,
    },
  }
);


const postLoginNavigator = createBottomTabNavigator({
  Home: HomeStack,
  Mypage: MypageStack,
});

const AppNavigator = createStackNavigator({
  Login,
  PostLogin: postLoginNavigator
},{
  mode: 'modal',
  headerMode: 'none',
  initialRouteName: 'Login'
})

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return (
        <AppContainer />
    );
  }
}
```




## まとめ


Stack Navigatorの基本的な挙動についてざっくりまとめてみました。
naviagteの時の細かい挙動などまとめきれていないところは結構ありそうですが、
適宜追記するか、別の記事などで紹介できれば良いかなと思っています。

英語のリファレンス読むのも慣れてきたのですが、まだまだ日本語リソースの方が吸収効率がよいので
かんたんでも日本語のドキュメントあるとありがたいです。

英語力上げてこういう差がなくなればいいんですけど単純に結構コストかかりそうなので、
RN界隈も日本語ソース増えるとよいですね。

では。
