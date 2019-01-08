---
templateKey: blog-post
title: LubuntuにRails5 をインストール
slug: /2017/01/03/lubuntu-rails5
createdAt: 2017-01-03 15:47:17
updatedAt: 2018-08-26 12:57:01
thumbnail: /2017/01/20170103_lubuntu-rails5/thumbnail.png
categories:
  - engineering
  - for-beginner
---

<h2>①パッケージインストール</h2>

```bash
sudo apt-get install build-essential zlib1g-dev libssl-dev libreadline-dev libyaml-dev libxml2-dev libxslt-dev

```

<h2>②パッケージ管理のrbenvをインストール</h2>

apt-getでインストール
```bash
sudo apt-get install rbenv
```

```bash
rbenv init
echo 'eval &quot;$(rbenv init -)&quot;' >> ~/.bashrc

```

インストールに必要なruby-buildをインストール
```bash
git clone https://github.com/sstephenson/ruby-build.git ~/.rbenv/plugins/ruby-build

```

<h2>③ruby 2.4.0をインストール</h2>
現在の安定版は2.4.0のようなので2.4.0をインストール
<a href="https://www.ruby-lang.org/ja/downloads/">https://www.ruby-lang.org/ja/downloads/</a>
```bash
rbenv install 2.4.0
```




```bash
$rbenv global 2.4.0
rbenv rehash
ruby -v
ruby 2.4.0p0 (2016-12-24 revision 57164) [x86_64-linux]

```


<h2>③rails5をインストール</h2>
rails5をインストール
```bash
gem install rails -v '5.0.1'
gem install bundller

```



<h2>③railsアプリケーションの作成・動作確認</h2>
```bash
rails new myapp
cd myapp
rails s

```

サーバを起動したところエラー発生
```bash
`rescue in block (2 levels) in require': There was an error while trying to load the gem 'uglifier'. (Bundler::GemRequireError)

```

<<対処法>>
nodejsをインストールしてアプリケーションを作り直す
```bash
sudo apt-get install
rails new myapp
cd myapp
rails s -b 0.0.0.0
# rails s　だけであげるとhttp://localhost:3000でサーバが起動するため
# ホストOSから接続できない。IPアドレスで指定する。

```


ブラウザでアクセスすると


<img class="post-image half-width" src="https://statics.ver-1-0.net/uploads/2017/01/20170103_lubuntu-rails5/rails-helloworld.png" alt="スクリーンショット-2017-01-03-15.37.16-300x244.png"/>

成功



参考URL:<a href="http://makev.blogspot.jp/2012/11/lubunturbenvrubyrails.html">http://makev.blogspot.jp/2012/11/lubunturbenvrubyrails.html</a>
