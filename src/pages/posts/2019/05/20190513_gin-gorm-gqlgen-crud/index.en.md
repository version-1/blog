---
templateKey: blog-post
language: en
title: Tried to Create Crud API Gin+Gorm+GraphQL(gqlgen)
slug: /2019/05/13/gin-gorm-gqlgen-crud
createdAt: 2019-05-13 03:56:07
updatedAt: 2019-05-13 03:56:07
thumbnail: /2019/05/20190513_gin-gorm-gqlgen-crud/thumbnail.png
categories:
  - engineering
tags:
  - go
  - learning
  - gin
  - gorm
  - gqlgen
---

I have been studying after coming Reiwa era. Now, I tried to develop web API with Go and GraphQL.

My Repository.
[gin-gorm-gqlgen-sample](https://github.com/version-1/gin-gorm-gqlgen-sample)
I usually develop backend with Ruby on Rails so I'm not famillier with golang and it takes long time to create this repository...

I will explain about entire flow. Next, I will talk about stack point I was working in.

<div class="adsense"></div>

## Technolodies I used

Followings are technolodies I used this time,

* Docker
* Dep (package manager)
* Gin (WAF)
* Gorm (ORM)
* gqlgen (GraphQL Library)

#### Gin

Gin is one of the Go language WAF. It have got the most star on github in go lang WAF(as far as I know).

#### Gorm

Gorm is Go Lang ORM. According to web articles, its interface is like Rails's ActiveRecord.
I am familliar with Rails so I choose this library.

#### Dep

Dep is pacakge manager. I need to "go get" to install some libraries but it seems like disturbing my Dockerfile.
So I used dep

#### gqlgen

gqlgen is GraphQL server library. There are some graphql libraries for golang such as [graphql-go/graphql](https://github.com/graphql-go/graphql).
But I selected gqlgen becuase I really like a point of generating code after I defined schema.

[99designs/gqlgen](https://github.com/99designs/gqlgen)

If you use gqlgen, you can proceed your development with following procedure.

1. Define Schema
2. Write logic about query in resolvers

In this process, you can focus on writing logic and you don't need to write boring code because gqlgen genearate code based on your schema.


## Entire Flow

The gqlgen sample in the document is baout Todo List. If you will read "Getting Start", you start it easily.
But, I need to do something when you use it with Gorm or you develop CRUD. So, I will explain those way, So, I will explain those way.


### Install gqlgen with dep

You can install gqlgen by "go get" but if you use dep, you have to prepare wrapper scripts to generate boilerplate.

scripts/gqlgen.go

```go
package main

import "github.com/99designs/gqlgen/cmd"

func main() {
	cmd.Execute()
}
```

If you do this,
```bash
$go run scripts/gqlgen.go init
```

you will be able to execute it like this.
When you finished to write scripts, make files you need on gqlgen.

```bash
$go run scripts/gqlgen.go init
```

Gqlgen will generate followings files.

* gqlgen.yml ・・・ Configure file. you write the configure fo generated code.
* genereated.go ・・・ When you define schema and execute scripts, this file will be generatted. Must not edit manually because it is generated.
* models_gen.go ・・・ This file is also generated from schema. Must not edit manually because it is generated.
* resolver.go ・・・ This is generated if you yet to create this name file.
* server/server.go ・・・ Entrypoint.

&nbsp;

When you generate code, excecute following command and install pacakges.

```bash
dep ensure
```


### Create Entry Point for Gin


I have to prepare entry point for gin if you want to use gin.
prepare two endpoints.( for playground and main)

```go
import (
  "github.com/99designs/gqlgen/handler"
  "github.com/gin-gonic/gin"
)

// Defining the Graphql handler
func graphqlHandler() gin.HandlerFunc {
  h := handler.GraphQL(NewExecutableSchema(Config{Resolvers: &Resolver{}}))

  return func(c *gin.Context) {
    h.ServeHTTP(c.Writer, c.Request)
  }
}

// Defining the Playground handler
func playgroundHandler() gin.HandlerFunc {
  h := handler.Playground("GraphQL", "/query")

  return func(c *gin.Context) {
    h.ServeHTTP(c.Writer, c.Request)
  }
}

func main() {
  // Setting up Gin
  r := gin.Default()
  r.POST("/query", graphqlHandler())
  r.GET("/", playgroundHandler())
    r.Run()
}
```


### Prepare Gorm Model

Next, I will define model which are used on schema definition.
I put it on internal/models according to go language standard layout.

```go
// user.go
package models

import (
	"time"
)

type User struct {
	ID        int
	Name      string
	Todos     []Todo
	CreatedAt time.Time
	UpdatedAt time.Time
}

```

```go
// todo.go
package models

import (
	"time"
)

type Todo struct {
	ID        int
	Text      string
	Done      bool
	UserID    int
	User      User
	CreatedAt time.Time
	UpdatedAt time.Time
}
```

&nbsp;

Certainly I think it is preferd to wirte it with embed (please refer to Gorm documents)
but errors occur when I excecuted. I wrote all attributes..(I would like to know better way..)


&nbsp;

```go
// todo.go
package models

import (
	"time"
)

type Todo struct {
  gorm.Model
	Text      string
	Done      bool
	UserID    int
	User      User
}
```

&nbsp;

If you finish to define your model, you have to wirte mapping of model in gqlgen.yml.
Followings is definition in this case.

```go
models:
  Todo:
    model: gin_graphql/internal/models.Todo
  User:
    model: gin_graphql/internal/models.User
```

### Define Schema

What I introduced until now is to prepare to develop in schema drriven, I'll to write the code and logic for api from now.

```go
type Todo {
  id:   Int!
  text: String!
  done: Boolean!
  userID: Int!
  user: User!
  createdAt: Time!
  updatedAt: Time!
}

type User {
  id: Int!
  name: String!
  createdAt: Time!
  updatedAt: Time!
}

type Query {
  todos: [Todo!]!
  users: [User!]!
  todo(input: FetchTodo): Todo!
}

input NewTodo {
  text: String!
  userId: Int!
}

input EditTodo {
  id: Int!
  text: String!
}

input NewUser {
  name: String!
}

input FetchTodo {
  id: Int!
}

type Mutation {
  createTodo(input: NewTodo!): Todo!
  updateTodo(input: EditTodo!): Todo!
  deleteTodo(input: Int!): Todo!
  createUser(input: NewUser!): User!
}

scalar Time
```

Above is schema.graphql to realize CRUD. You have to use graphql syntax to write this.
Processes to change resouce is wrriten in Mutations and Processes to read it is wrriten in Query.
And Types you need is also defined in schema.graphql.


Until now, you got reday to generate code and you start to edit resolver.In resolver, IO is defined by schema.graphql and it is generated automatically.
So you focus on writing logic between input and output.


### Implemntaion Resolver

In resolver, write code to get data from database or create some records.
You have to know that resolver is not overwritten when it is already exist.

Following is resolver I wrote. I can't explain all because it is about gorm and bored for us.

```go

type Resolver struct {
}

func (r *Resolver) Mutation() MutationResolver {
	return &mutationResolver{r}
}
func (r *Resolver) Query() QueryResolver {
	return &queryResolver{r}
}

type mutationResolver struct{ *Resolver }

func (r *mutationResolver) CreateUser(ctx context.Context, input NewUser) (*models.User, error) {
	user := models.User{
		Name: input.Name,
	}
	db.Create(&user)
	return &user, nil
}

func (r *mutationResolver) CreateTodo(ctx context.Context, input NewTodo) (*models.Todo, error) {
	todo := models.Todo{
		Text:   input.Text,
		UserID: input.UserID,
		Done:   false,
	}
	db.Create(&todo)
	return &todo, nil
}

func (r *mutationResolver) UpdateTodo(ctx context.Context, input EditTodo) (*models.Todo, error) {
	todo := models.Todo{ID: input.ID}
	db.First(&todo)
	todo.Text = input.Text
	db.Model(&models.Todo{}).Update(&todo)

	return &todo, nil
}

func (r *mutationResolver) DeleteTodo(ctx context.Context, input int) (*models.Todo, error) {
	todo := models.Todo{
		ID: input,
	}
	db.First(&todo)
	db.Delete(&todo)
	return &todo, nil
}

type queryResolver struct{ *Resolver }

func (r *queryResolver) Todo(ctx context.Context, input *FetchTodo) (*models.Todo, error) {
	var todo models.Todo
	db.Preload("User").First(&todo, input.ID)
	return &todo, nil
}

func (r *queryResolver) Todos(ctx context.Context) ([]models.Todo, error) {
	var todos []models.Todo
	db.Preload("User").Find(&todos)
	fmt.Println(todos[0].User)
	return todos, nil
}

func (r *queryResolver) Users(ctx context.Context) ([]models.User, error) {
	var users []models.User
	db.Find(&users)
	return users, nil
}
```



### Run

Finally, you can run your code if you finish process I introduced.
The entrypoint of the repositry I prepared is cmd/app/main.go so you can run following command.

```go
ENV=development go run cmd/app/main.go
```

We should pass env in this command because I implemented it to load configuration by env.
When you success to run the server, you can try it on http://localhost:8080.

## Stack Points

Next, I will write about points I stacked while I was building.


### How can I define type of Time like CreatedAt and Updated?

Schema Types are only 5.

* ID
* Int
* Float
* String
* Boolean

So we have to define types we need such as Date.

When I create this sample, I'm stack here but I found gqlgen provide Time Type so I can use it.

You only do like this as above schema definition.

```go
scalar Time
```

After you declare the type, the type is mapped to Go Embeded tim.Time Type.
Gqlgen support Map, Upload and Any type so if you want to use their type, only declare it with scalar declaration.

### Error Occured in Gorm Model while I generate code.

This problem is not resolved. I got away with it by workaround though..
I defined a model with gorm embed type but error occured during generation...

```go
type User {
  gorm.Model
  name
}
```

I got away with writing all attributes but it is not good.
If anyone know better way, I would like to teach me.


### Get association model while I get list


This is about not GraphQL but Gorm. I often get list which include associated model so I tried it in this sample, too.
That is simpler than I expeceted. All you need is to add fields to struct.


```go
type Todo {
  id:   Int!
  text: String!
  done: Boolean!
  userID: Int!
  user: User!
  createdAt: Time!
  updatedAt: Time!
}
```

For example, when you define Todo model, you can do that by adding userId and user fields to Todo model.

```go
db.Preload("User").Find(&todo, input.ID)
```

And add this line to resolver.

You already write preload clasue so you already solved N+1 problem.
This is sql when I execute.You can make sure that users query is preloaded.

```sql
(/app/src/gin_graphql/resolver.go:65)
[2019-05-14 15:27:07]  [0.90ms]  SELECT * FROM `todos`  WHERE (`todos`.`id` = 2) ORDER BY `todos`.`id` ASC LIMIT 1
[1 rows affected or returned ]

(/app/src/gin_graphql/resolver.go:65)
[2019-05-14 15:27:07]  [2.65ms]  SELECT * FROM `users`  WHERE (`id` IN (1)) ORDER BY `users`.`id` ASC
[1 rows affected or returned ]
```

## Wrrap Up

I tryied to build hot stacks of Web API and Graphql.

I currently feel the limit of REST API while I develop system with it so I feel stronger the good points of graphql.
In REST API, When I create new endpoint, I have to write code to request that endpoint in client-side.

In GraphQL, if you define schema once, you can fetch necessary resouce anytime.
When I develop api in REST, I think how I don't depned on frontend but I often need to change code of server-side code when the front is changed.

I think such problems will be solved by GraphQL (many people say so though..)
Certainly, I learn it deeply and I would know that drawbacks and I can never know that now but I can feel that potential.

If you are familiar with REST or are sick of creating Web API, try GraphQL

Thank you,
