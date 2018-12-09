---
templateKey: blog-post
title: Rubyでデザインパターン。Template Methodパターン。Design Pattern in Ruby
slug: 2018/08/31/ruby-template-method
createdAt: 2018-08-31 12:29:41
updatedAt: 2018-09-02 13:09:21
thumbnail: https://ver-1-0.net/wp-content/uploads/2018/08/ruby-template-method.jpg
description: >-
  Rubyでのデザインパターン
  デザインパターンといえば、こちらの本
  増補改訂版Java言語で学ぶデザインパターン入門
  が有名で大変ためになる本ですが、これらのデザインパターンをrubyで書こうとするとどうなるのかというのでこちら購入して読んでみました。
categories:
  - engineering
  - rails
---

<h2>Rubyでのデザインパターン</h2>
デザインパターンといえば、こちらの本

<a href="https://amzn.to/2wta3Vd">増補改訂版Java言語で学ぶデザインパターン入門</a>

が有名で大変ためになる本ですが、これらのデザインパターンをrubyで書こうとするとどうなるのかというのでこちら購入して読んでみました。

<iframe style="width: 120px; height: 240px;" src="//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&amp;bc1=000000&amp;IS2=1&amp;bg1=FFFFFF&amp;fc1=000000&amp;lc1=0000FF&amp;t=llg01-22&amp;language=ja_JP&amp;o=9&amp;p=8&amp;l=as4&amp;m=amazon&amp;f=ifr&amp;ref=as_ss_li_til&amp;asins=B004YW6M6G&amp;linkId=ec52d6ae172022e5fe853f63f31bce31" frameborder="0" marginwidth="0" marginheight="0" scrolling="no"><span data-mce-type="bookmark" style="display: inline-block; width: 0px; overflow: hidden; line-height: 0;" class="mce_SELRES_start">﻿</span></iframe>

はい、英語です。日本語版もあるのですが、6000円ほどで結構高かったり英語の技術書を読破するという今年の目標もあったので、こちらを選びました。

&nbsp;
<h2>TemplateMethodパターン</h2>
&nbsp;

早速デザインパターンの紹介にうつります。第一回目はTemplateMethodパターンです。

&nbsp;

[after_intro]
<pre><code class="language-ruby">
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
</code></pre>
先にコードをのせてしまいましたが、Template Methodパターンではこのような抽象クラスを定義して、このReportクラスのようなクラスを継承した具象クラスでメソッドをオーバーライドして実装していきます。

このデザインパターンのミソはこのコードでいうと<strong>ouput_report</strong>メソッドになります。このメソッド内で実行する処理の順番などを定義して、そこに定義された分割されたメソッドの実際の挙動はサブクラスで定義していくというような実装になります。

サブクラスでは、<strong>サブクラスでそのサブクラス特有の処理だけ実装すればよくなる(output_reportのようなメソッドは共通処理なので抽象クラスに実装しておくだけですむ)</strong>ので、全体としてコードの重複をさけて記述量を減らすことができます。

&nbsp;
<h2>Template Methodで適用する例</h2>
&nbsp;

先ほど紹介したデザインパターンの例を引用しますが、ある日月次のレポートとしてHTMLでのレポートを作成する必要がありそれを実装することになった場合を考えます。

&nbsp;
<pre><code class="language-ruby">class Report
  def initialize
   title = 'Monthly Report'
   @text = [ 'Things are going', 'really, really well.' ]
  end

  def output_report
    puts('&lt;html&gt;')
    puts('  &lt;heade&gt;')
    puts('    &lt;title&gt;#{@title}&lt;/title&gt;')
    puts('  &lt;/head&gt;')
    puts('  &lt;body&gt;')
    @text.eah do |line|
      puts('    &lt;p&gt;#{line}&lt;/p&gt;')
    end
    puts('   &lt;/body&gt;')
    puts('&lt;/html&gt;')
  end

end</code></pre>
HTMLを出力するだけなので、このよな実装をしたとします。しかし、後からテキスト形式でも出してほしいといったときにこまってしまいます。

ここで付け焼き刃的な実装をするとこんな感じになってしまいます。
<pre><code class="language-ruby">class Report
  def initialize
    @title = 'Monthly Report'
    @text = ['Things are going', 'really, really well']
  end

  def output_report(format)
    if format == :plain
      puts('*** #{@title{} ***')
    elsif format == :html
      puts('&lt;html&gt;')
      puts('  &lt;heade&gt;')
      puts('    &lt;title&gt;#{@title}&lt;/title&gt;')
      puts('  &lt;/head&gt;')
      puts('  &lt;body&gt;')
    else
      raise "Unknown format: #{format}"
    end

    @text.eah do |line|
    if format == :plain
        puts('    &lt;p&gt;#{line}&lt;/p&gt;')
      else
        puts('    &lt;p&gt;#{line}&lt;/p&gt;')
      end
    end
    puts('   &lt;/body&gt;')
    puts('&lt;/html&gt;')
  end
end</code></pre>
&nbsp;

うーん、動きはしそうですが、if文が多くてなかなか読みづらいですね。しかも、こんどは別のcsv形式で出力してほしいとなった場合にまたif文が増えて辛くなりそうな気しかしないです。

こういうときにTemplate Methodパターンで実装をすると、一番最初に紹介したReportクラスを継承する形でHTMLReportクラスとTextReportクラスを実装するとだいぶ楽になります。

&nbsp;

<strong>HTMLReport.rb</strong>
<pre><code class="language-ruby">class HTMLReport &lt; Report
  def output_start
    puts('&lt;html&gt;')
  end

  def output_head
    puts('  &lt;head&gt;')
    puts("    &lt;title&gt;#{@title}&lt;/title&gt;")
    puts('  &lt;/head&gt;')
  end

  def output_body_start
    puts('&lt;body&gt;')
  end

  def output_line(line)
    puts("  &lt;p&gt;#{line}&lt;/p&gt;")
  end

  def output_body_end
    puts('&lt;/body&gt;')
  end

  def output_end
    puts('&lt;/html&gt;')
  end
end</code></pre>
<strong>TextReport</strong>
<pre><code class="language-ruby">class TextReport &lt; Report

  def output_head
    puts("*** #{@title} ***")
    puts
  end

  def output_line(line)
    puts(line)
  end

end
</code></pre>
このようにそれぞれの出力フォーマットをReportクラスのサブクラスとして切り出すことによってすっきりとしたコードになりました。

これらのクラスを使う場合は、出力したいフォーマットにあわせて

&nbsp;
<pre><code class="language-ruby"># HTML出力する場合
HTMLReport.new.output_report

# Text出力する場合
TextReport.new.output_report</code></pre>
&nbsp;
<h2>まとめ</h2>
&nbsp;

ここまでで、TemplateMethodパターンの紹介は以上です。デザインパターンはなかなか覚えるのに時間かかかるのですが、実装前の段階でデザインパターンを知っているか知らないかで実装の簡潔さや変更の容易さがかわってきて知っていると本当に便利です。

最初にもちょっと触れましたが、TemplateMethodパターンの肝は<strong>抽象クラスのそれぞれのメソッドを呼び出す親メソッド（Reportクラスのoutput_reportメソッド）</strong>と<strong>サブクラスでの実装を強制するメソッド
</strong>です。

親メソッドというか<strong>テンプレートメソッド</strong>が<strong>どういう順番で個別のメソッドを呼び出すかというのを定義して、それに合わせてサブクラスでメソッドをオーバライドしていく</strong>ので当然このテンプレートメソッドがクラス設計の重要な部分になってきます。設計時にはどういうパターンが今後の変更などを加味してどういうメソッドにするのかというのを決めていきましょう。

また、Reportクラスではoutput_lineではメソッド内で例外をなげるように実装することで子クラスでオーバーライドされない場合にはエラーで処理を止めるように実装しています。一方その他のメソッドはデフォルトで返却する値（もしくは何もしない）を決めているのでサブクラスで固有の処理がない場合はそのままReportクラスのメソッドを実行するようにして、コードの重複を減らしています。

この大きくわけて二つのテンプレートメソッドと、オーバライド必須のメソッドを覚えておけばわりとするっと実装できるのが TemplateMethodパターンです。

ぜひ実務や個人開発でもTemplateMethodパターンが適用できないかどうか考えて実装してきれいなコード書いていきましょう。
