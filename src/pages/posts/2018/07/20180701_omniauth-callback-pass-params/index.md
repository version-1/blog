---
templateKey: blog-post
title: OmniAuthで認証後のコールバックにパラメータを渡す方法
slug: /2018/07/01/omniauth-callback-pass-params
createdAt: 2018-07-01 16:24:45
updatedAt: 2018-09-02 13:09:21
thumbnail: ./thumbnail.png
categories:
  - engineering
  - rails
---

&nbsp;

FacebookログインやGoogleログインを実装する際によくお世話になるOmniauthですが、Webサービスに採用していると、認証完了後にある特定の処理をしたいということがまあまああります。

そんな時は、認証前のURLに任意のパラメータを渡して、<strong>コールバックでそのパラメータを元に処理をわけたい</strong>ということがありますよね。これができない場合は、sessionに値を保持してやったりするのですが、sessionを乱用すると、一見意味のわからないキーが乱立するので、極力Oauth認証後の処理であればこういった仕組みを利用していきたいです。

&nbsp;

調べてみたところ,omniauthに任意の値を渡すことが可能のようで、認証先（例えばgoogle）に飛ばす際のURLにパラメータを付与すると認証後にそのパラメータを取得できるようです。
```pug
= link_to 'Link' , user_oauth2_omniauth_authorize_path({flg: 1})

```
として飛ばすと、
```ruby
def callback
　　params = request.env['omniauth.params']
　　if params['flg'].present?
　　　　// フラグのある時の処理
　　else
　　　　// フラグのない時の処理
　　end
end

```
というように処理をわけることができます。

&nbsp;

決済の処理など外部に一度リクエストを飛ばして、リダイレクトしてもらう場合にもレスポンスに任意の値が設定できるのでomniauthも似た感じですね。

細かいですが、こういうことを知っておけると無駄な処理を書かなくてすむのでメモしておきます。
