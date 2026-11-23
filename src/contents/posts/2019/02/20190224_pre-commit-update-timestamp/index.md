---
templateKey: blog-post
language: ja
title: Gitのフックを使ってGatsbyブログ記事の更新日時が自動で更新されるようにした話
slug: /2019/02/24/pre-commit-update-timestamp
createdAt: 2019-02-24 12:10:43
updatedAt: 2019-02-24 12:10:43
thumbnail: /2019/02/20190224_pre-commit-update-timestamp/thumbnail.png
categories:
  - engineering
tags:
  - gatsby
  - git
related:
  - dummy
---

先月くらいにこのブログをWordpressからGatsbyでリプレイスしたのですが、やっぱりWordpressもよくできていて、一度投稿された記事を後から編集した時に更新日時が自動で更新されるて便利なんですよね。
WordpressはDBを使っているから当たり前といえば当たり前なのですが、更新日時の更新漏れとかを防ぐいみでのこの仕組みが欲しいななんて考えていました。

これがベストかと言われるとちょっとわからないのですが、gitのフックを使ってやるのがいいんじゃないかなと考えて仕組みを作ってみたのでその手順をまとめておきます。

<div class="related-post">
  <ul>
    <li>
      <a href="/2019/01/10/blog-renewal-by-gatsby">WordpressブログをGatsby+Netlifyでリプレースした話。</a>
    </li>
  </ul>
</div>

## Gitのフック

Gitのフックを知らない方のために説明しておくと、Gitではクライアント側ではコミットの前やコミットの後、サーバー側ではプッシュされる前や後にスクリプトを
実行することができます。

これを応用するとコミットする時にlintなどの静的解析ツールを使ってチェックを行なったり、prettierなどのコード整形ツールを使って
リポジトリのコードをテストしたりすることができます。


詳しくはこちらのドキュメントをみていただけるとよくわかると思います。

[Git フック](https://git-scm.com/book/ja/v1/Git-%E3%81%AE%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%9E%E3%82%A4%E3%82%BA-Git-%E3%83%95%E3%83%83%E3%82%AF)


今回は、この仕組みを利用してコミットする前にスクリプトを実行して**記事の更新日時を自動で更新してくれる仕組み**を作っていきます。

<div class="adsense"></div>


## おおまかな流れの説明

今回は**「コミットされる記事 = 更新される記事」**という前提のもと、Gitフックの中でもpre-commitというhookを使って実装していきます。

pre-commitだと名前の通りファイルがコミットされる時点でスクリプトを実行できるのでコミットが走る前のタイミングでコミットされる記事の一覧を取得し、その一覧の更新日時をアップデートする感じで実装していきます。

おおまかな処理の流れをまとめると

1. 記事をコミット
2. gitのpre-commitフックを使って更新される記事の一覧を取得
3. スクリプトを使って更新日時を更新
4. 1.と3.の変更をコミットして終了

という形になります。以降実際の実装を説明していきます。

## 実装


### pre-commitフックを仕掛ける


おおまかな流れを決めたところでまずpre-commitのフックの設定をしていきます。

Gitのフックはgitリポジトリの.git/hooksディレクトリにフックの名前のスクリプトをおくことでフックを仕掛けることができます。
今回の場合は

```bash
.git/hooks/pre-commit
```

というファイルをおいておくとpre-commitファイルがコミット前に実行される形になります。
ちなみに.gitディレクトリ配下だとリポジトリでソース管理できないので私の場合は.git/hooksをルートディレクトリのhooksディレクトリのシンボリックリンクにしています。

```bash
rm -rf .git/hooks      # 既存のhooksディレクトリを削除
mkdir hooks            # リポジトリ管理用のディレクトリを作成
ln ../hooks .git/hooks # ルートのhooksディレクトリへのシンボリックリンク作成

touch hooks/pre-commit     # pre-commitファイルを作成
chmod 755 hooks/pre-commit # 実行権限を付与
```

これでpre-commitのフックを仕掛けると同時にフックのスクリプトをリポジトリ管理できます。

### pre-commitでの処理を実装

pre-commitのスクリプトでやることですが、先ほど説明した通り

1. コミットされる記事の一覧を取得
2. 更新日時のの二点です。

今回は1. はgitのコマンド、2.はjsのスクリプトで実装しました。2.は慣れている人だとシェル芸とかでできてしまうのかもしれないですが、
ちょっと時間かかりそうだったので既存のスクリプトをちょっと変えてタイムスタンプを更新するスクリプトを書きました。

pre-commitのファイルの中身は以下のようになります。

```bash
#!/bin/bash

PATTERN=index.md

# コミットされる記事の取得
DIFF=$(git diff --name-only --cached | grep $PATTERN )

# タイムスタンプ更新用のコマンド
UPDATE_TIMESTAMP="node ./scripts/updatedAt/index.js $DIFF"

$UPDATE_TIMESTAMP
if [[ $? -eq 0 ]]
then
  # タイムスタンプを更新した文のファイルを追加
  git add $DIFF
fi

```

gitコマンドとgrepコマンドを組み合わせてコミットされる記事は取得できるので1.の部分は

```bash
git diff --name-only --cached | grep [記事ファイルをフィルタする条件]
```

のような形で取得しています。

あとはそこで取得した一覧を引数に与えるとタイムスタンプを更新してくれるスクリプトを実行して、
そこでの変更分をaddしています。


### タイムスタンプを更新するスクリプトを実装

pre-commitの仕込みも終わりタイムスタンプ更新対象のファイルも取得できるようになったのであとは肝心のタイムスタンプ更新スクリプトの実装を残すだけです。

ここでは一応参考までにjsのコードを置いておきますが、シェル芸でやろうがrubyスクリプトを使おうが一向に構いません。
タイムスタンプさえ更新できていればOKです。

```javascript
const path = require('path');
const fs = require('fs');
const moment = require('moment');

const alertForRequired = (key, value) => {
  if (!value || value.length === 0) {
    console.error(`[ERROR] ${key} is required`);
    process.exit(1);
  }
};

const update = (lines) => {
  const timestamp = moment().format('YYYY-MM-DD HH:mm:ss')
  const matcher = /^updatedAt:.*$/
  const data = lines.map(line => {
    if (line.match(matcher)) {
      return `updatedAt: ${timestamp}`
    }
    return line
  })
  return data.join("\n")
}

const { argv } = process
const paths = argv.slice(2, argv.length)
alertForRequired('path', paths)

const list = paths.map(path => {
  console.log('update timestamp:', path)
  const tmp = path + '.tmp'
  const content = fs.readFileSync(path, "utf8");
  const lines = content.split("\n")
  const data = update(lines)
  fs.writeFileSync(tmp, data);
  fs.copyFileSync(tmp, path)
  fs.unlinkSync(tmp)
});

```

コード自体は単純で引数でわたされたファイルを順番に処理していってマッチャーに引っかかるものが
あれば現在日時で更新するというだけです。繰り返しにはなりますが、ここは本当にタイムスタンプが更新できれば良いので各自早い安い方法を採用頂ければという感じです。

### 実行してみる

一応念の為実行ログを貼っておくと以下のようになります。

```bash
$ git commit -m "some fix"
update timestamp: src/pages/posts/2017/12/20171225_report/index.md
[master 89922c8] some fix
 2 files changed, 4 insertions(+), 2 deletions(-)

```

タイムスタンプ更新スクリプト内でタイムスタンプの更新されたファイルを標準出力するようにしているので、無事タイムスタンプが更新されていることがわかります。
これでタイムスタンプ自動更新の作成は終わりです。


## まとめ

実運用はまだなのでどれくらい使えるとかデメリットに気づけていない部分あるかもしれませんが現段で良いと思うものを一旦まとめました。

ちなみに、あえてタイムスタンプを更新したくない場合は

```bash
git commit --no-verify
```

とするとフックを回避することができるので、タイムスタンプを更新せずに記事をコミットすることができます。


以上です！
では。
