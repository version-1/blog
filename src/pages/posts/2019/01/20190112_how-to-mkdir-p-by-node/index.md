---
templateKey: blog-post
title: Nodejsでmkdir -pをする。再帰的にディレクトリを作成する。
slug: /2019/01/12/how-to-mkdir-p-by-node
createdAt: 2019-01-12 11:18:26
updatedAt: 2019-01-12 11:18:26
thumbnail: /2019/01/20190112_how-to-mkdir-p-by-node/thumbnail.png
categories:
  - engineering
---

Node.jsでmkdir -pをしたかったのですが、Node10系からでないとmkdir, mkdirSyncなどの
ディレクトリ作成メソッドのrecrusiveオプションが使えません。

https://nodejs.org/docs/latest-v10.x/api/fs.html#fs\_fs\_mkdirsync\_path\_options

Node8系などで、
パスを与えると存在しないディレクトリも含めてズバッとディレクトリを掘ってくれる
コードを残しておきます。

```javascript
const fs = require('fs');
const mkdirSyncRecrusive = postPath => {
  postPath.split('/').reduce((acc, item) => {
    const path = item ? [acc, item].join('/') : '';
    if (path && !fs.existsSync(path)) {
      fs.mkdirSync(path);
    }
    return path;
  }, '');
};

mkdirSyncRecrusive('/dir/you/want/to/make')
```
