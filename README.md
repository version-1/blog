# ver-1-0.net

https://ver-1-0.net/

Gatsby + Netlify で構築している個人ブログです。

## Base path

アプリ内の route metadata では、`src/lib/routes.ts` の `blog.basePath` を `/blog/` として公開しています。

Gatsby の `pathPrefix` は使いません。Netlify では `publish = "public"` のまま配信するため、`pathPrefix` を付けると HTML が `/blog/static/...` や `/blog/page-data/...` を参照し、実体のある `public/static/...` や `public/page-data/...` とずれて画像や JavaScript が 404 になります。

通常のビルドには次の script を使います。

```sh
npm run build
```

production build をローカルで確認するときは次の script を使います。

```sh
npm run serve
```

GitHub 上の default branch は `main` です。ローカルの Git metadata で `origin/HEAD` が `origin/master` を指していても、このリポジトリで Pull Request を作るときは GitHub の default branch である `main` を base にしてください。
