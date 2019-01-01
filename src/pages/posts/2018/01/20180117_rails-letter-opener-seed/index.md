---
templateKey: blog-post
title: Rails+Devise+LetterOpenerでシードを行う際に、メールがタブで開かれないようにする
slug: /2018/01/17/rails-letter-opener-seed
createdAt: 2018-01-17 08:46:26
updatedAt: 2018-09-02 13:09:21
thumbnail: ./thumbnail.jpg
categories: 
  - engineering
  - rails
  - for-beginner
---

&nbsp;

letter opener便利ですよね。

<a href="https://github.com/ryanb/letter_opener">ryanb/letter_opener</a>

letter openerは、開発しているアプリケーションからメールが飛んだときに、メールを送信する代わりに、送信するメールをタブで開いてくれます。

が、

今回Rails + Devise + Letter Openerを使った場合に、ユーザのアカウント作成時のメールのタブがポコポコでてくるようになってしまったのでその対策を共有します。

<div class="after-intro"></div>
&nbsp;
<h2>やろうとしたこと</h2>
&nbsp;

今回はテストデータとして、rake db:seedでユーザを10人くらい自動で生成するようなスクリプトを組みました。

開発中にDBを綺麗にしたいときに、
```bash
rake:db:reset && rake db:seed
```
のようにカジュアルに実行できるようにしたいです。

&nbsp;

db/seeds.rb

```ruby
User.delete_all
10.times do |idx|
  User.create(
    name: "user_#{idx + 1}",
    password: 'password',
    email: "user_#{idx + 1}@example.com",
    age: 25
  )
end

```

(これはサンプルで実際はFactoryBotを使ったりしています)


この方法だと、確かにユーザは10人作れるのですが実際にシードを走らせてみるとユーザ作成時にdeviseが確認のEmailを飛ばすので、それに呼応したletter openerがポコポコと丁寧に10人分
のメールをポコポコとタブで開いてくれます。

さすがに、毎回シードを走らすたびに10個もタブが開くのはいただけないので少し調べてみました。


<h2>解決方法</h2>

解決方法は割と簡単で
以下のように設定を足して
```
ActionMailer::Base.perform_deliveries = false
```
シード内でメールが飛ばないようにするだけで解決できます。

db/seeds.rb

```ruby
# LetterOpnerでメールが開かれないようにする
ActionMailer::Base.perform_deliveries = false

User.delete_all
10.times do |idx|
  User.create(
    name: "user_#{idx + 1}",
    password: 'password',
    email: "user_#{idx + 1}@example.com",
    age: 25
  )
end

```


<div class="after-article"></div>
