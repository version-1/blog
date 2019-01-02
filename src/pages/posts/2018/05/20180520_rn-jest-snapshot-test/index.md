---
templateKey: blog-post
title: ReactNative+Jestでスナップショットテスト
slug: /2018/05/20/rn-jest-snapshot-test
createdAt: 2018-05-20 22:27:28
updatedAt: 2018-11-08 18:34:01
thumbnail: /2018/05/20180520_rn-jest-snapshot-test/thumbnail.png
categories:
  - engineering
  - react
---

&nbsp;

今回はFacebookが提供している<a href="https://jestjs.io">Jest</a>をReactNativeに導入して、スナップショットテストを実施していきます。

スナップショットテストでは、最初のテスト実行時に実行結果がスナップショットとして出力され、以降のテストではその出力と実行結果に相違がないことを確認していきます。

スナップショットテストはReactとの相性がよくレンダーされたDOMのスナップショットをリポジトリにコミットしておくことで、それ以降の変更でDOMのレンダリングに変更がないことを確認することができます。

WebのE2Eテストなどと目標は近いですが、E2Eテストではいちいち各エレメントが存在することやHTMLの属性などをチェックするのが非常にたいへんなので、単純なレンダリングを確認する手段としてはこちらのスナップショットテストが向いてそうです。

&nbsp;

<div class="after-intro"></div>

&nbsp;
<h2>Jestを導入</h2>
&nbsp;

テストのためのReactNativeプロジェクトを作成します。
```
react-native init SnapShotSample
```
&nbsp;

ReactNativeは標準でJestが搭載されているので特にpackage.jsonあたりを書き換える必要はありません。
```json
{
  "name": "SnapShotSample",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "start": "node node_modules/react-native/local-cli/cli.js start",
    "test": "jest"
  },
  "dependencies": {
    "react": "16.3.1",
    "react-native": "0.55.4"
  },
  "devDependencies": {
    "babel-jest": "22.4.4",
    "babel-preset-react-native": "4.0.0",
    "jest": "22.4.4",
    "react-test-renderer": "16.3.1"
  },
  "jest": {
    "preset": "react-native"
  }
}

```
&nbsp;
<h2>Jestのサンプルのテスト実行</h2>
&nbsp;

そもそもJest使うの初めてという方もいると思うので、Getting Startの例を使って簡単なテストを実行します。

最初はテスト用のディレクトリを用意します。
プロジェクトディレクトリ直下に__test__というディレクトリを用意してそこにテストファイルを配置します。jestは__test__という名前のディレクトリ以下のファイル、あるいは*.test.js,*.spec.jsというファイルを探してテストを実行します。

&nbsp;
```bash
mkdir __test__
```
&nbsp;

次に、テスト用のコードとして以下のものを用意します。

&nbsp;
```javascript
export const sum = (a, b) => {
  return a + b;
}

```
&nbsp;

テスト対象のコードは簡単な足し算のコードです。これをテストするコードは、__test__/sum.test.jsとします。

&nbsp;
```javascript
import {sum} from '../src/sum';

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```
&nbsp;

テストの実行は以下のように

&nbsp;
```bash
yarn test
```
&nbsp;

で実行します。

&nbsp;
```bash
$yarn test
yarn run v1.3.2
$ jest
 PASS  __test__/sum.test.js
  ✓ adds 1 + 2 to equal 3 (4ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 to
tal
Snapshots:   0 total
Time:        0.425s, estimated 1s
Ran all test suites.
```
&nbsp;
<h2>テスト用のコンポーネント</h2>
&nbsp;

ここでは説明上スナップショットテストを行う簡単なコンポーネントを用意します。
コンポーネントはなんでも良いのですが、一旦ボタン用コンポーネントを用意しました。

&nbsp;

<img class="post-image" src="https://statics.ver-1-0.net/uploads/2018/05/20180520_rn-jest-snapshot-test/ReactNativeButton.gif" alt="ReactNativeButton.gif"/>

&nbsp;

コードは下のようなものです。

&nbsp;
```jsx
import React, {Component} from 'react'
import {View, Text, Alert, TouchableWithoutFeedback, StyleSheet} from 'react-native'

export default class extends Component {

  constructor(props){
    super(props)
    this.state = {
      pushed: false
    }
  }

  render() {
    const {title, disabled} = this.props
    const {pushed} = this.state
    return (
      <View
        style={button.container}
        >
        <TouchableWithoutFeedback
          onPress={() => {
            this.setState({pushed: true})
            Alert.alert('Alert', 'Button is Clicked.', () => {
              this.setState({pushed: false})
            })
          }}
          >
          <View style={[button.btn, !pushed &amp;&amp; button.texture, disabled &amp;&amp; button.disabled]}>
            <Text
              style={button.label}
              disabled={false}
              >
              {title}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }
}

const button = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  btn: {
    flex: 1,
    margin: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#27AE60'
  },
  texture: {
    borderBottomWidth: 5,
    borderBottomColor: 'green',
  },
  label: {
    fontSize: 30,
    textAlign: 'center',
    color: 'white'
  },
  disabled: {
    borderBottomWidth: 0,
    backgroundColor: 'gray',
    color: 'white'
  }
})


```


前置きが長くなりましたが今回はこれをスナップショットテストしていきます。

&nbsp;
<h2>スナップショットテストを書く</h2>
&nbsp;

スナップショットテストを書く場合は他と同様に__test__の下にテストファイルを作成していきます。今回は__test__/Button.test.jsとしました。
コードは以下のようになります。

&nbsp;

__test__/Button.test.js

&nbsp;
```jsx
import React from 'react';
import Button from '../src/Button';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer
    .create(<button title="Click!!"></button>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

```
&nbsp;

普段のテストはマッチャが違い.toMatchSnapshot()となります。このマッチャを使うと__test__の下に__snapshot__というディレクトリが生成され、その下にスナップショットが作成されます。さきほどと同様にyarn testと実行するとこのようなスナップショットファイルが作成されます。

&nbsp;

/__test__/__snapshots__/Button.test.js.snap
```jsx
// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`renders correctly 1`] = `<View
  style={
    Object {
      "flexDirection": "row",
    }
  }
>
  <View
    accessibilityComponentType={undefined}
    accessibilityLabel={undefined}
    accessibilityTraits={undefined}
    accessible={true}
    hitSlop={undefined}
    nativeID={undefined}
    onLayout={undefined}
    onResponderGrant={[Function]}
    onResponderMove={[Function]}
    onResponderRelease={[Function]}
    onResponderTerminate={[Function]}
    onResponderTerminationRequest={[Function]}
    onStartShouldSetResponder={[Function]}
    style={
      Array [
        Object {
          "backgroundColor": "#27AE60",
          "borderRadius": 10,
          "flex": 1,
          "margin": 10,
          "padding": 10,
        },
        Object {
          "borderBottomColor": "green",
          "borderBottomWidth": 5,
        },
        undefined,
      ]
    }
    testID={undefined}
  >
    <Text
      accessible={true}
      allowFontScaling={true}
      disabled={false}
      ellipsizeMode="tail"
      style={
        Object {
          "color": "white",
          "fontSize": 30,
          "textAlign": "center",
        }
      }
    >
      Click!!
    </Text>
  </View>
</View>`;

```
&nbsp;

初回のテストでは、DOMがレンダーされ必ず成功しますが、次回以降にテストを実行した際にこのスナップショットファイルと相違がある場合はテストが失敗します。また、このスナップショットはテストケースごとに取得され、オブジェクトにdisableを渡した場合をテストケースで追加すると

&nbsp;
```jsx
import React from 'react';
import Button from '../src/Button';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer
    .create(<Button title="Click!!"/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders disabled component', () => {
  const tree = renderer
    .create(<Button disabled title="Click!!"/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
```
&nbsp;

&nbsp;

以下のようにテストのケースごとにスナップショットを出し分けてくれます。


```jsx

exports[`renders correctly 1`] = `
~略~
`;

exports[`renders disabled component 1`] = `
~略~
`;
```
&nbsp;
<h2>まとめ</h2>
&nbsp;

以上、ここまでで簡単にReactNative+Jestでのスナップショットテストを試してみました。ReactNativeインストールすれば最初から、Jestも入っているので、導入のための手間はほとんどいりません。最初に手順だけ覚えればほんとに一瞬でコンポーネントのテストが書けます。

実務ベースでみると「こういうときどうする？？」みたいな部分はまだあまり理解していませんが、徐々につかっていくうちにマスターできればなと思っています。また、Jestへの理解が深まればこうして記事にします。

&nbsp;

では
