---
templateKey: blog-post
title: Kotlin + Spring Boot で Web APIを作成してみる。 ~その①~
slug: 2017/09/18/kotlin-spring-api-1
createdAt: 2017-09-18 23:57:53
updatedAt: 2018-08-26 11:42:05
thumbnail: http://ver-1-0.net/wp-content/uploads/2017/02/スクリーンショット-2017-02-05-22.49.48.png
categories: 
  - engineering
---

&nbsp;

こんばんは、
3連休でどこも出かけなかった
<a href="https://twitter.com/?lang=ja">@version1</a>
です。

&nbsp;

もう少し有意義に過ごせたのでは、
という思いは募る一方ですが、
それは置いておいて久しぶりに<strong>Kotlin</strong>に関する記事です。

(3連休でこれしか更新していない・・・
+CRUD全てをAPIからできるようにしたかったけど
終わらなかった。。)

[after_intro]

タイトルもその①としたように、
今回はAPIで本のリストと、ID指定した本一件を
jsonで返却するAPIまでです。

&nbsp;

そのほかの、<strong>作成・削除・更新</strong>は
いつの日か更新します！！
（8割くらいはできているんだけど、詰めの部分でまだあげられないとして
今回の記事からは外しました。）

ではでは早速行きましょう。

&nbsp;

&nbsp;
<h2 class="chapter">前提条件</h2>
使用する構成はいつもの通りです。
<table>
<tbody>
<tr>
<th>Framework:</th>
<td>Spring Boot</td>
</tr>
<tr>
<th>Language:</th>
<td>Kotlin</td>
</tr>
<tr>
<th>Database:</th>
<td>Mysql</td>
</tr>
<tr>
<th>Build:</th>
<td>Gradle</td>
</tr>
</tbody>
</table>
&nbsp;

データベースは
booksテーブルだけで、
これを<strong>Kotlin+SpringBoot</strong>でこねこねして
jsonで返却するの今回のミッションになります。

&nbsp;

&nbsp;

ちなみに今回使用するテーブルは
SQLだと以下のようになります。

&nbsp;
<pre><code class="language-kotlin">create table if not exists books (
  id int primary key,
  name varchar(255),
  author varchar(255),
  isbn varchar(255),
  category_id int,
  created_at datetime,
  updated_at datetime
);

delete from books;
insert into books
VALUES( 1 , '多動力' ,'堀江貴文', '9784344031159', 1 , NOW() , NOW()),
( 2 , 'キングダム47巻' ,'原泰久', '9784088907017', 2 , NOW() , NOW()),
( 3 , '深夜特急〈1〉香港・マカオ (新潮文庫)' ,'沢木耕太郎', '9784101235059', 3 , NOW() , NOW());
</code></pre>
&nbsp;

&nbsp;

イメージが湧きづらい人用に
一覧ページも作成しました。

<img class="alignnone size-full wp-image-667" src="http://ver-1-0.net/wp-content/uploads/2017/09/スクリーンショット-2017-09-18-23.29.36.png" alt="kotlin api を説明する上でイメージを沸かせるための画面。本一覧。" width="608" height="264" />

↑この一覧がJSON形式で取得できれば成功です。

&nbsp;

&nbsp;

ちなみにgitレポジトリも用意したので
どうぞ。
<a href="https://github.com/version-1/kotlin-api-sample-">https://github.com/version-1/kotlin-api-sample-</a>

&nbsp;

&nbsp;
<h2 class="chapter">早速Kotlin+SpringBoot APIの説明</h2>
&nbsp;

&nbsp;

はじめに、
ファイル構成を
<img class="alignnone size-full wp-image-669" src="http://ver-1-0.net/wp-content/uploads/2017/09/スクリーンショット-2017-09-18-23.37.23.png" alt="kotlin+SpringBoot APIのファイル構成" width="343" height="363" />

このように
以前のKotlinシリーズでもおなじみの
構成となっております。

わからない方はこちらが参考になるかと思います。
<a href="http://ver-1-0.net/2017/02/13/kotlin-spring-boot/">Kotlin + Spring boot で DBからデータ取得して画面に表示</a>

&nbsp;

&nbsp;

はい、
では下が実際のコードです。

BookController
<pre><code class="language-kotlin">@Controller
class BookController @Autowired constructor(private val bookService: BookService) {

    @RequestMapping("/books")
    fun index(): ModelAndView = ModelAndView("/book/index").apply { addObject("books", bookService.findAllBook()) }

    @RequestMapping("/api/books")
    fun api_index(): ResponseEntity&lt;MutableList&gt; {
        return ResponseEntity.ok(bookService.findAllBook())
    }
    @RequestMapping("/api/books/{id}")
    fun api_show(@PathVariable("id") id : Int): ResponseEntity {
        return ResponseEntity.ok(bookService.findById(id))
    }

}
</code></pre>
&nbsp;

それぞれなんてことはないコードですね。

&nbsp;

個人的な今回の学びは、
URLから値をとってくるのに
<pre><code class="language-kotlin">@RequestMapping("/api/books/{id}")
    fun api_show(@PathVariable("id") id : Int): ResponseEntity {
</code></pre>
のようにかけることと

ResponseEntityクラスを使うとクラスをそのまま
jsonにして返却できることですかね。

&nbsp;

&nbsp;

ちなみに
springを起動して
http://localhost:8080/api/booksにアクセスすると
<img class="alignnone size-full wp-image-670" src="http://ver-1-0.net/wp-content/uploads/2017/09/スクリーンショット-2017-09-18-23.41.56.png" alt="本のリストのJSONレスポンス" width="718" height="349" />

&nbsp;

&nbsp;

本の一覧が

http://localhost:8080/api/books/1にアクセスすると

<img class="alignnone size-full wp-image-671" src="http://ver-1-0.net/wp-content/uploads/2017/09/スクリーンショット-2017-09-18-23.42.05.png" alt="本のID指定のJSONレスポンス" width="719" height="302" />

&nbsp;

指定したIDの本一件を
取得することができます。

以上、
参照だけだと結構さっくり終わりますね。
次回は作成・更新・削除の部分を公開します。

[adsense]
