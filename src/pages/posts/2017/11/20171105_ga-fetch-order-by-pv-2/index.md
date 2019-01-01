---
templateKey: blog-post
title: Google AnalyticsからPV順に記事を取得するその② - サイドバーに表示-
slug: /2017/11/05/ga-fetch-order-by-pv-2
createdAt: 2017-11-05 23:16:05
updatedAt: 2018-08-26 11:27:17
thumbnail: ./thumbnail.jpg
categories: 
  - engineering
  - rails
---

前回の記事では、
<a href="https://ver-1-0.net/2017/11/04/ga-fetch-order-by-pv-1/">Google AnalyticsからPV順に記事を取得するその①</a>
PV数で人気記事の取得までできました。

今回はそれを実際にサイドバーに表示できるようにするまで、
やっていきます。
&nbsp;

<div class="after-intro"></div>

&nbsp;
&nbsp;

<h2 class="chapter">記事のタイトルを取得する - 導入 -</h2>
前回は、
記事のURLしか取得できていなかったので、
URLを元に記事のタイトルを取得していきます。
(Google Analyticsから直接記事タイトルをとってくる方法もあるけど、
タイトルを変更したり、
サイトタイトルを変更すると別ページと認識されてしまうので、
URLで判断するようにしました。)

完成イメージはこのような感じです。

<img class="post-image" src="./ScreenShot-1.png" alt="ScreenShot-1.png"/>

この記事が終わるころには、
自分のブログで人気記事ランキングを表示できるようになっている
はずです。

&nbsp;

<div class="mid-article"></div>

&nbsp;
&nbsp;

<h2 class="chapter">記事のタイトルを取得する - 実装 -</h2>
Wordpressの投稿は、
<strong>wp_posts</strong>というテーブルに格納されていて、
そのテーブルのpost_nameという絡むにURLの情報が入っています。

<strong>この情報とGoogle Analyticsから取ってきたURLをぶつけて
記事情報を表示します。</strong>

&nbsp;

&nbsp;

&nbsp;

<img class="post-image" src="./Screen-Shot-2017-11-05-at-22.07.43.png" alt="Screen-Shot-2017-11-05-at-22.07.43.png"/>

前回の記事とはだいぶファイルの感じが変わりますが、
<ul>
 	<li>classes/GoogleAnalyticsService.php ・・・ 主にGoogleAnalyticsとの通信を行うクラス</li>
 	<li>classes/WPDatabaseService.php ・・・ WordpressのDBとのやりとりするクラス</li>
 	<li>ga-popular-rankings.php ・・・ ページの表示を行ったりするメインの部分</li>
</ul>
という感じになります。

&nbsp;

&nbsp;

GoogleAnalyticsService.phpは前回で、
GoogleAnalyticsからPageViewなどの情報を取得してきた部分になりますが、今回はクラスとして分割して配置しています。
```php
<?php
Class GoogleAnalyticsService{

    private $analytics;
    private $view_id;
    private $result;
    private $display_count;
    private $reports;

    function __construct($keyfile,$view_id,$display_count)
    {
        $client = new Google_Client();
        $client->setApplicationName("GoogleAnalyticsService");
        $client->setAuthConfig($keyfile);
        $client->setScopes(['https://www.googleapis.com/auth/analytics.readonly']);
        $analytics = new Google_Service_AnalyticsReporting($client);

        $this->analytics = $analytics;
        $this->view_id = $view_id;
        $this->display_count = $display_count;
    }

    function report_request() {
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
        $dimention->setName("ga:pagePathLevel4");

        // Filter
        $filter = new Google_Service_AnalyticsReporting_DimensionFilter();
        $filter->setDimensionName("ga:pagePathLevel4");
        $filter->setNot(true);
        $filter->setOperator("IN_LIST");
        $filter->setExpressions( ["/"] );

        $filters = new Google_Service_AnalyticsReporting_DimensionFilterClause();
        $filters->setFilters(array($filter));

        // OrderBy
        $orderby = new Google_Service_AnalyticsReporting_OrderBy();
        $orderby->setFieldName("ga:pageviews");
        $orderby->setOrderType("VALUE");
        $orderby->setSortOrder("DESCENDING");

        // Create the ReportRequest object.
        $request = new Google_Service_AnalyticsReporting_ReportRequest();
        $request->setViewId($this->view_id);
        $request->setDateRanges($dateRange);
        $request->setMetrics(array($sessions));
        $request->setDimensions(array($dimention));
        $request->setDimensionFilterClauses(array($filters));
        $request->setOrderBys($orderby);

        $body = new Google_Service_AnalyticsReporting_GetReportsRequest();
        $body->setReportRequests( array($request) );

        $this->reports = $this->analytics->reports->batchGet( $body );
    }

    function fetch_result_as_array() {
        $result = [];
        for ( $reportIndex = 0; $reportIndex < count($this->reports); $reportIndex++ ) {
            $report = $this->reports[ $reportIndex ];
            $rows = $report->getData()->getRows();

            $display_count = $this->display_count > count($rows) ? count($rows) : $this->display_count;
            for ( $rowIndex = 0; $rowIndex < $display_count; $rowIndex++) { $row = $rows[ $rowIndex ]; $dimensions = $row->getDimensions();
                $metrics = $row->getMetrics();

                $result[] = [
                    'pageview' => $metrics[0]->getValues()[0],
                    'url'      => $dimensions[0]
                ];
            }
        }
        return $result;
    }
}

```
&nbsp;

変更点はメソッド名が代わり、
printResultsメソッドがfetch_result_as_arrayのように
配列を返す関数に変わったという部分になります。

参考:<a href="https://ver-1-0.net/2017/11/04/ga-fetch-order-by-pv-1/">Google AnalyticsからPV順に記事を取得するその①</a>

&nbsp;

&nbsp;

また、
メインのファイルであるga-popular-rankings.php
はそれぞれのクラスを呼ぶ感じでスッキリしております 。
```php
<?php

/*
* Plugin Name: Google Analytics Popular Rankings
*/


require_once __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/classes/GoogleAnalyticsService.php';
require_once __DIR__ . '/classes/WPDatabaseService.php';

function ga_popular_rankings(){
    $KEY_FILE_LOCATION = __DIR__ . '/service-account-credentials.json';
    $VIEW_ID = '<REPLACE YOUR VIEW ID>';

    $analytics = new GoogleAnalyticsService($KEY_FILE_LOCATION,$VIEW_ID,5);
    $analytics->report_request();
    $response = $analytics->fetch_result_as_array();

    $db = new WPDatabaseService($response);
    $pop_posts =  $db->fetch_post_data();

    pop_posts_render($pop_posts);

}


function pop_posts_render($pop_posts){
    echo "<h2 class='widget-title'>人気記事</h2>";
    echo "<ul style='list-style:none;padding-left:0px;'>";
    foreach($pop_posts as $post){
        echo "<li><a href='".$post['url']."'>".$post['title']."</a></li>";
    }
    echo "</ul>";
}

add_filter('widget_text', 'do_shortcode');
add_shortcode( 'ga_popular_rankings', 'ga_popular_rankings' );

```
&nbsp;

&nbsp;

&nbsp;

上のコードのこの部分で、
GoogleAnalayticsのPageView順を配列として取得していますので、
```php
$analytics = new GoogleAnalyticsService($KEY_FILE_LOCATION,$VIEW_ID,5);
    $analytics->report_request();
    $response = $analytics->fetch_result_as_array();

```
&nbsp;

あとは、
WPDatabaseService.phpで取得した各要素のURLを
元に記事のタイトルを取得します。

&nbsp;

&nbsp;

&nbsp;

&nbsp;

WPDatabaseService.php
```php
<?php
Class WPDatabaseService{
    private $posts;

    function __construct($posts){
        $this->posts = $posts;
    }

    private function get_tilte_by_path_name($post_name){
        global $wpdb;
        $query = $wpdb->prepare('select post_title from wp_posts where post_name = %s',$post_name);
        return $wpdb->get_var($query,0,0);
    }

    function fetch_post_data(){
        $result = [];
        foreach($this->posts as $post){
           $path_name = urlencode(mb_convert_encoding(str_replace('/','',$post['url']), 'UTF-8', 'auto'));
           $post['title'] = $this->get_tilte_by_path_name($path_name);
           $result[] = $post;
        }
        return $result;
    }
}


```
ここでは、fetch_post_dataで配列の各要素を
get_tilte_by_path_nameメソッドに渡して、
URLごとの記事タイトルを取得しています。
先のga-popular-rankings.phpを見てもわかるように
ここで最終的にページビュー順人気記事ランキングの情報が出揃います。

&nbsp;

&nbsp;
<h2 class="chapter">ページビュー順人気記事ランキングを表示する</h2>
&nbsp;

&nbsp;

今回は、$wpdbというWordPress固有の変数も使っているので、
先ほど紹介したファイル群を[WordPress Root]/wp-content/plugins/の
下に配置します。

その時に重要なのがga-popular-rankings.phpの記述で
```php
/*
* Plugin Name: Google Analytics Popular Rankings
*/

```
の部分になります。

&nbsp;
WordPressのインストール済みプラグインをみると、
このPlugin Nameの文字でインストール済みプラグインに表示されます。

ここでPluginの一覧に表示されてしまえば、
あとは簡単です。
Pluginを有効化したあとにウィジェットから「テキスト」を選択して
サイドバーの任意の場所に追加し、
```php
[ga_popular_rankings]
```
とwidgetの本体部分に書き込んでしまえば、
先に紹介した人気記事のランキングがサイドバーに表示されます。

ちなみに、
ウィジェットでショートコードを使用するには、
以下の記載が必要なので、ga-popular-rankings.php
に登録を行っています。
```php
add_filter('widget_text', 'do_shortcode');
add_shortcode( 'ga_popular_rankings', 'ga_popular_rankings' );

```

&nbsp;
&nbsp;

<h2 class="chapter">まとめ</h2>
&nbsp;

&nbsp;

今回ここまでで、
一応自分のサイトに人気記事のランキンがまでは表示できます。

が、

もう少し興味のある方は、
「表示する件数を設定できるようにしたい！！」
「ショートコードとしてサービスを提供しているけどウィジェットとして
提供したい！！」
というようになるかと思います。

私もその一人で現在これに関連したプラグインを開発して
申請中です。

WordPressのプラグインには悩まされた苦い思い出が
多くあるのですが、
自分で作ってみると愛着が湧いてきてなかなか面白いです。

プラグインとして使ってみると、
自分で設定画面を作れたりWidgetとしてサービスを提供できたりして
面白いです。

興味を持った方には、
ネットにも情報が転がっているのぜひ自分で作ってみると
良いと思います。

今回のコードはここにありますので、
ご自由にご確認ください

<a href="https://github.com/version-1/ga-popular-rankings">https://github.com/version-1/ga-popular-rankings</a>

&nbsp;

長くなりましたが、
この記事はここまでにします。
では。

&nbsp;

<div class="after-article"></div>

&nbsp;
