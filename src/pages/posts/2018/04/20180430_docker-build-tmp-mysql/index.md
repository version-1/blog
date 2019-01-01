---
templateKey: blog-post
title: Dockerで使い捨てできるMysqlコンテナを構築
slug: /2018/04/30/docker-build-tmp-mysql
createdAt: 2018-04-30 10:30:54
updatedAt: 2018-09-02 13:09:21
thumbnail: /2018/04/20180430_docker-build-tmp-mysql/thumbnail.jpg
categories: 
  - engineering
---

&nbsp;

自分のローカル環境で、複数のMySQL使わないといけない時ってありますよね？

仕事ではちょっと古めのバージョンを使ってるけど、プライベートの開発では最新の使いたいなどなど

そんな時はDockerを使って使い捨てのMy SQL環境を構築しましょう。

Dockerを使えば、起動時に必要なデータベース、ユーザーを作成してくれるので一度環境さえ作ってしまえば、使い捨てのデータベースを作成したり、捨てたりを結構カジュアルにできます。

&nbsp;
<h2>Dockerの公式イメージを取得</h2>
&nbsp;

Dockerの基本はこちらにまとめているので、Dockerの基本的な操作がわからない方はこちらを参照ください。
<a href="https://ver-1-0.net/2017/11/19/rails-nginx-postgres-on-docker-1/">DockerでRails + Nginx + Postgresの環境を構築する。その①</a>

また、Dockerのインストールがまだの人はこちらでインストールしましょう。

今回は、My SQL環境の構築にMy SQLの公式イメージを使っていきます。

公式イメージを使うとコンテナ作成時に環境変数を与えてあげるだけで、必要なデータベースとユーザーを作成することができます。

先ずははDockerコマンドで公式イメージを取得してきましょう。

&nbsp;
```bash
docker pull mysql
```
&nbsp;

このコマンドでmysqlの最新のバージョンを取得することができます。

バージョンを指定して取得したい場合は、

&nbsp;
```bash
docker pull mysql:5.6
```
&nbsp;

のようにします。

&nbsp;
<h2>Dockerコンテナの作成</h2>
&nbsp;

イメージが取得できたら、コンテナを作成していきます。

&nbsp;
```bash
docker run --name mydb -e MYSQL_ROOT_PASSWORD -p 3309:3306 -d mysql
```
&nbsp;

docker runでコンテナを作成していきます。

引数の説明をすると

&nbsp;
<table>
<tbody>
<tr>
<th>--name</th>
<td>コンテナの名前を指定</td>
</tr>
<tr>
<th>-e</th>
<td>コンテナ起動時の環境変数を指定</td>
</tr>
<tr>
<th>-p</th>
<td>ポートフォワーディングの指定</td>
</tr>
<tr>
<th>-d</th>
<td>デーモン起動</td>
</tr>
</tbody>
</table>
&nbsp;

mysql 使用するイメージを指定。5.6を使う場合はmysql:5.6とする。

&nbsp;

ポイントはいくつかありますが、繰り返し書いたように-e オプションでコンテナ起動時の環境変数を指定できるので、起動時のROOTユーザーのパスワードを設定しています。

指定できる環境変数はいくつかあって、

&nbsp;
<table>
<tbody>
<tr>
<th>MYSQL_USER</th>
<td>起動時に作成されるユーザー名</td>
</tr>
<tr>
<th>MYSQL_PASSWORD</th>
<td>起動時に作成されるユーザーのパスワード</td>
</tr>
<tr>
<th>MYSQL_ROOT_PASSWORD</th>
<td>起動時のrootユーザーのパスワード</td>
</tr>
<tr>
<th>MYSQL_DATABASE</th>
<td>起動時に作成されるデータベース名</td>
</tr>
</tbody>
</table>
&nbsp;

のようになります。

また、 dockerでは-pオプションでポートフォワーディングの指定ができ、上のように
3309:3306
とするとホスト上の3309番のポートをコンテナ上の3306番ポートに、流し込んでくれます。

&nbsp;

&nbsp;
<h2>起動したMySQLコンテナに接続する</h2>
&nbsp;

ここが今回の記事の肝になってきますが、 dockerにあまり慣れていない人は立ち上げたDBコンテナに接続する時のIPアドレスは？？？どうやって接続するの？？？となりがちです。

結論から先に書くと、IPアドレスは127.0.0.1です。

これを聞くと、ローカルに既にあるmysqlのホストも127.0.0.1なんだけど。。。

となると思いますが安心してください。 dockerに繋げるときは別のポートで繋ぎましょう。

これを念頭においているので、上のコンテナ作成時は3309番がコンテナの3306番に割り当てられるように指定しています。

この3309番というのはポートが空いてさえいればなんでも良いのですが上で3309:3306として指定しているので、今回MySQLに接続する際はこの3309番を使用します。

&nbsp;
```bash
mysql -u root -p -h 127.0.0.1 -P 3309
```
&nbsp;

でデータベースに接続できます。

&nbsp;
<h2>独自のユーザー、データベースが作成されたコンテナを作成</h2>
&nbsp;

上では、rootユーザーでコンテナを使う形になっていますがそんなのは嫌なのでちゃんと独自のユーザーとDBを使いましょう。

便宜的に独自のデータベース名をmydbとするとコンテナ作成のコマンドは以下になります。

&nbsp;
```bash
docker run --name mydb \
-e MYSQL_ROOT_PASSWORD=password \
-e MYSQL_USER=mydb \
-e MYSQL_PASSWORD=mydb \
-e MYSQL_DATABASE=mydb \
-p 3309:3306 \
mysql
```
&nbsp;

これで独自のユーザーを持ったコンテナを作成できます。接続する際のコマンドは

&nbsp;
```bash
mysql -u mydb -p -h 127.0.0.1 -P 3309 mydb
```
&nbsp;

です。

&nbsp;
<h2>データベース起動時に初期化処理を差し込む</h2>
&nbsp;

mysqlの公式イメージでは、/docker-entrypoint-initdb.d
にスクリプトやSQLを配置するとコンテナ起動時に実行してくれます。

コンテナ作成時にデータベース内のテーブルもいっしょに作成してほしい！ダンプを取り込んで欲しい！という場合はローカルにそれらのファイルを配置しコンテナ作成時にそのディレクトリを/docker-entrypoint-initdb.dにマウントしてあげます。

ホストのディレクトリをコンテナのディレクトリにマウントするには、-vオプションを指定します。
(ホストのディレクトリは絶対パスでの指定が必要です。）

例を書くと、

&nbsp;
```bash
mkdir init-scripts
touch init-scripts/init.sql

```
&nbsp;

として
init.sqlの中身を

&nbsp;
```sql
create table ~略~
```
&nbsp;

として次のコマンドでコンテナを作成します

&nbsp;
```bash
docker run --name mydb \
-e MYSQL_ROOT_PASSWORD=password \
-e MYSQL_USER=mydb \
-e MYSQL_PASSWORD=mydb \
-e MYSQL_DATABASE=mydb \
-v $( pwd )/init-scripts:/docker-entrypoint-initdb.d \
-p 3309:3306 \
-d mysql
```
&nbsp;

これでコンテナ起動時に必要なデータベースを流し込みことができます。

ここまでで記事タイトルの目的は達成していますが以下にはトラブルシューティングを書いておきます。

&nbsp;
<h2>初期化スクリプトがエラーになりコンテナが立ち上がらない時</h2>
&nbsp;

初期化のスクリプトでエラーになった場合はコンテナが立ち上がらないので、-dオプションを取ってログを見ながらデバッグしましょう。

&nbsp;
<h2>立ち上がったコンテナを削除したい</h2>
&nbsp;
```bash
docker rm [コンテナ名] で削除できます
```
&nbsp;

-fオプションをつけるとコンテナが起動している状態でも問答無用で削除できます。

同じ名前のコンテナを２つ起動することはできないので既にあるコンテナが邪魔な場合は消してしまいましょう。

&nbsp;
<h2>mysqlが文字化けする</h2>
&nbsp;

mysqlのデータが文字化けする場合は、mysqlの設定が原因なので、起動時にmysqlのオプションで文字コードをutf8に指定してあげましょう。

&nbsp;
```bash
docker run --name mydb \
-e MYSQL_ROOT_PASSWORD=password \
-e MYSQL_USER=mydb \
-e MYSQL_PASSWORD=mydb \
-e MYSQL_DATABASE=mydb \
-v $( pwd )/init-scripts:inithogehoge \
-p 3309:3306 \
-d mysql --character-set-server=utf8 --collation-server=utf8_unicode_ci
```
&nbsp;
<h2>まとめ | 自分が使用しているスクリプトを晒す</h2>
&nbsp;

こうやって使い捨てのDBが構築できるようになるとカジュアルにデータベース捨てられるので、データも綺麗な状態を保てるし、ローカルも汚さないで複数のデータベース入れられるしでとっても捗りますね。

ちょっと難点として気軽にdb構築できる割にコマンドが長くて煩雑なので僕はスクリプトにして、再利用しています。

今回はそのスクリプトを晒して終わりにしたいと思います。基本は上にまとめたコマンドと同じですが、コンテナの落とし上げを繰り返すと同じコンテナ名が被って起動できないので、既に同じコンテナがある場合は削除するか訪ねてくれるようにしています。

もしつかえそうだったらコピペして使って頂ければ

&nbsp;
```bash
INIT=$(pwd)"/init/ddl.sql"
CONTAINER_NAME=mydb

if [[ $( docker ps -a | grep "${CONTAINER_NAME}" ) ]]
then
  echo  ${CONTAINER_NAME}" is already started..."
  echo  "remove container? (y/n) ------->"
  read ANS
  if [[ $ANS == [yY] ]]
  then
    docker rm -f ${CONTAINER_NAME}
  else
    exit 1
  fi
fi

if [[ ! -r ${INIT} ]]
then
  echo "not found ${INIT}"
  exit 1
fi

docker run \
  --name ${CONTAINER_NAME} \
  -e MYSQL_DATABASE=${CONTAINER_NAME} \
  -e MYSQL_USER=${CONTAINER_NAME} \
  -e MYSQL_PASSWORD=${CONTAINER_NAME} \
  -e MYSQL_ROOT_PASSWORD=${CONTAINER_NAME} \
  -v ${INIT}:/docker-entrypoint-initdb.d \
  -p 3309:3306 \
  -d mysql:5.6 --character-set-server=utf8 --collation-server=utf8_unicode_ci

```
&nbsp;
