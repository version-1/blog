---
templateKey: blog-post
title: Laravel5.4とVue.jsでSPAを作ってみる。③ -仮想通貨の価格を取得するページを作ってみる-
slug: /2017/10/14/laravel-vue-spa-3
createdAt: 2017-10-14 21:59:36
updatedAt: 2018-08-26 11:34:20
thumbnail: /2017/10/20171014_laravel-vue-spa-3/thumbnail.jpg
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
<div class="adsense-double-rect"></div>
&nbsp;
<h2 class="chapter">同サーバDB内の仮想通貨の一覧を取得</h2>
&nbsp;

&nbsp;

マイグレーションを書いてDB
に仮想通貨の情報を登録します。
```php
<php

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
      $table->increments('id');
      $table->string('key');
      $table->string('name_ja');
      $table->string('name_en');
      $table->timestamps();
    });

    $data = [
      ['key' => 'btc','name_ja' => 'ビットコイン' , 'name_en' => 'BitCoin'],
      ['key' => 'bch','name_ja' => 'ビットコインキャッシュ' , 'name_en' => 'BitCoinCash'],
      ['key' => 'eth','name_ja' => 'イーサリアム' , 'name_en' => 'Etherium'],
      ['key' => 'etc','name_ja' => 'イーサリアムクラシック' , 'name_en' => 'Etherium Classic'],
      ['key' => 'dao','name_ja' => 'DAO' , 'name_en' => 'DAO'],
      ['key' => 'lsk','name_ja' => 'リスクコイン' , 'name_en' => 'BitCoin'],
      ['key' => 'fct','name_ja' => 'ファクトム' , 'name_en' => 'Factom'],
      ['key' => 'xmr','name_ja' => 'モネロ' , 'name_en' => 'Monero'],
      ['key' => 'rep','name_ja' => 'オーガー' , 'name_en' => 'Augur'],
      ['key' => 'xrp','name_ja' => 'リップル' , 'name_en' => 'Ripple'],
      ['key' => 'zec','name_ja' => 'ジーキャッシュ' , 'name_en' => 'Zcach'],
      ['key' => 'xem','name_ja' => 'ネム' , 'name_en' => 'Xem'],
      ['key' => 'ltc','name_ja' => 'ライトコイン' , 'name_en' => 'Litecoin'],
      ['key' => 'dash','name_ja' => 'DASH' , 'name_en' => 'DASH'],
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

```
&nbsp;

&nbsp;

マイグレーション実行
```bash
php aritsan migrate
```
これでDatabaseの準備はできたので、
これをAjaxでとってきて表示させるまでやりましょう。

&nbsp;

&nbsp;

&nbsp;

&nbsp;

APIのルーティング設定。

routes/api.php
```php
<?php use Illuminate\Http\Request;
 use App\Models\Currency;
use GuzzleHttp\Client;
Route::group(['middleware' => 'api'], function() {
  Route::get('currencies',  function() {
    $obj = new Currency();
    $result = $obj->all();
    return json_encode($result);
  });
});

```
&nbsp;

&nbsp;

これで /api/currenciesにアクセスすると、
json形式の仮想通貨の情報を取得できるようになります。
（ルーティングファイルに処理を書くという。。まあチュートリアルでもやってたし。。）
お次は表示するVueコンポーネントです。

&nbsp;

&nbsp;
```markup
<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8 col-md-offset-2">
        <div class="panel panel-default">
          <div class="panel-heading">Crypto Currencies</div>

          <div class="panel-body">
            <p>{{message}}</p>
            <ul class="list-unstyled" v-if="is_init">
              <li v-for="(currency, key) in currencies" >
                <span v-on:click="loading">
                  <router-link :to="{ path: '/currencies/' + currency.key }" >{{currency.name_ja}} / {{currency.name_en}}</router-link>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
      .then(res =>  {
        this.currencies = res.data;
        this.is_loading = false;
        this.is_init = true;
        this.message = "";
      });
    }
}
</script>

```
ここまででとりあえず、仮想通貨の一覧を取得はできて、
Ajax通信も使えています。
<img class="post-image" src="https://statics.ver-1-0.net/uploads/2017/10/20171014_laravel-vue-spa-3/Screen-Shot-2017-10-14-at-19.00.02.png" alt="Screen-Shot-2017-10-14-at-19.00.02.png"/>

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
```php
Route::get('rate/{currency}',  function($currency) {
        $res = [ 'currency' => $currency ,'btc' => 0 , 'jpy' => 0 ];
        if ( $res['currency'] === ''){
            $res['currency'] = 'btc';
        }
        $client = new Client();
        $url = "https://coincheck.com/api/rate/${currency}_jpy";
        $response = $client->request('GET',$url);
        $res['jpy'] = json_decode($response->getBody())->rate;

        if($currency != 'btc'){
            $url = "https://coincheck.com/api/rate/${currency}_btc";
            $response = $client->request('GET',$url);
            $res['btc'] = json_decode($response->getBody())->rate;
        }

        if ($response->getStatusCode() === 200) {
            return response()->json($res);
        } else {
            return json_encode(['error']);
        }
    });

```
ここでは、
仮想通貨の円建て、ビットコイン建てのレートを取得して
返却しています。

次に、Index.vueのhtml部分に以下のタグを追加し、
```markup
<div class="row">
    <div class="col-md-8 col-md-offset-2">
    <div class="panel panel-default">
      <div class="panel-heading">Crypto Currency Rate</div>

      <div class="panel-body">
      <p>{{message}}</p>
      <ul class="list-unstyled" v-if="!is_loading">
        <li>
        1{{name.toUpperCase()}} =   <span class="h2">{{currency.jpy.toLocaleString()}}</span> JPY
        </li>
        <li v-if="name != 'btc'">
        1{{name.toUpperCase()}} =   <span class="h2">{{currency.btc.toLocaleString()}}</span> BTC
        </li>
      </ul>

      </div>
    </div>
    </div>
  </div>

```
javascipt部分を以下のようにします。
```javascript
<script>
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
      .then(res =>  {
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
      .then(res =>  {
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
</script>

```
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
