---
templateKey: blog-post
title: CakePHP3 twitteroauthを使って、tweetする( composer install )
slug: /2017/06/17/cakephp3-twitteroauth
createdAt: 2017-06-17 11:52:07
updatedAt: 2018-08-26 11:55:55
thumbnail: /2017/06/20170617_cakephp3-twitteroauth/thumbnail.jpg
categories:
  - engineering
---

&nbsp;

&nbsp;

今回はtwitterで
CapkePHP3からtweetする方法を紹介します。

このtwitteroauthというライブラリを使います。
<a href="https://github.com/abraham/twitteroauth">https://github.com/abraham/twitteroauth</a>

流れは以下のようになります。
<h4></h4>
<h4></h4>
<h4>①Twitter Appを作成し、アクセストークンを取得</h4>
<h4>②twitteroauthをcomposerでインストール</h4>
<h4>③Controllerからtweet</h4>
&nbsp;

<div class="after-intro"></div>

&nbsp;

&nbsp;
<h2 class="chapter">Twitter Appを作成し、アクセストークンを取得</h2>
&nbsp;

&nbsp;

このリンクから
<a href="https://apps.twitter.com/">https://apps.twitter.com/</a>
twitter Appを作成すると、
<ul>
 	<li>Consumer Key</li>
 	<li>Consumer Secret</li>
 	<li>Access Token</li>
 	<li>Access Token　Secret</li>
</ul>
を取得できます。
（後の手順で使用します。)

&nbsp;

&nbsp;

<span style="text-decoration: underline;"><strong>1.Create Newをクリック</strong></span>
<img class="post-image" src="https://statics.ver-1-0.net/uploads/2017/06/20170617_cakephp3-twitteroauth/スクリーンショット-2017-06-17-11.10.29-1024x691.png" alt="スクリーンショット-2017-06-17-11.10.29-1024x691.png"/>

&nbsp;

&nbsp;

<span style="text-decoration: underline;"><strong>2.必要な情報を入力</strong></span>

&nbsp;
<img class="post-image" src="https://statics.ver-1-0.net/uploads/2017/06/20170617_cakephp3-twitteroauth/スクリーンショット-2017-06-17-11.10.59.png" alt="スクリーンショット-2017-06-17-11.10.59.png"/>

&nbsp;

<span style="text-decoration: underline;"><strong>3.トークンの確認</strong></span>

&nbsp;

作成が完了すると、
以下のような画面になるので、
Keys and access Tokenタブを選択し、
<ul>
 	<li>Consumer Key</li>
 	<li>Consumer Secret</li>
 	<li>Access Token</li>
 	<li>Access Token　Secret</li>
</ul>
が表示されていることを確認します。
（アクセストークンがない場合は、Token Actionsあたりにあるボタンを押して作成する。)
<img class="post-image" src="https://statics.ver-1-0.net/uploads/2017/06/20170617_cakephp3-twitteroauth/スクリーンショット-2017-06-17-12.01.29.png" alt="スクリーンショット-2017-06-17-12.01.29.png"/>

&nbsp;

&nbsp;
<h2 class="chapter">②twitteroauthをcomposerでインストール</h2>
&nbsp;

&nbsp;

compserを使って、
twitteroauthをダウンロードします。
<pre><code class="bash">composer require abraham/twitteroauth

```
&nbsp;
<h2 class="chapter">Controllerからtweet</h2>
&nbsp;

実際にtweetするコードは以下になります。

実際は、
トークンは定数ファイルなどで外だしした方が良いかもしれません。

また、
今回は、Controllerにtweetの処理を記述しましたが、
tweet,create_twitter_oauthあたりのメソッドは、
モジュールにまとめて他のコントローラからも使えるようにすると
再利用できて良いと思います。

&nbsp;

<strong>TwitterController</strong>
```php
namespace App\Controller;
use Abraham\TwitterOAuth\TwitterOAuth;

class TweetController extends AppController
{
　　function postTweet(){
　　　// Hello Worldと呟く
　　　$this->tweet("Hello World!!!!!");<
 　}
 　　
　　function tweet($text){
     if ( $text != null &amp;&amp; count($text) > 0 ){
         $oauth = $this->create_twitter_oauth();
         $result = $oauth->post('statuses/update', array("status"=> $text ));
     }
 　}

　　private　function create_twitter_oauth(){
　　　　// ①で入手したトークンを引数に渡し,TwitterOAuthオブジェクトを生成する。
　　　　return new TwitterOAuth(
　　　　　　　　　　　　　"Your TWETTER_CONSUMER_KEY",
　　　　　　　　　　　　　"Your TWETTER_CONSUMER_SECRET",
　　　　　　　　　　　　　"Your TWETTER_ACCESS_TOKEN",
　　　　　　　　　　　　　"Your TWETTER_ACCESS_TOKEN_SECRET"
　　　　　　　　　　　　　);
　　　　}
}

```

&nbsp;
