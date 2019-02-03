---
templateKey: blog-post
title: Rubyでデザインパターン。Template Methodパターン。Design Pattern in Ruby
slug: /2018/08/31/ruby-template-method
createdAt: 2018-08-31 12:29:41
updatedAt: 2018-09-02 13:09:21
thumbnail: /2018/08/20180831_ruby-template-method/thumbnail.jpg
categories:
  - engineering
  - rails
tags:
  - ruby
  - design-pattern
  - oop
related:
  - dummy
---

<h2>Rubyでのデザインパターン</h2>
デザインパターンといえば、こちらの本

<a href="https://amzn.to/2wta3Vd">増補改訂版 Java 言語で学ぶデザインパターン入門</a>

が有名で大変ためになる本ですが、これらのデザインパターンを ruby で書こうとするとどうなるのかというのでこちら購入して読んでみました。

[Design Patterns in Ruby (Addison-Wesley Professional Ruby Series) (英語)](https://amzn.to/2TJL3Cu)

<a href="https://www.amazon.co.jp/Design-Patterns-Ruby-Addison-Wesley-Professional/dp/0321490452/ref=as_li_ss_il?ie=UTF8&linkCode=li2&tag=llg01-22&linkId=6af42eb4b01edaa8a7b67184be235a39&language=ja_JP" target="_blank"><img width="121" height="160" layout="fixed" border="0" src="//ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=0321490452&Format=_SL160_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=llg01-22&language=ja_JP" ></a><img src="https://ir-jp.amazon-adsystem.com/e/ir?t=llg01-22&language=ja_JP&l=li2&o=9&a=0321490452" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />

はい、英語です。日本語版もあるのですが、6000 円ほどで結構高かったり英語の技術書を読破するという今年の目標もあったので、こちらを選びました。

&nbsp;

<h2>TemplateMethodパターン</h2>
&nbsp;

早速デザインパターンの紹介にうつります。第一回目は TemplateMethod パターンです。

&nbsp;

<div class="adsense"></div>

```ruby
class Report
  def initialize
    @title = 'Monthly Report'
    @text = ['THings are going', 'really, really well']
  end

  def output_report
    output_start
    output_head
    output_body_start
    output_body
    output_body_end
    oputput_end
  end

  def output_body
    @text.each do |line|
      output_line(line)
    end
  end

  def output_start
  end

  def output_head
    output_line(@title)
  end

  def output_line(line)
    raise  'Called abstract method: output_line'
  end

  def output_body_end
  end

  def output_end
  end
end

```

先にコードをのせてしまいましたが、Template Method パターンではこのような抽象クラスを定義して、この Report クラスのようなクラスを継承した具象クラスでメソッドをオーバーライドして実装していきます。

このデザインパターンのミソはこのコードでいうと<strong>ouput_report</strong>メソッドになります。このメソッド内で実行する処理の順番などを定義して、そこに定義された分割されたメソッドの実際の挙動はサブクラスで定義していくというような実装になります。

サブクラスでは、<strong>サブクラスでそのサブクラス特有の処理だけ実装すればよくなる(output_report のようなメソッドは共通処理なので抽象クラスに実装しておくだけですむ)</strong>ので、全体としてコードの重複をさけて記述量を減らすことができます。

&nbsp;

<h2>Template Methodで適用する例</h2>
&nbsp;

先ほど紹介したデザインパターンの例を引用しますが、ある日月次のレポートとして HTML でのレポートを作成する必要がありそれを実装することになった場合を考えます。

&nbsp;

```ruby
class Report
  def initialize
   title = 'Monthly Report'
   @text = [ 'Things are going', 'really, really well.' ]
  end

  def output_report
    puts('<html>')
    puts('  <heade>')
    puts('    <title>#{@title}</title>')
    puts('  </head>')
    puts('  <body>')
    @text.eah do |line|
      puts('    <p>#{line}</p>')
    end
    puts('   </body>')
    puts('</html>')
  end

end
```

HTML を出力するだけなので、このよな実装をしたとします。しかし、後からテキスト形式でも出してほしいといったときにこまってしまいます。

ここで付け焼き刃的な実装をするとこんな感じになってしまいます。

```ruby
class Report
  def initialize
    @title = 'Monthly Report'
    @text = ['Things are going', 'really, really well']
  end

  def output_report(format)
    if format == :plain
      puts('*** #{@title{} ***')
    elsif format == :html
      puts('<html>')
      puts('  <heade>')
      puts('    <title>#{@title}</title>')
      puts('  </head>')
      puts('  <body>')
    else
      raise "Unknown format: #{format}"
    end

    @text.eah do |line|
    if format == :plain
        puts('    <p>#{line}</p>')
      else
        puts('    <p>#{line}</p>')
      end
    end
    puts('   </body>')
    puts('</html>')
  end
end
```

&nbsp;

うーん、動きはしそうですが、if 文が多くてなかなか読みづらいですね。しかも、こんどは別の csv 形式で出力してほしいとなった場合にまた if 文が増えて辛くなりそうな気しかしないです。

こういうときに Template Method パターンで実装をすると、一番最初に紹介した Report クラスを継承する形で HTMLReport クラスと TextReport クラスを実装するとだいぶ楽になります。

&nbsp;

<strong>HTMLReport.rb</strong>

```ruby
class HTMLReport < Report
  def output_start
    puts('<html>')
  end

  def output_head
    puts('  <head>')
    puts("    <title>#{@title}</title>")
    puts('  </head>')
  end

  def output_body_start
    puts('<body>')
  end

  def output_line(line)
    puts("  <p>#{line}</p>")
  end

  def output_body_end
    puts('</body>')
  end

  def output_end
    puts('</html>')
  end
end
```

<strong>TextReport</strong>

```ruby
class TextReport < Report

  def output_head
    puts("*** #{@title} ***")
    puts
  end

  def output_line(line)
    puts(line)
  end

end

```

このようにそれぞれの出力フォーマットを Report クラスのサブクラスとして切り出すことによってすっきりとしたコードになりました。

これらのクラスを使う場合は、出力したいフォーマットにあわせて

&nbsp;

```ruby
# HTML出力する場合
HTMLReport.new.output_report

# Text出力する場合
TextReport.new.output_report
```

&nbsp;

<h2>まとめ</h2>
&nbsp;

ここまでで、TemplateMethod パターンの紹介は以上です。デザインパターンはなかなか覚えるのに時間かかかるのですが、実装前の段階でデザインパターンを知っているか知らないかで実装の簡潔さや変更の容易さがかわってきて知っていると本当に便利です。

最初にもちょっと触れましたが、TemplateMethod パターンの肝は<strong>抽象クラスのそれぞれのメソッドを呼び出す親メソッド（Report クラスの output_report メソッド）</strong>と<strong>サブクラスでの実装を強制するメソッド
</strong>です。

親メソッドというか<strong>テンプレートメソッド</strong>が<strong>どういう順番で個別のメソッドを呼び出すかというのを定義して、それに合わせてサブクラスでメソッドをオーバライドしていく</strong>ので当然このテンプレートメソッドがクラス設計の重要な部分になってきます。設計時にはどういうパターンが今後の変更などを加味してどういうメソッドにするのかというのを決めていきましょう。

また、Report クラスでは output_line ではメソッド内で例外をなげるように実装することで子クラスでオーバーライドされない場合にはエラーで処理を止めるように実装しています。一方その他のメソッドはデフォルトで返却する値（もしくは何もしない）を決めているのでサブクラスで固有の処理がない場合はそのまま Report クラスのメソッドを実行するようにして、コードの重複を減らしています。

この大きくわけて二つのテンプレートメソッドと、オーバライド必須のメソッドを覚えておけばわりとするっと実装できるのが TemplateMethod パターンです。

ぜひ実務や個人開発でも TemplateMethod パターンが適用できないかどうか考えて実装してきれいなコード書いていきましょう。
