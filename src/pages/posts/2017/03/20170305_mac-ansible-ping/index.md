---
templateKey: blog-post
title: (Mac)Ansible を使ってみる
slug: /2017/03/05/mac-ansible-ping
createdAt: 2017-03-05 21:02:22
updatedAt: 2018-08-29 08:48:45
thumbnail: /2017/03/20170305_mac-ansible-ping/thumbnail.png
categories:
  - engineering
  - rails
tags:
  - dummy
related:
  - dummy
---

&nbsp;

以前に以下のような
<a href="https://ver-1-0.net/2017/01/12/ansible-for-mac/">Ansible Install for Mac | Macのための Ansible Install</a>
記事を書いていましたが、
しばらく勉強が止まってしまっていました。

&nbsp;

&nbsp;

今回は、
自分のPC上にVagrantで仮想環境を作成し、
それをAnsibleで操作するための接続設定・接続確認
というのをやりたいと思います。

<div class="adsense"></div>

まずは、操作するサーバ(Vagrantの構築から)
```bash
vagrant init ubuntu/xenial64
vagrant up

```

&nbsp;
```bash
$vagrant up
Bringing machine 'default' up with 'virtualbox' provider...
==> default: Importing base box 'ubuntu/xenial64'...
==> default: Matching MAC address for NAT networking...
==> default: Checking if box 'ubuntu/xenial64' is up to date...
==> default: A newer version of the box 'ubuntu/xenial64' is available! You currently
==> default: have version '20170104.0.0'. The latest is version '20170303.1.0'. Run
==> default: `vagrant box update` to update.
==> default: Setting the name of the VM: test_default_1488712807930_72913
==> default: Fixed port collision for 22 => 2222. Now on port 2200.
==> default: Clearing any previously set network interfaces...
==> default: Preparing network interfaces based on configuration...
    default: Adapter 1: nat
==> default: Forwarding ports...
    default: 22 (guest) => 2200 (host) (adapter 1)
==> default: Running 'pre-boot' VM customizations...
==> default: Booting VM...
==> default: Waiting for machine to boot. This may take a few minutes...
    default: SSH address: 127.0.0.1:2200
    default: SSH username: ubuntu
    default: SSH auth method: password
    default: Warning: Remote connection disconnect. Retrying...
    default: Warning: Remote connection disconnect. Retrying...
    default: Warning: Authentication failure. Retrying...
    default: Warning: Authentication failure. Retrying...
    default: Warning: Authentication failure. Retrying...
    default: Warning: Remote connection disconnect. Retrying...
    default:
    default: Inserting generated public key within guest...
    default: Removing insecure key from the guest if it's present...
    default: Key inserted! Disconnecting and reconnecting using new SSH key...
==> default: Machine booted and ready!
==> default: Checking for guest additions in VM...
    default: The guest additions on this VM do not match the installed version of
    default: VirtualBox! In most cases this is fine, but in rare cases it can
    default: prevent things such as shared folders from working properly. If you see
    default: shared folder errors, please make sure the guest additions within the
    default: virtual machine match the version of VirtualBox you have installed on
    default: your host and reload your VM.
    default:
    default: Guest Additions Version: 5.0.24
    default: VirtualBox Version: 5.1
==> default: Mounting shared folders...
    default: /vagrant => /Users/jo/Vagrant/test

```

これでAnsibleで操作するサーバの準備はOK

次にAnsibleの準備。
管理人の場合は~/Ansibleというディレクトリを作って、
そこの下に接続に必要なファイルを置きます。

デフォルトでは、
<strong>/etc/ansible/hosts</strong>
というファイルが作られるので、
いちいちオプションを指定するのが面倒な人は
こちらにホストの定義を行うと良いかと思います。</pre>
```bash
cd
mkdir Ansible && touch inventory/host

```
このhostファイルに接続設定を書き込みます。
が、その前に先ほど作成したVagrantイメージの
SSH接続情報を調べて置きましょう。

調べ方は以下、
```bash
cd ../Vagrant/test/
$vagrant ssh-config
Host default
  HostName 127.0.0.1
  User ubuntu
  Port 2200
  UserKnownHostsFile /dev/null
  StrictHostKeyChecking no
  PasswordAuthentication no
  IdentityFile /Users/version1/Vagrant/test/.vagrant/machines/default/virtualbox/private_key
  IdentitiesOnly yes
  LogLevel FATAL

```
これで、秘密鍵の場所とport番号,User名などがわかりました。
ではそれを設定に書き込みましょう。
```ini
[target]
[targets]
127.0.0.1 ansible_user=ubuntu ansible_port=2200 ansible_ssh_private_key_file=/Users/jo/Vagrant/t    est/.vagrant/machines/default/virtualbox/private_key

```
接続する際の情報が
以下にそれぞれ書き込めば完了です。

ユーザ名: ansible_user
ポート番号: ansible_port
秘密鍵:ansible_ssh_private_key_file

これで準備完了したので、
早速ansibleを動かして疎通確認を行いましょう。
```bash
ansible all -i inventory/hosts -m ping

```
これでpingというModuleを使い疎通確認を行います。

それでは実行
```bash
$ansible all -i inventory/hosts -m ping
127.0.0.1 | FAILED! => {
    "changed": false,
    "failed": true,
    "module_stderr": "Shared connection to 127.0.0.1 closed.\r\n",
    "module_stdout": "/bin/sh: 1: /usr/bin/python: not found\r\n",
    "msg": "MODULE FAILURE"
}

```
&nbsp;

&nbsp;

おっと失敗、メッセージを見るからに
<strong>/usr/bin/python</strong>が
ないと言われているのでvagrant にSSHで接続してシンボリックリンク作成。
```bash
vagrant ssh
sudo ln -s /usr/bin/python3 /usr/bin/python

```
&nbsp;

&nbsp;

これでAnsibleさんがリモートホストの
pythonを使ってリモート操作ができるはず。

実行。
```bash
$ansible all -i inventory/hosts -m ping
The authenticity of host '[127.0.0.1]:2200 ([127.0.0.1]:2200)' can't be established.
ECDSA key fingerprint is SHA256:KjjtevSpvebZmVWHpc9nASxWwoD2fMPAy9a61i+6Nac.
Are you sure you want to continue connecting (yes/no)? yes
127.0.0.1 | SUCCESS => {
    "changed": false,
    "ping": "pong"
}

```
&nbsp;

&nbsp;

見事成功しました。
これで疎通の確認は終わったので、

次回以降Playbookなどを使って
さらに実践的な内容を使っていきたです。
