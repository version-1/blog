---
templateKey: blog-post
title: Rubyでデザインパターン。Strategyパターン。Design Pattern in Ruby
slug: /2018/09/02/ruby-strategy
createdAt: 2018-09-02 14:37:30
updatedAt: 2018-09-02 14:37:30
thumbnail: /2018/09/20180902_ruby-strategy/thumbnail.jpg
categories: 
  - engineering
  - rails
---

&nbsp;

&nbsp;

Rubyでデザインパターン今回はStrategyパターンです。

デザインパターンはオブジェクト指向のエッセンスが詰まったものなので本を読み進めしつつ、ここにまとめてしっかりと理解していきたいです。

<div class="after-intro"></div>

<iframe style="width: 120px; height: 240px;" src="//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&amp;bc1=000000&amp;IS2=1&amp;bg1=FFFFFF&amp;fc1=000000&amp;lc1=0000FF&amp;t=llg01-22&amp;language=ja_JP&amp;o=9&amp;p=8&amp;l=as4&amp;m=amazon&amp;f=ifr&amp;ref=as_ss_li_til&amp;asins=B004YW6M6G&amp;linkId=ec52d6ae172022e5fe853f63f31bce31" frameborder="0" marginwidth="0" marginheight="0" scrolling="no"><span data-mce-type="bookmark" style="display: inline-block; width: 0px; overflow: hidden; line-height: 0;" class="mce_SELRES_start">﻿</span></iframe>

&nbsp;
<h2>アルゴリズムを分離するStrategyパターン</h2>
&nbsp;

早速<strong>Strategyパターン</strong>のコードはこちらです。

&nbsp;
```ruby
class Report
  attr_reader :title, :text
  attr_accessor :formatter

  def initialize(formatter)
    @title = 'Monthly Report'
    @text  = ['Things are going', 'really, really well.']
    @formatter = formatter
  end

  def output_report()
    @formatter.output_report(self)
  end
end

class HTMLFormatter
  def output_report(context)
        puts('<html>')
    puts('  <head>')
    puts("    <title>#{context.title}</title>")
    puts('  </head>')
    puts('  <body>')
    context.text.each do |line|
      puts("    <p>#{line}</p>")
    end
    puts('  </body>')
    puts('</html>')
  end
end

class TextFormatter
  def output_report(context)
    puts("****** #{context.title} ******")
    context.text.each do |line|
      puts(line)
    end
  end
end
```
いきなりポンと見せられてもわからないので個別に切り出して説明していきます。

&nbsp;
<h2>アルゴリズムをサブクラスに委譲</h2>
&nbsp;

こちらの記事で<strong>TemplateMethodパターン</strong>を紹介しましたが、

<a href="https://ver-1-0.net/2018/08/31/ruby-template-method/" data-blogcard="1">Rubyでデザインパターン。Template Methodパターン。Design Pattern in Ruby</a>

&nbsp;

<strong>TemplateMethodパターン</strong>では、名前の通りスーパークラスのテンプレートメソッドでどういう処理をどういった順序で行うというのを規定して、個別の処理はサブクラスでメソッドをオーバーライドして利用するというものでした。

このTemplateMethodパターンは処理の順序などのロジックを親クラスにもっているので、肝心の処理の順序が変更されてしまうと親クラス、子クラス全てのモジュールに影響を与えてしまいます。

そういった問題点を解決しているのが<strong>Strategyパターン</strong>でStrategyパターンでは実際のロジックをストラテジーのクラスに委譲してしまいます。

&nbsp;
```ruby
class Report
  attr_reader :title, :text
  attr_accessor :formatter

  def initialize(formatter)
    @title = 'Monthly Report'
    @text  = ['Things are going', 'really, really well.']
    @formatter = formatter
  end

  def output_report()
    @formatter.output_report(self)
  end
end

```
TemplateMethodパターンではこのoutput_reportにtitleを出力するメソッド、bodyを出力するメソッドなど必要な処理を手続き的に書いていましたが、Strategyパターンではこれらのロジックを全てformatterとして与えられたインスタンスのoutput_reportに委譲します。

Strategyパターンでは、実際のロジックを全てストラテジークラスに委譲しているので動的に実行するロジックを切り替えるということも可能です。
```ruby
report = Report.new(HTMLFormatter.new)
report.output_report

report.formatter = TextFormatter.new
report.output_report
```
またStrategyパターンではロジックとデータを分離していて、Reportクラスの例でいうとtitleやtextなどのデータは親クラス（Contextクラスといったりします）が保持し、実際のロジックを実行する部分で自分自身をデータとして渡します。

対象のコードは下記の部分で
```ruby
 def output_report()
    @formatter.output_report(self)
 end

```
@formatterに注入されたクラスのメソッドに対してselfで自分自身を引き渡しています。さらにstorategy側では受け取っとたcontextからデータを取得し、実際のレポート主力時に出力を行なっています。
```ruby
class TextFormatter
  def output_report(context)
    puts("****** #{context.title} ******")
    context.text.each do |line|
      puts(line)
    end
  end
end
```
&nbsp;
<h2>Rubyの特徴を生かしたlambdaでお手軽Strategyパターン</h2>
&nbsp;

ここまでですと一般的なStrategyパターンとあまり代わりありませんが、
<a href="https://amzn.to/2C9AEvR"> Design Patterns in Ruby (Adobe Reader) (Addison-Wesley Professional Ruby Series)</a>
では、RubyのProcオブジェクトを使った簡単なStrategyパターンの実装も紹介してありました。

本ではQuick-and-Dirty Strategiesと書かれていましたが、Javascriptなどでも似たような考え方ができて覚えておいて損しない考え方かなと思いました。

Rubyではlambdaという記法を使うことでブロックをオブジェクト化して変数につめて使うことができます。下がその例ですが、

&nbsp;
```ruby
sayHello = lambda { puts 'hoge' } sayHello.call
hoge
 => nil

```
lamdaを使うとProcオブジェクトが生成され格納したブロックを実行する場合は、
callを利用します。

これを使ってStrategyパターンを組む場合は、さきほどのReportクラスを以下のようにします。
```ruby
class Report
  def initialize(&amp;formatter)
    @title = 'Monthly Report'
    @text = ['Things are going', 'really, really well.']
    @formatter = formatter
  end

  def output_report
    @formatter.call(self)
  end
end
```
あとは次のようにlamdaでstrategyを実装して渡してあげれば簡易strategyパターンのできあがりです。
```ruby
HTML_FORMATTER = lambd do |context|
  # HTMLFormatter#output_reportの処理を書く
end

report = Report.new(HTML_FORMATTER)
report.output_report
```
この書き方だとクラスを使わないのでかなり簡潔にかけそうですが、
まああまり多用は避けたいですね。

&nbsp;
<h2>まとめ</h2>
&nbsp;

今回はStrategyパターンを紹介しましたが、Strategyパターンは委譲をベースとしたデザインパターンでTemplate Methodパターンよりは、親クラスへの依存度を下げた形で実装を行うことができます。

こうやって書くとStrategyパターンの方が優れているような書き方になってしまっていますが、それぞれのパターンには向き不向きあるのでそれぞれの良いところと悪いところをわかった上で使い分けできるとよさそうですね。

また、Rubyのlambdaを使った書き方も紹介しましたがこういう選択肢もあるよという感じで覚えておくとどこかで役にたつかもしれないですね。

では。
