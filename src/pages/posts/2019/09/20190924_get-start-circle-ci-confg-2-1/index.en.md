---
templateKey: blog-post
language: en
title: How to write Circle CI Config 2.1 from basic to advance
slug: /2019/09/24/get-start-circle-ci-confg-2-1
createdAt: 2019-09-24 10:12:41
updatedAt: 2019-09-24 10:12:41
thumbnail: /2019/09/20190924_get-start-circle-ci-confg-2-1/thumbnail.png
categories:
  - engineering
tags:
  - test
  - ci
  - circleci
---

Recently, I didn't have a chance to write a lot of config in Cicle CI so far, but I had a chance to touch it at work.
That is why I would like to share what I learned there.

I heard that you can use Github Actions nowadays.
It's better to compare and contrast these things to see which one is best for your project.
However, Circle CI already was used and I didn't have any complain about it so I deceided to use it.

In this case, we had an automated test environment in the current project, but we didn't have an automated deployment environment
It seems like the deployment procedure is pretty much dependent on the person in charge.
To improve it, we've stareted to automate deployments to make the procedure anyone can use.

## Documentation.

First of all, better material to learn Circle CI is the official documentation, which is pretty well written.
I used that as a reference to automate the deployment process this time.

[Configure CircleCI](https://circleci.com/docs/ja/2.0/configuration-reference/#section=configuration)

I mean, if you read the documents carefully, you may not have to read much of this article here. LOL!
However, anyway , I'll try to summarize the documentation and explain it in a way that makes it easier to understand.

What I'll be explaining is the 2.1 version of config, which is different from 2.0.

The 2.1 version of config is different from 2.0, for example you can use "Command", "Executor" and so on.

## Summary of concepts to keep in mind in Circle CI

First of all, I will talk outline of Circle CI.
Circle CI can write CI configuration in .circleci/config.yml from the project's root directory, and define the processes to be executed in CI.

### Job and Workflow.

In the following, we will explain the concepts necessary to define the process, but as a brief explanation, there is a basic unit of the process called **Job**, which is
We'll take that in turn and define a single **Workflow**.

Some of you may not understand what a **Workflow** is, but it is the flow of the entire process as translated.

In CI,

1. Run the test code.
2. make sure it passes the test and deploy

Workflow is this flow of 1 and 2.

In the real world, it would be more complicated because it is necessary to test and deploy the source of the API server, test and deploy the source of the front end, and so on.
But the basic concept is the same.

In this example, the

- Testing of the API server
- Deploying the API server
- Test the frontend
- Deploying the frontend code

The workflow consists of four jobs (1), and the order in which these jobs are executed is the workflow.

If you write this in a simple yaml, it looks like the following.こめ

> This is not the correct format, so please follow the official documentation.

The following is an example of a simple yaml file.

```yaml
version: 2.1
jobs:
  - api-test
      name: 'Test the API server'
  - api-deploy:
      name: 'Deploy the API server'
  - front-test:
      name: 'Test the frontend'
  - front-deploy:
      name: 'Deploy the frontend'
workflow:
  - test-and-deploy:
      jobs:
        - api-test
        - front-test
        - api-deploy
            requires:
              - api-test
        - front-deploy
            requires:
              - api-deploy
              - api-front
````

<div class="adsense"></div>

In the workflow section, there is a section called "requires".
You need to write the job. In short, you need to write the dependent tasks for the job.

If you don't write the job `requires`, CirecleCI will execute the job without paying attention to the order of the tasks, so you need to write the requires in
It's also possible that it will be deployed (depending on the number of parallelism). (Depending on the number of parallels)

In this way, Workflow is a high-level concept for Job and if you understand thes small/large relationship of some concepts,
you can learn how to set up the configuration more easily.


### Steps.

Now that we have the definition down, let's look at the details further.

**Job** consists of **Steps** and we describe the actual process in Job in the config file.
In Steps, you can execute shell commands and just describe the process in these steps.


```yaml
jobs:
  - api-test:
      name: 'Test the API server'
      steps:
        - checkout
        - run:
          name: 'Install a library'
          command: /var/spool
            command: | bundle install
        - run:
          name: 'Run a test'
          command: | | bundle exec rspec
            bundle exec rspec
```

I'll leave the details to the official documentation, but you can use the `When clause` to control things like executing a command if the previous command fails
and there are also commands for checking out of the repository.

The actual execution of the commands is mainly done with the run command, but you can specify a working directory or define environment variables that are valid only in run clause.

### Command(available since 2.1)

Command is one of the features from 2.1 and it makes you be able to commonize Steps with Command.
For example, in many cases, you may want to activate the cache because it is redundant to install a package for every test.

In order to do so.

1. Check if the cache exists
2. Install the package (use the cache if you have it).
3. Overwrite the cache with the latest state.

but it's too tedious to copy and paste this process for each job, so we'll define this process as a Command and reuse it.


```yaml
commands:
  package-install:
    description: 'Package installation with cache'
    steps:
      - restore-cache
        keys:
          - v1-hoge-server-{{ checksum: 'Gemfile.lock }}
          - v1-hoge-server
      - run
        name: 'bundle install'
        command: bundle install vender/bundle
      - save-cache
        key:
          - v1-hoge-server-{{ checksum: 'Gemfile.lock }}
          - v1-hoge-server
        paths:
          - vender/bundle

```

If you write the package installation commands in advance,
you don't need to write a process, just call the command, and you can make a DRY configuration.

In addition, you can also pass parameters to this command in the form of parameters to make it easier to create reusable commands.

### Executors (available since 2.1)

Executors are for reusing your environment; you can create a docker image and use it in your environment.

### Orbs(available since 2.1)

The word "orbs" may be unfamiliar to you, but in essence it is a library.
Once you write configuration as "orbs" of the Commands and Jobs I've introduced and publish the "orbs",
you can use it in other projects, or more specifically, in all projects that use CircleCI.

https://circleci.com/orbs/registry/

The registry is for Orbs, so check the Orbs you can use.

As far as I can see, there are some orbs such as Slack's orbs, so it seems to be easy to implement notifications by using them.
It's easy to install a specific version of Ruby, Node and so on to CircleCI.

### Concepts Summary

To summarize what I've been explaining so far

* Workflow
* Jobs.
* Steps.
* Commands
* Executors.
* Orbs.

 If you understand those things, you can start to use CircleCI for now.
 And the relationship between each of them is

 **Workflow > Jobs > Steps** with a relationship (dependency) like this
 Commands are **common jobs**, Orbs are **common public jobs across projects**, and
 Executors seems to be better understood as **common execution environment**.


## More in-depth.

The description so far should be enough to get you started with CirecleCI, but I was a little curious to get started.
A somewhat in-depth summary of the content is as follows.

### Using Cache.

CircleCI allows you to specify a directory and save it as a cache.
It resolves the problem of installing packages envery build.

[dependency cache](https://circleci.com/docs/ja/2.0/caching/)

You can specify the key and path for caching by using `save_cache` in Steps in Job.
You can use it all the time.

### Control on a per-branch basis.

You can use branches to control which branches run Workflow and Job.

With this, you can do things like "if merged into develop, deploy after the tests are finished".
You can also register a regular expression whitelist so you can control which feature branch to run tests on

### Use SSH.

You may need to do SSH with Ansible, Capistrano, your own scripts, etc., but you will need to use CirecleCI
You can use SSH to log in to the remote server by registering the private key to

The private key can be registered in the console.
However, if you need to use the private key in your job,
you need to add a commanod `add_ssh_keys` with the key's fingerprint to use the key.

### Default Environment Variables.

Here are the predefined environment variables.

[Predefined Environment Variables](https://circleci.com/docs/ja/2.0/env-vars/#%E5%AE%9A%E7%BE%A9%E6%B8%88%E3%81%BF%E7%92%B0%E5%A2%83%E5%A4%89%E6%95%B0)

* The user who created the pull request.
* Current job name.
* The branch name of the current build.

and other build metainformation are defined as environment variables.

### Scope of Environment Variables.

Environment variables can be used by defining environment variables in the environments of Workflow, Job, and Executor.
The scope of the variable depends on the location where the variable is defined;

If you define them in the job, they are valid in the job;
if you define them in the Executor, they are valid in the execution environment.

### Validation of the Config file

If you are not used to it, you may not be able to follow the syntax of the Config file at first.
If you install CircleCI's CLI beforehand, you can validate your config file in your local env.

To avoid unnecessary pushes to the repositories, it is recommended to push the config file after the validation.

[Installation Instructions](https://circleci.com/docs/ja/2.0/local-cli/#インストール)

Here's the command for validation.

```bash
circleci config validate
```


## Summary

How do you think of the concept of CircleCI?

I made the config while referring to the document repeatedly in actual work, but the document is written more carefully and so helpful.
In addition, the original config (befor I worked in) was 2.0, but Commands and Executor came to be able to use, and it became quite comfortable because a lot of processes can be commonized.
Thanks to this, I was able to automate the deployment of my project.

I will use other features I didn't use this time like "orbs".


