---
templateKey: blog-post
title: \[Mac\] たったの10分!! Vagrantで Ruby on Rails 5 を自動構築
slug: /2017/01/14/vagrant-rails-5min
createdAt: 2017-01-14 22:10:04
updatedAt: 2018-08-26 12:46:33
thumbnail: ./thumbnail.png
categories: 
  - engineering
  - rails
  - for-beginner
---

&nbsp;

Mac上にVagrantでUbuntuゲストOSを作成して、
その中にRuby on Rails 5を自動で構築します。

うまく行けば<strong>10分かからず</strong>に、
Rails5環境を構築できるかと思います。
（PCのスペック、ネット環境には依存します。）

ちなみに構築した際のホストPCのスペックは
<strong>ホストOS: Mac OS X 10.12.2（メモリ8GB)</strong>です。

[after_intro]
<h2 class="chapter">1.Virtual Boxインストール</h2>
ここからMac用のものをダウンロード
<a href="http://www.oracle.com/technetwork/server-storage/virtualbox/downloads/index.html?ssSourceSiteId=otnjp" target="_blank" rel="noopener noreferrer">http://www.oracle.com/technetwork/server-storage/virtualbox/downloads/index.html?ssSourceSiteId=otnjp</a>

&nbsp;
<h2 class="chapter">2.Vagrantインストール</h2>
インストールはこちらから
<a href="https://www.vagrantup.com/" target="_blank" rel="noopener noreferrer">https://www.vagrantup.com/</a>
<h4>Downloadをクリック</h4>
<img class="post-image" src="./スクリーンショット-2017-01-14-21.08.33-300x192.png" alt="スクリーンショット-2017-01-14-21.08.33-300x192.png"/>
<h4 style="padding-left: 30px;">Macのリンクを選択</h4>
<img class="post-image" src="./スクリーンショット-2017-01-14-21.08.56-300x213.png" alt="スクリーンショット-2017-01-14-21.08.56-300x213.png"/>
<h4 style="padding-left: 30px;">ターミナルでインストールされたか確認</h4>
```
 vagrant --version

```
エラーが出なければOK

&nbsp;
<h2 class="chapter">3.Vagrant Box作成</h2>
適当なフォルダにVagrantフォルダを作成
<code>mkdir ~/Vagrant </code>

Vagrant 初期化
```bash
vagrant init ubuntu/xenial64
```

&nbsp;
<h2 class="chapter">4.Vagrantfile編集</h2>
vagrant init の後に<strong>Vagrantfile</strong>というのがあるので
それを編集
編集箇所は3箇所
<h4 style="padding-left: 30px;">プライベートアドレス設定</h4>
<strong>27行目あたり</strong>
config.vm.networkのコメントアウトを外す
```bash
# Create a private network, which allows host-only access to the machine
 # using a specific IP.
 config.vm.network "private_network", ip: "192.168.33.10"

```
<h4 style="padding-left: 30px;">メモリの割り当て設定</h4>
4GB程度に設定(お好みで)
あまり低いとインストールに時間がかかるかも
```bash
   config.vm.provider "virtualbox" do |vb|
     # Display the VirtualBox GUI when booting the machine
  #   vb.gui = true
     # Customize the amount of memory on the VM:
    vb.memory = "4096"
   end

```
<h4 style="padding-left: 30px;">Rails インストールシェルの設定</h4>
ここにRailsをインストールするためのコマンドを書き込む
最後の方の
<strong>"config.vm.provision "shell", inline: <<-SHELL"</strong>から
<strong>"SHELL"</strong>の間に以下を書き込む
```bash
# 必要なパッケージをインストール
sudo apt-get update
sudo apt-get install -y build-essential zlib1g-dev libssl-dev
sudo apt-get install -y libreadline-dev libyaml-dev libxml2-dev libxslt-dev
sudo apt-get install -y ruby-dev nodejs
sudo apt-get install -y rbenv
sudo apt-get install libsqlite3-dev
# Railsインストール
sudo gem install rails
sudo gem install sqlite3 # SQLITE用にインストール
sudo gem install therubyracer

# Railsアプリケーション作成
cd /vagrant  &amp;&amp; rails new myapp
sudo chmwon -R ubuntu:ubuntu /vagrant/myapp

```

<h2 class="chapter">5.Vagrant起動</h2>
```bash
vagrant up
```
初回起動時に上で書いたシェルを実行してくれる。

&nbsp;
<h2 class="chapter">できたか確認</h2>
仮想環境にログイン
```bash
vagrant ssh
```
Rails アプリをWebRickで動かす
```bash
cd /vagrant/myapp
rails s -b 0.0.0.0

```
エラーなく起動したら http://192.168.33.10:3000
に接続してみる。
<h2 class="chapter">6.振り返り</h2>
ここまでスムーズに行けば10分程度でRailsが動くサーバを作成できる。
環境構築は意外と時間がかかるので、
こういう形でどんどん自動化していきたい。

ただ、いきなり環境構築のためのスクリプトを書くのは
不可能なので

<strong>①手動で試行錯誤しながら環境構築</strong>

<strong>②①の手順をVagrantのprovisonシェルに書く</strong>

という流れで自動化していくのが良さそう。
