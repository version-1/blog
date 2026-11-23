---
templateKey: blog-post
language: ja
title: Gin+Gorm+GraphQL(gqlgen)でCRUDできるAPIをつくってみた
slug: /2019/05/13/gin-gorm-gqlgen-crud
createdAt: 2019-05-13 03:56:07
updatedAt: 2019-06-14 17:32:07
thumbnail: /2019/05/20190513_gin-gorm-gqlgen-crud/thumbnail.png
categories:
  - engineering
tags:
  - go
  - learning
  - gin
  - gorm
  - gqlgen
---

元号ももう令和に代わり粛々とGoの勉強を続けているのですが、今回はGOとGraphQLを使って
CRUDできるAPIを作ってみました。

[gin-gorm-gqlgen-sample](https://github.com/version-1/gin-gorm-gqlgen-sample)
そもそもGOに慣れていなかったり各種ライブラリの情報が少なかったりで結構時間かかりましたが、
なんとかそれらしきものができたのでリポジトリを共有しておきます。

前回の記事でも、最初にながれを説明して詰まったところを最後にまとめて終わりという形だったので
今回も同じ形でいければななんて思っています。

サンプルを作るにあたり色々と情報を漁ったのですがGormとgqlgenを組み合わせの情報が少なく苦労したので
そこらへんの情報ものせていければ。

<div class="related-post">
  <ul>
    <li><a href="/2019/05/02/docker-gin-gorm-dep-crud">Docker, Gin, Gorm, DepでCRUDできるAPI作成</a></li>
  </ul>
</div>

<div class="adsense"></div>

## 使用技術

今回GraphQLサーバ構築に使った大きな部分の技術をまとめると

* Docker
* Dep (パッケージ管理)
* Gin (Webフレームーク)
* Gorm (ORM)
* gqlgen (GraphQLサーバライブラリ)

となります。gqlgen以外は[前回の記事](/2019/05/02/docker-gin-gorm-dep-crud)とほぼ一緒なのでかぶっているやつは説明しません。

#### gqlgen

gqlgenはgraphQLのサーバライブラリです。goのgraphQLサーバ用のライブラリは[graphql-go/graphql](https://github.com/graphql-go/graphql)
などもあるのですが、スキーマドリブンで開発が進められそうな[99designs/gqlgen](https://github.com/99designs/gqlgen)を使ってみました。

graphql-goの方はinterface{}が大量にでてきて、せっかくの型情報が有効に使えず微妙なので使うのはやめておきました。
gqlgenを使うと

1. schemaを定義
2. resolverにクエリに対するロジックを定義

という順序で開発を進められresolverの実装に集中できるので、最初の慣れは必要ですが慣れてくると軽快に実装を進められそうな感触はうけました。


## 実装の流れ

gqlgenのサンプルにあるのは、TodoリストでGetting Startを見ればするっと始めることができるのですが、
そこから一歩進んでGormと一緒に使ったり、CRUDしたりするとなるとまた一工夫必要なので簡単な流れを書いていきます。


### gqlgenをdepでインストール

depを使わなければ普通にgo getすれば良いのですが、dep使う場合はschemaからボイラープレートを吐き出すための
ラッパースクリプトを用意する必要があります。

scripts/gqlgen.go

```go
package main

import "github.com/99designs/gqlgen/cmd"

func main() {
	cmd.Execute()
}
```

これを作っておくと、
```bash
$go run scripts/gqlgen.go init
```

という感じでgqlgenのコマンドを実行できるようになります。
ラッパースクリプトができたら下記のコマンドgqlgenでの開発に必要なファイルを準備します。

```bash
$go run scripts/gqlgen.go init
```

initが完了すると、gqlgenのファイルが作成されるのですがそれぞれのファイルを簡単に説明すると

* gqlgen.yml ・・・ gqlの設定ファイル。生成されるコードの設定を書いていきます。
* genereated.go ・・・ schemaを定義してスクリプトを叩くと生成されるファイル。スクリプトで生成されるので手動で編集するのはダメ。
* models_gen.go ・・・ schema定義から生成されるモデル群が定義されたファイル。スクリプトで生成されるので手動で編集するのはダメ。
* resolver.go ・・・ こちらはresolver.goというファイルがなければ自動で生成される。
* server/server.go ・・・ サーバーのエントリーポイント

となります。

&nbsp;

コードの生成ができたら念の為

```bash
dep ensure
```

して依存パッケージがインストールされているか確認します。


### Gin用のエントリーポイントを用意

gqlgenでコードを生成するとサーバーのエントリポイントまで用意してくれるのですが、
gqlgenが用意してくれるserver.goだとginを使わないので、ginで動くように書き換えていきます。


コードはこちらのドキュメントのコピペですが、playground用のエンドポイントと本チャンのエンドポイント二つを用意します。


```go
import (
  "github.com/99designs/gqlgen/handler"
  "github.com/gin-gonic/gin"
)

// Defining the Graphql handler
func graphqlHandler() gin.HandlerFunc {
  h := handler.GraphQL(NewExecutableSchema(Config{Resolvers: &Resolver{}}))

  return func(c *gin.Context) {
    h.ServeHTTP(c.Writer, c.Request)
  }
}

// Defining the Playground handler
func playgroundHandler() gin.HandlerFunc {
  h := handler.Playground("GraphQL", "/query")

  return func(c *gin.Context) {
    h.ServeHTTP(c.Writer, c.Request)
  }
}

func main() {
  // Setting up Gin
  r := gin.Default()
  r.POST("/query", graphqlHandler())
  r.GET("/", playgroundHandler())
    r.Run()
}
```


### Gormのモデルの用意

ここまででエントリポイントが用意できたので、お次はスキーマ定義で使うモデルを定義していきます。
ファイルの配置はGoのスタンダードレイアウトにそって配置しているのでモデルはinternal/models配下に
配置をしていきます。

```go
// user.go
package models

import (
	"time"
)

type User struct {
	ID        int
	Name      string
	Todos     []Todo
	CreatedAt time.Time
	UpdatedAt time.Time
}

```

```go
// todo.go
package models

import (
	"time"
)

type Todo struct {
	ID        int
	Text      string
	Done      bool
	UserID    int
	User      User
	CreatedAt time.Time
	UpdatedAt time.Time
}
```

&nbsp;

ここではモデルを構造体で定義しているのですが、Gormのドキュメントを見ればわかる通り
モデル定義に埋め込みを使って書く方がスマートかと思うのですが、
この書き方だとコードを生成する時のコマンドでエラーがでてしまうので、一旦モデルのフィールドをベタ書きしています。
(コードとかちゃんと読んだら打開策はあるのかも）

&nbsp;

```go
// todo.go
package models

import (
	"time"
)

type Todo struct {
  gorm.Model
	Text      string
	Done      bool
	UserID    int
	User      User
}
```

&nbsp;

このように、自前のモデルを定義できたらgqlgenではgqlgen.ymlにモデルのマッピングを設定する必要があります。
今回の例ではモデルは下記のような設定になるのでgqlgen.ymlに以下を追記します。

```go
models:
  Todo:
    model: gin_graphql/internal/models.Todo
  User:
    model: gin_graphql/internal/models.User
```

### schemaを定義

ここまではスキーマ駆動で開発するまでの準備だったのですが、ここでAPIとして必要な機能をスキーマとし定義していきます。

```go
type Todo {
  id:   Int!
  text: String!
  done: Boolean!
  userID: Int!
  user: User!
  createdAt: Time!
  updatedAt: Time!
}

type User {
  id: Int!
  name: String!
  createdAt: Time!
  updatedAt: Time!
}

type Query {
  todos: [Todo!]!
  users: [User!]!
  todo(input: FetchTodo): Todo!
}

input NewTodo {
  text: String!
  userId: Int!
}

input EditTodo {
  id: Int!
  text: String!
}

input NewUser {
  name: String!
}

input FetchTodo {
  id: Int!
}

type Mutation {
  createTodo(input: NewTodo!): Todo!
  updateTodo(input: EditTodo!): Todo!
  deleteTodo(input: Int!): Todo!
  createUser(input: NewUser!): User!
}

scalar Time
```

今回のCRUDを実装するための**schema.graphql**がこちらです。基本的な文法はgraphqlのスキーマの文法にそった形で
定義をしていくのですが、全体の見方としてリソースに変更を加えるスキーマはMutationの構造体にそれ以外の参照系の処理はQuery
に書いていきます。そしてそれぞのれメソッドで必要な型（User, Todo, NewUser)を別で定義していくという形です。

これが出来上がると、先ほどのgqlgenコマンドを使ってコードを生成してresolverの実装に移ることができるようになります。
resolverではスキーマであらかじめインプットとアウトプットを決めていて、その通りにコードを生成しているのであとは
その間のロジックとを実装するだけということになります。


### resolverの実装

というわけでスキーマの定義がおわったのでいよいよresolverの実装に入ってきます。resolverでは、クライアントからのリクエストに応じて
DBからデータを取得してくる、レコードを作成する等々を行なっていきます。

gqlgenにおける注意点としては、resolver.goはすでに存在する場合コード生成のコマンドを実行しても上書きされずそのままという点です。
(逆にスキーマ変えてresolverが全部もとの状態に戻ってしまうのは当たり前に辛いのですが）

というわけでCRUDするresolverは下に貼っておきます。
ひとつずつ説明するのもやぼったいのでざっくり説明をするとさきほどschema.graphqlで定義したメソッド群が
resolverに実装されていれば良いので、mutaionはmutationResolver、queryはqueryResolverのメソッドとしてひとつひとつずつ実装を進めていけば完了です。

```go

type Resolver struct {
}

func (r *Resolver) Mutation() MutationResolver {
	return &mutationResolver{r}
}
func (r *Resolver) Query() QueryResolver {
	return &queryResolver{r}
}

type mutationResolver struct{ *Resolver }

func (r *mutationResolver) CreateUser(ctx context.Context, input NewUser) (*models.User, error) {
	user := models.User{
		Name: input.Name,
	}
	db.Create(&user)
	return &user, nil
}

func (r *mutationResolver) CreateTodo(ctx context.Context, input NewTodo) (*models.Todo, error) {
	todo := models.Todo{
		Text:   input.Text,
		UserID: input.UserID,
		Done:   false,
	}
	db.Create(&todo)
	return &todo, nil
}

func (r *mutationResolver) UpdateTodo(ctx context.Context, input EditTodo) (*models.Todo, error) {
	todo := models.Todo{ID: input.ID}
	db.First(&todo)
	todo.Text = input.Text
	db.Model(&models.Todo{}).Update(&todo)

	return &todo, nil
}

func (r *mutationResolver) DeleteTodo(ctx context.Context, input int) (*models.Todo, error) {
	todo := models.Todo{
		ID: input,
	}
	db.First(&todo)
	db.Delete(&todo)
	return &todo, nil
}

type queryResolver struct{ *Resolver }

func (r *queryResolver) Todo(ctx context.Context, input *FetchTodo) (*models.Todo, error) {
	var todo models.Todo
	db.Preload("User").First(&todo, input.ID)
	return &todo, nil
}

func (r *queryResolver) Todos(ctx context.Context) ([]models.Todo, error) {
	var todos []models.Todo
	db.Preload("User").Find(&todos)
	fmt.Println(todos[0].User)
	return todos, nil
}

func (r *queryResolver) Users(ctx context.Context) ([]models.User, error) {
	var users []models.User
	db.Find(&users)
	return users, nil
}
```



### 起動

resolverの実装までできたらあとは起動するだけなので、go runをしていきます。
今回用意したリポジトリでは、エントリーポイントをcmd/app/main.goとしており、環境変数を与えて設定ファイルを
読むようにしているのでENVもあたえつつ下記コマンドを実行します。

```go
ENV=development go run cmd/app/main.go
```

起動するとサーバーのログが流れ始めると思うのですが、同時に localhost:8080にアクセスするとplaygroundでクエリを試すことができます。


## 詰まったところ

流れの部分はさらっと書きましたが、今回の構築にあたり結構いろんなところで詰まったのでそこについてまとめておきます。


### CreatedAtやUpdatedAtなどの日付の型ってどうやってスキーマ定義するの？

Schemaの型というのは、

* ID
* Int
* Float
* String
* Boolean

しかデフォルトで設定されていないので、日時などのデータは別で定義しておく必要があります。
私がサンプルを作るときはここにつまずいて色々とドキュメントを漁っていたのですが、gqlgenがデフォルトで
提供しているTime型というのがあるのでそれを使えば問題ありませんでした。

上にのせたスキーマ定義にも書いたようにgqlgenで定義された型を使用するには

```go
scalar Time
```

とします。

この宣言をした後にスキーマでその型を使うとGo組み込みのtime.Time型にマッピングしてくれます。
gqlgenではTime以外にもMap, Upload, Anyなどに対応しているのでそれぞれの型が必要な時は上のように
scalar宣言でスキーマで使える型を追加して頂ければ良いと思います。

### Gormを埋め込みしたモデルでジェネレートしようとするとこける

これは解決していなくてワークアラウンドでしのいだのですが、下記のようにモデルをgormの埋め込みで
定義するとジェネレートしようとした時にこけます。

```go
type User {
  gorm.Model
  name
}
```

一旦は上の方のモデル定義にあるように全てのフィールドをベタで書いてしのいだのですが、なんだかイマイチです。
gormとgqlgenを一緒に使うのに結構ハマったのですがGo詳しい人だと秒で解決できる問題ないんですかね・・・ちょっとわからないので勉強します。


### リストを取得した時にアソシエーションのモデルも取得する

これはGraphQLというより、Gormの話なのですがリストをAPIから取得する時に同時に関連したモデルも取ってきたいというこ結構ありますよね。
ということで今回のサンプルでもTodoのリストを取得しつつ、Todoを作成したユーザの情報もとりたいなということでgqlgen+gorm（ほとんどgormの話ですが）で書くとどうなるのかというのをやってみました。

ちょっとめんどくさそうでしたが、思ったより結構シンプルにかけました。構造体にそれ用のフィールドを用意するだけです。

```go
type Todo {
  id:   Int!
  text: String!
  done: Boolean!
  userID: Int!
  user: User!
  createdAt: Time!
  updatedAt: Time!
}
```

Todoのモデルを例にとると、userIDとuserというフィールドを用意してあげるだけで、関連したモデルを取ってくるのに困りません。
あとは、resolver内で

```go
db.Preload("User").Find(&todo, input.ID)
```

という形で読んであげれば、関連したモデルもろともバシッと取ってきてくれます。
リストを取得する時に気になるのはN+1問題ですが、SQLのログをみても

```sql
(/app/src/gin_graphql/resolver.go:65)
[2019-05-14 15:27:07]  [0.90ms]  SELECT * FROM `todos`  WHERE (`todos`.`id` = 2) ORDER BY `todos`.`id` ASC LIMIT 1
[1 rows affected or returned ]

(/app/src/gin_graphql/resolver.go:65)
[2019-05-14 15:27:07]  [2.65ms]  SELECT * FROM `users`  WHERE (`id` IN (1)) ORDER BY `users`.`id` ASC
[1 rows affected or returned ]
```

という形でPreloadしてくれています。（当たり前といえば当たり前なのですが）
ネットで記事をあさっているとgqlを触っているとN+1がーという話をよくみたのですが、Preloadしとけば問題なさそうなんですが
どうなんですかね？gormを使ってないからなんでしょうか？ちょっとわからないので課題として頭の片隅においておきます。

## まとめ

というわけで、最近のWeb APIにありがちなスタック+GraphQLでサーバーを構築してみました。
最近やっぱりRESTで案件をやっていると限界を感じてきているのでGraphQLやっぱり良いなという感じです。。

今更感は否めないですが、GraphQLはだいぶ便利そうです。RESTだとフロントに依存してはダメとわかりつつもWeb作った後にアプリも作ろうみたいになるとどうしてもAPI側の改修って必要になりますよね。


そりゃ別のもの作るので、実装当初に予期していないことが起こるのはある程度しょうがないのですが、その都度またエンドポイントを作りなおしてということをやっていくのでなんだかいたたまれない気持ちになってくることも多いです。
もともとWebでつくっていたものをアプリで作ろうとなって全く既存APIの改修が必要なかったら素敵ですよね。

GraphQLの場合は、スキーマでリソースを定義しておけばクライアント側で必要な情報だけとってくるということができるので、

新しくエンドポイントを作るときのどれくらいの情報を返しておけば良いのか？ということや将来どれくらいエンドポイントがチャンキーになりそうかという未来予測を立てたりする必要がなさそうでとっても便利なものに見えます。

もちろん、このサンプルに比べてより複雑で大規模なAPIを構築した時にどうなるのか？というところはやってみないとわらかないところではあるのですが
今回のつくってみたでは、GraphQLの可能性を大いに感じました。

日々の業務でREST脳になっている方は、休日や平日夜にGraphQLを試してみると新しい発見が面白いと思います。

では。
