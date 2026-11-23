# ver-1-0.net

https://ver-1-0.net/

Gatsby + Netlify で構築している個人ブログです。

## Base path

アプリ内の route metadata では、`src/lib/routes.ts` の `blog.basePath` を `/blog/` として公開しています。

現行の本番ビルドは Gatsby の `pathPrefix` を使い、アセット参照に `/blog/` を付けます。公開ディレクトリ `public` 内の配置とずれるため、リポジトリの Netlify 設定どおりに配信すると画像や JavaScript が 404 になります。依存関係の更新順、ビルドの再現手順と既知の失敗は [依存関係の棚卸しとビルド基準](docs/dependency-baseline.md) を参照してください。

通常のビルドには次の script を使います。

```sh
npm run build
```

production build をローカルで確認するときは次の script を使います。

```sh
npm run serve
```

GitHub 上の default branch は `main` です。ローカルの Git metadata で `origin/HEAD` が `origin/master` を指していても、このリポジトリで Pull Request を作るときは GitHub の default branch である `main` を base にしてください。
