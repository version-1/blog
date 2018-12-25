---
templateKey: blog-post
title: ReactNativeで電話番号フォームを実装する
slug: /2018/03/25/implement-telephone-input
createdAt: 2018-03-25 10:00:13
updatedAt: 2018-09-02 13:09:21
thumbnail: ./thumbnail.png
categories: 
  - engineering
  - react
---

<h2>電話番号形式で入力する際のフォームを実装</h2>
<img class="post-image" src="./ReactNativeTelephoneInput.gif" alt="ReactNativeTelephoneInput.gif"/>

&nbsp;

ReactNativeで入力フォームを使う時って、TextInputを使いますよね。ただこのTextInputさんは、汎用的につくられているので<strong>電話番号の入力フォームとしては少し使いづらい印象があります。</strong>

そこで割と簡単に電話番号形式入力フォームがコンポーネントとしてあらかじめ定義されていると嬉しいなと思い、実際につくってみました。

機能としては、まだまだで入力に対して<strong>電話番号をハイフン区切りにして表示してくれる</strong>だけですが、なんとなくそれっぽくなるように作りました。

ぜひ、コピペして使ってみてください。

[after_intro]
<h2>TelephoneInputを実装</h2>
ポイントは、insertDelimiterメソッドですね。<strong>入力に対してつねに所定の位置にハイフンが挿入される</strong>ように作っています。

あとはそれぞれ電話番号の桁数やスタイル、キーボードの種類などをpropsに定義しています。
<h5>TelephoneInput.js</h5>
```jsx
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TextInput } from 'react-native';

TELEPOHNE_LENGTH = 13; // 番号の桁数
DELIMITER_INDEX = [3, 7]; // ハイフンを入れる位置

export class TelephoneInput extends Component {
  constructor(props) {
    super(props);
  }

  insertDelimiter(text) {
    let text_without_delimiter = text.replace(/-/g, '');
    let index = 0;
    let result = text_without_delimiter;
    DELIMITER_INDEX.forEach(function(value, index) {
      if (text_without_delimiter.length >= value) {
        const insertIndex = value + index;
        result = `${result.slice(0, insertIndex)}-${result.slice(
          insertIndex,
          insertIndex + result.length
        )}`;
        index++;
      }
    });
    return result;
  }
  render() {
    return (
      <TextInput
        autoFocus={true}
        keyboardType={'phone-pad'}
        value={this.props.value}
        placeholder="000-0000-0000"
        maxLength={TELEPOHNE_LENGTH}
        style={this.props.style}
        onChangeText={text => {
          this.props.updateAction(this.insertDelimiter(text));
        }}
      />
    );
  }
}
```
<h2>実際に使って見る</h2>
&nbsp;

上での説明は最小限度にとどめましたが、コンポーネントを定義するところで得られるメリットは上の実装を意識せずにつかえることです。

実際に使ってみて、それを確かめてみましょう。
<h5>App.js</h5>
```jsx
import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import { TelephoneInput } from './../components/TelephoneInput';

type Props = {};
export default class App extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = { telephoneNumber: null };
  }
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Input Your Telephone Number</Text>
        <TelephoneInput
          value={this.state.telephoneNumber}
          style={{
            fontSize: 35,
            fontWeight: 'bold',
            padding: 30
          }}
          updateAction={number => {this.setState({ telephoneNumber: number });}}
        />
        <Button
          raised
          title="Submit"
          onPress={() => {
            const number = this.state.telephoneNumber;
            if (number) {
              alert(`下記の番号が入力されています。\n${number}`);
            } else {
              alert('番号を入力してください。');
            }
          }}
        />
      </View>
    );
  }
}

```
&nbsp;

TelephoneInputコンポーネントを定義したことで、ハイフンを挿入するといったロジックがかかれなくなったので、
コンポーネントを利用する側からはコードがスッキリ見えるようになりました。他の画面で電話番号を入力するフォームを作る必要ができたときもこのコンポーネントをつかえますね。

&nbsp;
```jsx
<TelephoneInput
  value={this.state.telephoneNumber}
  style={{
    fontSize: 35,
    fontWeight: 'bold',
    padding: 30
  }}
  updateAction={number => {this.setState({ telephoneNumber: number });}}
/>

```
&nbsp;

また、updateActionで（名前があまりよくないかもしれない）ステートも更新できるようにしているので、コンポーネントの呼び出し側でも入力された値がわかるようになっています。

&nbsp;

<img class="post-image" src="./Screen-Shot-2018-03-24-at-23.00.48.png" alt="Screen-Shot-2018-03-24-at-23.00.48.png"/>

&nbsp;

親コンポーネントでボタンを押すと電話番号の値を表示するように今回はコードを書いていますが、見事に親コンポーネントで値がとれています。

これができるば入力された電話番号をサーバーに送信して保存ということもできてフォームとしても使えますね。

&nbsp;

&nbsp;
<h2>まとめ</h2>
<ul>
 	<li>defaultPropsでデフォルトの値を決める。</li>
 	<li>TextInputの各propsに対応する。</li>
 	<li>電話番号の桁数やデリミタを入れる位置を外側から設定できるようにする。</li>
 	<li>バリデーションをかけられるようにする。</li>
</ul>
などなど課題はありますが、ひとまず動くようなコンポーネントが作成できましたので、記録しておきます。以上のような課題が解消できたら追記するかもしれません。

では
