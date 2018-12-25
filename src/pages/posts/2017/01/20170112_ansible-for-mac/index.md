---
templateKey: blog-post
title: Ansible Install for Mac | Macのための Ansible Install
slug: /2017/01/12/ansible-for-mac
createdAt: 2017-01-12 00:21:21
updatedAt: 2018-08-26 12:48:17
thumbnail: ./thumbnail.png
categories: 
  - engineering
  - for-beginner
---

&nbsp;

&nbsp;

環境構築自動化、構成管理などのキーワードに惹かれ、
Ansible勉強のためインストールします。

以下手順です。

Mac OSXを前提としていますが、
Mac はpython2系がデフォルトで入っているようなのでまず
python3のインストールから。
[after_intro]

&nbsp;
<h2 class="chapter">①python3インストール</h2>
&nbsp;

&nbsp;

pythonのバージョンの管理ができるpyenvをインストール
```bash
brew install pyenv
```
~/.bashrcにpyenvの環境変数等を設定
<pre>export PYENV_ROOT="$HOME/.pyenv"
export PATH="$PYENV_ROOT/bin:$PATH"
eval "$(pyenv init -)"
</pre>
python3をインストール
```bash
pyenv install 3.5.0
pyenv global 3.5.0
pyenv rehash

```
インストールされたことを確認
```bash
$python --version
Python 3.5.0 # OK !!!
```
&nbsp;
<h2 class="chapter">③パッケージ管理ツールpipをインストール</h2>
&nbsp;
```bash
easy_install pip

```
&nbsp;
<h2 class="chapter">④Ansible をインストール</h2>
&nbsp;
```bash
sudo pip install ansible
```
正常にインストールされたことを確認
```bash
$ansible --version
ansible 2.2.0.0
```
次以降は、
AnsibleとVagantを組み合わせて
CakePHP( or Rails)の環境を作れるように
