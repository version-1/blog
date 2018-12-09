---
templateKey: blog-post
title: WordPressプラグイン作り方。プラグイン開発の始め方
slug: 2017/11/06/how-to-develop-wp-plugin
description: &nbsp;

&nbsp;

WordPressプラグインは簡単に作れます。

人気のプラグインのように高機能なものは
もちろん開発は大変かと思いますが、
自分しか利用しないものや機能の少ないものは
それこそ、<strong>1,2時間などで開発できてしまいます。</strong>

最近の記事で

&nbsp;

これらのような記事も書いていますが、
自分でPHPコードのかける方は、
プラグインを自作してみるのはオススメです。

以下では、
自作プラグインの入り口の部分だけ紹介していきます。

[after_intro]

&nbsp;

createdAt: 2017-11-06 10:46:11
updatedAt: 2018-08-26 10:55:00
thumbnail: https://ver-1-0.net/wp-content/uploads/2017/11/223395ae7cd150697858d397130d03f0_s.jpg
categories: 
  - engineering
---

&nbsp;

&nbsp;

WordPressプラグインは簡単に作れます。

人気のプラグインのように高機能なものは
もちろん開発は大変かと思いますが、
自分しか利用しないものや機能の少ないものは
それこそ、<strong>1,2時間などで開発できてしまいます。</strong>

最近の記事で

&nbsp;

これらのような記事も書いていますが、
自分でPHPコードのかける方は、
プラグインを自作してみるのはオススメです。

以下では、
自作プラグインの入り口の部分だけ紹介していきます。

[after_intro]

&nbsp;

&nbsp;

&nbsp;
<h2 class="chapter">自作プラグインを設置してみる。</h2>
&nbsp;

&nbsp;

通常WordPressのプラグインは
wp-content/plugins配下にプラグイン単位で配置します。

そして、
WordPressにそのプラグインが存在することを
知らせるためには、
プラグインのメインなファイルにプラグインヘッダを付加して、
そのプラグインの情報を書き出します。

プラグインヘッダというのは、
このような形でメインの<strong>PHPファイルの先頭に</strong>
<strong> コメント形式で情報を記述</strong>することになります。
<pre><code class="language-php">&lt;?php
/*
Plugin Name: (プラグインの名前)
Plugin URI: (プラグインの説明と更新を示すページの URI)
Description: (プラグインの短い説明)
Version: (プラグインのバージョン番号。例: 1.0)
Author: (プラグイン作者の名前)
Author URI: (プラグイン作者の URI)
License: (ライセンス名の「スラッグ」 例: GPL2)
*/
</code></pre>
&nbsp;

&nbsp;

プラグインを公開（WordPress.orgの審査が必要）したりすることがなければ、
最低限<strong>PluginNameだけ記載すればインストール済みプラグインの一覧に表示されます。</strong>
<pre><code class="language-php">&lt;?php
/*
Plugin Name: My Plugin
 */
</code></pre>
<a href="https://ver-1-0.net/2017/11/06/wordpress%e3%83%97%e3%83%a9%e3%82%b0%e3%82%a4%e3%83%b3%e4%bd%9c%e3%82%8a%e6%96%b9%e3%80%82%e3%83%97%e3%83%a9%e3%82%b0%e3%82%a4%e3%83%b3%e9%96%8b%e7%99%ba%e3%81%ae%e5%a7%8b%e3%82%81%e6%96%b9/screen-shot-2017-11-06-at-10-04-11/" rel="attachment wp-att-1156"><img class="alignnone size-full wp-image-1156" src="https://ver-1-0.net/wp-content/uploads/2017/11/Screen-Shot-2017-11-06-at-10.04.11.png" alt="自作プラグイン例" width="899" height="266" /></a>

↑My Pluginというプラグインが表示されているのがわかります。

&nbsp;

&nbsp;

他の作者の情報や、プラグインの説明を記載すると
一覧にもヘッダに書いた情報が表示されます。
<pre><code class="language-php">&lt;?php
/*
Plugin Name: My Plugin 
Plugin URI: https://ver-1-0.net/2017/11/06/wordpressプラグイン作り方。プラグイン開発の始め方/  
Description: tutorial plugin to learn how we develop plugins. 
Version: 0.1
Author: version1
Author URI: https://ver-1-0.net
License: GPL2
*/
</code></pre>
<a href="https://ver-1-0.net/2017/11/06/wordpress%e3%83%97%e3%83%a9%e3%82%b0%e3%82%a4%e3%83%b3%e4%bd%9c%e3%82%8a%e6%96%b9%e3%80%82%e3%83%97%e3%83%a9%e3%82%b0%e3%82%a4%e3%83%b3%e9%96%8b%e7%99%ba%e3%81%ae%e5%a7%8b%e3%82%81%e6%96%b9/screen-shot-2017-11-06-at-10-12-29/" rel="attachment wp-att-1157"><img class="alignnone size-full wp-image-1157" src="https://ver-1-0.net/wp-content/uploads/2017/11/Screen-Shot-2017-11-06-at-10.12.29.png" alt="プラグインヘッダーの例" width="895" height="275" /></a>

[mid_article]

&nbsp;

&nbsp;
<h2 class="chapter">プラグインの有効化</h2>
&nbsp;

&nbsp;

上の画像ではプラグインの有効化のボタンが
見えますが、自作のプラグインは<strong>wp-contetnt/plugins配下に</strong>
<strong> プラグインを配置したらそのまま有効化して使えます。</strong>

そのため、
先ほどのファイルを
<pre><code class="language-php">&lt;?php
/*
Plugin Name: My Plugin 
Plugin URI: https://ver-1-0.net/2017/11/06/wordpressプラグイン作り方。プラグイン開発の始め方/  
Description: tutorial plugin to learn how we develop plugins. 
Version: 0.1
Author: version1
Author URI: https://ver-1-0.net
License: GPL2
*/

function HelloWorld(){
  echo "Hello World";
} 
</code></pre>
&nbsp;

&nbsp;

のように変えてあげて、
任意のファイルで
<pre><code class="language-php">if( function_exists('HelloWorld'){ HelloWorld();}</code></pre>
の行を追加してしまえば、
そのままファイルに書いた関数を使用できます。
<strong>（プラグインが無効の場合にfunction_existsをつけて置かないとメソッドが見つからないエラーになります）</strong>

&nbsp;

&nbsp;
<h2 class="chapter">まとめ</h2>
&nbsp;

&nbsp;

この記事では実際に<strong>"Hello World"を表示させるだけの関数を導入した</strong>だけでした。

実際に人気のプラグインなどを見てみると、
<strong>設定用の管理画面があったり、ウィジェットがあったりと</strong>
<strong> より高機能</strong>ですが、
プラグイン開発の導入としてはそこまで難しくないということが
わかります。

<strong>ディレクトリ配置してプラグインの情報を書くだけ</strong>ですからね。
個人利用のプラグインであれば、
<strong>最低源自分の必要な機能だけ関数として実装して、</strong>
<strong> 設定画面とかは作らない</strong>とかもありです。

またまた、
これがわかれば<strong>自作の関数を、function.phpに書くのでなく</strong>
<strong> プラグインとして定義するとかも可能ですね。</strong>

とりあえずのところは、
この導入部分だけわかっていても十分役に立つと思ったので、
紹介しました。

今後<strong>設定画面の作り方</strong>なども解説できれば良いなと思っています。

では、以上です。

[after_article]
