---
templateKey: blog-post
title: 一段上のエンジニアに。Rails でテストコードを書く ( RSpec )
slug: 2017/02/04/rails-rspec
createdAt: 2017-02-04 22:54:26
updatedAt: 2018-08-26 12:38:27
thumbnail: http://ver-1-0.net/wp-content/uploads/2017/02/スクリーンショット-2017-02-04-22.15.06.png
description: >-
  昨今TDDなどもあり、
  テストコードについての話題がありますが、

  個人的にテストコードが書ける人
  = 初級者を脱した中級者 のようなイメージを持っています。

  打たれる前に打てというような
  考えもあるかと思いますが、
  打たれても大丈夫なように体を作ることも大事です。

categories:
  - engineering
  - rails
  - for-beginner
---


&nbsp;

昨今TDDなどもあり、
テストコードについての話題がありますが、

&nbsp;

個人的にテストコードが書ける人
= 初級者を脱した中級者 のようなイメージを持っています。

&nbsp;

打たれる前に打てというような
考えもあるかと思いますが、
打たれても大丈夫なように体を作ることも大事です。

ちょっと何を言いたいのかわかりませんが
野球もサッカーも守りが強いという土台の上でこそ
攻撃力や創造性が発揮されるということです。

ということで脱線しましたが、
簡単な導入から行きましょう。

&nbsp;

まずはアプリはこんな感じです。

<a href="http://ver-1-0.net/wp-content/uploads/2017/02/スクリーンショット-2017-02-04-22.09.55.png"><img class="alignnone size-large wp-image-172" src="http://ver-1-0.net/wp-content/uploads/2017/02/スクリーンショット-2017-02-04-22.09.55-1024x272.png" alt="足し算アプリ" width="700" height="186" /></a>

はい、簡単な足し算をするアプリです。
viewのコードは以下です。
<a href="http://ver-1-0.net/wp-content/uploads/2017/02/スクリーンショット-2017-02-04-22.48.02.png"><img class="alignnone size-large wp-image-177" src="http://ver-1-0.net/wp-content/uploads/2017/02/スクリーンショット-2017-02-04-22.48.02-1024x586.png" alt="view code" width="700" height="401" /></a>

&nbsp;

&nbsp;

<a href="http://getbootstrap.com/">bootstarap</a>
で多少装飾していますが、
今回はここで呼んでいる addというメソッドのテストを書いてみます。

まずはインストールから
方法はここにあります。
<a href="https://github.com/rspec/rspec-rails">https://github.com/rspec/rspec-rails</a>

ということで
<pre><code class="language-ruby">gem 'rspec-rails', '~&gt; 3.5'</code></pre>を追記してから
bundle installします。

インストールできたら初期化
<pre><code class="language-bash">rails generate rspec:install</code></pre>
テストの実行方法は以下です。
<pre><code class="language-bash"># モジュール単位
bundle exec rspec spec/[ models / helpers / controller / .. ]

# ファイル単位
bundle exec rspec spec/helpers/homes_helper_rspec.rb
</code></pre class="ruby">
テストコードは以下の通り
<pre><code class="language-ruby">require 'rails_helper'
include(HomesHelper)

RSpec.describe HomesHelper, type: :helper do
  # pending "add some examples to (or delete) #{__FILE__}"

  describe "GET /homes" do
    it "about add method" do
      # normal case
      sum = HomesHelper.add( 1, 2)
      expect(sum).to eq(3)

      # either nil
      sum = HomesHelper.add( nil, 2)
      expect(sum).to eq(0)

      # either nil
      sum = HomesHelper.add( 1, nil)
      expect(sum).to eq(0)

      # both nil
      sum = HomesHelper.add( nil, nil)
      expect(sum).to eq(0)
    end
  end
end
</code></pre>
&nbsp;

&nbsp;

it から end までがテストの一単位ですね。
実行してみます。
<pre><code class="language-bash">$ rspec spec/helpers
Please report a bug if this causes problems.
.

Finished in 0.02032 seconds (files took 4.38 seconds to load)
1 example, 0 failures
</code></pre>

はい成功です。
今回は一発目で成功しましたが、
失敗すると
<pre><code class="language-bash">$ rspec spec/helpers
WARN: Unresolved specs during Gem::Specification.reset:
      diff-lcs (< 2.0, >= 1.2.0)
WARN: Clearing out unresolved specs.
Please report a bug if this causes problems.
.

Finished in 0.02032 seconds (files took 4.38 seconds to load)
1 example, 0 failures
</code></pre>

こういう感じになります。
今回はシンプルなパターンだったので、
もう少し複雑なパターンを試してみたいです。

試したらまたこのブログで紹介します。

rspecは他にもcontrollerやmodel,routingもテストできます。
はい!今回はここまで。
