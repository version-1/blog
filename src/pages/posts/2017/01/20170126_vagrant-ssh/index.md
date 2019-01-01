---
templateKey: blog-post
title: \[Vagrant\] Vagrant ssh の設定の変更
slug: /2017/01/26/vagrant-ssh
createdAt: 2017-01-26 23:19:36
updatedAt: 2018-08-26 12:40:31
thumbnail: /2017/01/20170126_vagrant-ssh/thumbnail.png
categories: 
  - engineering
---

今回はVagrant sshの話です。

Vagrant は vagrantでupした後に
vagrant ssh で 起動したvagrant boxにsshで接続できます。

Virtual Box とかだと、SSH serverはもともとインストールされているので、
問題はないとしても ホストオンリーアダプタの設定とかは
結構面倒臭いですよね。

vagrant だとサーバー起動してからsshでつなぐまで
設定が入りません。

が、
vagrant ssh をrootでつなぎたい別のユーザでつなぎたいなど
あるかと思います。

そんな時は、
Vagrantfile に設定を書くことで設定を変更することができます。

```bash
config.ssh.username = "hoge"
config.ssh.password = "hoge"
config.ssh.host = ""
config.ssh.port = ""
config.ssh.private_key_path = ""

```

これで
vagrant reload で設定ファイルを読み込んで
vagrant ssh-config
すると設定が変わります。



また、
<strong>vagrant ssh-config >> .ssh/config</strong>
として
ssh のconfigを設定してあげることもできます。


vagrant は設定で色々できそうなので、
時間あるときにもう少し知識つけていきたいですね。
