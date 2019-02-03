---
templateKey: blog-post
title: Google AnalyticsからPV順に記事を取得するその①
slug: /2017/11/04/ga-fetch-order-by-pv-1
createdAt: 2017-11-04 22:26:09
updatedAt: 2018-08-26 11:28:49
thumbnail: /2017/11/20171104_ga-fetch-order-by-pv-1/thumbnail.jpg
categories:
  - engineering
  - rails
tags:
  - dummy
related:
  - dummy
---

唐突ですが、
だいたいどのブログにも人気記事やよく読まれている記事
ってウィジェットなどにしてまとめて載っけてありますよね。

ただ、人気の記事ってなんだ？っていう話があったりします。
( qiitaとかだといいねの順に並んでる。）
私のブログでも人気記事をwordpressプラグインを使っていくつか
サイドバーに表示していました。

が、
そのプラグインが出した記事のリストを見てみると
普段私がGoogle Analyticsで確認しているPVのランキングと
だいぶ違っています。

そこで、
ちょっとプラグインを調べてみるとプラグイン独自のデータを
データベースに保持して、
その結果から人気記事を取得してきているようでした。

え正直、
**「これ、自分からのアクセスとかも含まれるのでは・・・」**
という感想を持ちましたし、
そもそもいちいちDatabaseにアクセスしていて重そうとも
思いました。
ということで、
Google AnalyticsのPVを取得してきて人気記事を調べたいなと思ったので、
Google AnalyticsのAPIを使ってPV順に記事を取得できる
方法を調べて見ました。


<div class="adsense"></div>

<h2 class="chapter">Google Analytics APIを使うための設定</h2>

では、早速APIからデータを取って来よう！！
という前にいくつか設定が必要なようです。

詳しくはこちらについて書いてありますが
<a href="https://developers.google.com/analytics/devguides/reporting/core/v3/quickstart/service-php?hl=ja">https://developers.google.com/analytics/devguides/reporting/core/v3/quickstart/service-php?hl=ja</a>

必要な手順を解説していきます。

<h3>サービスアカウントの作成</h3>

まず、
サービスアカウントを作成していきます。
リンク先にあるように<a href="https://console.developers.google.com/start/api?id=analytics&amp;credential=client_key&amp;hl=ja">セットアップツール</a>を利用してアカウントを作成していきます。

最初の画面はそのまま続行としておきましょう。
そのままプロジェクトを作成してしまいます。

<img class="post-image" src="https://statics.ver-1-0.net/uploads/2017/11/20171104_ga-fetch-order-by-pv-1/Screen-Shot-2017-11-04-at-21.32.52.png" alt="Screen-Shot-2017-11-04-at-21.32.52.png"/>

次の画面でAPIを有効化します。
画面ではすでにAPIが有効になっていたようです。
そのまま認証情報に進みます。

<img class="post-image" src="https://statics.ver-1-0.net/uploads/2017/11/20171104_ga-fetch-order-by-pv-1/Screen-Shot-2017-11-04-at-21.33.02.png" alt="Screen-Shot-2017-11-04-at-21.33.02.png"/>

次の画面で認証情報を追加しますが、
<img class="post-image" src="https://statics.ver-1-0.net/uploads/2017/11/20171104_ga-fetch-order-by-pv-1/Screen-Shot-2017-11-04-at-21.33.27.png" alt="Screen-Shot-2017-11-04-at-21.33.27.png"/>


サービスアカウント名は任意なので、
好きな名前を使いましょう。


<img class="post-image" src="https://statics.ver-1-0.net/uploads/2017/11/20171104_ga-fetch-order-by-pv-1/Screen-Shot-2017-11-04-at-21.33.50-1024x649.png" alt="Screen-Shot-2017-11-04-at-21.33.50-1024x649.png"/>

この画面で「サービスアカウントID」は後の手順で使用するので保管しておきます。
次へをクリックすると
サービスアカウントの鍵が生成されてダウンロードされます。
大事な鍵なので大切に保管しておきましょう。

<h3>Google Analyticsヘのユーザ追加</h3>

これを忘れるとAPIでアクセスした場合に、
権限がないですと怒られるので確実に行いましょう。

Google Analyticsにログインして、
「左下の歯車のアイコンをクリック」→「ユーザ管理」
で先の「サービスアカウントID」（メールアドレスのようなやつ）を使ってユーザを作成します。
権限は最低限表示と分析だけは付加してあげましょう。

<img class="post-image" src="https://statics.ver-1-0.net/uploads/2017/11/20171104_ga-fetch-order-by-pv-1/google-analytics-add-user-1024x443.png" alt="google-analytics-add-user-1024x443.png"/>


<div class="mid-article"></div>

<h2 class="chapter">Analytics APIを使ってページごとのPVを取得</h2>

まずは、
composerを使ってGoogle Client APIライブラリを取得します。
```bash
composer require google/apiclient:^2.0
```
ライブラリがインストールできたら、
下記のreport.phpファイルを作成します。

まず気をつけるのは、
自分のブログのView IDで

```php
$VIEW_ID = "< REPLACE YOUR VIEW ID>";
```
の部分を書き換えることです。


自分のView IDは下記ツールで調べるか、
<a href="https://ga-dev-tools.appspot.com/account-explorer/?hl=ja">Account Exploer</a>
Google Analyticsから確認できます。

&nbsp;

&nbsp;

また、先の手順で取得した鍵ファイル（json)を下記のサンプルコード
report.phpと同じ階層のディレクトリにおき、
名前を「service-account-credentials.json」とします。

&nbsp;

report.php
```php
<?php

require_once __DIR__ . '/vendor/autoload.php';

$analytics = initializeAnalytics();
$response = getReport($analytics);
printResults($response, $argv[1]);

function initializeAnalytics()
{
    $KEY_FILE_LOCATION = __DIR__ . '/service-account-credentials.json';

    $client = new Google_Client();
    $client->setApplicationName("Hello Analytics Reporting");
    $client->setAuthConfig($KEY_FILE_LOCATION);
    $client->setScopes(['https://www.googleapis.com/auth/analytics.readonly']);
    $analytics = new Google_Service_AnalyticsReporting($client);

    return $analytics;
}

function getReport($analytics) {

    // Replace with your view ID, for example XXXX.
    $VIEW_ID = "< REPLACE YOUR VIEW ID>";

    // Create the DateRange object.
    $dateRange = new Google_Service_AnalyticsReporting_DateRange();
    $dateRange->setStartDate("90daysAgo");
    $dateRange->setEndDate("today");


    // Create the Metrics object.
    $sessions = new Google_Service_AnalyticsReporting_Metric();
    $sessions->setExpression("ga:pageviews");
    $sessions->setAlias("pv");

    // Create the Dimension object.
    $dimention = new Google_Service_AnalyticsReporting_Dimension();
    $dimention->setName("ga:pagePath");

    // Filter
    $filter = new Google_Service_AnalyticsReporting_DimensionFilter();
    $filter->setDimensionName("ga:pagePathLevel4");
    $filter->setNot(true);
    $filter->setOperator("IN_LIST");
    $filter->setExpressions( ["/", "/profile/"] );


    $filters = new Google_Service_AnalyticsReporting_DimensionFilterClause();
    $filters->setFilters(array($filter));

    // OrderBy
    $orderby = new Google_Service_AnalyticsReporting_OrderBy();
    $orderby->setFieldName("ga:pageviews");
    $orderby->setOrderType("VALUE");
    $orderby->setSortOrder("DESCENDING");

    // Create the ReportRequest object.
    $request = new Google_Service_AnalyticsReporting_ReportRequest();
    $request->setViewId($VIEW_ID);
    $request->setDateRanges($dateRange);
    $request->setMetrics(array($sessions));
    $request->setDimensions(array($dimention));
    $request->setDimensionFilterClauses(array($filters));
    $request->setOrderBys($orderby);

    $body = new Google_Service_AnalyticsReporting_GetReportsRequest();
    $body->setReportRequests( array( $request) );

    return $analytics->reports->batchGet( $body );
}

function printResults($reports , $count) {
    for ( $reportIndex = 0; $reportIndex < count($reports); $reportIndex++ ) { $report = $reports[ $reportIndex ]; $header = $report->getColumnHeader();
        $dimensionHeaders = $header->getDimensions();
        $metricHeaders = $header->getMetricHeader()->getMetricHeaderEntries();
        $rows = $report->getData()->getRows();

        for ( $rowIndex = 0; $rowIndex < $count; $rowIndex++) { $row = $rows[ $rowIndex ]; $dimensions = $row->getDimensions();
            $metrics = $row->getMetrics();
            for ($i = 0; $i < count($dimensionHeaders) && $i < count($dimensions); $i++) {
                print($dimensionHeaders[$i] . ": " . $dimensions[$i] . "\n");
            }

            for ($j = 0; $j < count( $metricHeaders ) && $j < count( $metrics ); $j++) { $entry = $metricHeaders[$j]; $values = $metrics[$j]; print("Metric type: " . $entry->getType() . "\n" );
                for ( $valueIndex = 0; $valueIndex < count( $values->getValues() ); $valueIndex++ ) {
                    $value = $values->getValues()[ $valueIndex ];
                    print($entry->getName() . ": " . $value . "\n");
                }
            }
        }
    }
}


```
&nbsp;

&nbsp;

実行コマンドは下記になります。
```bash
php report.php 10
```
&nbsp;

&nbsp;

実行結果
```bash
$php report.php 10
ga:pagePath: /2017/02/13/kotlin-spring-boot/
Metric type: INTEGER
pv: 447
ga:pagePath: /2017/04/24/cakephp3-でapiを作成-jsonレスンポンス/
Metric type: INTEGER
pv: 401
ga:pagePath: /2017/04/28/node-jsビットコインの価格をリアルタイムにdbに保存す/
Metric type: INTEGER
pv: 293
ga:pagePath: /2017/06/05/kotlin-spring-boot-でログイン認証を実装/
Metric type: INTEGER
pv: 194
ga:pagePath: /2017/01/29/【cakephp3】cakephp3でsqlをログに吐き出す方法/
Metric type: INTEGER
pv: 157
ga:pagePath: /2017/02/08/kotlin-db-connect-by-exposed/
Metric type: INTEGER
pv: 134
ga:pagePath: /2017/02/05/kotlin-http-request-khttp/
Metric type: INTEGER
pv: 127
ga:pagePath: /2017/02/08/bootsnote/
Metric type: INTEGER
pv: 99
ga:pagePath: /2017/01/04/cakephpで部分テンプレート/
Metric type: INTEGER
pv: 96
ga:pagePath: /2017/08/09/laravelにvue-jsを導入してみる。-bladeの-とコンフリクトする/
Metric type: INTEGER
pv: 73

```

PV上位10位以内の記事とそのPVが取得できています。
(今回の実行結果には引数で10を指定しているため10件取得が期待値)

&nbsp;
<h2 class="chapter">まとめ</h2>

ここまでで、
無事PVランキングは取得できました。
引数の数を大きくすれば大きくするほど取得できるランキングの件数を
取得できるようにサンプルコードを作成しています。

実際にやってみた感想としては、
コードを書くまでの最初の設定部分のところで
時間を取られました。。
私の場合は、サービスアカウントをGoogle Analyticsのアカウントとして
作成する部分に気づかず、
何度APIにリクエストを送っても権限がないと怒られてしまっていました。
意外と気づかないの注意されると良いと思います。

プログラムの流れとしては、
Metrics（SQLでいうカラムのようなイメージ）
でページビューやセッション、ユーザ数などが指定でき
DimensionでMetricsをそれぞれ日付ごとにまとめるのか？ページごとにまとめるのか？
と行った具合で設定を行い、
それらをリクエストのパラメータとしてデータを取得してくる
という感じです。
（FilterやOrderはそのままの部分で今回の流れだと枝葉なのであまり説明はしません）

今回はPHPコードでデータを取得しただけですが、
これをもう少し発展させて実際にWordPressページなどでも使えるように
していきたいです！！

とりあえず今回はここまでで。


<div class="after-article"></div>

&nbsp;
