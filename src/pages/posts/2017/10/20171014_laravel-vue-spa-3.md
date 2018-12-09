---
templateKey: blog-post
title: Laravel5.4とVue.jsでSPAを作ってみる。③ -仮想通貨の価格を取得するページを作ってみる-
slug: 2017/10/14/laravel-vue-spa-3
createdAt: 2017-10-14 21:59:36
updatedAt: 2018-08-26 11:34:20
thumbnail: http://ver-1-0.net/wp-content/uploads/2017/10/0f71ba28509b81ba05c2dc6a54eb60d9_s.jpg
description: >-
  前回、前々回と環境の構築、クライアント側でのルーティング設定を行いました。
  今回は、実際にAjax通信を使ったより実践的で、現実に即した内容をお届けできればと思います。
categories:
  - engineering
---

&nbsp;

&nbsp;

前回、前々回と
環境の構築、
クライアント側でのルーティング設定を
行いました。

<a href="https://ver-1-0.net/2017/10/11/laravel-vue-spa-1/">Laravel5.4とVue.jsでSPAを作ってみる。① -環境構築-</a>

<a href="https://ver-1-0.net/2017/10/11/laravel-vue-spa-2/">Laravel5.4とVue.jsでSPAを作ってみる。② -クライアントルーティング-</a>

&nbsp;

今回は、
実際にAjax通信を使ったより実践的で、
現実に即した内容をお届けできればと思います。

&nbsp;

&nbsp;

さて、
作成する内容ですが、
仮想通貨の価格をコインチェックのAPIを利用して取得
→リアルタイムで画面で価格を表示とします。

出来上がったものはこちらです。

[video width="860" height="924" mp4="http://ver-1-0.net/wp-content/uploads/2017/10/spa-sample-step2.mp4"][/video]

&nbsp;

&nbsp;

コインチェックのAPIを利用して、
実に14種類の仮想通貨のレートを確認できるようにしています。

内部でやっていることは
①同サーバDB内の仮想通貨の一覧を取得
②①のそれぞれの仮想通貨に関して価格を取得
です。

&nbsp;
[adsense_double_rect]
&nbsp;
<h2 class="chapter">同サーバDB内の仮想通貨の一覧を取得</h2>
&nbsp;

&nbsp;

マイグレーションを書いてDB
に仮想通貨の情報を登録します。
<pre><code class="language-php">
&lt;php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use App\Models\Currency;

class CreateCurrencies extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('currencies', function (Blueprint $table) {
      $table-&gt;increments('id');
      $table-&gt;string('key');
      $table-&gt;string('name_ja');
      $table-&gt;string('name_en');
      $table-&gt;timestamps();
    });

    $data = [
      ['key' =&gt; 'btc','name_ja' =&gt; 'ビットコイン' , 'name_en' =&gt; 'BitCoin'],
      ['key' =&gt; 'bch','name_ja' =&gt; 'ビットコインキャッシュ' , 'name_en' =&gt; 'BitCoinCash'],
      ['key' =&gt; 'eth','name_ja' =&gt; 'イーサリアム' , 'name_en' =&gt; 'Etherium'],
      ['key' =&gt; 'etc','name_ja' =&gt; 'イーサリアムクラシック' , 'name_en' =&gt; 'Etherium Classic'],
      ['key' =&gt; 'dao','name_ja' =&gt; 'DAO' , 'name_en' =&gt; 'DAO'],
      ['key' =&gt; 'lsk','name_ja' =&gt; 'リスクコイン' , 'name_en' =&gt; 'BitCoin'],
      ['key' =&gt; 'fct','name_ja' =&gt; 'ファクトム' , 'name_en' =&gt; 'Factom'],
      ['key' =&gt; 'xmr','name_ja' =&gt; 'モネロ' , 'name_en' =&gt; 'Monero'],
      ['key' =&gt; 'rep','name_ja' =&gt; 'オーガー' , 'name_en' =&gt; 'Augur'],
      ['key' =&gt; 'xrp','name_ja' =&gt; 'リップル' , 'name_en' =&gt; 'Ripple'],
      ['key' =&gt; 'zec','name_ja' =&gt; 'ジーキャッシュ' , 'name_en' =&gt; 'Zcach'],
      ['key' =&gt; 'xem','name_ja' =&gt; 'ネム' , 'name_en' =&gt; 'Xem'],
      ['key' =&gt; 'ltc','name_ja' =&gt; 'ライトコイン' , 'name_en' =&gt; 'Litecoin'],
      ['key' =&gt; 'dash','name_ja' =&gt; 'DASH' , 'name_en' =&gt; 'DASH'],
    ];
    Currency::insert($data);
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::drop('currencies');
  }
}
</code></pre>
&nbsp;

&nbsp;

マイグレーション実行
<pre><code class="language-bash">php aritsan migrate</code></pre>
これでDatabaseの準備はできたので、
これをAjaxでとってきて表示させるまでやりましょう。

&nbsp;

&nbsp;

&nbsp;

&nbsp;

APIのルーティング設定。

routes/api.php
<pre><code class="language-php">
&lt;?php use Illuminate\Http\Request;
 use App\Models\Currency;
use GuzzleHttp\Client;
Route::group(['middleware' =&gt; 'api'], function() {
  Route::get('currencies',  function() {
    $obj = new Currency();
    $result = $obj-&gt;all();
    return json_encode($result);
  });
});
</code></pre>
&nbsp;

&nbsp;

これで /api/currenciesにアクセスすると、
json形式の仮想通貨の情報を取得できるようになります。
（ルーティングファイルに処理を書くという。。まあチュートリアルでもやってたし。。）
お次は表示するVueコンポーネントです。

&nbsp;

&nbsp;
<pre><code class="language-markup">&lt;template&gt;
  &lt;div class="container"&gt;
    &lt;div class="row"&gt;
      &lt;div class="col-md-8 col-md-offset-2"&gt;
        &lt;div class="panel panel-default"&gt;
          &lt;div class="panel-heading"&gt;Crypto Currencies&lt;/div&gt;

          &lt;div class="panel-body"&gt;
            &lt;p&gt;{{message}}&lt;/p&gt;
            &lt;ul class="list-unstyled" v-if="is_init"&gt;
              &lt;li v-for="(currency, key) in currencies" &gt;
                &lt;span v-on:click="loading"&gt;
                  &lt;router-link :to="{ path: '/currencies/' + currency.key }" &gt;{{currency.name_ja}} / {{currency.name_en}}&lt;/router-link&gt;
                &lt;/span&gt;
              &lt;/li&gt;
            &lt;/ul&gt;
          &lt;/div&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
export default {
  created() {
    this.fetchCurrencies(),
  },
  data() {
    return {
      is_init: false,
      message: "Fetching Data..."
    }
  },
  methods: {
    loading(){
      this.is_loading = true;
      this.message = "Fetching Data...";
    },
    fetchCurrencies() {
      axios.get('/api/currencies')
      .then(res =&gt;  {
        this.currencies = res.data;
        this.is_loading = false;
        this.is_init = true;
        this.message = "";
      });
    }
}
&lt;/script&gt;
</code></pre>
ここまででとりあえず、仮想通貨の一覧を取得はできて、
Ajax通信も使えています。
<a href="http://ver-1-0.net/2017/10/14/laravel5-4%e3%81%a8vue-js%e3%81%a7spa%e3%82%92%e4%bd%9c%e3%81%a3%e3%81%a6%e3%81%bf%e3%82%8b%e3%80%82%e2%91%a2-%e4%bb%ae%e6%83%b3%e9%80%9a%e8%b2%a8%e3%81%ae%e4%be%a1%e6%a0%bc%e3%82%92%e5%8f%96/screen-shot-2017-10-14-at-19-00-02/" rel="attachment wp-att-849"><img class="alignnone size-full wp-image-849" src="http://ver-1-0.net/wp-content/uploads/2017/10/Screen-Shot-2017-10-14-at-19.00.02.png" alt="仮想通貨の一覧の画像" width="863" height="926" /></a>

が、ここまでだとリアルタイムに価格を表示していく！！
というSPAの面白さみたいなものがないので、
さらにそれぞれの価格を取得するように修正していきます。

&nbsp;

&nbsp;

&nbsp;

&nbsp;
<h2 class="chapter">APIで仮想通貨の価格を取得する</h2>
&nbsp;

&nbsp;

APIはこちらのコインチェックのAPIを使用します。
<a href="https://coincheck.com/ja/documents/exchange/api">https://coincheck.com/ja/documents/exchange/api</a>

価格設定の部分のAPIのルーティングを設定します。
routes/api.phpに以下のルーティングを設定します。

&nbsp;
<pre><code class="language-php">
Route::get('rate/{currency}',  function($currency) {
        $res = [ 'currency' =&gt; $currency ,'btc' =&gt; 0 , 'jpy' =&gt; 0 ];
        if ( $res['currency'] === ''){
            $res['currency'] = 'btc';
        }
        $client = new Client();
        $url = "https://coincheck.com/api/rate/${currency}_jpy";
        $response = $client-&gt;request('GET',$url);
        $res['jpy'] = json_decode($response-&gt;getBody())-&gt;rate;

        if($currency != 'btc'){
            $url = "https://coincheck.com/api/rate/${currency}_btc";
            $response = $client-&gt;request('GET',$url);
            $res['btc'] = json_decode($response-&gt;getBody())-&gt;rate;
        }

        if ($response-&gt;getStatusCode() === 200) {
            return response()-&gt;json($res);
        } else {
            return json_encode(['error']);
        }
    });
</code></pre>
ここでは、
仮想通貨の円建て、ビットコイン建てのレートを取得して
返却しています。

次に、Index.vueのhtml部分に以下のタグを追加し、
<pre><code class="language-markup">&lt;div class="row"&gt;
    &lt;div class="col-md-8 col-md-offset-2"&gt;
    &lt;div class="panel panel-default"&gt;
      &lt;div class="panel-heading"&gt;Crypto Currency Rate&lt;/div&gt;

      &lt;div class="panel-body"&gt;
      &lt;p&gt;{{message}}&lt;/p&gt;
      &lt;ul class="list-unstyled" v-if="!is_loading"&gt;
        &lt;li&gt;
        1{{name.toUpperCase()}} =   &lt;span class="h2"&gt;{{currency.jpy.toLocaleString()}}&lt;/span&gt; JPY
        &lt;/li&gt;
        &lt;li v-if="name != 'btc'"&gt;
        1{{name.toUpperCase()}} =   &lt;span class="h2"&gt;{{currency.btc.toLocaleString()}}&lt;/span&gt; BTC
        &lt;/li&gt;
      &lt;/ul&gt;

      &lt;/div&gt;
    &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
</code></pre>
javascipt部分を以下のようにします。
<pre><code class="language-javascript">&lt;script&gt;
export default {
  created() {
    this.fetchCurrencies(),
    this.fetchRate(),
    this.timer = setInterval(this.fetchRate, 2000)
  },
  props:['name'],
  data() {
    return {
      currency: { 'currency':'', 'jpy': 0 , 'btc':0 },
      is_init: false,
      is_loading: true,
      message: "Fetching Data..."
    }
  },
  methods: {
    loading(){
      this.is_loading = true;
      this.message = "Fetching Data...";
    },
    fetchCurrencies() {
      axios.get('/api/currencies')
      .then(res =&gt;  {
        this.currencies = res.data;
        this.is_loading = false;
        this.is_init = true;
        this.message = "";
      });
    },
    fetchRate() {
      if (this.name === undefined){
        this.name = 'btc';
      }
      axios.get('/api/rate/' + this.name)
      .then(res =&gt;  {
        this.currency.btc = res.data.btc;
        this.currency.jpy = res.data.jpy;
        this.name = res.data.currency;
        this.is_loading = false;
        this.message = "";
      });

    },
    cancelAutoUpdate: function() {
      clearInterval(this.timer)
    }
  },
  beforeDestroy() {clearInterval(this.timer)}
}
&lt;/script&gt;
</code></pre>
あとは、cssなどを多少直すと
上の動画のような感じになります。

コードはここに置いておきます。
<a href="https://github.com/version-1/spa-sample">https://github.com/version-1/spa-sample</a>

&nbsp;

&nbsp;
<h2 class="chapter">まとめ</h2>
&nbsp;

&nbsp;

以上、ここまでで
クライアント側でレンダリングして、
必要なデータはAPIでとってくる。
という感じでサクサク動くSPAを作ってきました。

基本の部分は紹介したので、
あとは各々の興味次第という感じですね。

構築した感想としては、
ユーザ側からの使用感として、リロードの待ち時間が短くすみ
サクサク動くという点で良い気がきましたが、
やはりコードの管理が煩雑になりそうな気がしています、
ビュー側でそれなりのコードを各必要があるのでコード量が多くなり
大変そうです。

あとは、以前にも仮想通貨の価格を取得する記事を
書いたのですが、そこからビットコインの価格が5,6倍とかに
なっています。
恐ろしや。。

<a href="https://ver-1-0.net/2017/04/28/node-js-realtime/">[Node.js]ビットコインの価格をリアルタイムにDBに保存する。</a>

以上です！！

&nbsp;
