---
templateKey: blog-post
language: ja
title: Docker, Gin, Gorm, DepでCRUDできるAPI作成
slug: /2019/05/02/docker-gin-gorm-dep-crud
createdAt: 2019-05-02 06:49:23
updatedAt: 2019-05-02 10:55:31
thumbnail: /2019/05/20190502_docker-gin-gorm-dep-crud/thumbnail.png
categories:
  - engineering
tags:
  - go
  - learning
  - serverside
---


このような記事を書きつつGOを学習中なのですが、今回はWebAPIでCRUDでも作ってみるかということで
手順や詰まったところをまとめていきます。


<div class="related-post">
<ul>
  <li><a href="/2019/01/21/get-start-go">Go言語の文法を勉強して印象にのこったところまとめ。</a></li>
  <li><a href="/2019/03/11/go-numpre">Go言語で数独（ナンプレ）を解くコードを書いてみた</a></li>
</ul>
</div>

<div class="adsense"></div>


## 使用する技術

#### Docker

ローカルのPCを汚すのが嫌なのでDockerを使っていきます。MySQLも使うのでdocker-composeで作っていきます。

#### Gin

Go言語のフレームワークの一つで、Go言語フレームワークでも一番スターが多いそうなのでAPI実装のために
Ginを使ってみました。プロダクトの実装ではフルスタックフレームワークの方が嬉しい面もあるのでbeeogo
にも惹かれましたが、まずはシンプルなフレームワークから使ってコード書く量を増やしましょうということで
Ginを採用しました。

#### Gorm(MySQL)

Go言語のORM（オーアールマッパー）です。RailsライクなインターフェースだそうなのでRailsのActiveRecordに
親しんでいたものとしていくつかORMあるそうですがgormを採用しました。

#### Dep

Goのパッケージ管理ツールです。単純にパッケージ管理が必要なのと、Dockerで環境を構築する時に"go get"で
Dockerfileが荒らされるのが嫌だったので、アプリ内でしか使わないものはdepコマンドで管理するようにします。


## 早速つくっていく


### コンテナの準備


まずはDockerのイメージの作成からやっていきます。Dockerfileを晒すとこういう感じです。
最終的なリポジトリはこちらです。

https://github.com/version-1/gin-gorm-sample

```dockerfile
FROM golang:latest
ENV ROOTDIR /app
ENV WORKDIR /app/src/gin-sample
ENV GOPATH $ROOTDIR
ENV GOBIN $ROOTDIR/bin
WORKDIR $WORKDIR
VOLUME $ROOTDIR
ADD . $ROOTDIR

RUN apt-get update && \
    apt-get -y install mysql-client && \
    echo "export PATH=$PATH:$GOBIN" > /root/.bashrc

CMD ["go", "run", "cmd/app/main.go"]
```

やっているのは各種環境変数の設定とMySQLクライアントのインストールとGOBINをパスに含めたりする部分です。
docker-composeはこういう形です。

```
version: '3'
services:
  app:
    build: .
    ports:
      - "8080:8080"
    security_opt:
      - seccomp:unconfined
    depends_on:
      - db
  db:
    image: mysql:5.7.19
    environment:
       - MYSQL_ROOT_PASSWORD=password
    ports:
      - "3306:3306"
    volumes:
      - ./data/mysql:/var/lib/mysql:cached

```

このままだとdepがインストールできていないので作成したコンテナでgo getしてビルドされたdepファイルを作成します。

```bash
docker-compose run -v $PWD:/app -p 8080:8080 app bash
go get -u github.com/golang/dep/cmd/dep
```

ここまでコンテナ内でdepコマンドが使えるようになるのでコンテナ内でさらに

```
dep ensure
```

とすることで依存パッケージのビルドが完了します。


### コーディング

最初src/[パッケージ名]下のディレクトリの配置をどうするか悩んだのですがスタンダードなGo Projectのレイアウト
があるそうなので今回はそれに則ってみました。

https://github.com/golang-standards/project-layout

cmd/ 配下に実際に実装するコマンドのmain.goを配置しました。今回はDBからデータを取得などなども実装していくので
はじめに簡易マイグレーションコマンドを実装しました。


としています。

```go
// cmd/migrate/main.go
package main

import (
  "gin-sample/internal/models"
  "gin-sample/pkg"
)

func main() {
  db := pkg.Connect("development")
  defer db.Close()

  db.AutoMigrate(&models.Product{})
  db.Create(&models.Product{Code: "L1212", Price: 1000})
  db.Create(&models.Product{Code: "ABABA", Price: 2000})
  db.Create(&models.Product{Code: "CDCDC", Price: 3000})
}

```

ここでは単純にDBとの接続を行い、productデーブルを作成後に実データ投入という感じです。
マイグレーションといいつつデータも投入していますね。DB接続の部分は実際のWebAPIの方でも使うので
パッケージに切り出しています。


そして次は実際のWeb API部分です。


```go
// cmd/app/main.go

package main

import (
  "gin-sample/internal/models"
  "gin-sample/pkg"
  "github.com/gin-gonic/gin"
  "net/http"
  "strconv"
)

func main() {
  r := gin.Default()
  db := pkg.Connect("development")
  defer db.Close()
  db.LogMode(true)

  r.GET("/products", func(c *gin.Context) {
    var products []models.Product
    db.Find(&products)
    c.JSON(200, products)
  })

  r.GET("/products/:id", func(c *gin.Context) {
    id := c.Param("id")
    var product models.Product
    db.First(&product, id)
    c.JSON(200, product)
  })

  r.POST("/products", func(c *gin.Context) {
    product := models.Product{}
    err := c.Bind(&product)
    if err != nil {
      c.String(http.StatusBadRequest, "Request is failed: "+err.Error())
      return
    }
    db.NewRecord(&product)
    res := db.Create(&product)
    if res.Error != nil {
      c.JSON(402, res.Error)
    } else {
      c.JSON(200, nil)
    }
  })

  r.PUT("/products/:id", func(c *gin.Context) {
    id, _ := strconv.Atoi(c.Param("id"))
    product := models.Product{}
    db.First(&product, id)

    params := models.Product{}
    err := c.Bind(&params)
    if err != nil {
      c.String(http.StatusBadRequest, "Request is failed: "+err.Error())
      return
    }
    db.Model(&product).Updates(params)
    c.JSON(200, product)
  })

  r.DELETE("/products/:id", func(c *gin.Context) {
    id, _ := strconv.Atoi(c.Param("id"))
    db.Where("ID = ?", id).Delete(&models.Product{})
    c.JSON(200, nil)
  })
  r.Run() // listen and serve on 0.0.0.0:8080
}
```

実際はコントローラに切り出した方がお行儀が良さそうですが、一旦フラットに書き下しています。
実装のながれをざっくり説明するとさらっとおわってしまうので詰まったところ等々を書いていきます。

## 詰まったところ・工夫したところ

### delveの導入

何かプログラミングを始める時の開発効率をあげる方法としてデバッガに慣れ親しむのは大事だと思うのですが、
今回Goのデバッガとしてdelveを入れてみました。

使い方としては、dlvコマンドでアプリを起動した後にプロンプトが表示されるのでそこでブレークポイントを設定して、設定が終わったらcontinueとするとブレークポイントまで
処理が進むので、ポイントで処理が止まったらそこで変数の中身みたり、変数書き換えたりできるという感じです。

使用感はrubyのbyebugなどと似ているのですが最初にブレークポイントをコマンドで設定するのが少々面倒に感じました。
byebugなどだとコード書き換えることにはなるのですが、ファイルに直接ブレークポイントを書き込む感じになるのですのがdelve
だとこのファイルのこの行みたいに指定しないといけないので直感的でなくちょっと手間です。（何か良い方法があれば知りたい）

あと、byebugだとステップ実行しているところで任意のコードを実行できるのですが、delveだとできないんですかね？？
少し調べてもちょっとわからなかったので一旦保留にしています。

インストール自体は簡単で、depと同様にコンテナ内でgo getして使います。

一点注意点として、dockerの設定でセキリティオプションを設定しないとうまく起動してくれないということです。
docker-composeで"seccop:unconfined"を設定していないと下のようなエラーが出てきて使えないです。

```
could not launch process: fork/exec [...]: operation not permitted
```

わすれずにdocker-composeのオプション指定をしておきましょう。


## 設定ファイルの外出し

DBに接続する時に、ベタ書きでDBの設定をしても良かったのですが、実プロダクトだとそんなことはしないだろうということで
設定ファイルを外だしにする方法を調べて、実装しました。

```go
// pkg/config.go
package configs

import (
  "github.com/BurntSushi/toml"
)

type Config struct {
  Database Database
}

type Database struct {
  User     string `toml:"user"`
  Password string `toml:"password"`
  Address  string `toml:"address"`
  Name     string `toml:"name"`
}

func GetConfig(env string) Config {
  var config Config
  _, err := toml.DecodeFile("configs/"+env+".toml", &config)
  if err != nil {
    panic(err)
  }

  return config
}
```

大したことはしていないのですが、このモジュールで、tomlファイルを読み込んでパースした内容を
構造体にバインドする感じです。

設定の呼び出し元はこんな感じ、

```go
// pkg/database.go
package pkg

import (
  "github.com/go-sql-driver/mysql"
  "github.com/jinzhu/gorm"
)

func Connect(env string) *gorm.DB {
  dbConf := GetConfig(env).Database
  mysqlConf := mysql.Config{
    User:                 dbConf.User,
    Passwd:               dbConf.Password,
    Net:                  dbConf.Address,
    DBName:               dbConf.Name,
    AllowNativePasswords: true,
    ParseTime:            true,
  }

  dsn := mysqlConf.FormatDSN()
  db, err := gorm.Open("mysql", dsn)
  if err != nil {
    panic(err.Error())
  }

  return db
}
```

### SQLログを画面に出力

開発中はリクエストのログもそうですがどのようなSQLが発行されているか知りたいですよね。
gormの場合はDBの接続を作った段階で下記の一文を入れれば発行されているSQLが見えるようになります。

```go
db.LogMode(true)
```


## まとめ

当初はGraphQLとか使ってCRUDやりたいなと思っていたのですがGinいれたりGormいれたりdep入れたりしていたら意外と
時間かかったので一旦ここでセーブしておきます。次回はGraphQLサーバやりたいですね。あとMongoとかも使いたい。

では。
