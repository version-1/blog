---
templateKey: blog-post
language: ja
title: Vagrant コマンドまとめ（前半戦) | vagrant command line interface
slug: /2017/03/05/vagrant-commands-summary
createdAt: 2017-03-05 14:03:12
updatedAt: 2018-08-26 12:27:02
thumbnail: /2017/03/20170305_vagrant-commands-summary/thumbnail.png
categories:
  - engineering
  - rails
  - for-beginner
tags:
  - vagrant
  - serverside
related:
  - dummy
---

&nbsp;

ある日vagrantコマンドを引数なしで
叩いてしまったことが
ありました。

&nbsp;

そうするとvagrantコマンドの一覧が出てきました。
コマンドではままあることなので、
驚きはしなかったのですが、
知らないコマンドがままあったので、
調べてまとめてみました。

と思いましたが、
途中で息切れしたので、前半戦だけ。

&nbsp;
```markdown
box             manages boxes: installation, removal, etc.
connect         connect to a remotely shared Vagrant environment
destroy         stops and deletes all traces of the vagrant machine
global-status   outputs status Vagrant environments for this user
halt            stops the vagrant machine
help            shows the help for a subcommand
init            initializes a new Vagrant environment by creating a Vagrantfile
login           log in to HashiCorp's Atlas
package         packages a running vagrant environment into a box
plugin          manages plugins: install, uninstall, update, etc.
port            displays information about guest port mappings
powershell      connects to machine via powershell remoting
provision       provisions the vagrant machine
push            deploys code in this environment to a configured destination
rdp             connects to machine via RDP
reload          restarts vagrant machine, loads new Vagrantfile configuration
resume          resume a suspended vagrant machine
share           share your Vagrant environment with anyone in the world
snapshot        manages snapshots: saving, restoring, etc.
ssh             connects to machine via SSH
ssh-config      outputs OpenSSH valid configuration to connect to the machine
status          outputs status of the vagrant machine
suspend         suspends the machine
up              starts and provisions the vagrant environment
version         prints current and latest Vagrant version

```
全部で25個です。

<div class="adsense"></div>

&nbsp;
<h2>1. vagrant up</h2>


まずは簡単なところから,
vagrantのイメージを起動します。
さらに起動後にprovisionも実行してくれます。

&nbsp;
<h2>2. vagrant halt</h2>


イメージの停止。

&nbsp;
<h2>3. vagrant reload</h2>

イメージの再起動。

&nbsp;
<h2>4. vagrant version</h2>


vagrantのバージョンを標準出力に出力。
```bash
$vagrant version
Installed Version: 1.9.1
Latest Version: 1.9.2

To upgrade to the latest version, visit the downloads page and
download and install the latest version of Vagrant from the URL
below:

  https://www.vagrantup.com/downloads.html

If you're curious what changed in the latest release, view the
CHANGELOG below:

  https://github.com/mitchellh/vagrant/blob/v1.9.2/CHANGELOG.md

```
&nbsp;

&nbsp;
<h2>5. vagrant status</h2>

vagrantイメージの状態（起動/停止)を表示。


<h2>6. vagrant destroy</h2>

イメージの削除。
こうやってサーバを簡単に作ったり、消したり
できるのが良いところですよね。

&nbsp;
<h2>7. vagrant init</h2>


vagrant の初期化。
vagrant init で初期化ファイルを作成してくれる。
ubuntu 16を使いたい時は、

```bash
vagrant init ubuntu/xenial64
```
第一引数にをconfig.vm.boxに設定してVagrantfile
を作成してくれる。

--minimalオプションをつけると
最小限の記述のVagrantファイルを作成してくれる。
```bash
Vagrant.configure("2") do |config|
  config.vm.box = "base"
end

```
urlからboxを作成する場合は、
```bash
$ vagrant init my-company-box https://boxes.company.com/my-company.box

```
のようにする。

<h2>8. vagrant ssh</h2>

ゲストOSにssh接続。
-cオプションをつけると,ssh接続してコマンドを投げられる。

<h2>9. vagrant ssh-config</h2>

vagrant sshする時のsshの設定を出力。

```bash
$vagrant ssh-config
Host default
  HostName 127.0.0.1
  User ubuntu
  Port 2222
  UserKnownHostsFile /dev/null
  StrictHostKeyChecking no
  PasswordAuthentication no
  IdentityFile /Users/jo/Vagrant/node/.vagrant/machines/default/virtualbox/private_key
  IdentitiesOnly yes
  LogLevel FATAL
```

<h2>10. vagrant suspend</h2>

イメージの一時停止。

&nbsp;
<h2>11. vagrant resume</h2>

一時停止されたイメージの再起動。

&nbsp;
<h2>12. vagrant box</h2>

vagrant boxの管理。
box とは、vagrantイメージにインストールする際の
OSのスナップショットのようなもの。
<ul>
 	<li>list　・・・ Vagrant Box の表示。</li>
 	<li>add　・・・ Vagrant Box の追加。</li>
 	<li>remove ・・・ Vagrant Box の削除。</li>
 	<li>outdated ・・・ Vagrant Box が最新かどうか確認。</li>
 	<li>update ・・・ Vagrant Boxを最新にアップデート。</li>
 	<li>repackage ・・・ 指定したイメージをboxにパッケージする。</li>
</ul>
&nbsp;
<h2>13. vagrant global-status</h2>

ホストマシーンのvagrantイメージの状態を確認できます。
runningなbox2を停止させたい場合は、
<strong>vagrant halt a8f6bbc</strong>で停止できる。
```bash
vagrant global-status
id       name    provider   state    directory
-------------------------------------------------------------------------
4a9f8c4  default virtualbox poweroff /Users/version1/Vagrant/box1
a8f6bbc  default virtualbox running  /Users/version1/Vagrant/box2
a08e8e9  default virtualbox running  /Users/version1/Vagrant/box3

```
&nbsp;
<h2>14. vagrant port</h2>


こんな感じで、
ゲストマシーンのホストマシーンにマッピングされた
ポートを確認できる。
```bash
$vagrant port
The forwarded ports for the machine are listed below. Please note that
these values may differ from values configured in the Vagrantfile if the
provider supports automatic port collision detection and resolution.

    22 (guest) => 2222 (host)

```
&nbsp;
<h2>15. vagrant powershell</h2>

powershellを起動できる模様。
macでやって見たけど、普通にwindowsじゃないとねと言われる。

&nbsp;

全部まとめようとしましたが、
息切れしてきたので、
前半として一旦区切ります。

調子の良い時に後半戦まとめます。
