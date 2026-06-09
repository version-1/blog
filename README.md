# ver-1-0.net

https://ver-1-0.net/

Gatsby + Netlify で構築している個人ブログです。

## Path prefix

このサイトは `/blog/` 配下でホスティングする前提でビルドします。

Gatsby 側では `gatsby-config.ts` の `pathPrefix: '/blog'` を使います。アプリ内の route metadata では、`src/lib/routes.ts` の `blog.basePath` を `/blog/` として公開しています。

リンクやアセットに prefix を含めるため、通常のビルドには次の script を使います。

```sh
npm run build
```

production build をローカルで確認するときは次の script を使います。

```sh
npm run serve
```

Gatsby の build summary には、`/` や `/about/` のように prefix なしの page path が表示されます。これは route summary であり、最終的なホスティング URL ではありません。生成後の HTML を確認するか、`npm run serve` で起動して、リンクやアセットが `/blog/` 付きで出力されていることを確認してください。

GitHub 上の default branch は `main` です。ローカルの Git metadata で `origin/HEAD` が `origin/master` を指していても、このリポジトリで Pull Request を作るときは GitHub の default branch である `main` を base にしてください。
