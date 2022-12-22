---
templateKey: blog-post
language: en
title: Summary of fixing errors when migrationg webpack2 to webpack4
slug: /2019/02/17/migration-to-webpack4
createdAt: 2019-02-17 12:03:41
updatedAt: 2019-02-17 12:03:41
thumbnail: /2019/02/20190217_migration-to-webpack4/thumbnail.png
categories:
  - engineering
tags:
  - frontend
  - webpack
  - javascript
related:
  - dummy
---

I happened to have a chance to upgrade from webpack2 to webpack4 in a project using vue, so I had to use
Here's a summary of the errors I've encountered when upgrading webpack and their solutions.


## Impression after migrating webpack


The first impressions are that the version of package.json was rewritten before the work started, and then the
I thought that I could make it if I did npm install and solved some errors, but it was not so easy.

Because the version of babel-loader was not usable with webpack4 in 6 series, I upgraded it to 8(latest version) skipping version 7.
Then, I also had to change the version of babel to 7. Finally that's not a light task.

The other package versions such as file-loader and vue-loader didn't match with the 4 series, so I also needed to update them.

<div class="adsense"></div>


## The first thing we did in the migration.

&nbsp;
When upgrading, basically, you need to update the version of webpack to 4 first and then
I was planning to just keep resolving the errors until the build was successful.
It's not very efficient, so I went to the official document first.

Here is something like an explanation of how to migrate from webpack3 -> webpack4.
You can find it here: https://webpack.js.org/migrate/4/

The basic policy is to kill errors as they are encountered, but I've already destroyed what I can find in the documentation.

### add mode option

In webpack4, you can set the mode options, and if you build in production mode, you can uglify.
For more information on how to set it up and how it behaves differently, the following link will help you.

https://webpack.js.org/concepts/mode/

The mode options can be specified with the -m option at the time of webpack's execution, or config it like following code.

```js
module.exports = (env, argv) => {

  if (argv.mode === 'development') {
    config.devtool = 'source-map';
  }

  if (argv.mode === 'production') {
    //... }
  }

  return config;
};

```


### webpack-cli setup

Since webpack4 has cli as webpack-cli, so I've also installed it.

I also installed it.

```console
npm install -D webpack-cli
```

### Remove Unnecessary Plug-ins

The following four plugins are the default for production mode in v4.

````
* NoEmitOnErrorsPlugin
* ModuleConcatenationPlugin
* DefinePlugin
* UglifyJsPlugn
````

This is the development mode default

````
* NamedModulesPlugin
````


The next two are deprecated and removed

````
* NoErrorsPlugin
* NewWatchingPlugin
````

So, if this plugin is included in your project's webpack.config.js, you should remove it.


## Errors that appeared after the upgrade and their countermeasures.


As I wrote earlier, read the migration instructions and remove what I could destroy first so next I needed to fight against the unknown errors.


### Cannot read property 'fileLoader' of undefined


It seems that the version of file-loader was simply too old.
It was throwing up an error per leaflet.

https://github.com/tcoopman/image-webpack-loader/issues/153

```console
npm install file-loader@[latest version]
```



### TypeError: Cannot read property 'stylus' of undefined


https://github.com/shama/stylus-loader/issues/189
https://github.com/shama/stylus-loader/pull/190/files<Paste>

A minor version of the stylus-loader had become an error with only 1 small version.
It's solved by updating to 3.0.2.



### Parse error in dynamic import.

When I built it, there was a parse error in the dynamic import.
The project uses this **preset-stage-2**.
It was already migrated it while following document, but it didn't work.

https://github.com/babel/babel/blob/master/packages/babel-preset-stage-2/README.md


Here's the solution, and it's in the

https://github.com/webpack/webpack/issues/8656

There are some posts that say it worked when I downgraded to wepback 4.28.
It seems like last resolution, and if you read on as if there's a better way, webpack relies on acorn@^6.05
It seems to need to be installed.

Furthermore, the webpack relies on acorn, acorn-dynamic-import and I needed to dedupe like this

````
npm dedupe
````

It seemed to be an error because each one did not reference the same version.

https://github.com/webpack/webpack/issues/8656#issuecomment-456010969 ...

For now.

```bash.
npm install -D acorn@^6.0.6
npm dedupe
````

Then it worked.


### Cannot read property 'vue' of undefined


https://github.com/vuejs/vue-loader/issues/1177

Upgraded this because more than vue-loader@14.2.2 is required to webapck 4.


### Cannot read property 'context' of undefined


Now they want me to update the css-loader

https://stackoverflow.com/questions/50418896/webpack-4-css-modules-typeerror-cannot-read-property-context-of-undefined

The answer says that **^0.28.11** is fine, but if you can build it with no problems, then the newer version is better, so I upgraded to 1.xx.


### WARNING erupts on build.

````
No parser and no filepath given, using 'babel' the parser now but this will throw an error in the future. inferred.
````


I started to see this kind of WARNING spewing out during the build, so I looked it up and this is what I found

https://github.com/rails/webpacker/issues/1734 ...


I was told to give it to vue-loader v15. Though I couldn't get rid of the feeling that "I just updated it to 14 just now".
However, there was no way so I upgraded to a new version.

Click here to see how to upgrade.

https://vue-loader.vuejs.org/migrating.html#notable-breaking-changes

In my project, this is how I add plug-ins and

```javascript
// webpack.config.js
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  // ...
  plugins: [
    new VueLoaderPlugin()
  ]
}
```


I did the pug and css settings as described in the documentation and I was able to build it with no problems.


## Summary


I have introduced the errors and its solutions in the upgrade to webpack4.
I wrote a quick note about giving it to v15, but I was usually stuck in it for a couple of hours.

The whole time I assumed that "I can't parse the pug!"
However, it took me a while to realize that I hadn't been able to load the stylus, which was a horrible mistake.
I wasted a lot of time.

When the version up is skipped, it becomes hard to skip it after. If other libraries are not supported, or it will need version-up like domino.
It's not easy. If you focus on only development, version up and maintenance of the environment will be neglected.
If you can create a team or system to be able to upgrade immediately when one person notices, it would be better to manage the project in a peaceful way.

Well then. Thank you for reading.


