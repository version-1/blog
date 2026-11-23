---
templateKey: blog-post
language: ja
title: "Codex App Server の使い方｜JSON-RPCでCodexを操作するハンズオン"
slug: /2026/07/19/codex-app-server
createdAt: 2026-07-19 00:00:00
updatedAt: 2026-07-19 00:00:00
canonical: https://zenn.dev/jjoo/articles/79c9c69deaf6fc
categories:
  - engineering
tags:
  - ai
  - tui
  - codex
---


突然ですが、 Codex App Server ご存知ですか？
codex を CLI から操作する代わりに、JSON-RPC 経由で Codex エージェントを制御できるのが Codex App Server です。
つまり、自分で GUI や TUI、タスクキュー、オーケストレーターを作れます。

> 記事自体はテンポ重視なので
> 仕様等々正確な情報を知りたい方はこちらの README.md を参照ください。
> [Codex App Server | README](https://github.com/openai/codex/blob/main/codex-rs/app-server/README.md)

Codex App Server の起動方法は

```sh
codex app-server
```


だけです。
これで標準入力待ち受け状態になるのであとはプロトコルにそってJSON (JSONL なので一行にまとめる必要はあります。) を流し込めばプログラムから Codex App Server 経由でエージェントを立ち上げて作業を行わせることができます。

# 対話の流れ

対話の流れは以下のような形です。

1. initialize 用のメッセージを送ってサーバを初期化
2. `thread/start` メッセージでエージェントとの Thread を開始
3. `turn/start` でエージェントに作業指示
4. `turn/completed` で次の作業の指示待ち
5. 3.4 を繰り返す。
6. 作業完了

という形です。

# 最低限の概念の説明: Thread と Turn
最初自分が理解しようと思ったときにイマイチイメージがわかなかったので、
説明をいれておくと、
Thread と Turn の関係はこんなイメージです。

```text
Thread:
├── Turn 1
│   User:
│     「Issueを調査してください」
│
│   Agent:
│     - コード検索
│     - ファイル読込
│     - 原因特定
│
│   turn/completed
│
├── Turn 2
│   User:
│     「修正してください」
│
│   Agent:
│     - ファイル編集
│     - テスト実行
│
│   turn/completed
│
├── Turn 3
│   User:
│     「PRを作って」
│
│   Agent:
│     - git commit
│     - git push
│     - PR作成
│
│   turn/completed
│
└── Thread終了
```

`Thread` が Codex CLI の session のようなイメージで会話の 1 ラリー が `Turn` です。

# ハンズオン

Codex App Server は JSON RPC をデフォルトで標準入力で受け付けるので こちらの JSON を 起動したサーバにコピペすれば常駐型のエージェントと対話ができます。

こちらの json を 1 行にして ターミナルにコピペすると

```json
{
  "id": 1,
  "method": "initialize",
  "params": {
  "clientInfo": {
    "name": "tutorial",
    "title": "Tutorial",
    "version": "1.0"
  }
}
```

こんな形でサーバの初期化が完了します。

```zsh
% codex app-server
{"id":1,"method":"initialize","params":{"clientInfo":{"name":"tutorial","title":"Tutorial","version":"1.0"}}}
{"id":1,"result":{"userAgent":"tutorial/0.144.5 (Mac OS 26.5.0; arm64) xterm-256color (tutorial; 1.0)","codexHome":"~/.codex","platformFamily":"unix","platformOs":"macos"}}
{"method":"remoteControl/status/changed","params":{"status":"disabled","serverName":"xxx.local","installationId":"2124e102-01b2-4b60-94c3-dabb22d2913f","environmentId":null}}
```

次は `thread/start` の命令を送ってエージェントの会話をスタートします。

```json
{"id":2,"method":"thread/start","params":{}}
```

これを送った結果がこういう感じになります。

```json
{"id":2,"result":{"thread":{"id":"019f7960-95a5-7140-8749-a3cf59e0ffab","extra":null,"sessionId":"019f7960-95a5-7140-8749-a3cf59e0ffab","forkedFromId":null,"parentThreadId":null,"preview":"","ephemeral":false,"historyMode":"legacy","modelProvider":"openai","createdAt":1784447800,"updatedAt":1784447800,"recencyAt":1784447800, ...}
{"method":"thread/started","params":{"thread":{"id":"019f7960-95a5-7140-8749-a3cf59e0ffab","extra":null,"sessionId":"019f7960-95a5-7140-8749-a3cf59e0ffab", ...}
{"method":"mcpServer/startupStatus/updated","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","name":"codex_apps","status":"starting","error":null,"failureReason":null}}
{"method":"mcpServer/startupStatus/updated","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","name":"context7","status":"starting","error":null,"failureReason":null}}
{"method":"mcpServer/startupStatus/updated","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","name":"notion-mcp-server","status":"starting","error":null,"failureReason":null}}
{"method":"mcpServer/startupStatus/updated","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","name":"notion-mcp-server","status":"ready","error":null,"failureReason":null}}
{"method":"mcpServer/startupStatus/updated","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","name":"codex_apps","status":"ready","error":null,"failureReason":null}}
{"method":"mcpServer/startupStatus/updated","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","name":"context7","status":"ready","error":null,"failureReason":null}}
```

ちょっと読みづらくなっているかもしれませんが、 `thread/started` などの表がでて、mcp サーバが起動してという感じで `codex` コマンドで対話を開始をしたときのような雰囲気が伺えます。

次に `turn/start` で作業指示を出します。
今回は「こんにちは！自己紹介してください。」という指示を出してみましょう。

```json
{"id":3,"method":"turn/start","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","input":[{"type":"text","text":"こんにちは！自己紹介してください。"}]}}
```


レスポンスは長いので、下にまとめておきます。

<details>
<summary>レスポンス</summary>


```json

{"id":3,"result":{"turn":{"id":"019f7968-a116-7f13-bf24-c56fddd4373d","items":[],"itemsView":"notLoaded","status":"inProgress","error":null,"startedAt":null,"completedAt":null,"durationMs":null}}}
{"method":"thread/status/changed","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","status":{"type":"active","activeFlags":[]}}}
{"method":"turn/started","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","turn":{"id":"019f7968-a116-7f13-bf24-c56fddd4373d","items":[],"itemsView":"notLoaded","status":"inProgress","error":null,"startedAt":1784448327,"completedAt":null,"durationMs":null}}}
{"method":"item/started","params":{"item":{"type":"userMessage","id":"019f7968-a158-7ab3-ace3-09049d5d5194","clientId":null,"content":[{"type":"text","text":"こんにちは！自己紹介してください。","text_elements":[]}]},"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","turnId":"019f7968-a116-7f13-bf24-c56fddd4373d","startedAtMs":1784448328024}}
{"method":"item/completed","params":{"item":{"type":"userMessage","id":"019f7968-a158-7ab3-ace3-09049d5d5194","clientId":null,"content":[{"type":"text","text":"こんにちは！自己紹介してください。","text_elements":[]}]},"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","turnId":"019f7968-a116-7f13-bf24-c56fddd4373d","completedAtMs":1784448328024}}
{"method":"item/started","params":{"item":{"type":"agentMessage","id":"msg_0e30b319d2fc7416016a5c854b85a0819192efde569032bd15","text":"","phase":"final_answer","memoryCitation":null},"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","turnId":"019f7968-a116-7f13-bf24-c56fddd4373d","startedAtMs":1784448331540}}
{"method":"item/agentMessage/delta","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","turnId":"019f7968-a116-7f13-bf24-c56fddd4373d","itemId":"msg_0e30b319d2fc7416016a5c854b85a0819192efde569032bd15","delta":"こんにちは"}}
{"method":"item/agentMessage/delta","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","turnId":"019f7968-a116-7f13-bf24-c56fddd4373d","itemId":"msg_0e30b319d2fc7416016a5c854b85a0819192efde569032bd15","delta":"。"}}
{"method":"item/agentMessage/delta","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","turnId":"019f7968-a116-7f13-bf24-c56fddd4373d","itemId":"msg_0e30b319d2fc7416016a5c854b85a0819192efde569032bd15","delta":"Cod"}}
{"method":"item/agentMessage/delta","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","turnId":"019f7968-a116-7f13-bf24-c56fddd4373d","itemId":"msg_0e30b319d2fc7416016a5c854b85a0819192efde569032bd15","delta":"ex"}}
{"method":"item/agentMessage/delta","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","turnId":"019f7968-a116-7f13-bf24-c56fddd4373d","itemId":"msg_0e30b319d2fc7416016a5c854b85a0819192efde569032bd15","delta":" "}}
{"method":"item/agentMessage/delta","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","turnId":"019f7968-a116-7f13-bf24-c56fddd4373d","itemId":"msg_0e30b319d2fc7416016a5c854b85a0819192efde569032bd15","delta":"です"}}
{"method":"item/agentMessage/delta","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","turnId":"019f7968-a116-7f13-bf24-c56fddd4373d","itemId":"msg_0e30b319d2fc7416016a5c854b85a0819192efde569032bd15","delta":"。\n\n"}}
{"method":"item/agentMessage/delta","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","turnId":"019f7968-a116-7f13-bf24-c56fddd4373d","itemId":"msg_0e30b319d2fc7416016a5c854b85a0819192efde569032bd15","delta":"この"}}
{"method":"item/agentMessage/delta","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","turnId":"019f7968-a116-7f13-bf24-c56fddd4373d","itemId":"msg_0e30b319d2fc7416016a5c854b85a0819192efde569032bd15","delta":"ワ"}}
{"method":"item/agentMessage/delta","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","turnId":"019f7968-a116-7f13-bf24-c56fddd4373d","itemId":"msg_0e30b319d2fc7416016a5c854b85a0819192efde569032bd15","delta":"ーク"}}
{"method":"item/agentMessage/delta","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","turnId":"019f7968-a116-7f13-bf24-c56fddd4373d","itemId":"msg_0e30b319d2fc7416016a5c854b85a0819192efde569032bd15","delta":"スペ"}}
{"method":"item/agentMessage/delta","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","turnId":"019f7968-a116-7f13-bf24-c56fddd4373d","itemId":"msg_0e30b319d2fc7416016a5c854b85a0819192efde569032bd15","delta":"ース"}}
{"method":"item/agentMessage/delta","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","turnId":"019f7968-a116-7f13-bf24-c56fddd4373d","itemId":"msg_0e30b319d2fc7416016a5c854b85a0819192efde569032bd15","delta":"内"}}
{"method":"item/agentMessage/delta","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","turnId":"019f7968-a116-7f13-bf24-c56fddd4373d","itemId":"msg_0e30b319d2fc7416016a5c854b85a0819192efde569032bd15","delta":"の"}}
{"method":"item/agentMessage/delta","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","turnId":"019f7968-a116-7f13-bf24-c56fddd4373d","itemId":"msg_0e30b319d2fc7416016a5c854b85a0819192efde569032bd15","delta":"コード"}}
{"method":"item/agentMessage/delta","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","turnId":"019f7968-a116-7f13-bf24-c56fddd4373d","itemId":"msg_0e30b319d2fc7416016a5c854b85a0819192efde569032bd15","delta":"調"}}
{"method":"item/agentMessage/delta","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","turnId":"019f7968-a116-7f13-bf24-c56fddd4373d","itemId":"msg_0e30b319d2fc7416016a5c854b85a0819192efde569032bd15","delta":"査"}}
{"method":"item/agentMessage/delta","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","turnId":"019f7968-a116-7f13-bf24-c56fddd4373d","itemId":"msg_0e30b319d2fc7416016a5c854b85a0819192efde569032bd15","delta":"、"}}
{"method":"item/agentMessage/delta","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","turnId":"019f7968-a116-7f13-bf24-c56fddd4373d","itemId":"msg_0e30b319d2fc7416016a5c854b85a0819192efde569032bd15","delta":"実"}}
{"method":"item/agentMessage/delta","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","turnId":"019f7968-a116-7f13-bf24-c56fddd4373d","itemId":"msg_0e30b319d2fc7416016a5c854b85a0819192efde569032bd15","delta":"装"}}
{"method":"item/agentMessage/delta","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","turnId":"019f7968-a116-7f13-bf24-c56fddd4373d","itemId":"msg_0e30b319d2fc7416016a5c854b85a0819192efde569032bd15","delta":"、"}}
{"method":"item/agentMessage/delta","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","turnId":"019f7968-a116-7f13-bf24-c56fddd4373d","itemId":"msg_0e30b319d2fc7416016a5c854b85a0819192efde569032bd15","delta":"テ"}}
{"method":"item/agentMessage/delta","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","turnId":"019f7968-a116-7f13-bf24-c56fddd4373d","itemId":"msg_0e30b319d2fc7416016a5c854b85a0819192efde569032bd15","delta":"スト"}}
{"method":"item/agentMessage/delta","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","turnId":"019f7968-a116-7f13-bf24-c56fddd4373d","itemId":"msg_0e30b319d2fc7416016a5c854b85a0819192efde569032bd15","delta":"、"}}
{"method":"item/agentMessage/delta","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","turnId":"019f7968-a116-7f13-bf24-c56fddd4373d","itemId":"msg_0e30b319d2fc7416016a5c854b85a0819192efde569032bd15","delta":"レビュー"}}
{"method":"item/agentMessage/delta","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","turnId":"019f7968-a116-7f13-bf24-c56fddd4373d","itemId":"msg_0e30b319d2fc7416016a5c854b85a0819192efde569032bd15","delta":"、"}}
{"method":"item/agentMessage/delta","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","turnId":"019f7968-a116-7f13-bf24-c56fddd4373d","itemId":"msg_0e30b319d2fc7416016a5c854b85a0819192efde569032bd15","delta":"Git"}}
{"method":"item/agentMessage/delta","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","turnId":"019f7968-a116-7f13-bf24-c56fddd4373d","itemId":"msg_0e30b319d2fc7416016a5c854b85a0819192efde569032bd15","delta":" 操"}}
{"method":"item/agentMessage/delta","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","turnId":"019f7968-a116-7f13-bf24-c56fddd4373d","itemId":"msg_0e30b319d2fc7416016a5c854b85a0819192efde569032bd15","delta":"作"}}
{"method":"item/agentMessage/delta","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","turnId":"019f7968-a116-7f13-bf24-c56fddd4373d","itemId":"msg_0e30b319d2fc7416016a5c854b85a0819192efde569032bd15","delta":"、"}}
{"method":"item/agentMessage/delta","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","turnId":"019f7968-a116-7f13-bf24-c56fddd4373d","itemId":"msg_0e30b319d2fc7416016a5c854b85a0819192efde569032bd15","delta":"PR"}}
{"method":"item/agentMessage/delta","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","turnId":"019f7968-a116-7f13-bf24-c56fddd4373d","itemId":"msg_0e30b319d2fc7416016a5c854b85a0819192efde569032bd15","delta":" 準"}}
{"method":"item/agentMessage/delta","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","turnId":"019f7968-a116-7f13-bf24-c56fddd4373d","itemId":"msg_0e30b319d2fc7416016a5c854b85a0819192efde569032bd15","delta":"備"}}
{"method":"item/agentMessage/delta","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","turnId":"019f7968-a116-7f13-bf24-c56fddd4373d","itemId":"msg_0e30b319d2fc7416016a5c854b85a0819192efde569032bd15","delta":"など"}}
{"method":"item/agentMessage/delta","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","turnId":"019f7968-a116-7f13-bf24-c56fddd4373d","itemId":"msg_0e30b319d2fc7416016a5c854b85a0819192efde569032bd15","delta":"を"}}
{"method":"item/agentMessage/delta","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","turnId":"019f7968-a116-7f13-bf24-c56fddd4373d","itemId":"msg_0e30b319d2fc7416016a5c854b85a0819192efde569032bd15","delta":"手"}}
{"method":"item/agentMessage/delta","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","turnId":"019f7968-a116-7f13-bf24-c56fddd4373d","itemId":"msg_0e30b319d2fc7416016a5c854b85a0819192efde569032bd15","delta":"伝"}}
{"method":"item/agentMessage/delta","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","turnId":"019f7968-a116-7f13-bf24-c56fddd4373d","itemId":"msg_0e30b319d2fc7416016a5c854b85a0819192efde569032bd15","delta":"います"}}
{"method":"item/agentMessage/delta","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","turnId":"019f7968-a116-7f13-bf24-c56fddd4373d","itemId":"msg_0e30b319d2fc7416016a5c854b85a0819192efde569032bd15","delta":"。"}}
{"method":"item/agentMessage/delta","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","turnId":"019f7968-a116-7f13-bf24-c56fddd4373d","itemId":"msg_0e30b319d2fc7416016a5c854b85a0819192efde569032bd15","delta":"既"}}
{"method":"item/agentMessage/delta","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","turnId":"019f7968-a116-7f13-bf24-c56fddd4373d","itemId":"msg_0e30b319d2fc7416016a5c854b85a0819192efde569032bd15","delta":"存"}}
{"method":"item/agentMessage/delta","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","turnId":"019f7968-a116-7f13-bf24-c56fddd4373d","itemId":"msg_0e30b319d2fc7416016a5c854b85a0819192efde569032bd15","delta":"の"}}
{"method":"item/agentMessage/delta","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","turnId":"019f7968-a116-7f13-bf24-c56fddd4373d","itemId":"msg_0e30b319d2fc7416016a5c854b85a0819192efde569032bd15","delta":"設"}}
{"method":"item/agentMessage/delta","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","turnId":"019f7968-a116-7f13-bf24-c56fddd4373d","itemId":"msg_0e30b319d2fc7416016a5c854b85a0819192efde569032bd15","delta":"計"}}
{"method":"item/agentMessage/delta","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","turnId":"019f7968-a116-7f13-bf24-c56fddd4373d","itemId":"msg_0e30b319d2fc7416016a5c854b85a0819192efde569032bd15","delta":"や"}}
{"method":"item/agentMessage/delta","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","turnId":"019f7968-a116-7f13-bf24-c56fddd4373d","itemId":"msg_0e30b319d2fc7416016a5c854b85a0819192efde569032bd15","delta":"リ"}}
{"method":"item/agentMessage/delta","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","turnId":"019f7968-a116-7f13-bf24-c56fddd4373d","itemId":"msg_0e30b319d2fc7416016a5c854b85a0819192efde569032bd15","delta":"ポ"}}
{"method":"item/agentMessage/delta","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","turnId":"019f7968-a116-7f13-bf24-c56fddd4373d","itemId":"msg_0e30b319d2fc7416016a5c854b85a0819192efde569032bd15","delta":"ジ"}}
{"method":"item/agentMessage/delta","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","turnId":"019f7968-a116-7f13-bf24-c56fddd4373d","itemId":"msg_0e30b319d2fc7416016a5c854b85a0819192efde569032bd15","delta":"ト"}}
{"method":"item/agentMessage/delta","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","turnId":"019f7968-a116-7f13-bf24-c56fddd4373d","itemId":"msg_0e30b319d2fc7416016a5c854b85a0819192efde569032bd15","delta":"リ"}}
{"method":"item/agentMessage/delta","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","turnId":"019f7968-a116-7f13-bf24-c56fddd4373d","itemId":"msg_0e30b319d2fc7416016a5c854b85a0819192efde569032bd15","delta":"の"}}
{"method":"item/agentMessage/delta","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","turnId":"019f7968-a116-7f13-bf24-c56fddd4373d","itemId":"msg_0e30b319d2fc7416016a5c854b85a0819192efde569032bd15","delta":"流"}}
{"method":"item/agentMessage/delta","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","turnId":"019f7968-a116-7f13-bf24-c56fddd4373d","itemId":"msg_0e30b319d2fc7416016a5c854b85a0819192efde569032bd15","delta":"儀"}}
{"method":"item/agentMessage/delta","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","turnId":"019f7968-a116-7f13-bf24-c56fddd4373d","itemId":"msg_0e30b319d2fc7416016a5c854b85a0819192efde569032bd15","delta":"を"}}
{"method":"item/agentMessage/delta","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","turnId":"019f7968-a116-7f13-bf24-c56fddd4373d","itemId":"msg_0e30b319d2fc7416016a5c854b85a0819192efde569032bd15","delta":"読"}}
{"method":"item/agentMessage/delta","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","turnId":"019f7968-a116-7f13-bf24-c56fddd4373d","itemId":"msg_0e30b319d2fc7416016a5c854b85a0819192efde569032bd15","delta":"ん"}}
{"method":"item/agentMessage/delta","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","turnId":"019f7968-a116-7f13-bf24-c56fddd4373d","itemId":"msg_0e30b319d2fc7416016a5c854b85a0819192efde569032bd15","delta":"だ"}}
{"method":"item/agentMessage/delta","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","turnId":"019f7968-a116-7f13-bf24-c56fddd4373d","itemId":"msg_0e30b319d2fc7416016a5c854b85a0819192efde569032bd15","delta":"上"}}
{"method":"item/agentMessage/delta","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","turnId":"019f7968-a116-7f13-bf24-c56fddd4373d","itemId":"msg_0e30b319d2fc7416016a5c854b85a0819192efde569032bd15","delta":"で"}}
{"method":"item/agentMessage/delta","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","turnId":"019f7968-a116-7f13-bf24-c56fddd4373d","itemId":"msg_0e30b319d2fc7416016a5c854b85a0819192efde569032bd15","delta":"、小"}}
{"method":"item/agentMessage/delta","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","turnId":"019f7968-a116-7f13-bf24-c56fddd4373d","itemId":"msg_0e30b319d2fc7416016a5c854b85a0819192efde569032bd15","delta":"さ"}}
{"method":"item/agentMessage/delta","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","turnId":"019f7968-a116-7f13-bf24-c56fddd4373d","itemId":"msg_0e30b319d2fc7416016a5c854b85a0819192efde569032bd15","delta":"く"}}
{"method":"item/agentMessage/delta","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","turnId":"019f7968-a116-7f13-bf24-c56fddd4373d","itemId":"msg_0e30b319d2fc7416016a5c854b85a0819192efde569032bd15","delta":"安全"}}
{"method":"item/agentMessage/delta","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","turnId":"019f7968-a116-7f13-bf24-c56fddd4373d","itemId":"msg_0e30b319d2fc7416016a5c854b85a0819192efde569032bd15","delta":"な"}}
{"method":"item/agentMessage/delta","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","turnId":"019f7968-a116-7f13-bf24-c56fddd4373d","itemId":"msg_0e30b319d2fc7416016a5c854b85a0819192efde569032bd15","delta":"差"}}
{"method":"item/agentMessage/delta","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","turnId":"019f7968-a116-7f13-bf24-c56fddd4373d","itemId":"msg_0e30b319d2fc7416016a5c854b85a0819192efde569032bd15","delta":"分"}}
{"method":"item/agentMessage/delta","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","turnId":"019f7968-a116-7f13-bf24-c56fddd4373d","itemId":"msg_0e30b319d2fc7416016a5c854b85a0819192efde569032bd15","delta":"で"}}
{"method":"item/agentMessage/delta","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","turnId":"019f7968-a116-7f13-bf24-c56fddd4373d","itemId":"msg_0e30b319d2fc7416016a5c854b85a0819192efde569032bd15","delta":"進"}}
{"method":"item/agentMessage/delta","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","turnId":"019f7968-a116-7f13-bf24-c56fddd4373d","itemId":"msg_0e30b319d2fc7416016a5c854b85a0819192efde569032bd15","delta":"め"}}
{"method":"item/agentMessage/delta","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","turnId":"019f7968-a116-7f13-bf24-c56fddd4373d","itemId":"msg_0e30b319d2fc7416016a5c854b85a0819192efde569032bd15","delta":"る"}}
{"method":"item/agentMessage/delta","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","turnId":"019f7968-a116-7f13-bf24-c56fddd4373d","itemId":"msg_0e30b319d2fc7416016a5c854b85a0819192efde569032bd15","delta":"の"}}
{"method":"item/agentMessage/delta","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","turnId":"019f7968-a116-7f13-bf24-c56fddd4373d","itemId":"msg_0e30b319d2fc7416016a5c854b85a0819192efde569032bd15","delta":"が"}}
{"method":"item/agentMessage/delta","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","turnId":"019f7968-a116-7f13-bf24-c56fddd4373d","itemId":"msg_0e30b319d2fc7416016a5c854b85a0819192efde569032bd15","delta":"基本"}}
{"method":"item/agentMessage/delta","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","turnId":"019f7968-a116-7f13-bf24-c56fddd4373d","itemId":"msg_0e30b319d2fc7416016a5c854b85a0819192efde569032bd15","delta":"方"}}
{"method":"item/agentMessage/delta","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","turnId":"019f7968-a116-7f13-bf24-c56fddd4373d","itemId":"msg_0e30b319d2fc7416016a5c854b85a0819192efde569032bd15","delta":"針"}}
{"method":"item/agentMessage/delta","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","turnId":"019f7968-a116-7f13-bf24-c56fddd4373d","itemId":"msg_0e30b319d2fc7416016a5c854b85a0819192efde569032bd15","delta":"です"}}
{"method":"item/agentMessage/delta","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","turnId":"019f7968-a116-7f13-bf24-c56fddd4373d","itemId":"msg_0e30b319d2fc7416016a5c854b85a0819192efde569032bd15","delta":"。\n\n"}}
{"method":"item/agentMessage/delta","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","turnId":"019f7968-a116-7f13-bf24-c56fddd4373d","itemId":"msg_0e30b319d2fc7416016a5c854b85a0819192efde569032bd15","delta":"この"}}
{"method":"item/agentMessage/delta","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","turnId":"019f7968-a116-7f13-bf24-c56fddd4373d","itemId":"msg_0e30b319d2fc7416016a5c854b85a0819192efde569032bd15","delta":"リ"}}
{"method":"item/agentMessage/delta","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","turnId":"019f7968-a116-7f13-bf24-c56fddd4373d","itemId":"msg_0e30b319d2fc7416016a5c854b85a0819192efde569032bd15","delta":"ポ"}}
{"method":"item/agentMessage/delta","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","turnId":"019f7968-a116-7f13-bf24-c56fddd4373d","itemId":"msg_0e30b319d2fc7416016a5c854b85a0819192efde569032bd15","delta":"ジ"}}
{"method":"item/agentMessage/delta","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","turnId":"019f7968-a116-7f13-bf24-c56fddd4373d","itemId":"msg_0e30b319d2fc7416016a5c854b85a0819192efde569032bd15","delta":"ト"}}
{"method":"item/agentMessage/delta","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","turnId":"019f7968-a116-7f13-bf24-c56fddd4373d","itemId":"msg_0e30b319d2fc7416016a5c854b85a0819192efde569032bd15","delta":"リ"}}
{"method":"item/agentMessage/delta","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","turnId":"019f7968-a116-7f13-bf24-c56fddd4373d","itemId":"msg_0e30b319d2fc7416016a5c854b85a0819192efde569032bd15","delta":"では"}}
{"method":"item/agentMessage/delta","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","turnId":"019f7968-a116-7f13-bf24-c56fddd4373d","itemId":"msg_0e30b319d2fc7416016a5c854b85a0819192efde569032bd15","delta":"指"}}
{"method":"item/agentMessage/delta","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","turnId":"019f7968-a116-7f13-bf24-c56fddd4373d","itemId":"msg_0e30b319d2fc7416016a5c854b85a0819192efde569032bd15","delta":"示"}}
{"method":"item/agentMessage/delta","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","turnId":"019f7968-a116-7f13-bf24-c56fddd4373d","itemId":"msg_0e30b319d2fc7416016a5c854b85a0819192efde569032bd15","delta":"に"}}
{"method":"item/agentMessage/delta","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","turnId":"019f7968-a116-7f13-bf24-c56fddd4373d","itemId":"msg_0e30b319d2fc7416016a5c854b85a0819192efde569032bd15","delta":"従"}}
{"method":"item/agentMessage/delta","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","turnId":"019f7968-a116-7f13-bf24-c56fddd4373d","itemId":"msg_0e30b319d2fc7416016a5c854b85a0819192efde569032bd15","delta":"って"}}
{"method":"item/agentMessage/delta","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","turnId":"019f7968-a116-7f13-bf24-c56fddd4373d","itemId":"msg_0e30b319d2fc7416016a5c854b85a0819192efde569032bd15","delta":"、"}}
{"method":"item/agentMessage/delta","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","turnId":"019f7968-a116-7f13-bf24-c56fddd4373d","itemId":"msg_0e30b319d2fc7416016a5c854b85a0819192efde569032bd15","delta":"基本"}}
{"method":"item/agentMessage/delta","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","turnId":"019f7968-a116-7f13-bf24-c56fddd4373d","itemId":"msg_0e30b319d2fc7416016a5c854b85a0819192efde569032bd15","delta":"的"}}
{"method":"item/agentMessage/delta","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","turnId":"019f7968-a116-7f13-bf24-c56fddd4373d","itemId":"msg_0e30b319d2fc7416016a5c854b85a0819192efde569032bd15","delta":"に"}}
{"method":"item/agentMessage/delta","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","turnId":"019f7968-a116-7f13-bf24-c56fddd4373d","itemId":"msg_0e30b319d2fc7416016a5c854b85a0819192efde569032bd15","delta":"日本"}}
{"method":"item/agentMessage/delta","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","turnId":"019f7968-a116-7f13-bf24-c56fddd4373d","itemId":"msg_0e30b319d2fc7416016a5c854b85a0819192efde569032bd15","delta":"語"}}
{"method":"item/agentMessage/delta","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","turnId":"019f7968-a116-7f13-bf24-c56fddd4373d","itemId":"msg_0e30b319d2fc7416016a5c854b85a0819192efde569032bd15","delta":"で"}}
{"method":"item/agentMessage/delta","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","turnId":"019f7968-a116-7f13-bf24-c56fddd4373d","itemId":"msg_0e30b319d2fc7416016a5c854b85a0819192efde569032bd15","delta":"対応"}}
{"method":"item/agentMessage/delta","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","turnId":"019f7968-a116-7f13-bf24-c56fddd4373d","itemId":"msg_0e30b319d2fc7416016a5c854b85a0819192efde569032bd15","delta":"します"}}
{"method":"item/agentMessage/delta","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","turnId":"019f7968-a116-7f13-bf24-c56fddd4373d","itemId":"msg_0e30b319d2fc7416016a5c854b85a0819192efde569032bd15","delta":"。"}}
{"method":"item/completed","params":{"item":{"type":"agentMessage","id":"msg_0e30b319d2fc7416016a5c854b85a0819192efde569032bd15","text":"こんにちは。Codex です。\n\nこのワークスペース内のコード調査、実装、テスト、レビュー、Git 操作、PR 準備などを手伝います。既存の設計やリポジトリの流儀を読んだ上で、小さく安全な差分で進めるのが基本方針です。\n\nこのリポジトリでは指示に従って、基本的 に日本語で対応します。","phase":"final_answer","memoryCitation":null},"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","turnId":"019f7968-a116-7f13-bf24-c56fddd4373d","completedAtMs":1784448333474}}
{"method":"thread/tokenUsage/updated","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","turnId":"019f7968-a116-7f13-bf24-c56fddd4373d","tokenUsage":{"total":{"totalTokens":20986,"inputTokens":20878,"cachedInputTokens":5504,"outputTokens":108,"reasoningOutputTokens":0},"last":{"totalTokens":20986,"inputTokens":20878,"cachedInputTokens":5504,"outputTokens":108,"reasoningOutputTokens":0},"modelContextWindow":258400}}}
{"method":"account/rateLimits/updated","params":{"rateLimits":{"limitId":"codex","limitName":null,"primary":{"usedPercent":0,"windowDurationMins":10080,"resetsAt":1784952017},"secondary":null,"credits":{"hasCredits":false,"unlimited":false,"balance":"0"},"individualLimit":null,"planType":"pro","rateLimitReachedType":null}}}
{"method":"thread/status/changed","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","status":{"type":"idle"}}}
{"method":"turn/completed","params":{"threadId":"019f7960-95a5-7140-8749-a3cf59e0ffab","turn":{"id":"019f7968-a116-7f13-bf24-c56fddd4373d","items":[],"itemsView":"notLoaded","status":"completed","error":null,"startedAt":1784448327,"completedAt":1784448333,"durationMs":5511}}}
```

</details>

メインのレスポンス部分はこんな感じです。
良い感じで自己紹介してくれています。

```json
{
  "method": "item/completed",
  "params": {
    "item": {
      "type": "agentMessage",
      "id": "msg_0e30b319d2fc7416016a5c854b85a0819192efde569032bd15",
      "text": "こんにちは。Codex です。\n\nこのワークスペース内のコード調査、実装、テスト、レビュー、Git 操作、PR 準備などを手伝います。既存の設計やリポジトリの流儀を読んだ上で、小さく安全な差分で進めるのが基本方針です。\n\nこのリポジトリでは指示に従って、基本的に日本語で対応します。",
      "phase": "final_answer",
      "memoryCitation": null
    },
    "threadId": "019f7960-95a5-7140-8749-a3cf59e0ffab",
    "turnId": "019f7968-a116-7f13-bf24-c56fddd4373d",
    "completedAtMs": 1784448333474
  }
}
```

レスポンスはいくつかのセクションにわかれていますが `item/agentMessage/delta` が切れ切れな指示への回答を返し、それをまとめるのが `item/completed` の部分です。

ここまでで、一通りの流れは完了したので、あとは順番に `turn/start` メッセージをなげながら作業を完了させればエージェントにタスクを完了させることができるでしょう。

# 何が嬉しいの

というわけで、Codex で普段開発を行う時は `codex` で対話コンソールを開いてやると思いますが、 Codex App Server をローカルに立てた状態にして、App Server に JSONL リクエストを送るようにしておくと、

- Headless にCodexエージェントを扱える
- 作業ごとに codex セッションを開いて一つずつ指示を与えずに、App Server に JSONL をなげるだけでよい
- GUI や TUI、Web アプリなど、自分専用のクライアントを作れる

といったことができます。

また、OpenAI は [Codex Symphony](https://openai.com/ja-JP/index/open-source-codex-orchestration-symphony/) といったオーケストレーションのための仕様などもあるので、これをベースに自作オーケストレーターつくったりも面白いと思います。
Codex App Server からのレスポンスによってエージェントの状態も監視できるのでこれを活用して Herdr のようなエージェントの状態を管理できる機能を盛り込んだツールをつくって見るのも面白いと思います。

# Tasq: 自作OSS の紹介

というわけで宣伝にはなってしまいますが、自分もこの Codex App Server を活用した OSS を自作しました。README にある動画を見て頂くと使用感などわかりやすいと思います。

ローカルで Issue 管理を基本として、
Claude Code/Codex などで作成した Plan を Backlog に積んでおいたら、
エージェントに自動でPR作成までやらせるようなツールになっています。

<https://github.com/version-1/tasq>

<https://dev.to/version1/introducing-tasq-an-ai-native-task-orchestrator-for-coding-agents-506c>

ここまで読んで頂いてありがとうございました。Tasq の方も興味あれば触ってみてください。
よろしくお願いします。
