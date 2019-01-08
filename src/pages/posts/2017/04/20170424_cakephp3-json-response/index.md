---
templateKey: blog-post
title: CakePHP3 でJSONレスンポンスを返すAPIを作成
slug: /2017/04/24/cakephp3-json-response
createdAt: 2017-04-24 01:04:53
updatedAt: 2018-08-26 01:17:45
thumbnail: /2017/04/20170424_cakephp3-json-response/thumbnail.png
categories:
  - engineering
---

&nbsp;

私の運営しているサイトで
APIが必要になったので、
作り方を調べつつ
JSONレスポンスを返却するAPIを開発してみました。

&nbsp;

<div class="adsense"></div>

&nbsp;
<h2 class="chapter">DBの準備</h2>
下のものは、説明用のアプリです。DBは以下のようなものを用意しました。

&nbsp;

<table>
<thead>
<tr>
<th>id</th>
<th>title</th>
<th>artist</th>
<th>lyric</th>
</tr>
</thead>
<tbody>
<tr>
<td>1</td>
<td>崖の上のポニョ</td>
<td>藤岡藤巻と大橋のぞみ</td>
<td>ポーニョポーニョポニョ...</td>
</tr>
<tr>
<td>2</td>
<td>だんご三兄弟</td>
<td>速水けんたろう</td>
<td>くしにささって だんご だんご...</td>
</tr>
<tr>
<td>3</td>
<td>およげ!たいやきくん</td>
<td>子門真人</td>
<td>まいにち まいにち ぼくらは てっぱんの...</td>
</tr>
</tbody>
</table>
&nbsp;
<h2 class="chapter">APIを作っていく</h2>
&nbsp;

まずは楽曲の一覧を通常通り画面で表示させますと
以下の通りになります。
<img class="post-image" src="https://statics.ver-1-0.net/uploads/2017/04/20170424_cakephp3-json-response/スクリーンショット-2017-04-24-0.02.48-1024x450.png" alt="スクリーンショット-2017-04-24-0.02.48-1024x450.png"/>

&nbsp;

これらの楽曲をJSON形式で取得するAPIを作成します。

JSON形式のレスポンスを返す際のコードのポイントは3つで

&nbsp;

&nbsp;
<ul>
 	<li>
画面の表示はいらないのでオートレンダリングをOFFにする。・・・①
</li>
 	<li>
レスポンスオブジェクトにレスポンス形式をセットする。・・・②
</li>
 	<li>
レスポンスBodyにJSONデータを格納する。・・・③
</li>
</ul>
&nbsp;

になります。

以下、コードです。
```php
define('BAD_REQUEST_CODE',400);
define('NORMAL_REQUEST_CODE',200);
define('AUTHORIZED_API_TOKEN','authorized_key_string');

class SongsController extends AppController
{
　　　　　　　　// index , view などのメソッドは割愛
　　　　　　　　・
　　　　　　　　・
　　　　　　　　・
    public function getSongs(){

    // ①HTMLの表示はいらないため自動レンダリングをOFFにする
    $this->autoRender = false;
    // レスポンスの形式をJSONで指定
    $this->response->type('application/json');

    // 認証キーを取得
    $key = $this->get_query_parmas('key');
    $auth = true;

    // 認証キーと合わない場合
    if ($key != AUTHORIZED_API_TOKEN) {
      // レスポンス用JSONを生成するための連想配列を生成
      $data = $this->create_response_data($key, BAD_REQUEST_CODE, 'bad request');
      // ③レスポンスのBodyにjsonをセット
      $this->response->body(json_encode($data));
      $auth = false;

    }

    // 認証成功の場合
    if ($auth) {
      // Tableから楽曲の一覧を取得
      $records =  $this->Songs->find('all')->toArray();
      // レスポンス用JSONを生成するための連想配列を生成
      $data = $this->create_response_data($key, NORMAL_REQUEST_CODE, 'success' , $records);
      $this->log(json_encode($data),LOG_DEBUG);
      // ③レスポンスのBodyにjsonをセット
      $this->response->body(json_encode($data,JSON_UNESCAPED_UNICODE));
    }

  }

  private function create_response_data($key, $status, $message , $data = null)
  {
    if ($status === NORMAL_REQUEST_CODE){
      $data = ['parmas' => ['key' => '[MASK]'],
        'result' => ['status' => $status, 'message' => $message],
        'data' => $data];
    }else{
      $data = ['parmas' => ['key' => $key],
        'result' => ['status' => $status, 'message' => $message]];
    }

    return $data;
  }
}

```
&nbsp;

&nbsp;

これで、簡単にCakeでJSONを返すAPIを作成できます。

&nbsp;

&nbsp;

APIを使用する場合は、
普通リクエストに含まれる認証キーと照合してデータを
返すので、
そこも実装しています。
不正な場合は不正な旨の結果を返してあげると良いかと思います。
（ちゃんとやるならStatusCodeを変えてやるんだと思います。）

&nbsp;


&nbsp;

以下、実行結果です。
```bash
$ #　失敗パターン
$curl http://localhost:8765/Songs/getSongs?key=hogehoge
{"parmas":{"key":"hogehoge"},"result":{"status":400,"message":"bad request"}}
$
```
&nbsp;
```
$#　成功パターン
$curl http://localhost:8765/Songs/getSongs?key=authorized_key_string
{"parmas":{"key":"[MASK]"},"result":{"status":200,"message":"success"},"data":[{"id":1,"title":"崖の上のポニョ","artist":"藤岡藤巻と大橋のぞみ","lyric":"ポーニョポーニョポニョ..."},{"id":2速水けんたろう","lyric":"くしにささって だんご だんご..."},{"id":3,"title":"およげ!たいやきくん","artist":"子門真人","lyric":"まいにち まいにち ぼくらは てっぱんの..."}]}

```
&nbsp;

&nbsp;

&nbsp;

以上です！！

