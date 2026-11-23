# ver-1-0.net

https://ver-1-0.net/

Gatsby + Netlify で構築している個人ブログです。

## ビルド

Node.js 24.21.0 と npm 11.19.0 を使用します。Netlify は `npm run build` で `/blog/` 配信用のファイルを `public/` に生成します。同じビルドをローカルで確認するには、次を実行します。

```sh
nvm install
nvm use
npm ci
npm run build
npm run serve
```

ローカルでは `http://localhost:9000/blog/` で確認できます。

GitHub 上の default branch は `main` です。ローカルの Git metadata で `origin/HEAD` が `origin/master` を指していても、このリポジトリで Pull Request を作るときは GitHub の default branch である `main` を base にしてください。
