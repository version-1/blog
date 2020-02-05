---
templateKey: blog-post
language: ja
title: CakePHPをインストール
slug: /2017/01/03/cakephp-install
createdAt: 2017-01-03 21:09:23
updatedAt: 2018-08-26 12:52:07
thumbnail: /2017/01/20170103_cakephp-install/thumbnail.png
categories:
  - engineering
  - for-beginner
tags:
  - build-env
  - php
  - cakephp
related:
  - dummy
---

OSはLubuntu 16.0.4

<h2 class="chapter">PHPの7.0インストール</h2>
まずはPHPをインストール

```bash
sudo apt-get install php7.0-cli

```

```php
php -v
PHP 7.0.8-3ubuntu3 (cli) ( NTS )
Copyright (c) 1997-2016 The PHP Group
Zend Engine v3.0.0, Copyright (c) 1998-2016 Zend Technologies
    with Zend OPcache v7.0.8-3ubuntu3, Copyright (c) 1999-2016, by Zend Technologies

```

<a href="https://book.cakephp.org/3.0/ja/installation.html">https://book.cakephp.org/3.0/ja/installation.html</a>

&nbsp;

<div class="adsense"></div>

&nbsp;

<h2>CakePHPインストール</h2>

<h4>CakePHP に必要なライブラリをインストール</h4>

```bash
sudo apt-get install php-mbstring php-intl php-mysqli

```

&nbsp;

<h4>composer のインストール</h4>

ここからダウンロード
<a href="https://getcomposer.org/download/">https://getcomposer.org/download/</a>
ダウンロードしたcomposerにパスが通るように移動

```bash
mv composer.phar /usr/local/bin/composer
```


```bash
composer self-update && composer create-project --prefer-dist cakephp/app my_app_name
```



```bash
$ composer self-update && composer create-project --prefer-dist cakephp/app my_app_name
You are already using composer version 1.3.0 (stable channel).
Do not run Composer as root/super user! See https://getcomposer.org/root for details
Installing cakephp/app (3.3.5)
  - Installing cakephp/app (3.3.5) Downloading: 100%
Created project in my_app_name
Loading composer repositories with package information
Updating dependencies (including require-dev)
Package operations: 26 installs, 0 updates, 0 removals
  - Installing aura/installer-default (1.0.0) Downloading: 100%
  - Installing cakephp/plugin-installer (0.0.15) Downloading: 100%
  - Installing mobiledetect/mobiledetectlib (2.8.24) Downloading: 100%
  - Installing psr/http-message (1.0.1) Downloading: 100%
  - Installing zendframework/zend-diactoros (1.3.7) Downloading: 100%
  - Installing aura/intl (1.1.1) Downloading: 100%
  - Installing cakephp/chronos (1.0.3) Downloading: 100%
  - Installing psr/log (1.0.2) Downloading: 100%
  - Installing cakephp/cakephp (3.3.11) Downloading: 100%
  - Installing symfony/yaml (v3.2.1) Downloading: 100%
  - Installing symfony/debug (v3.2.1) Downloading: 100%
  - Installing symfony/polyfill-mbstring (v1.3.0) Downloading: 100%
  - Installing symfony/console (v3.2.1) Downloading: 100%
  - Installing symfony/filesystem (v3.2.1) Downloading: 100%
  - Installing symfony/config (v3.2.1) Downloading: 100%
  - Installing robmorgan/phinx (v0.6.5) Downloading: 100%
  - Installing cakephp/migrations (1.6.6) Downloading: 100%
  - Installing jakub-onderka/php-console-color (0.1) Downloading: 100%
  - Installing jakub-onderka/php-console-highlighter (v0.3.2) Downloading: 100%
  - Installing dnoegel/php-xdg-base-dir (0.1) Downloading: 100%
  - Installing nikic/php-parser (v3.0.2) Downloading: 100%
  - Installing symfony/var-dumper (v3.2.1) Downloading: 100%
  - Installing psy/psysh (v0.8.0) Downloading: 100%
  - Installing jdorn/sql-formatter (v1.2.17) Downloading: 100%
  - Installing cakephp/debug_kit (3.5.0) Downloading: 100%
  - Installing cakephp/bake (1.2.10) Downloading: 100%
cakephp/app suggests installing markstory/asset_compress (An asset compression plugin which provides file concatenation and a flexible filter system for preprocessing and minification.)
cakephp/app suggests installing phpunit/phpunit (Allows automated tests to be run without system-wide install.)
cakephp/app suggests installing cakephp/cakephp-codesniffer (Allows to check the code against the coding standards used in CakePHP.)
symfony/console suggests installing symfony/event-dispatcher ()
symfony/console suggests installing symfony/process ()
symfony/var-dumper suggests installing ext-symfony_debug ()
psy/psysh suggests installing ext-pdo-sqlite (The doc command requires SQLite to work.)
psy/psysh suggests installing hoa/console (A pure PHP readline implementation. You'll want this if your PHP install doesn't already support readline or libedit.)
cakephp/debug_kit suggests installing ext-sqlite (DebugKit needs to store panel data in a database. SQLite is simple and easy to use.)
Writing lock file
Generating autoload files
> Cake\Composer\Installer\PluginInstaller::postAutoloadDump
> App\Console\Installer::postInstall
Created `config/app.php` file
Set Folder Permissions ? (Default to Y) [Y,n]? Y
Permissions set on /mnt/VBShare/projects/php/my_app_name/tmp/cache
Permissions set on /mnt/VBShare/projects/php/my_app_name/tmp/cache/models
Permissions set on /mnt/VBShare/projects/php/my_app_name/tmp/cache/persistent
Permissions set on /mnt/VBShare/projects/php/my_app_name/tmp/cache/views
Permissions set on /mnt/VBShare/projects/php/my_app_name/tmp/sessions
Permissions set on /mnt/VBShare/projects/php/my_app_name/tmp/tests
Permissions set on /mnt/VBShare/projects/php/my_app_name/tmp
Permissions set on /mnt/VBShare/projects/php/my_app_name/logs

```

mysql をインストール
```bash
sudo apt-get install mysql-server
```

mysql を起動
```bash
sudo service mysql start
```

アプリケーション用DBを作成
```bash
sudo service mysql start
mysql -u root -pxxxxx -e "create database myapp"

```

config/app.phpの220行あたりのデータベース接続情報を変更

```bash
 'Datasources' => [
        'default' => [
            'className' => 'Cake\Database\Connection',
            'driver' => 'Cake\Database\Driver\Mysql',
            'persistent' => false,
            'host' => 'localhost',
            /**
             * CakePHP will use the default DB port based on the driver selected
             * MySQL on MAMP uses port 8889, MAMP users will want to uncomment
             * the following line and set the port accordingly
             */
            //'port' => 'non_standard_port_number',
            'username' => 'user',
            'password' => 'password',
            'database' => 'myapp',
            'encoding' => 'utf8',
            'timezone' => 'UTC',
            'flags' => [],
            'cacheMetadata' => true,
            'log' => false,

```

<h2>サーバを起動して稼動確認</h2>

```bash
$bin/cake server -H 0.0.0.0
```

ブラウザから接続下記画面で

<img class="post-image" src="https://statics.ver-1-0.xyz/uploads/2017/01/20170103_cakephp-install/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88-2017-01-03-18.52.23-300x274.png"/>
