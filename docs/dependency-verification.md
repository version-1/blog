# 依存関係更新後の確認（Issue 64）

2026-11-23 に先行 PR を含む `main@520a9b1` を macOS arm64、Node.js 24.21.0 / npm 11.19.0 で検証した。比較元は [Issue 58 の棚卸し](https://github.com/version-1/blog/blob/56880cd/docs/dependency-baseline.md)。

## インストールと監査

両パッケージで `npm ci --no-audit` 後に `npm outdated --json`、`npm outdated --all --json`、`npm audit --json`、`npm audit --omit=dev --json` を実行した。監査は npm レジストリの当日結果。

| 対象 | インストール数 | outdated 直接 / 全体 | audit（重大 / 高 / 中 / 低） | audit --omit=dev |
| --- | ---: | ---: | --- | ---: |
| ルート | 2,383 → 1,663 | 16 / 958 → 9 / 822 | 169 → 98（2 / 55 / 24 / 17） | 84 → 78 |
| 記事生成 | 13 → 10 | 2 / 6 → 0 / 1 | 3 → 0 | 0（今回） |

直接依存はすべて wanted と現在版が一致した。React、React DOM、React 型は Gatsby とプラグインの peer dependency を揃えてから 19 に移行する。Node の型は実行環境と同じ 24 系を維持する。TypeScript 7、i18next 27、react-share 6、sass-loader 17 は、型検査、翻訳、共有リンク、Sass/CSS Modules をそれぞれ確認して更新する。react-icons は現行の固定版 5.4.0 から 5.7.0 への更新と記事・共有 UI の確認が残る。生成側の `balanced-match` 4.0.4 は間接依存で、親の対応後に 5 系への更新を確認する。

## 残る監査指摘と Dependabot

- 重大の `proxy-addr@2.0.7` は Gatsby → Express、`shell-quote@1.8.4` は Gatsby → react-dev-utils。前者は別途、親の許容範囲内で 2.0.8 以上への lockfile 更新を検証する。後者は [#195](https://github.com/version-1/blog/pull/195) で評価する。いずれも監査の修正候補があり、更新後に監査と本番ビルドを再実行する。
- Gatsby 配下の Webpack、GraphQL Code Generator、Parcel、Sharp などには親を伴う更新が残る。監査の強制修正が Gatsby プラグインの旧メジャーを提案するため、Gatsby と公式プラグインを同じ系列で更新できる時点で再監査する。Sharp は macOS とデプロイ先 Linux の両方で画像生成を確認する。
- 現在の lockfile に対して [#189 joi](https://github.com/version-1/blog/pull/189)、[#192 body-parser](https://github.com/version-1/blog/pull/192)、[#193 multer](https://github.com/version-1/blog/pull/193)、[#194 follow-redirects](https://github.com/version-1/blog/pull/194)、[#195 shell-quote](https://github.com/version-1/blog/pull/195)、[#196 qs](https://github.com/version-1/blog/pull/196)、[#197 source-map-js](https://github.com/version-1/blog/pull/197) が開いている。いずれもルートの lockfile 更新で、今回の差分との重複はない。#192 と #196 は body-parser → qs の経路を共有するため、先に取り込んだ方の後に残りの差分を確認する。Express 配下の body-parser 1.20.5 も再監査する。
- 棚卸し時のルート [#161 uuid](https://github.com/version-1/blog/pull/161) は直接依存を削除済み。Gatsby 配下の 8.3.2 は別経路。[#181 fast-uri](https://github.com/version-1/blog/pull/181)、[#180 sanitize-html](https://github.com/version-1/blog/pull/180)、[#179 nanoid](https://github.com/version-1/blog/pull/179)、[#178 brace-expansion](https://github.com/version-1/blog/pull/178)、[#176 socket.io-parser](https://github.com/version-1/blog/pull/176)、[#168 axios](https://github.com/version-1/blog/pull/168) は閉じているが、各対象の旧版が残る。許容範囲内の lockfile 更新を再提案する。[#172 shell-quote](https://github.com/version-1/blog/pull/172) と [#170 body-parser](https://github.com/version-1/blog/pull/170) は現行候補 #195、#192 で再評価する。
- 記事生成の [#173](https://github.com/version-1/blog/pull/173)、[#174](https://github.com/version-1/blog/pull/174)、[#186](https://github.com/version-1/blog/pull/186)、[#188](https://github.com/version-1/blog/pull/188) は [#187](https://github.com/version-1/blog/pull/187) の glob 14 と Moment 2.31.0 への更新で対象の監査指摘が解消した。

## 本番ビルドと記事生成

- Algolia の設定がない環境で SDK 5 の初期化が HTML 生成を停止させていた。両方の検索設定がある場合だけクライアントを初期化し、未設定でも `npm run build` が成功することを確認した。設定ありの検索は SDK をスタブに置き換え、本番インデックス名と検索語の引き渡しを確認した。実サービスへの検索は検索専用キーを利用できず未確認。
- `gatsby serve --prefix-paths` で `/blog/`、概要（日英）、カテゴリ、タグ、既存記事、RSS、サイトマップ、トップのページデータ、HTML が参照する JS/CSS の HTTP 200 を確認した。棚卸し時と同様、JS とページデータの実体は public 直下にあり、リポジトリの Netlify 設定にはそれらの /blog 用 rewrite がない。Gatsby serve はプレフィックスを処理するため、公開環境で /blog を取り除く上流のルーティングが有効か Deploy Preview で確認する。ビルドに既知の Prism、Moment、プロフィールの CSS Modules の警告が残る。
- 一時コピーで `npm run generate` を実行し、日時付きパスの Markdown と front matter の出力、重複 slug の拒否、キャンセル時にファイルが作られないことを確認した。
