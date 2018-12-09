---
templateKey: blog-post
title: Kotlin + Spring Boot でログイン認証を実装
slug: 2017/06/05/kotlin-spring-boot-authentication
description: &nbsp;

&nbsp;

webアプリには、
だいたいログイン機能を
実装する必要がありますよね。

なので、
今回はKotlin + Spring Boot での
ログイン機能を
実装します。

ソースはgithubにあげているので、
cloneしていただければ試運転できます。

[video width="1920" height="1080" mp4="http://ver-1-0.net/wp-content/uploads/2017/06/kotlin-auth.mp4"][/video]

Springには、
SpringSecurityと
createdAt: 2017-06-05 09:51:21
updatedAt: 2018-08-26 12:02:45
thumbnail: http://ver-1-0.net/wp-content/uploads/2017/02/スクリーンショット-2017-02-05-22.49.48.png
categories: 
  - engineering
---

&nbsp;

&nbsp;

webアプリには、
だいたいログイン機能を
実装する必要がありますよね。

なので、
今回はKotlin + Spring Boot での
ログイン機能を
実装します。

ソースはgithubにあげているので、
cloneしていただければ試運転できます。

[video width="1920" height="1080" mp4="http://ver-1-0.net/wp-content/uploads/2017/06/kotlin-auth.mp4"][/video]

Springには、
SpringSecurityという認証管理を行う
フレームワークがあるので、
そういう便利なものを
使って実装していきます。
[after_intro]

&nbsp;
<h2 class="chapter">構成</h2>
構成はざっくり書くと、
フレームワーク: Spring
言語: Kotlin
DB: Mysql
ビルド: Gradle

です。

&nbsp;
<h2 class="chapter">Gradleへの依存性追加</h2>
&nbsp;

<a href="https://gradle.org/">Gradle</a>はjavaのビルドツールで、
アプリケーションのライブラリの依存性管理を行うツールです。

まずは、spring-securityの依存性を追加します。

<a href="https://github.com/version-1/kotlin-auth-sample/blob/master/build.gradle">build.gradle</a>
<pre><code class="language-groovy" >
dependencies {
    compile "org.jetbrains.kotlin:kotlin-stdlib:$kotlin_version"
    compile("org.jetbrains.kotlin:kotlin-reflect:$kotlin_version")
    compile('org.springframework.boot:spring-boot-starter')
    compile('org.springframework.boot:spring-boot-starter-web')
    compile "org.springframework.boot:spring-boot-starter-thymeleaf:${springBootVersion}"
    compile('org.springframework.boot:spring-boot-starter-data-jpa')
    compile('org.springframework.boot:spring-boot-starter-security')
    compile 'mysql:mysql-connector-java:5.1.6'
    testCompile('org.springframework.boot:spring-boot-starter-test')
    testCompile 'io.kotlintest:kotlintest:1.3.6'
}
</code></pre>

&nbsp;

<pre><code class="language-groovy">compile('org.springframework.boot:spring-boot-starter-security')
</code></pre>
これがspring-securityの部分です。
これを追加して、gradle buildすれば準備は完了です。

&nbsp;

&nbsp;
<h2 class="chapter">DBの準備</h2>
DBは以下のように、schema.sqlに書いて用意します。
今回はpasswordを平文で保存してますが、
実運用する際は、変換して保存するなどが必要です。
<pre><code class="language-sql">drop table users;
create table if not exists users (
  id int primary key,
  name varchar(255),
  email varchar(255),
  encrypted_password varchar(255),
  age int,
  sex tinyint,
  created_at datetime,
  updated_at datetime
);

delete from users;
insert into users
VALUES( 1 , 'John' ,'john@example.com', 'password', 26 , 1 , NOW() , NOW()),
( 2 , 'Bob' ,'bob@example.com','password', 40 , 1, NOW() , NOW()),
( 3 , 'Michael' ,'michael@example.com','password', 20 , 1, NOW() , NOW()),
( 4 , 'Mary' ,'mary@example.com','password', 30 , 0, NOW() , NOW());

</code></pre>
&nbsp;
&nbsp;
&nbsp;
<h2 class="chapter">設定クラスの実装</h2>
&nbsp;

&nbsp;

<a href="https://github.com/version-1/kotlin-auth-sample/blob/master/src/main/kotlin/auth/SecurityConfig.kt">SecurityConfig.kt</a>
<pre><code class="language-kotlin">
package kintai

/**
 * Created by admin on 2017/05/26.
 */
import kintai.AuthenticationFailureHandler
import kintai.service.UserDetailsServiceImpl

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder
import org.springframework.security.config.annotation.authentication.configurers.GlobalAuthenticationConfigurerAdapter
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.builders.WebSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.web.util.matcher.AntPathRequestMatcher
/**
 * Spring Security設定クラス.
 */
@Configuration
@EnableWebSecurity   // Spring Securityの基本設定
open class SecurityConfig : WebSecurityConfigurerAdapter() {

    override fun configure(web : WebSecurity ) {
        // ここに設定したものはセキュリティ設定を無視
        web.ignoring().antMatchers(
                            "/**/favicon.ico",
                            "/images/**",
                            "/css/**",
                            "/javascript/**",
                            "/webjars/**")
    }

    override fun configure(http : HttpSecurity )  {
        // 認可の設定
        http.authorizeRequests()
            .antMatchers("/", "/index").permitAll() // indexは全ユーザーアクセス許可
            .anyRequest().authenticated()  // それ以外は全て認証無しの場合アクセス不許可

        // ログイン設定
        http.formLogin()
            .loginProcessingUrl("/users/login")   // 認証処理のパス
            .loginPage("/index")            // ログインフォームのパス
            .failureHandler(AuthenticationFailureHandler())       // 認証失敗時に呼ばれるハンドラクラス
            .defaultSuccessUrl("/login/success")     // 認証成功時の遷移先
            .usernameParameter("email").passwordParameter("encrypted_password")  // ユーザー名、パスワードのパラメータ名
            .and()

        // ログアウト
        http.logout()
            .logoutRequestMatcher(AntPathRequestMatcher("/logout**"))
            .logoutSuccessUrl("/index")

    }

    @Configuration
    open class AuthenticationConfiguration : GlobalAuthenticationConfigurerAdapter() {
        @Autowired var userDetailsService : UserDetailsServiceImpl = UserDetailsServiceImpl() ;

        override fun init( auth : AuthenticationManagerBuilder) {
            // 認証するユーザーの設定
            auth.userDetailsService(userDetailsService)


        }
    }
}
</code></pre>
コメントに書いているようにこのクラスで
ログインなしでアクセスできるURLや認証後の遷移先などを設定できます。

ちなみにログイン失敗したときに定義している
AuthenticationFailureHandler
は以下のような感じ。

<a href="https://github.com/version-1/kotlin-auth-sample/blob/master/src/main/kotlin/auth/AuthenticationFailureHandler.kt">AuthenticationFailureHandler</a>
<pre><code class="language-kotlin">package kintai

/**
 * Created by admin on 2017/05/26.
 */
import java.io.IOException

import javax.servlet.ServletException
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse


import org.springframework.security.authentication.BadCredentialsException
import org.springframework.security.core.AuthenticationException
import org.springframework.security.web.authentication.AuthenticationFailureHandler

/**
 * Spring Securityの認証失敗時に呼ばれるハンドラクラス
 */
class AuthenticationFailureHandler : AuthenticationFailureHandler {

    @Throws(IOException::class, ServletException::class)
    override fun onAuthenticationFailure(
            httpServletRequest: HttpServletRequest,
            httpServletResponse: HttpServletResponse,
            authenticationException: AuthenticationException) {

        var errorId = ""
        // ExceptionからエラーIDをセットする
        if (authenticationException is BadCredentialsException) {
            errorId = "ERR-0001"
        }

        // ログイン画面にリダイレクト
        httpServletResponse.sendRedirect(httpServletRequest.contextPath + "/index?error=" + errorId)
    }
}
</code></pre>
&nbsp;

[mid_article]

&nbsp;
<h2 class="chapter">画面テンプレートの作成</h2>
&nbsp;

&nbsp;

ページは二つだけで、
ログインフォームのあるページとログイン成功ページだけです。

index.html
<pre><code class="language-markup">&lt;!DOCTYPE html&gt;
&lt;html lang="ja" xmlns:th="http://www.thymeleaf.org"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"/&gt;
    &lt;title&gt;トップページ&lt;/title&gt;
    &lt;style&gt;
        table,tr,td{
          border: 1px solid lightgray;
        }

    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;h1&gt;トップページ&lt;/h1&gt;
&lt;form id="loginForm" method="post" th:action="@{/users/login}"&gt;
    &lt;input type="text" name="email" /&gt;
    &lt;input type="password" name="encrypted_password"/&gt;
    &lt;input type="submit" value="ログイン"/&gt;
&lt;/form&gt;
&lt;/body&gt;
&lt;/html&gt;
</code></pre>
&nbsp;

login/success.html
<pre><code class="language-markup">
&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"/&gt;
    &lt;title&gt;Login Sucess&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;h1&gt; Successfully Login !!!!!!&lt;/h1&gt;
  &lt;a href="/logout" &gt;ログアウト&lt;/a&gt;
&lt;/body&gt;
&lt;/html&gt;
</code></pre>
&nbsp;
&nbsp;
<h2 class="chapter">コントローラの作成</h2>
<pre><code class="language-markup">package kintai.controller

/**
 * Created by version1 on 2017/02/11.
 */

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.servlet.ModelAndView
import kintai.service.UserService


@Controller
class LoginController @Autowired constructor(private val userService: UserService) {

    @RequestMapping("/")
    fun root(): ModelAndView{
        return ModelAndView("/index")
    }

    @RequestMapping("/index")
    fun index(): ModelAndView{
        return ModelAndView("/index")
    }

    @RequestMapping("/login/success")
    fun users(): ModelAndView = ModelAndView("/login/success")
}
</code></pre>
コントローラでルーティングを定義しています。
<h2 class="chapter">Serviceの定義</h2>
認証するユーザの取得する部分を書いています。

<a href="https://github.com/version-1/kotlin-auth-sample/blob/master/src/main/kotlin/auth/service/UserDetailsServiceImpl.kt">UserDetailsServiceImpl</a>
<pre><code class="language-markup">package kintai.service

/**
 * Created by version1 on 2017/05/26.
 */

import kintai.model.LoginUser
import kintai.model.User
import org.springframework.beans.factory.annotation.Autowired

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

/**
 * UserDetailsServiceの実装クラス
 * Spring Securityでのユーザー認証に使用する
 */
@Component
open class UserDetailsServiceImpl :UserDetailsService {

    @Autowired
    lateinit var userService: UserService

    override fun loadUserByUsername(username : String ) : UserDetails{
    // 認証を行うユーザー情報を格納する
        var user : User?  = null
        try {
            // 入力したユーザーIDから認証を行うユーザー情報を取得する
            user = userService.findByEmail(username)
        } catch (e:Exception ) {
            // 取得時にExceptionが発生した場合
            throw UsernameNotFoundException("It can not be acquired User");
        }

        // ユーザー情報を取得できなかった場合
        if(user == null){
            throw UsernameNotFoundException("User not found for login id: " + username);
        }

        // ユーザー情報が取得できたらSpring Securityで認証できる形で戻す
        return LoginUser(user);
    }

}


</code></pre>
返却するLoginUserクラスはこれ
&nbsp;
&nbsp;
<pre><code class="language-markup">package auth.model

/**
 * Created by admin on 2017/05/26.
 */

import auth.model.User
import org.springframework.security.core.authority.AuthorityUtils;

/**
 * 認証ユーザーの情報を格納するクラス
 */
class LoginUser (user: User): org.springframework.security.core.userdetails.User( user.email, user.encrypted_password,
        AuthorityUtils.createAuthorityList("ROLE_USER")) {
    /**
     * ログインユーザー
     */
    var loginUser: User? = null

    init{
        // スーパークラスのユーザーID、パスワードに値をセットする
        // 実際の認証はスーパークラスのユーザーID、パスワードで行われる
        this.loginUser = user
    }

}
</code></pre>
ユーザをemailで引っ張ってくるのはこれ

<a href="https://github.com/version-1/kotlin-auth-sample/blob/master/src/main/kotlin/auth/service/UserService.kt">UserService</a>
<pre><code class="language-markup">package auth.service

/**
 * Created by version1 on 2017/02/11.
 */

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import kintai.model.User
import kintai.repository.UserRepository

/**
 * DBからのデータ取得と加工を行う.
 */
@Service
open class UserService @Autowired constructor(private val userRepository: UserRepository) {

    /**
     * 全ユーザリストの取得
     * @return ユーザリスト
     */
    fun findAllUser(): MutableList = userRepository.findAll()
    fun findByEmail(email:String): User = userRepository.findByEmail(email)
}
</code></pre>
&nbsp;
&nbsp;
こんな感じです。
解説少ないですが、
コードが語ってくれるかと思います。（丸投げ笑）

<a href="https://github.com/version-1/kotlin-auth-sample">https://github.com/version-1/kotlin-auth-sample</a>
&nbsp;
&nbsp;
