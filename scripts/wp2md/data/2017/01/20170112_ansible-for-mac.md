---
templateKey: blog-post
title: Ansible Install for Mac | Macのための Ansible Install
slug: 2017/01/12/ansible-for-mac
description: &nbsp;

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
<pre><code class="languag
createdAt: 2017-01-12 00:21:21
updatedAt: 2018-08-26 12:48:17
thumbnail: http://ver-1-0.net/wp-content/uploads/2017/01/AnsibleLogo_transparent_web.png
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
<pre><code class="language-bash">brew install pyenv</code></pre>
~/.bashrcにpyenvの環境変数等を設定
<pre>export PYENV_ROOT="$HOME/.pyenv"
export PATH="$PYENV_ROOT/bin:$PATH"
eval "$(pyenv init -)"
</pre>
python3をインストール
<pre><code class="language-bash">pyenv install 3.5.0
pyenv global 3.5.0
pyenv rehash
</code></pre>
インストールされたことを確認
<pre><code class="language-bash">$python --version
Python 3.5.0 # OK !!!</code></pre>
&nbsp;
<h2 class="chapter">③パッケージ管理ツールpipをインストール</h2>
&nbsp;
<pre><code class="language-bash">easy_install pip
</code></pre>
&nbsp;
<h2 class="chapter">④Ansible をインストール</h2>
&nbsp;
<pre><code class="language-bash">sudo pip install ansible</code></pre>
正常にインストールされたことを確認
<pre><code class="language-bash">$ansible --version
ansible 2.2.0.0</code></pre>
次以降は、
AnsibleとVagantを組み合わせて
CakePHP( or Rails)の環境を作れるように
