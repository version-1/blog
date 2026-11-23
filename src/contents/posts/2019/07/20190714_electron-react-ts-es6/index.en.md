---
templateKey: blog-post
language: en
title: Create React+TypeScript+ES6 template for Electron
slug: /2019/07/14/electron-react-ts-es6
createdAt: 2019-07-14 16:28:08
updatedAt: 2020-02-19 02:24:08
thumbnail: /2019/07/20190714_electron-react-ts-es6/thumbnail.png
categories:
  - engineering
tags:
  - react
  - webpack
  - typescript
  - electron

---


It's been a while since I've posted.

I have a feeling that a lot of things are going to change these days, and I'm going to have to deal with that.
I haven't been able to update this page, but I hope I can update this page periodically as well.

I've been using electron for my personal project, so I'll write about that.
I thought it would be fun to make apps on the desktop a long time ago, so I tried to use electron a little bit so I started to use it since then.

I was writing in Vallila js then so naturally, I want to use React in it this time.

Once I install React into the project, I started to fell like writing code in TypeScript, so I tried with create-react-app.
However, the fact that the main process does not support import statements is becoming more and more worrisome.

When the app is small, I can ignore the fact that the main process is responsible for the old way of writing style, but I've been able to use the electron API to tweak window and
The amount of code that you have to do is gradually increasing as you go through all of this, and it's getting harder and harder. Plus, you have to use the same constants between both processes.
Thus, I would have to write the code in the old way like export, modules or something like that.

In order to solve this problem, I made a template repository for React + TypeScript + ES6 for Electron.

Here is repository. Check it out.

[version-1/electron-react-ts-es6](https://github.com/version-1/electron-react-ts-es6)


You can easily start Electron with React + TypeScript + ES6 (if you are familiar with it) which you are used to in your projects.

<div class="adsense"></div>

## Main Process and Renderer Process.

If you don't know Electron in depth, you won't know what **Main Process** and **Renderer Process** are.
The main process, which exists only one process per application, is the one that starts up first when you run Electron.

On the other hand, render process is fired up for each window , and one application has multiple renderer processes.

The main process, as the name suggests, can  handle **ready** and **all-window-close** ready, executes callbacks, creates new windows (renderer process), and so on.
You can also handle each renderer process by operating on a specific window.

### Example Code for Main Process (Entry Point)

The following is the entry point for the repository I mentioned earlier, which creates an instance of BrowserWindow (starts the renderer process) at the time of launching the app, and exits the app itself when all the windows are closed.
This is the kind of process I've written.

When you create a more complex app, you need to add process like closing window or change the menu depending on input in render process.

```javascript
import { app, BrowserWindow } from 'electron'

const onReady = async () => {
  win: BrowserWindow | null
  win = new BrowserWindow();
  win.loadURL('http://localhost:8080');

  // Open the Chromium Dev tool.
  win.webContents.openDevTools();

  win.on('closed', function() {
    win = null;
  });

}
app.once('ready', onReady)
app.on('window-all-closed', () => { app.quit() })
```

### Example Code for Renderer Process (Entry Point)

On the other hand, you can think of Electron's renderer process as the front page of a web service, and most of the web development know-how can be directly transferred here, and React runs on the renderer process.

```javascript
import React from 'react'
import styled from 'styled-components'
import { GlobalStyle } from 'styles/Index'

const Container = styled.div`
  max-width: 200px;
  height: 100%;
  width: 100%;
  margin: auto;
  display: flex;
  align-items: center;
}
`

const Title = styled.h2`
  text-align: center;
`

const Description = styled.p`
  text-align: center;
`

function App() {
  return (
    <Container>
      <GlobalStyle />
      <div>
        <Title>Hello World! </Title> <Title>Hello World!
        <Description>This is a sample of ES6 + TypeScript + React for Electron.</Description
      </div>.
    </Container>
  )
}

export default App

````

As you can see here, you can write code almost the same way as you can run React on the web: if you want to use Redux or Hooks in your project, you can do in same way.

### IPC (The communitation style between two processes)

By now, you may understand the difference between the main process and the renderer process, but as a matter of course, when you actually develop, the communication (state synchronization) between the main process and the renderer process.
In the case of Electron, this is accomplished by **IPC**.
It is basically done by registering a listener in the main process and waiting for the renderer process to send messages to the listener.

To borrow an example from [official](https://electronjs.org/docs/api/ipc-main#sending-messages)

#### Main Process.

```javascript
const { ipcMain } = require('electron')
ipcMain.on('asynchronous-message', (event, arg) => {
  console.log(arg) // prints "ping"
  event.reply('asynchronous-reply', 'pong')
})

```

#### Renderer Process.

```javascript
const { ipcRenderer } = require('electron')

ipcRenderer.send('asynchronous-message', 'ping')
ipcRenderer.on('asynchronous-reply', (event, arg) => {
  console.log(arg) // prints "pong"
})

```

As shown in the above example, the main process registers a listener named **"asynchronous-message "** in the main process and sends a request from the renderer process at any given time.

So, in summary, the main process will be the parent process of the app, and the parent-child communication will be done using the IPC communication method

Let's get back to the main topic.

** When we make a complex application, the main process that manages the renderer process is going to be quite large and complicated, isn't it? **

** It's hard not to be able to share constants and other things between the renderer and the main process. **

This was my big concern about Electron app.
That is wahy I have explained about the main process and the renderer process in the hope that you will understand what I mean.

So, in order to solve this problem, I created a template for both the main process and the renderer process that can be applied to ES6 (especially import).

## Configure Webpack to call the main process with the ES6 syntax

From now on, I will focus on how to convert Electron to ES6.

First of all, the renderer process is really easier, such as importing, reacting and installing TypeScript.

As I wrote earlier, the renderer process can take over the know-how of web development almost as it is, so you can do something like create-react-app, and then you will be able to do it by googling.
You can build an ES6 + React + TypeScript environment in just a few minutes, just by imitating the way you would find the article.

But for the main process, there are not so many articles about it, and you have to dive into the webpack world by yourself to configure it and use ES6 syntax.
(It's very useful for writing react-script and renderer processes, but I ejected it because it's black-boxed and seems to be hard to configure).

The result is the repository I mentioned earlier.

[version-1/electron-react-ts-es6](https://github.com/version-1/electron-react-ts-es6)

The key part of webpack configuration is to **output entry points of main process and renderer process separately**.

The code for the main process is put together under `src/main` and the renderer process code is put together under `src/renderer` beforehand.
The following is the configuration.

```javascript

module.exports = (env = {}) => {
  return [
    {
      name: 'main',
      ... .defaultConf(env),
      entry: path.resolve(__dirname, '... /src/main'),
      output: {
        path: path.resolve(__dirname, '... /public'),
        filename: 'main.js'
      },
      target: 'electron-main'
    },
    {
      // for renderer
      name: 'renderer',
      ... .defaultConf(env),
      entry: path.resolve(__dirname, '... /src/renderer'),
      output: {
        path: path.resolve(__dirname, '... /public'),
        filename: 'renderer.js'
      },
      target: 'web',
    }
  ]
}
```

With this configuration, the renderer process code is rendered as `public/renderer.js` and the main process code is rendered as `public/main.js.`
In this way, Electron can be converted to ES6 by bundling the renderer process and the main process code separately.

It is also convenient to use webpack-dev-server to distribute the renderer process.
In the repository, we deliver code from `http://loalhost:8080` and can hot-reload it if we change the code during development.

Here are the commands for developing in the repository (scripts in package.json)

```json
"scripts": {
  "start": "yarn build:main && electron ." ,
  "start:inspect": "yarn build:main && electron --inspect=5858 ." ,
  "start:inspect-brk": "yarn build:main && electron --inspect-brk=5858 ." ,
  "develop": "webpack-dev-server --host 0.0.0.0 --hot --config config config/webpack.config.js --config-name renderer",
  "build:main": "webpack --config config config/webpack.config.js --config-name main"
},
```

When you develop Electron, you need to set up a server of the renderer process (webpack-dev-server) with the `yarn develop` command.
In parallel, it starts the main process as `yarn start` in a separate window (as you can see, it builds and starts electron based on the built files.) The main process is launched as `yarn start` (as you can see, once built, it launches electron from the built files) in a separate window.

In this development environment, the webpack-dev-server automatically hot-loads the code and reloads it for the renderer process only if you fix it a little bit.
The main process code needs to be restarted by `yarn start` after you modify the code.

Ideally, it would be nice to be able to hot reload the main process code as well, but I'll give you the repository at this point.
(If you want to hot reload it, use nodemon.)


## Summary


So, I wrote a story about how I set up the environment to be able to develop in ES6 syntax and TypeScript for both the main process and the renderer process.

I like javascript, but it's a bit troublesome to set up this kind of environment. If you don't care about ES6, you may not need such a setting.
It's important to be stress-free while developing because those troublesome setting affects my motivation to write the code.

It is fun and refreshing to see the application I made working on the desktop, but there is no best practices for Electron system design (as long as I know) like the web.
It's not easy. It seems to be good to make the main process as the server side of the web (or rather, as an API), .
But it runs on the same place so it's hard to think about the design because you can share the model and so on. (I'd like to know if there are best practices somewhere...)

However, once the JS environment is set up like this one, you can write code comfortably afterwards, so if you are annoyed with building an environment, I hope you can use it while referring to this repository or forking it.
