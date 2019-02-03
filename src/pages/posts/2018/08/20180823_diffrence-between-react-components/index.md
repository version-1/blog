---
templateKey: blog-post
title: ReactのComponent, PureComponent, SFCComponentのレンダリングの挙動の違いをまとめてみる。
slug: /2018/08/23/diffrence-between-react-components
createdAt: 2018-08-23 09:28:55
updatedAt: 2018-09-02 13:09:21
thumbnail: /2018/08/20180823_diffrence-between-react-components/thumbnail.png
categories:
  - engineering
  - react
tags:
  - dummy
---

「Componentはどういう時に再レンダリングされるんですか？」

Reactで開発している方はもちろん、「propsやstateが変更された時だよ！」と自信をもって答えられるかもしれません。

が、

「ネストした時はどうなるんですか？」

「PureComponentやSFCとかってレンダリングの挙動が変わるんですか？どう変わるんですか？」

みたいなところにちゃんと答えられる自信がなかったのでそれぞれのコンポーネントの違いをまとめてみました。

<div class="adsense"></div>

&nbsp;
<h2>各コンポーネントの違い</h2>
&nbsp;
<h3>Component</h3>
&nbsp;

```jsx
class HelloComopnent extends Component {
  render() {
   return <div><h1>Hello World</h1></div>
}
```
言わずと知れたReactのComponentクラスです。

チュートリアルでも使っているように特に意識しなければ、このクラスを継承する形でコンポーネントを定義します。

Component classにはライフサイクルメソッドなるものが実装されており、コンポーネントのマウント時から、アンマウント時、propsが変化した場合などにフックを仕込むことができます。

<a href="https://reactjs.org/docs/react-component.html#the-component-lifecycle">he Component Lifecycle</a>

&nbsp;
<h3>PureComponent</h3>
&nbsp;

```jsx
class HelloComopnent extends PureComponent {
  render() {
   return <div><h1>Hello World</h1></div>
}
```

Reactのv15.3から追加されたコンポーネントで基本的な部分はComponentと変わらずライフサイクルメソッドが使えます。

Componentとの大きな違いは、デフォルトでshouldComponentUpdateが実装されている所です。

shouldComponentUpdateはライフサイクルメソッドの一つでReactコンポーネントを再レンダリングするかどうかをtrue/falseで返すことで再レンダリングを制御できます。(trueを返した場合だけ再レンダリングされます。)

繰り返しにはなりますがPureComponentはshouldComponentUpdateがデフォルトで実装されているので自身のコンポーネントのpropsに変更がなければ再レンダリングが走らないようになっています。

&nbsp;
<h3>SFC(Stateless Functional Component)</h3>
&nbsp;

```jsx
const HelloComopnent = (props) => {
   return <div><h1>Hello World</h1></div>
}
```

SFCはステートレスの名前の通り、内部に状態を持ちません。

関数としてのコンポーネントなので、同じpropsからはつねに同じdomがレンダーされることが保証されています。

表示に特化したPlesentationalなコンポーネントとして用いられいることが多く、ライフサイクルメソッドが使えません(渡されたpropsを表示するだけとなので必要ないと言えばそうなのですが)

&nbsp;
<h2>デモでそれぞれの違いを確認</h2>
&nbsp;

説明のためにデモを作ってみました。

<a href="https://version-1.github.io/react-rendering-sample/">デモ</a>

<img class="post-image" src="https://statics.ver-1-0.net/uploads/2018/08/20180823_diffrence-between-react-components/Screen-Shot-2018-08-23-at-7.58.42.png" alt="react component demo"/>

&nbsp;

実際にデモを見てもらうとわかるのですが、
親のコンポーネントがあってそのなかにそれぞれ並列でComponent,PureComponent,SFCが存在するような構造になります。

ソースはこちらです。
<a href="https://github.com/version-1/react-rendering-sample">version-1/react-rendering-sample</a>

紫のボタンがcounterをインクリメントしてくれるボタンで、
それぞれの色のボタンがそれぞれのflgをトグルしてくれるボタンです。

stateは全て親コンポーネントをラップするAppComponentが保持しています。

紫のボタンをクリックするとタブがcounterがインクリメントされます。
その他の色のボタンを押すと対応したコンポーネント内に表示されているflgの値が切り替わります。

また、それぞれのコンポーネントのrenderメソッド内にconsole.logを仕込んであるのでコンポーネントが再レンダリングされるタイミングでコンソールにログが表示されるようになっています。
（以下で色々と説明していきますが、実際にデベロッパーツール開いて自分で試した方がわかりやすいです。）

これらを前提に実際のコンポーネントの挙動を見ていきます。

&nbsp;
<h3>親コンポーネントから渡されたpropsが変化した場合</h3>
&nbsp;

先ほども説明したように、紫のボタンを押すとcounterの値がインクリメントされるので<strong>親コンポーネントのpropsが変化し、再レンダリング</strong>されます。続いてそのpropsが渡されている子のコンポーネントも連鎖して<strong>再レンダリングが走ります。</strong>

&nbsp;
<h3>親コンポーネントから渡されていないpropsが変化した場合</h3>
&nbsp;

親コンポーネントからpropsが渡されていない（自身のpropsが変化しない）ケースを試したいので、それぞれのボタンを押下して各コンポーネントがレンダリングされるかどうかを調べます。

結果は次の表の通りになり、
<table>
<thead>
<tr>
<th></th>
<th>緑ボタン押下</th>
<th>黄ボタン押下</th>
<th>赤ボタン押下</th>
</tr>
</thead>
<tbody>
<tr>
<th>Component（緑）</th>
<td>レンダリングされる</td>
<td>レンダリングされる</td>
<td>レンダリングされる</td>
</tr>
<tr>
<th>Pure Component（黄）</th>
<td><strong>レンダリングされない</strong></td>
<td>レンダリングされる</td>
<td><strong>レンダリングされる</strong></td>
</tr>
<tr>
<th>SFC（赤）</th>
<td>レンダリングされる</td>
<td>レンダリングされる</td>
<td>レンダリングされる</td>
</tr>
</tbody>
</table>
PureComponent以外は親の状態（props) が変化すると自身の状態が変化していないのにもかかわらず再レンダリングされてしまうことがわかります。

&nbsp;
<h2>無駄なレンダリングを避けるためのPureComponent</h2>
&nbsp;

実際にデモを動かしてみて、無駄なレンダリング（自身の状態が変わっていないのに再描画すること）によるオーバヘットを防ぐにはPureComponentを極力使っていった方が良いということがわかりました。

もちろん、ComponentでもshouldComponentUpdateを愚直に実装すれば同じことができるのですが、まあPureComponentで良いですよね。またSFCの場合は、recomposeなどのライブラリを使えばPureComponentチックなSFCもかけるみたいです。

「現状そんなに複雑で大きいコンポーネントってないから別にPureComponentじゃなくても」というのもあるかと思うのですが、個人的な意見としてシステムは寿命が長くなるほど大きく複雑に変化しておくのでいまのうちから少しずつPureComponentで実装しておくと後が楽なのかなと思っています。

&nbsp;
<h2>PureComponentを使わない方が良い場合</h2>
&nbsp;

どうやら、shouldComponentUpdateの計算コストも少なくないらしく、頻繁にpropsが変化するようなコンポーネントでは、毎回レンダリングするかどうかの計算を行わないといけないのでそういったコンポーネントにはComponentを使って無条件に再レンダリングさせるのが良いようです。

PureComopnent最高！という感じで全てのコンポーネントを置き換えると逆に遅くなったというのもありますので一応ここは念頭においておく必要があるのではないでしょうか？

&nbsp;
<h2>まとめ</h2>
&nbsp;
<ul>
 	<li>PureComponentはデフォルトでshoulComponentUpdateが実装されており、自身のpropsが変化していなければ再レンダリングしないという判断を自動でしてくれる。</li>
 	<li>親が再レンダリングされるとComponentもSFCも再レンダリングされ自身のpropsが変わっていないのにレンダリングされるという無駄が生じる。</li>
 	<li>PureComponentは頻繁に自身のpropsが書き換わるようなコンポーネントでは使わない方がよい</li>
</ul>
このように3つまとめてみましたが、今回の観点で比べるとPureComponentが特徴的な動作をするのでこのようなPureComponentが主役のまとめになりました。

レンダリングの挙動が言葉で説明されてもいまいちピンとこなかったのでデモを作って公開してみました。実際にさわってみると自分でも結構わかりやすいなと感じたのでぜひ触ってみてください。
