# 依存関係の棚卸しとビルド基準

2026-11-23 に `c8f8db6` の lockfile を使い、macOS arm64 で取得した結果。この文書で扱う npm パッケージはルートと `scripts/post-generator` の2つ。

## 採用方針と更新順

次の環境更新で **Node.js 24 LTS、npm 11.19.0、Gatsby 5.16.1、React / React DOM 18.3.1** を採用する。Node 24 は更新 PR で検証したパッチ版を `.nvmrc` に固定する。初期検証は手元の 24.21.0 を使用した。現在の `.nvmrc` は 18.12.1 で、比較に使った 20.19.4 とともにサポート終了済み。Gatsby 5.16.1 の npm メタデータは Node `>=18.0.0 <26`、React 18/19 を許容し、npm 11.19.0 は Node `^20.17.0 || >=22.9.0` を要求する。React 19 は Gatsby 公式プラグイン群の整合とアプリ側の peer dependency の確認後に検討する。現行の Stripe React SDK は React 18 までを宣言している。 [Node.js のリリース一覧](https://nodejs.org/en/about/previous-releases)・[Gatsby 5.16 リリースノート](https://www.gatsbyjs.com/docs/reference/release-notes/v5.16/)

1. 記事生成の入口と設定を修復し、一時ディレクトリへの生成スモークテストを確立する。サイト側は同じ記事・画像で HTML、ページデータ、RSS、配信パスを確認できるようにする。
2. Node 24 と npm 11 をローカル、Netlify、今後の CI で統一する。両方の `npm ci`、本番ビルド、記事生成を実行し、Netlify Deploy Preview でも Linux の画像処理と配信パスを確認する。npm が lockfile 形式を変更する場合は差分を確認する。
3. Dependabot の間接依存更新を個別に取り込み、毎回 audit と対象のスモークテストを比較する。生成側は Moment の同一メジャー更新も先行できる。重複する #173 と #174 は最終 lockfile を比較して選ぶ。
4. 利用実績が確認できない旧依存を削除候補にし、依存経路ごとに audit を再計測する。残る Gatsby 系は対応する公式プラグインを同じリリース系列で揃え、React 19、検索 SDK、マークアップのメジャー更新は個別に扱う。

## 依存関係の取得方法

両方の install 後、各パッケージで実行する。調査時は公開 npm レジストリを使用。出力と件数は実行日・OS・インストール状態に依存する。outdated の終了コード 1 は更新候補あり、audit の終了コード 1 は既定のしきい値で指摘ありを表す。終了コードと JSON のエラー項目を併せて確認する。

```sh
npm outdated --json
npm outdated --all --json
npm audit --json
npm audit --omit=dev --json
npm explain brace-expansion
```

| 対象 | lockfile | 直接宣言 | lockfile 上のインストール位置 | audit 全体（重大 / 高 / 中 / 低） |
| --- | --- | --- | --- | --- |
| ルート | v2 | dependencies 18、devDependencies 35 | 2,410 | 169（8 / 65 / 73 / 23） |
| 記事生成 | v3 | dependencies 3 | 13 | 3（0 / 2 / 1 / 0） |

インストール前のルート audit では 361 件（9 / 266 / 78 / 8）、インストール後の `--omit=dev` は 84 件（6 / 50 / 21 / 7）。比較は同じ手順・条件で行う。ルートの Gatsby 本体は開発依存だが本番成果物の生成に使うので、`--omit=dev` は公開サイトへの影響判定の代わりにはならない。

### 直接依存の outdated

`現在 → wanted → latest`。中央列が現在と同じ場合は `現在 → latest` と記す。

| パッケージ | 結果 |
| --- | --- |
| `@stripe/react-stripe-js` / `@stripe/stripe-js` | 1.16.5 → 7.1.0 / 1.54.2 → 10.3.0 |
| `@types/marked` / `marked` | 4.3.2 → 5.0.2 / 4.3.0 → 18.2.1 |
| `algoliasearch` | 4.27.0 → 5.65.0 |
| `googleapis` | 109.0.1 → 178.0.0 |
| `i18next` | 22.5.1 → 26.7.2 |
| `prettier` | 2.8.8 → 3.10.1 |
| `react` / `react-dom` | ともに 18.3.1 → 19.3.1 |
| `react-icons` / `react-share` | 4.12.0 → 5.7.0 / 4.4.1 → 6.1.0 |
| `rimraf` / `uuid` | 3.0.2 → 6.1.4 / 9.0.1 → 14.0.3 |
| `sass` | 1.100.0 → 1.108.2 → 1.108.2 |
| `typescript` | 4.9.5 → 7.0.2 |
| 生成側 `glob` | 7.2.3 → 14.0.6 |
| 生成側 `moment` | 2.30.1 → 2.31.0 → 2.31.0 |
| 生成側 `readline-sync` | 1.4.10、outdated の対象外 |

### 利用箇所と更新が難しい依存

- **Gatsby / React**。ルートの scripts と `gatsby-{config,node,browser,ssr}.ts` がビルドを構成し、`src/node/` と `src/templates/` が GraphQL からページを生成する。画像は Gatsby Image と Sharp、Markdown は Transformer Remark と各 Remark プラグイン、Prism テーマは `src/templates/blog-post.tsx`。監査の間接依存には `gatsby → axios/body-parser`、`gatsby-transformer-remark → sanitize-html`、画像プラグイン群 → `sharp@0.32.6` がある。Sharp のネイティブバイナリは OS 別に確認する。旧 React Helmet は `src/components/head.tsx` を Gatsby Head に移す際に整理する。
- **スタイルと表示**。Emotion は `gatsby-ssr.ts` とコンポーネント、Sass は `*.module.scss`、React Icons と React Share は `src/components/shared/` を参照。Sass プラグインは `sass-loader` 16 の override があり、更新時は CSS Modules の export、SSR とブラウザ双方のスタイルを確認する。i18next は `src/lib/i18next.ts`、Lodash は検索 UI と `src/node/utils/` に残る。
- **検索**。`src/services/algolia/index.ts` と `src/components/shared/organisms/searchForm.tsx` が検索を担当。SDK 5 への更新は初期化・検索 API を照合する。インデックス作成プラグインは `gatsby-config.ts` でコメントアウトされているため、検索クライアントから独立して削除可否を確認する。
- **旧依存の除去候補**。対象コード・設定・npm scripts の名前検索では Stripe 2 パッケージ、`uuid`、`googleapis`、`marked` とその型、`paginate`、`parcel-bundler`、`lodash-webpack-plugin`、`rimraf` の直接利用を確認できなかった。CI・デプロイと外部運用スクリプトを確認してから個別に除去する。特に `paginate → jade → transformers → uglify-js` と `parcel-bundler → uncss → request` は保守終了パッケージを含む。Parcel v1 を除去する場合も Gatsby による Parcel v2 の利用は別経路として扱う。 `dotenv` は Gatsby の間接依存を設定から直接参照しており、今後は直接宣言を検討する。Prettier は `npm run format`、TypeScript は `tsconfig.json` と TS/TSX ソースで使用する。
- **記事生成**。`scripts/post-generator/index.js` は `glob.sync` で既存 slug、`moment` で日時、`readline-sync` で入力を扱う。間接依存は `glob → minimatch → brace-expansion` などで、outdated の `--all` は計 6 パッケージ名。audit は `moment` が中、`minimatch` と `brace-expansion` が高。glob のメジャー更新では最小 Node バージョン、CommonJS の読み込み方、glob の戻り値とパス区切りを確認する。

### 未マージの Dependabot PR

| 対象 | PR | 主な親依存・判断 |
| --- | --- | --- |
| ルート | [#181 fast-uri](https://github.com/version-1/blog/pull/181)、[#180 sanitize-html](https://github.com/version-1/blog/pull/180)、[#179 nanoid](https://github.com/version-1/blog/pull/179)、[#178 brace-expansion](https://github.com/version-1/blog/pull/178) | AJV、Transformer Remark、PostCSS、minimatch |
| ルート | [#176 socket.io-parser](https://github.com/version-1/blog/pull/176)、[#172 shell-quote](https://github.com/version-1/blog/pull/172)、[#170 body-parser](https://github.com/version-1/blog/pull/170)、[#168 axios](https://github.com/version-1/blog/pull/168) | Socket.IO、react-dev-utils、Express / Gatsby、Gatsby |
| ルート | [#161 uuid](https://github.com/version-1/blog/pull/161) | 直接依存。削除可否と ESM 対応を確認 |
| 記事生成 | [#174 brace-expansion](https://github.com/version-1/blog/pull/174)、[#173 brace-expansion / glob](https://github.com/version-1/blog/pull/173) | 同じ依存経路に対する重複候補 |

古い Gatsby 更新 [#155](https://github.com/version-1/blog/pull/155) はクローズ済みで、対象の 5.13.7 を超える 5.16.1 が現在の lockfile に入っている。

ルートの `outdated --all` は 958 パッケージ名。複数箇所に入る同名依存は統合されるため、実際の位置と親は `npm explain` で追う。ルートのインストール後 audit で重大だったのは `constantinople`、`form-data`、`jade`、`lodash`、`proxy-addr`、`request`、`shell-quote`、`uglify-js`。上記の除去候補と Dependabot PR を個別に評価し、解消されない経路は親パッケージ単位で追跡する。

## 更新前のビルドと生成

| Node.js / npm | ルートの npm ci | 本番ビルド | 生成側の npm ci |
| --- | --- | --- | --- |
| 18.12.1 / 8.19.2（現行 .nvmrc） | 成功、2,383 パッケージ | 成功 | 成功、13 パッケージ |
| 20.19.4 / 10.8.2 | 成功、2,383 パッケージ | 成功 | 成功、13 パッケージ |
| 24.21.0 / 11.19.0（採用系列） | 成功、2,383 パッケージ | 成功 | 成功、13 パッケージ |

ルートで次を実行する。Node 18 と 24 のルート install、および両バージョンの生成側 install は `--no-audit` で実施した。公開 npm レジストリに接続でき、記事・画像を含むチェックアウトが必要。再現に使ったコンテンツは `src/contents` と `src/assets/images` にある。

```sh
# 現行環境を再現する場合
nvm install
nvm use
node --version
npm --version

npm ci
npm run build
test -s public/index.html
test -s public/page-data/index/page-data.json
test -s public/rss.xml
test -s public/sitemap-index.xml
```

通常の Gatsby 設定ディレクトリへの書き込みが制限される環境では、`XDG_CONFIG_HOME=$(mktemp -d) GATSBY_TELEMETRY_DISABLED=1 npm run build` で再現できる。初回は `gatsby clean` の Gatsby CLI 設定書き込みが `EPERM` で停止した。npm キャッシュへの書き込みも制限される場合は、`npm --cache "$(mktemp -d)" ci` を使う。React の警告は Gatsby 配下の実験版 `react-server-dom-webpack` の peer dependency に由来する。ビルド時には Prism 言語名、Moment の非 ISO 日付、Sass legacy API と CSS Modules の `name` export についても警告が出た。

- **環境変数**。ローカルビルドは `.env.production` や外部サービスの認証情報を用意せずに完了した。`gatsby-config.ts` は `.env.${NODE_ENV}` を読み込む。検索の動作確認には `GATSBY_ALGOLIA_APP_ID` と検索専用の `GATSBY_ALGOLIA_SEARCH_KEY` が必要。`ALGOLIA_ADMIN_KEY` は無効化されているインデックス更新設定、`CONTEXT` は `src/configs/algolia/index.ts` のインデックス選択、`SLACK_WEBHOOK_URL` は `src/lib/env.ts` の任意設定。外部サービスでの検索とインデックス更新は未実施。
- **CI・Netlify**。GitHub Actions の workflow はリポジトリにない。Netlify は `netlify.toml` に従って `npm run build` を実行し、`public` を公開する。ビルドには devDependencies が必要。Netlify の実サイト設定とデプロイは未確認。更新時は `.nvmrc` と `NPM_VERSION` をローカルの検証値に揃え、依存のインストールと公開パスを Deploy Preview のログおよび出力で確認する。 [Netlify の依存管理](https://docs.netlify.com/build/configure-builds/manage-dependencies/)・[Netlify の環境変数](https://docs.netlify.com/build/configure-builds/environment-variables/)
- **既知の配信パス不整合**。`gatsby-config.ts` の `pathPrefix: "/blog"` と `npm run build` の `--prefix-paths` が有効。ルートで `rg -o '/blog/[^"]+\.js' public/index.html` を実行すると `/blog/webpack-runtime-*.js` などが出る一方、ファイルは `public/` 直下にある。リポジトリの Netlify 設定どおりに配信すると、この参照が 404 になる。切り分けとして Node 20 で `npm run clean && ./node_modules/.bin/gatsby build` 相当を実行すると、トップページのローカル JS 参照 3 件がすべて `public/` 内の実ファイルに一致した。ブログのルート定義とアセットの公開パスは別々に確認する。

### 記事生成の既知の失敗

```sh
npm --prefix scripts/post-generator ci
npm run generate
node scripts/post-generator/index.js
```

- `npm run generate` は `scripts/generator/index.js` が存在せず、終了コード 1（`MODULE_NOT_FOUND`）。
- 実体を直接実行すると、`index.js:6` の `require('../../config/constants')` が解決できず、終了コード 1（`MODULE_NOT_FOUND`）。Node 18・20・24 で入力前に再現した。現行の `src/configs/constants.ts` にはローカルマシンの絶対パスが書かれているため、参照だけを変更して実行すると作業ツリー外へ出力するおそれがある。
- 生成処理には対話端末、言語（既定は ja）、既存記事と重複しない slug、タイトル、カテゴリとタグの許可リスト、書き込み可能な記事ルートが必要。確認に `y` を入力すると、ローカル時刻を使って `YYYY/MM/YYYYMMDD_<slug>/index.md` に front matter を書く。現行コードに環境変数の指定はない。修復後は一時記事ルートを使い、ヘッダー、日時パス、重複拒否、確認キャンセルを検証する。
