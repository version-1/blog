---
templateKey: blog-post
language: ja
title: CakePHPでテスト PHPUnitを使ったテスト
slug: /2017/02/17/cakephp-phpunit
createdAt: 2017-02-17 22:29:21
updatedAt: 2020-01-03 02:34:05
thumbnail: /2017/02/20170217_cakephp-phpunit/thumbnail.png
categories:
  - engineering
  - for-beginner
tags:
  - cakephp
  - php
  - phpunit
  - serverside
related:
  - dummy
---
&nbsp;

さて今回は PHPUnitを使ったテストです。

自分の<a href="http://kabu-ka.net/">運営しているサイト</a>に修正が必要

だったので、
修正がてらテストコードも書いて見ました。
<div class="adsense"></div>
&nbsp;
<h2 class="chapter">CakePHP で PHPUnitを使う。</h2>


&nbsp;

CakePHPではPHPUnitの使用が想定されているので、
Composerで簡単に導入できます。

&nbsp;

早速ですが、composerで依存性を追加
```php
$ php composer.phar require --dev phpunit/phpunit:"<6.0"
```
&nbsp;

Fixturesで使用するDBの設定
```php
'test' => [
        'datasource' => 'Cake\Database\Driver\Mysql',
        'persistent' => false,
        'host' => 'dbhost',
        'username' => 'dblogin',
        'password' => 'dbpassword',
        'database' => 'test_database'
    ],

```
&nbsp;
&nbsp;
<h2 class="chapter">早速テストの実行</h2>

&nbsp;

テストの実行は以下のコマンドで
```bash
vendor/bin/phpunit
```
&nbsp;

&nbsp;

まずはなにも書かず実行してみます。
```bash
$vendor/bin/phpunit
PHPUnit 5.7.13 by Sebastian Bergmann and contributors.

.IIIII....IIIIIII.                                                18 / 18 (100%)

Time: 506 ms, Memory: 15.25MB

OK, but incomplete, skipped, or risky tests!
Tests: 18, Assertions: 24, Incomplete: 12.

```
こうやって実行すると、
tests/TestCase の下のテストコードたちが
実行されます。

&nbsp;

&nbsp;

細かい規約は以下 CakePHPの<a href="https://book.cakephp.org/3.0/ja/development/testing.html">CookBook</a>から引用

- テストを含むPHPファイルは、 tests/TestCase/[Type] ディレクトリに置きます。
- ファイル名の最後は必ずただ .php とだけ書くのではなく Test.php とします。
- テストを含むクラスは `Cake\TestSuite\TestCase` 、 `Cake\TestSuite\IntegrationTestCase` または `\PHPUnit_Framework_TestCase` を継承する必要があります。
- 他のクラス名と同様に、テストケースのクラス名はファイル名と一致する必要があります。 RouterTest.php は、 class RouterTest extends TestCase が含まれている 必要があります。
- テストを含むメソッド (つまり、アサーションを含むメソッド) の名前は testPublished() のように test で始める必要があります。 @test というアノテーションをメソッドに マークすることでテストメソッドとすることもできます。
&nbsp;

これだけではなにもわからないので、
実際にサイトで使われているコードのテストの一部を
書いて見ました。

&nbsp;

&nbsp;

テストをするのはCommonServiceの
<strong>getLatestDate</strong>というメソッドで、

現在取得している株価の中で<strong>最新日付</strong>を
返してくれます。
具体的にいうと
今日が2017年の2月17日だとして、
17日の株価がまだ取得できていない時は、
2月の16日の日付を返してくれるというようなものです。
そしてもし、データ自体がない場合はNullを返します。

&nbsp;

以下、実際のコードです
```php
use Cake\TestSuite\IntegrationTestCase;
use App\Service\CommonService;
use Cake\ORM\TableRegistry;

/**
 * Created by PhpStorm.
 * User: version1
 * Date: 2017/02/17
 * Time: 20:26
 */
class RankingsServiceTest extends IntegrationTestCase
{
    private $common;
    private $kabukaTbl;
    public $fixtures = ['app.Commons/normal','app.Commons/empty'];

    function setUp()
    {
        $this->common = new CommonService();
        $this->kabukaTbl = TableRegistry::get('KabukaTbl');
    }

    /** getLatestDate is expected to return null
     *  when the result of select is empty.
     */
    function testGetLatestDate()
    {
        // load fixture
        $this->loadFixtures('Normal');
        $result = $this->common->getLatestDate();
        assert('2017-02-17', $result);
    }

    /** getLatestDate is expected to return null
     *  when the result of select is empty.
     */
    function testGetLatestDateError()
    {
        // load fixture
        $this->loadFixtures('Empty');
        $result = $this->common->getLatestDate();
        echo $result ;
        self::assertNull($result);
    }
}

```
コードはだいぶ端折っていて、
正常に日付が返るケースとデータがないケース
のみのテストになります。

その中でもポイントはいくつかあって
<ul>
 	<li>1.テスト前の準備メソッド<strong>setUp()</strong></li>
 	<li>2.Fixtureの読み込み</li>
</ul>
の二つがポイントです。

&nbsp;

&nbsp;
<h2 class="chapter">テスト前の準備メソッドsetUp</h2>

テストクラスに<strong>setUp()</strong>メソッドを実装すると
クラス単位でのテストが始まる前に何らかの処理
例えば、テスト用のインスタンスの生成などを行えます。

また上では使っていませんが、
全テストの終了後の処理は、
<strong>tearDown()</strong>メソッドで実装できます。

&nbsp;

&nbsp;

&nbsp;
<h2 class="chapter">Fixturesの読み込み</h2>


Fixtureとはテストを行う際に
自動でデータベースにあらかじめ用意したデータを挿入し、
テスト後に削除するという形になります。

コードを見るとわかるのですが、
```bash
public $fixtures = ['app.Commons/normal','app.Commons/empty'];
```
で使用するFixtureを選択し、
```
$this->loadFixtures('Normal');
```
のような形でテストケースごとに使用するFixtureを分けています。

また、
最初に読み込む時に 'app.commons' とすれば
tests/Fixtures/CommonsFixture.phpのような
Fixtures直下のものを読み込むことができます。

ただ、
１クラスにより複数種のデータを扱うテストがあることも考えると
一段Directoryを切って、
Fixturesをグループ化するということも大切です。

&nbsp;

以上、自分のサイトのソースを使い、
CakePHPで
テストコードを書いてみました。

実際のサイトにはここで書いた以上のテストを書く必要がありそうです。。

<a href="http://kabu-ka.net">http://kabu-ka.net</a>

&nbsp;

私が去年から始めた株価データベースサイトです。
興味がおありでしたら覗いて見てください。。
