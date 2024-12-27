---
bookName: "Seven Databases in Seven Weeks"
chapterTitle: "CH-1 introduction"
updatedAt: 2024-12-15
---

# CH-1 introduction

nosql is the new trend in databases, but sql is here to stay for a few reasons:

- sql dbs are still popular and widely used and developed.

- knowing sql is an important skill for swe and data analyst.

- there are still many use cases for sql dbs.

however, nosql provides some new capabilities and tradeoffs.

## It Starts with a Question

the book tries to answer the question: what db or combination of dbs best solves my problem?

to be able to answer that question you need to know your options regarding topics such as:

- what type of database is this? (relational, key-value, columnar, document, graph, ...etc)
- why was this db made? as they were not built in a vacuum, they were built to solve real world problems.
- how to talk to the db? using a cli, a programming language,or other means.
- what makes the db special? as all dbs support writing data and reading it again, does it provide indexes? is the schema rigid or dynamic? do queries have to be planned in advanced?
- how does the db perform? is it tuned for read or write? does it support sharding or replication? is the data distributed or together?
- how does it scale? horizontal? vertical? scaling for what purpose exactly?

## The Genres

it is not a question of "can I use this db with this data?" but rather "should I?"

### Relational

based on set theory and implemented as two-dimensional tables with rows and columns.

can be interacted with through sql.

tables can be joined and morphed into new more complex tables because of their mathimatical nature.

examples include MySql, h2, HSQLDB, SQLite, this book covers PostgreSQL.

#### PostgreSQL

this is the oldest and most robust db in the book.

it adheres to sql standards and has some other unique features.

### Key-Value

this is simplest db genre in the book, it allows setting pairs of keys and values similar to maps or hashtables.

some added (but not required) features are looping over the keys, or allowing lists and other complex types as values.

this simplicity allows it to be performant in many cases, but not so much if you need complex aggregations or queries.

a file system could be considered a key-value db as the path to the file is the key and the content is the value.

popular options include memcached, Voldemort, Riak, and the two covered in this book: Redis and DynamoDB.

#### Redis

provides complex datatypes as values such as sorted lists and hashed, and supports pub-sub and blocking queues patterns.

caches data in memory before commiting to disk making it very performant, and a good fit as cache.

#### DynamoDB

DynamoDB is the only database in this book that is both not open source and available only as a managed cloud service.

### Columnar

aka column-oriented, in a sense,they use tables but they store columns together instead of rows unlike an rdbms.

adding columns is quite inexpensive and is done on row-by-row bases which allows each row to have different columns

popular dbs include Cassandara and HBase which is disscussed in this book.

#### HBase

built on top of apache hadoop and hadoop distributed file system (HDFS), and designed to scale horizontally.

### Document

document dbs store documents, which are hashes (_wtf is a hash_) with and id field and any number of other values, including other hashes.

this allows for high degrees of flexibility, along with the little restrictions on the data.

the most popular are MongoDB and CouchDB both of wich are discuessed in this book.

#### MongoDB

offers atomic read-write operations, allows querying deeply nested document, uses javascript as its query language, making it support simple queries and complex map-reduce jobs.

#### CouchDB

written in Erlang, targets many deployment scenarios, from datacenters, to desktops, to smartphones, and also uses JS as its query language.

famous for its nearly incorruptible data files, high availablity even with connectivity loss or hardware failure

### Graph

excels at dealing with interconnected data, as it stores the data in a graph with nodes and relations between nodes, where nodes and relations can have properties as kv pairs.

the most popular graph db that we also discuss in this book is neo4j

#### neo4j

allows us to find relevant data through relationships, commonly found in social networking apps.

### Polyglot

using multiple dbs together to create a more powerful system is called polyglot persistence.

## Onward and Upward

the future is still hard to predict, but some things are for certain:

- no genre of database is to dominate all others.
- more specialized dbs are to come.
- administrating jobs for other types of dbs will arise.
