---
templateKey: blog-post
language: en
title: Implementing Ruby's methods Method in JavaScript
slug: /2024/07/29/ruby-methos-method-on-js
createdAt: 2024-07-29 20:25:07
updatedAt: 2024-07-29 20:25:07
thumbnail: /2024/07/20240729_ruby-methods-method-on-js/thumbnail.png
canonical: https://dev.to/version1/implementing-rubys-methods-method-in-javascript-p1e
categories:
  - engineering
tags:
  - javascript
  - ruby
---


Suddenly, isn't Ruby's methods method handy? When writing code, it lists all the methods and properties available for an object and allows you to search through them, which is very useful for debugging.

Besides that, it is also effective for checking methods specific to frameworks like Rails, aiding in code reading and understanding libraries. While it's good practice to refer to official documentation or source code, the methods method is quite helpful for libraries where you don’t need to dive deeply or when you have vague memories of method names.

## Ruby's `methods` Method


To briefly introduce Ruby's methods method, it looks like this:

[Object#method](https://ruby-doc.org/3.2.2/Object.html#method-i-methods)

> Returns a list of the names of public and protected methods of obj. This will include all the methods accessible in obj’s ancestors. If the optional parameter is false, it returns an array of obj’s public and protected singleton methods, the array will not include methods in modules included in obj.

In other words, it returns an array object of the properties and methods accessible from the receiver.

This method is implemented in the Object class, which is the ancestor of all classes that inherit from Object, so it can be used in any class inheriting from Object.


**Sample Code**

```ruby
class Hoge
  attr_accessor :fuga

  def bar
    puts ''
  end
end

puts Hoge.new.methods     // => [:bar, :fuga=, :fuga, :hash, :singleton_class, :dup, ...]
puts Hoge.new.grep /fuga/ // => [:fuga=, :fuga]
```

As shown in the example, it returns an Array object, so you can also search through the list of methods using the grep method, which is very convenient.

So, I thought about whether this could be done in JS and gave it a try.

## Implementation

Below is the actual code.

The class name can be anything, but I’m naming it PropertyFinder for now.

```javascript
class PropertyFinder {
    constructor(receiver) {
      this.receiver = receiver
    }

    grep(regexp, options = {}) {
      let res = []
      if (typeof regexp === 'string') {
        return this.find((name) => name.includes(regexp))
      }
      if (regexp instanceof RegExp) {
        return this.find((name) => regexp.test(name))
      }
      return []
    }

    toString() {
      return this.find(() => true)
    }

    find(detect) {
      const list = Object.getOwnPropertyNames(this.receiver).filter(it => detect(it))
      if (!this.receiver.__proto__) {
        return list
      }
      const ancestors = new PropertyFinder(this.receiver.__proto__).find(detect)
      return [...list, ...ancestors]
    }
}
```

I’ll explain the code later, but let’s start with how to use it.

Once the class is defined, you can add a method to the Object class's properties as follows:

```javascript
Object.prototype.methods = function () {
    return new PropertyFinder(this)
}
```

By doing this, you can use the methods method on instances of classes inheriting from Object. However, please be aware of the caution note below and use this at your own risk.


Here are some example executions:

```javascript

class Hoge {
  fuga() {
    console.log('fuga')
  }
}

console.log(new Object().methods().toString()) // => ['constructor', 'constructor', '__defineGetter__', '__defineSetter__', 'hasOwnProperty' ...]
console.log([].methods().toString())           // => ['length', 'length', 'constructor', 'at', 'concat', ...]
console.log(new Hoge().methods().grep(/fuga/)  // => ['fuga']

```

## Safety Introduction

**This code is not recommended for use in production environments **

Adding properties to higher-level classes through monkey-patching is an anti-pattern and could lead to problems with future changes in JS specifications. Use it with caution and at your own risk.

Reference : [The cons of monkey patching](https://www.audero.it/blog/2016/12/05/monkey-patching-javascript/#the-cons-of-monkey-patching)

## Code Explanation

Now, let's move on to explaining the code.

The most important method in PropertyFinder is the find method. This method traverses the prototype chain of the given object, searches for accessible properties, and returns them as a list.

The toString and grep methods simply use find, so they don't need further explanation.

### Prototype Chain

The prototype chain might be unfamiliar to some, but it’s the inheritance of properties from the Object class.

[Inheritance and the prototype chain | MDN ](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)

The details are covered in the MDN documentation, but JavaScript's inheritance mechanism is supported by the prototype chain.

Although it's not always obvious, when referring to some property, the process involves:

1. Checking if the receiver itself has the property.
2. Checking if the parent class instance has the property.
3. Checking if the property exists in the parent class’s instance's parent class.

This process continues up the chain until a match is found, which is then returned.

### What the `find` Method Does

Given the above, the find method in PropertyFinder implements this mechanism, allowing you to get a list of properties by recursively exploring `__proto__`.

Here's the implementation that achieves this by exploring `__proto__` recursively to get the list:

```javascript
    find(detect) {
      const list = Object.getOwnPropertyNames(this.receiver).filter(it => detect(it))
      if (!this.receiver.__proto__) {
        return list
      }
      const ancestors = new PropertyFinder(this.receiver.__proto__).find(detect)
      return [...list, ...ancestors]
    }
```

That concludes the explanation of PropertyFinder.


## Wrap up

That wraps up the explanation of the code and what I’ve tried.

This was more of an experimental or playful exercise, but since it involved some knowledge and techniques, I hope you find it useful or inspiring for your own applications.

