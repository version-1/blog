---
templateKey: blog-post
language: ja
title: 基本から応用までCircle CIのConfig 2.1の書き方まとめ
slug: /2019/09/24/get-start-circle-ci-confg-2-1
createdAt: 2019-09-24 10:12:41
updatedAt: 2019-09-24 10:12:41
thumbnail: /2019/09/20190924_get-start-circle-ci-confg-2-1/thumbnail.png
categories:
  - engineering
tags:
  - test
  - ci
  - circleci
---

最近Cicle CIを触る機会があり、これまであまりガッツリconfig書き込んだりする機会がなかったのですが、 仕事でちょと触れる機会がありましたので、そこで学んだことをまとめて共有していこうかと思います。

Github Actionsなんかも最近は使えるようになっているそうで、
そこらへんともちゃんと比較して自分のプロジェクトにどっちがあっているのかというのを比較検討した方が
良いかとは思ったのですが、すでにCircle CI を使って現状にすごく不満があるとかではないのと自分自身
あまりAPIとフロントがちゃんとあるプロジェクトでCI構築したことがなかったので、まぁまずはメジャーな
CircleCIを使っていこうというのを決めました。

今回は、自動テストの環境が現プロジェクトにはあったのですが、自動デプロイの環境が整備されておらず
結構デプロイ手順が担当者に依存している感じなので、その改善のために自動デプロイを導入してまぁ誰でも
デプロイできるような環境を作ろうかという経緯でCircleCIを使ったデプロイの自動化をはじめました。

## ドキュメント

CircleCIを使うにあたってまずは公式のドキュメントが結構ちゃんと書かれているので、
そちらを参考にしてデプロイの自動化を進めていきました。

[CircleCIを設定する](https://circleci.com/docs/ja/2.0/configuration-reference/#section=configuration)

というかこちらのドキュメントをしっかり読めば、こっちの記事はあまり読まなくても良いかもしれません。笑
とはいえ、この後読まれないのも悲しいのでドキュメントをまとめてわかりやすくなるように説明していこうと思います。

今回説明するのはconfigのバージョン2.1で2.0とは異なるので注意してください。

2.1だとCommandやExecutorなどの定義が使えるようになり処理の共通化がより簡単にできるようになっています。

## Circle CIで押さえておきたい概念まとめ

まずCirce CIはプロジェクトのルートディレクトリから.circleci/config.ymlにCIの設定を書くことで、
CIで実行する処理を定義していきます。

### JobとWorkflow

以下でその処理を定義する際に必要な概念を説明しておきますが、先にざっくり説明をすると**Job**という処理の基本単位があり、
それを順番にして一つの**Workflow(ワークフロー)**を定義していきます。

**Workflow(ワークフロー)**というのがパッとわからない人もいるかと思いますが、まぁ訳した通り作業全体の流というに形になります。
CIだと

1. テストコードを実行
2. 1.にパスすることを確認してデプロイ

という流れが一般的ですがこの1と2の流れがWorkflowです。

実際の現場では、APIサーバのソースをテスト・デプロイ、フロントのソースをテスト・デプロイする必要があるなど少し複雑に
なりますが基本の考え方は変わりません。

この例だと、

- APIサーバのテスト
- APIサーバのデプロイ
- フロントのテスト
- フロントのデプロイ

の４つのJobから構成され、これらをどういう順番で実行するかというのがWorkflowです。

これを簡易的なyamlで書くと以下のようなイメージです。

※正しい形式ではないので、実際には公式ドキュメントにならって記述してください。

```yaml
version: 2.1
jobs:
  - api-test:
      name: 'APIサーバのテスト'
  - api-deploy:
      name: 'APIサーバのデプロイ'
  - front-test:
      name: 'フロントのテスト'
  - front-deploy:
      name: 'フロントのデプロイ'
workflow:
  - test-and-deploy:
      jobs:
        - api-test
        - front-test
        - api-deploy
            requires:
              - api-test
        - front-deploy
            requires:
              - api-deploy
              - api-front
```

<div class="adsense"></div>

workflowのところにrequiresというのがありますが、ここにはjobを実行する前に終わらしておきたい
Jobを書いておきます。要はそのJobの依存タスクを書いておく必要があります。
これを書いておかないとCirecleCIは順番を気にせずじゃんじゃか実行してしまうのでテストが終わる前に
デプロイされてしまうなんてこともありえます。（並列数にもよりますが）

WorkflowはJobの上位の概念として覚えておければ良いかと思います。


### Steps

次に、この定義を押さえた上でさらに細かい部分を見ていくと**Job**は**Steps**から構成されStepsでは、
Jobの中で実際行う処理を記述していきます。
Stepsの中では、シェルコマンドが実行できここにひたすら、処理を記述していきます。


```yaml
jobs:
  - api-test:
      name: 'APIサーバのテスト'
      steps:
        - checkout
        - run:
          name: 'ライブラリのインストール'
          command: |
            bundle install
        - run:
          name: 'テストの実行'
          command: |
            bundle exec rspec
```

詳しくは公式のドキュメントに譲りますが、When句で前のコマンドが失敗したらコマンドを実行するなどの制御
ができたり、リポジトリからのチェックアウトなどを行うコマンドも用意されています。

実際のコマンドの実行には主にrunコマンドを使いますが、runでは作業ディレクトリを指定したりそのコマンドの
中だけで有効な環境変数を定義したりすることができます。

### Command(2.1から使用可)

Commandは2.1からの昨日ですが、Commandを活用することでStepsを共通化することができます。
例えば多くの場合、毎回テストのたびにパッケージをインストールするのは冗長なのでキャッシュを効かせたくなるかと思いますが、
そのためには、

1. キャッシュが存在するかチェック
2. パッケージをインストール（キャッシュがあればそれを使う）
3. 最新の状態でキャッシュを上書き

ということをすると思うのですが、この処理を各ジョブで毎回コピペして書くのはかったるいので、
ここの処理だけCommandとして定義して再利用します。


```yaml
commands:
  package-install:
    description: 'キャッシュを使ったパッケージインストール'
    steps:
      - restore-cache
        keys:
          - v1-hoge-server-{{ checksum: 'Gemfile.lock }}
          - v1-hoge-server
      - run
        name: 'bundle install'
        command: bundle install vender/bundle
      - save-cache
        key:
          - v1-hoge-server-{{ checksum: 'Gemfile.lock }}
          - v1-hoge-server
        paths:
          - vender/bundle

```

こうやってあらかじめパッケージインストールのコマンドを書いておけばデプロイ前とテスト前にイチイチこの
処理を書く必要なく、コマンドを呼び出すだけで事足りるようになり、DRYなconfigができあがります。

parametersという形で引数もこのコマンドに渡せるのでパラメータも使うとより再利用可能なコマンドが作り易くなるかと思います。

### Executors(2.1から使用可)

Executorsは環境を再利用するためのものです。dockerのイメージを環境を作ってそれを使い回すことができます。

### Orbs(2.1から使用可)

Orbsというワードは聞きなれないかもしれませんが、要はライブラリです。ここまでに紹介したCommandsやJobsはプロジェクト内での
共通化ができましたが、Orbsは一度使って公開すると他のプロジェクト、もっと言うとCircleCIを使う全プロジェクトで使うことができます。

https://circleci.com/orbs/registry/

こちらがOrbsのレジストリになるので使えるOrbsを見ておくと良いかと思います。

僕が見た限りではSlackのorbsなどがあったので、それを使うと通知とかが手軽に実装できそうだなという感じでした。
その他、Ruby, Nodeなどのorbsなどもあったので、CircleCIに指定のバージョンの言語をインストールするなんていうのも手軽できそうです。

### 概念まとめ

ここまでで説明してきたものをまとめておくと

* Workflow
* Jobs
* Steps
* Commands
* Executors
* Orbs

 あたりを理解しておけばとりあえずCircleCIを始められそうです。
 またそれぞれの関係が

 **Workflow > Jobs > Steps** という感じの関係（依存関係）で
 Commandsは**Jobを共通化**するもの、Orbsは**プロジェクトを横断するパブリックなJobの共通化**、
 Executorsは**実行環境の共通化**と言う感じで理解しておくのが良さそうです。


## さらに踏み込んだ内容

CirecleCIを使い始めるにはこれまでの説明で足りそうですが、僕が始めるにあたってちょっと気になり、
多少踏み込んだ内容をまとめておくと以下のようになります。

### キャッシュを使う

CircleCIでは、ディレクトリを指定してキャッシュとして保存しておけるので、一回のビルドで毎回パッケージをインストール
しないといけないという問題を解消することができます。

[依存関係のキャッシュ](https://circleci.com/docs/ja/2.0/caching/)

Job内Stepsで使える`save_cache`を使うとキャッシュ時のキーとパスを指定して、キャッシュ、`restore_cache`でキャッシュを
使い回すことができます。

### ブランチごとに制御する

branchesを使うとWorkflow, Jobを実行するブランチを制御することができます。

これで「developにマージされたら、テスト終了後にデプロイを走らせる」といったことが可能になります。
また、正規表現でのホワイトリストの登録もできるのでfeatureブランチにはテストを実行するといった制御も可能です。

### SSHを使用する

Ansible, Capistrano, 自作のスクリプトなどでSSHをする必要がある場合がありますが、あらかじめCirecleCI
に秘密鍵を登録しておくことでSSHを利用してリモートサーバにログインさせることが可能です。

秘密鍵の登録はコンソール画面からできますが、鍵を登録された後にそれをJob内で使用する必要がある場合は
`add_ssh_keys`でfingerprintを指定して使用する鍵を登録する必要があります。

### デフォルトの環境変数

定義済み環境変数はこちらです。

[定義済み環境変数](https://circleci.com/docs/ja/2.0/env-vars/#%E5%AE%9A%E7%BE%A9%E6%B8%88%E3%81%BF%E7%92%B0%E5%A2%83%E5%A4%89%E6%95%B0)

* プルリクエストを作成したユーザ名
* 現在のジョブ名称
* 現在ビルドしているブランチ名

などなどビルドのメタ情報が環境変数として定義されています。

### 環境変数のスコープ

環境変数はWorkflow, Job, Executor内のenvironmentsで環境変数を定義して使うことができます。
変数のスコープはそれぞれ定義した場所により、Jobで定義すればそのJob内、Executorで定義すればその実行環境内で有効です。

その他、シェルコマンドやステップ内でも環境変数を設定できますがこちらもそれぞれのスコープのみで有効です。

### Configファイルのバリデーション

最初のうちなれないとConfigファイルのシンタックスに添えずエラーになることがあるかと思いますが、
あらかじめCircleCIのCLIをインストールしておくとローカルでconfigファイルの検証ができます。

これの検証を通ったらpushするようにするとリポジトリに無駄にプッシュするのを避けることができます。

[インストール手順](https://circleci.com/docs/ja/2.0/local-cli/#インストール)

検証のコマンドはこちらです。

```bash
circleci config validate
```


## まとめ

ここまでざーっとCircleCIの概念や導入の際に気になる点をまとめてみましたがいかがでしょうか？

実作業ではドキュメントを繰り返し参照しながらConfigを作りましたが、日本語のドキュメントが結構丁寧に書かれているので意外とすんなり入り込めると思います。
また、元のconfigが2.0だったのですが、CommandsとExecutorが使えるようになり、かなりの処理を共通化できるので結構快適になりました。
おかげで現場のデプロイをサクッと自動化できました。Orbsあたりはまだ使えていなかったので、今後のCIのエンハンスとしてすきをみて使っていきたいなと
思います。

では
