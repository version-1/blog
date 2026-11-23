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

## 記事の生成

Node.js 24 を使用し、リポジトリのルートで次を実行します。

```sh
npm ci --prefix scripts/post-generator
npm run generate
```

対話形式で言語、slug、タイトル、カテゴリ、タグを入力します。確認で `y` または `yes` を入力すると、ローカルの日付を使って `src/contents/posts/YYYY/MM/YYYYMMDD_<slug>/index.md` を生成します。

GitHub 上の default branch は `main` です。ローカルの Git metadata で `origin/HEAD` が `origin/master` を指していても、このリポジトリで Pull Request を作るときは GitHub の default branch である `main` を base にしてください。
