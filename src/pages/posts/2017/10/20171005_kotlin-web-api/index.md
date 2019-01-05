---
templateKey: blog-post
title: Kotlin + Spring Boot で Web APIを作成してみる。 ~その②~
slug: /2017/10/05/kotlin-web-api
createdAt: 2017-10-05 23:53:16
updatedAt: 2018-08-26 11:39:29
thumbnail: /2017/10/20171005_kotlin-web-api/thumbnail.png
categories:
  - engineering
---

&nbsp;

どうも前回こちらの

<a href="https://ver-1-0.net/2017/09/18/kotlin-spring-api-1/" target="_blank" rel="noopener noreferrer">Kotlin + Spring Boot で Web APIを作成してみる。 ~その①~</a>
記事でWeb APIをKotlin+Spring Bootで
作ってみるということをしてみました。

&nbsp;

が、

前回は、
CRUDでいう所のRの部分しかAPIとして
提供できていなかったので、
今回はCRUDの全てのメソッドを備えたRESTfulなAPI
を目指して前回のリポジトリをブラッシュアップしました。

<div class="adsense"></div>

&nbsp;

&nbsp;
<h2 class="chapter">RESTFulなAPIにブラッシュアップ</h2>

```kotlin
@Controller
class BookController @Autowired constructor(private val bookService: BookService) {

    @RequestMapping("/books")
    fun index(): ModelAndView = ModelAndView("/book/index").apply { addObject("books", bookService.findAllBook()) }

    @RequestMapping("/api/books")
    fun api_index(): ResponseEntity<MutableList> {
        return ResponseEntity.ok(bookService.findAllBook())
    }
    @RequestMapping("/api/books/{id}")
    fun api_show(@PathVariable("id") id : Int): ResponseEntity {
        return ResponseEntity.ok(bookService.findById(id))
    }

}

```
&nbsp;
```kotlin
@Controller
class BookController @Autowired constructor(private val bookService: BookService) {

    @RequestMapping("/books")
    fun index(): ModelAndView = ModelAndView("/book/index").apply { addObject("books", bookService.findAllBook()) }

    @RequestMapping("/api/books")
    fun api_index(): ResponseEntity<MutableList> {
        return ResponseEntity.ok(bookService.findAllBook())
    }

    @RequestMapping("/api/books/{id}")
    fun api_show(@PathVariable("id") id : Int): ResponseEntity {
        return ResponseEntity.ok(bookService.findById(id))
    }

    @RequestMapping("/api/books", method = arrayOf(RequestMethod.PUT))
    fun api_update(@RequestBody book: Book): ResponseEntity{
        return ResponseEntity.ok(bookService.save(book))
    }

    @RequestMapping("/api/books", method = arrayOf(RequestMethod.POST))
    fun api_create(@RequestBody book: Book): ResponseEntity {
        return ResponseEntity.ok(bookService.save(Book( book.id, book.name,book.author,book.isbn)))
    }

    @RequestMapping("/api/books/{id}",method = arrayOf(RequestMethod.DELETE))
    fun api_delete(@PathVariable("id") id : Int):ResponseEntity{
        var book:Book = bookService.findById(id)
        if(book != null){
            bookService.delete(book)
        }
        return ResponseEntity.ok(book)
    }
}

```

みての通り
api_delete,api_create,api_updateがメソッド
として追加され、
HTTPをもとにして、データの更新・削除・作成・参照ができるように
なりました。

&nbsp;

&nbsp;
<h2 class="chapter">そのほかの変更について</h2>
&nbsp;

&nbsp;

今回は新たに<strong>更新・削除・作成</strong>
のメソッドを追加したので、
serviceについても変更を加えています。

変更点は、
以下のようで
```kotlin
/**
 * DBからのデータ取得と加工を行う.
 */
@Service
open class BookService @Autowired constructor(private val bookRepository: BookRepository) {

    /**
     * 全ユーザリストの取得
     * @return ユーザリスト
     */
    fun findAllBook(): MutableList = bookRepository.findAll()
    fun findById(id:Int): Book{
        var book: Book = bookRepository.findById(id)
        return book
    }

    fun exists(id: Long) : Boolean{
        return bookRepository.exists(id)
    }

    fun save(book:Book){
        bookRepository.save(book)
    }

    fun delete(book:Book){
        bookRepository.delete(book)
    }
}

```
今回追加したメソッドは、
save,exixts,deleteなどになりますが、
そのほとんどがBookRepositoryクラスに宣言されている
メソッドを利用しました。

前回の記事をアップした際にここまではほぼ80%完成している
と思っていたのですが、
createの部分がいかんせんうまくいきませんでした。

今でもなんでこんなことでスタックしてたんだろう・・・
と思うくらい簡単なことだったのですが、
前回公開した記事のsqlだとcreateができないので再掲します
```kotlin
create table if not exists books (
  id int primary key auto_increment,
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

```
はい、
驚くことにエラーの出ていた原因はテーブルの主キーに
オートインクリメントをつけていなかった為でした。。

とにもかくにも
RESTfulなAPIは作成できましたので、
ここにレポジトリを晒しておきます。
<a href="https://github.com/version-1/kotlin-api-sample-">https://github.com/version-1/kotlin-api-sample-</a>

クローンして、GET,PUT,POST,DELETEすれば
確認できるはずです。

以上です！！
