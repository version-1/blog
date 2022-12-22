---
templateKey: blog-post
language: en
title: How to fix the problem of not working key repeating in CodeSandbox's Vim key binding.
slug: /2021/04/18/how-to-fix-key-repeating-problem-on-codesandbox
createdAt: 2021-04-18 21:16:53
updatedAt: 2021-04-18 21:16:53
thumbnail: /2021/04/20210418_how-to-fix-key-repeating-problem-on-codesandbox/thumbnail.png
categories:
  - engineering
tags:
  - lifehack
  - tool
  - codesandbox
---

I usually use CodeSandbox to write some front-end code, but I had a small problem with it, so this article is about how to fix it.

## Problem: Not working key repeating in CodeSandbox's Vim key binding

I usually use vim when writing code, so as you might expect, I use vim key bindings on CodeSandbox as well.

When I set up Vim key bindings, key repeating stopped working, and even if I held down the `j` key, the cursor didn't move down, and I had to hit the key repeatedly to move it, which was very annoying.

## How to fix

Run command in your termnal.

```bash
defaults write -g ApplePressAndHoldEnabled -bool false
```

It seems that the current CodeSandbox inherits the settings of VSCode, and when I want to use Vim Keybinding in VSCode, I need to change the Mac settings in the terminal, but I can't do that in CodeSandbox because the conditions for using the terminal seem to be limited.

Setting for VSCode is written in [here](https://marketplace.visualstudio.com/items?itemName=vscodevim.vim)

It seems that Mac has a mechanism to set the behavior of each application when a key is held, but in order to enable key repetition, I need to disable this setting `ApplePressAndHoldEnabled`.

In VSCode, I was able to disable the setting by running  command in local terminal but I couldn't do the same thing in CodeSandbox so I turned off the global setting of `ApplePressAndHoldEnabled` once. 
(It is necesary to reboot your computer to apply the setting)

If there is any problem, you can turn it back on, so I have turned off the global setting as a workaround.

```bash
defaults write -g ApplePressAndHoldEnabled -bool true
```

I tried setting it up to target Chrome and it didn't work, so I guess I need a bit more additional settings to limit the scope.

This may not seem like much of a problem, but I hope you will be able to use it with caution since you will be changing the global settings.

