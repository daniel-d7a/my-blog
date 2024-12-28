---
image: "@/assets/books/seven databases in seven weeks.jpg"
name: "Seven Databases In Seven Weeks"
tags: ["database", "book"]
updatedAt: 2024-12-14
inProgress: true
description: "Data is getting bigger and more complex by the day, and so are the choices in handling that data. As a modern application developer you need to understand the emerging field of data management, both RDBMS and NoSQL. Seven Databases in Seven Weeks takes you on a tour of some of the hottest open source databases today. In the tradition of Bruce A. Tate's Seven Languages in Seven Weeks, this book goes beyond your basic tutorial to explore the essential concepts at the core each technology.

Redis, Neo4J, CouchDB, MongoDB, HBase, DynamoDB and Postgres. With each database, you'll tackle a real-world data problem that highlights the concepts and features that make it shine. You'll explore the five data models employed by these databases-relational, key/value, columnar, document and graph-and which kinds of problems are best suited to each."
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

# CH-2 PostgreSQL

"PostgreSQL is the hammer of the database world. It’s commonly understood, often readily available, and sturdy, and it solves a surprising number of problems if you swing hard enough. No one can hope to be an expert builder without understanding this most common of tools." - direct quote from the book.

relational db, set-theory based, stores data as rows in 2d tables, with strictly enforced column types.

the most common db genre, and postgreSQL is one of the most popular rdbms.

contains a vast toolkit such as triggers, stored procedures, views, advanced indexes, flexible queries that you needn't know in advanced

## That’s Post-greS-Q-L

> So, What’s with the Name?

the db that wa made in the 70s at UC Berkeley was called the "Interactive Graphics and Retrieval System" or ingres for short, then came the new, improved version of it caled "Post-ingres" shortned to "postgres".

UC Berkeley dropped the project, but it was picked up again as open source, under the name "Postgres95" later renamed to PostgreSQL to denote its SQL support.

---

the oldest db in the book.

has many plugins for things like natural language parsing, multidimensional indexing, geographic queries, custom datatypes, and many
more features.

one of the most ansi-sql compliant dbs, performant, can handle terabytes of data, used in many large apps like skype, Brazil’s Caixa Bank, and United States’ Federal Aviation Administration (FAA).

## Day 1: Relations, CRUD, and Joins

we can use postgres cli with the command "psql <schema_name>"

psql is quite useful as it has great docs for sql commands and psql commands as well.

### Starting with SQL

PostgreSQL follows the SQL convention of calling relations TABLEs, attributes
COLUMNs, and tuples ROWs

#### Working with Tables

PostgreSQL, being of the relational style, is a design-first database. First you design the schema; then you enter data that conforms to the definition of that schema.

> On CRUD

CRUD is a useful mnemonic for remembering the basic data management operations:
Create, Read, Update, and Delete.

If you can CRUD, you can do just about anything.

---

> Mathematical Relations

rdbms are called relational because they are based on relational algebra and tuple relational calculus.

## while the rdbms optimizes and hides all that math away, it is good to know about.

we can create a table by giving it a name using the create table statement and assigning properties (aka columns) with types to it.

```sql

CREATE TABLE countries (
country_code char(2) PRIMARY KEY,
country_name text UNIQUE
);

CREATE TABLE cities (
name text NOT NULL,
postal_code varchar(9) CHECK (postal_code <> ''),
country_code char(2) REFERENCES countries,
PRIMARY KEY (country_code, postal_code)
);

```

each table need a unique id column to identify each row called a 'primary key'.

columns can have constraints such as being unique, not containing null, having a value (not empty) ...etc.

we can insert rows into the table using the 'insert' satement, data inserted will be tested against our constraints.

```sql

INSERT INTO cities
VALUES ('Toronto','M4C1B5','ca');

```

we can read the data using a 'select' statement.

we can delete rows from the table using the 'delete' statement.

```sql

DELETE FROM countries
WHERE country_code = 'll';

```

we can have data from one table be related to data in other tables, using the 'references' keyword, this applies a 'foreign key' constraint that ensures referenced data actually exists.

primary keys can be compound (consisting of more than one column)

we can update data instead of deleting and inserting it again using the 'update' statement

```sql

UPDATE cities
SET postal_code = '97206'
WHERE name = 'Portland';

```

#### Join Reads

one feature of relational dbs is the ability to join tables together when reading using a 'join'.

the most basic form of join is the 'inner join', where we specify 2 tables and a column in each table where the data should match using the 'on' keyword.

```sql

SELECT cities.*, country_name
FROM cities INNER JOIN countries /* or just FROM cities JOIN countries */
ON cities.country_code = countries.country_code;

```

country_code |name| postal_code | country_name
--------------+----------+-------------+---------------
us| Portland | 97206| United States

we can also join using the data of a compound primary key.

```sql

CREATE TABLE venues (
venue_id SERIAL PRIMARY KEY,
name varchar(255),
street_address text,
type char(7) CHECK ( type in ('public','private') ) DEFAULT 'public',
postal_code varchar(9),
country_code char(2),
FOREIGN KEY (country_code, postal_code)
REFERENCES cities (country_code, postal_code) MATCH FULL
);

INSERT INTO venues (name, postal_code, country_code)
VALUES ('Crystal Ballroom', '97206', 'us');

SELECT v.venue_id, v.name, c.name
FROM venues v INNER JOIN cities c
ON v.postal_code=c.postal_code AND v.country_code=c.country_code;

```

venue_id |name|name
----------+------------------+----------
1 | Crystal Ballroom | Portland

postgres can return columns after insertions using the 'returning' keyword, this helps retrive newly inserted data without a select statement.

```sql

INSERT INTO venues (name, postal_code, country_code)
VALUES ('Voodoo Doughnut', '97206', 'us') RETURNING venue_id;

```

#### The Outer Limits

we can also perform outer join where the data in one or both of the tables needn't match.

if we have an events table that references the venues table (one venue hosts many events)

this query returns only events with events with venues.

```sql

SELECT e.title, v.name
FROM events e JOIN venues v
ON e.venue_id = v.venue_id;

```

title|name
--------------+------------------
Fight Club| Voodoo Doughnut

using an outer left join (shortned to left join) we can get all events weather they have a venue or not.

```sql

SELECT e.title, v.name
FROM events e LEFT JOIN venues v
ON e.venue_id = v.venue_id;

```

title|name
------------------+----------------
Fight Club | Voodoo Doughnut
April Fools Day |
Christmas Day |

### Fast Lookups with Indexing

to reduce the number of disk reads and number of rows scaned for each query we can use an index, which is a special data structure that optimizes the selection (querying) of a set of columns.

PostgreSQL automatically creates a B-tree index on the primary key of a table, or when using the unique constraint.

we can create indexes of our own like so

```sql

CREATE INDEX events_title
ON events USING hash (title);

```

a hash index like the one above is useful with unique data, for matches such as less-than/greater-than/equals, a B-tree index is much more flexible, as it can help match ranges of data.

postgres won't create indexes on columns targeted by foreign key constraints, you better add them yourself to speed up foreign key joins.

## Day 2: Advanced Queries, Code, and Rules

### Aggregate Functions

functions that group results based on a criteria (max, min, count, ...etc)

simplist function is count,it counts the number of rows.

```sql

SELECT count(title)
FROM events
WHERE title LIKE '%Day%';

```

other functions are min and max.

### Grouping

GROUP BY allows us to group aggregate results by some criteria. it simplifies the following queries:

```sql

SELECT count(*) FROM events WHERE venue_id = 1;
SELECT count(*) FROM events WHERE venue_id = 2;
SELECT count(*) FROM events WHERE venue_id = 3;
SELECT count(*) FROM events WHERE venue_id IS NULL;

```

to this:

```sql

SELECT venue_id, count(*)
FROM events
GROUP BY venue_id;

```

venue_id | count
----------+-------
1 |1
2 |2
3 |1
4 |3

we can add a condition to the aggregate function using a HAVING clause, which is like a where clause, but unlike where it can filter aggregate functions.

```sql

SELECT venue_id
FROM events
GROUP BY venue_id
HAVING count(*) >= 2 AND venue_id IS NOT NULL;

```

venue_id | count
----------+-------
2 |2

if we use GROUP BY without an aggregate function, this returns only unique values, this is so common in SQL that it has a keyword for it, DISTINCT, making these 2 queries identical.

```sql

SELECT venue_id FROM events GROUP BY venue_id;

SELECT DISTINCT venue_id FROM events;

```

### Window Functions

similar to aggregate functions but they don't require grouping, they simply return the result of grouping with each row,so while this query errors.

```sql

SELECT title, venue_id, count(*)
FROM events
GROUP BY venue_id;

```

this doesn't.

```sql

SELECT title, count(*) OVER (PARTITION BY venue_id) FROM events;

```

and returns the following data

title| count
-------------+-------
Moby|1
Fight Club|1
House Party |3
House Party |3
House Party |3

### Transactions

all or nothing. every command in a transaction must be excuted, if any thing fails the whole transaction is rolled back.

transactions follow ACID compliance:

- Atomic (either all operations succeed or none do)
- Consistent (the data will always be in a good state and never in an inconsistent state)
- Isolated (transactions don’t interfere with one another)
- Durable (a committed transaction is safe, even after a server crash)

all the commands we ran so far has been wrapped in a transaction, so if we for example modify a larege number of rows and the db crashes halfway through, the command is rolled back so that the data is consistent.

```sql

BEGIN TRANSACTION;
DELETE FROM events;
ROLLBACK

```

Transactions are useful when you’re modifying two tables that you don’t want out of sync. The classic example is a debit/credit system for a bank, where money is moved from one account to another:

```sql

BEGIN TRANSACTION;
UPDATE account SET total=total+5000.0 WHERE account_id=1337;
UPDATE account SET total=total-5000.0 WHERE account_id=45887;
END;

```

### Stored Procedures

stored procedures allow us to do complex math, trigger cascading events, validate data before it is saved and many more operations, they allow you to run complex logic on the db engine directly without sending thousands of rows to the client, with the downside that our app is now bound to this db.

> vendor lock-in

in the early days, people used to program entire apps in the db (e.g. MS access) due to implementation specific and proprietary methods, this birthed vendor lock-in that allowed companies to charge enourmous fees for software licences. the move to mitigate vendor lock-in had rules such as "no logic in the db" which means losing on some very performant and efficient tools such as stored procedures. in the end we must know our tools to the fullest before ruling out some tools because they are implementation specific .

```sql

CREATE OR REPLACE FUNCTION add_event(
title text,
starts timestamp,
ends timestamp,
venue text,
postal varchar(9),
country char(2))
RETURNS boolean AS $$
DECLARE
did_insert boolean := false;
found_count integer;
the_venue_id integer;
BEGIN
SELECT venue_id INTO the_venue_id
FROM venues v
WHERE v.postal_code=postal AND v.country_code=country AND v.name ILIKE venue
LIMIT 1;
IF the_venue_id IS NULL THEN
INSERT INTO venues (name, postal_code, country_code)
VALUES (venue, postal, country)
RETURNING venue_id INTO the_venue_id;
did_insert := true;
END IF;
-- Note: this is a notice, not an error as in some programming languages
RAISE NOTICE 'Venue found %', the_venue_id;
INSERT INTO events (title, starts, ends, venue_id)
VALUES (title, starts, ends, the_venue_id);
RETURN did_insert;
END;
$$ LANGUAGE plpgsql;

```

we can run this procedure as a select

```sql

SELECT add_event('House Party', '2018-05-03 23:00',
'2018-05-04 02:00', 'Run''s House', '97206', 'us');

```

The language we used in the procedure we wrote is PL/pgSQL (which stands for Procedural Language/PostgreSQL), there are more languages to write procedures such as Tcl (PL/Tcl), Perl (PL/Perl), and Python (PL/Python) and extensions for even more languages such as ruby, java, php, ...etc.

### Pull the Triggers

Triggers automatically fire stored procedures when (before or after) some event (insert, update, delete) happens to enforce some behaviour.

here we create a system to audit the changes in our db, we create a logs table, a logging procedure, and a trigger that runs it on every update.

```sql

CREATE TABLE logs (
event_id integer,
old_title varchar(255),
old_starts timestamp,
old_ends timestamp,
logged_at timestamp DEFAULT current_timestamp
);

```

```sql

CREATE OR REPLACE FUNCTION log_event() RETURNS trigger AS $$
DECLARE
BEGIN
INSERT INTO logs (event_id, old_title, old_starts, old_ends)
VALUES (OLD.event_id, OLD.title, OLD.starts, OLD.ends);
RAISE NOTICE 'Someone just changed event #%', OLD.event_id;
RETURN NEW;
END;
$$ LANGUAGE plpgsql;

```

```sql

CREATE TRIGGER log_events
AFTER UPDATE ON events
FOR EACH ROW EXECUTE PROCEDURE log_event();

```

### Viewing the World

views are aliases for select queries, that can then be used like any other table

```sql

CREATE OR REPLACE VIEW holidays AS
SELECT event_id AS holiday_id, title AS name, starts AS date, colors
FROM events
WHERE title LIKE '%Day%' AND venue_id IS NULL;

```

> storing views on disk

views are convenient wrappers, but they have no performance gains over normal queries, to get better performance from the views we can create materialized views, those views are 'materialized' in a real table and stored on disk.

these can be created using CREATE MATERIALIZED VIEW instead of CREATE VIEW, we can refresh the data in a materialized view using the REFRESH command which can be automated to run after set intervals or as a trigger to certain events.

the only downside to materialized views is the increase in disk space, but the performace gains are worth it, and more worth it the more complex the query

### What RULEs the School?

A RULE is a description of how to alter the parsed query tree, as each queryin postgres is parced into an abstract syntax tree that is rewritten and optimized by postgres.

we can create rules that tell postgres how to deal with operations (update, insert, delete) on our view.

```sql

CREATE RULE update_holidays AS ON UPDATE TO holidays DO INSTEAD
UPDATE events
SET title = NEW.name,
starts = NEW.date,
colors = NEW.colors
WHERE title = OLD.name;

```

this allows us to update the view directly

```sql

UPDATE holidays SET colors = '{"red","green"}' where name = 'Christmas Day';

```

### I’ll Meet You at the Crosstab

pivot tables take some data and pivot it around some other output, we will try to make an event calendar that counts the events in each month.

to create pivot tables in postgres we can use the crosstab function, it takes 3 arguments, the rowid (rows), category (columns), value (cells).

in this example the rows will be the years, the columns will be the months, and values will be the count of events.

we will create an temporary table to store the months using CREATE TEMPORARY TABLE, this table will last as long is the current postgres session.

```sql

CREATE TEMPORARY TABLE month_count(month INT);
INSERT INTO month_count VALUES (1),(2),(3),(4),(5),
(6),(7),(8),(9),(10),(11),(12);

```

next we use the crosstab function as follows, the AS clause just renames the columns.

```sql

SELECT * FROM crosstab(
'SELECT extract(year from starts) as year,
extract(month from starts) as month, count(*)
FROM events
GROUP BY year, month
ORDER BY year, month',
'SELECT * FROM month_count'
)AS (
year int,
jan int, feb int, mar int, apr int, may int, jun int,
jul int, aug int, sep int, oct int, nov int, dec int
) ORDER BY YEAR;

```

## Day 3: Full Text and Multidimensions

we start by making a db about movies includeing actor and genre data, and download a few postgreSQL packages that are not part of the sql standard

<< add db erd >>

### fuzzy searching

opening up a system for text search means opening up to inaccurate inputs.

there are search fremeworks such as apache lucene and elasticsearch that provide similar and even more features that db text search, but it is an issue of tradeoffs on where these features shall live.

SQL standard string matches include 'LIKE' and regex.

#### I like LIKE and ILIKE

they match values against string expressions where '%' and '\_' are wild cards that match any number of characters and a single character respectivly, ILIKE is the case insensitive varient of LIKE.

using like is simple and useful in basic cases but limited.

```sql

SELECT title FROM movies WHERE title ILIKE 'stardust%';

```

## title

Stardust
Stardust Memories

#### regex

a regular expression match is led by the ~ operator, with the optional ! (meaning not matching) and \* (meaning case insensitive)

to count all movies that do not begin with 'the' we can do the following.

```sql

SELECT COUNT(*) FROM movies WHERE title !~* '^the.*';

```

queries with regex can be indexed <<look for this>>

#### Bride of Levenshtein

Levenshtein is a string comparison algorithm that compares how similar two strings are by how many steps are required to change one string into another where every replacement, addition, removal, or case change counts as a step.

we can use it in postgres through the 'levenshtein()' function provided by the 'fuzzystrmatch' package, running:

```sql

SELECT levenshtein('bat', 'fads');

```

gives us 3 as we need 3 steps to transform 'bat' to 'fads' (replace b with f, t with d, add s)

so we can use it like so: (we used lower case to minimize differences)

```sql

SELECT movie_id, title FROM movies
WHERE levenshtein(lower(title), lower('a hard day nght')) <= 3;

```

#### Try a Trigram

A trigram is a group of three consecutive characters taken from a string, we can use triagrams in postgres using the pg_trgm package.

```sql

SELECT show_trgm('Avatar');

```

## show_trgm

{"a"," av","ar ",ata,ava,tar,vat}

Finding a matching string is as simple as counting the number of matching trigrams. The strings with the most matches are the most similar. It’s useful for doing a search where you’re okay with either slight misspellings or even minor words missing. The longer the string, the more trigrams and the more likely a match—they’re great for something like movie titles because they have relatively similar lengths.

these queries too can be indexed using a Generalized Index Search Tree (GIST), then queried like this:

```sql

SELECT title
FROM movies
WHERE title % 'Avatre';

```

## title

Avatar

### Full-Text Fun

postgres supports simple natural language processing.

#### TSVector and TSQuery

postgres has a full-text query operator '@@' that transforms the query into 'tsquery' and the queried column into 'tsvector'.

```sql

SELECT title
FROM movies
WHERE title @@ 'night & day';

```

## title

A Hard Day's Night
Six Days Seven Nights
Long Day's Journey Into Night

tsvectors transformes the column data using simple nlp operations such as lemmatization and stop words removal, the result is a list of 'lexems' coupled with thier position in the query, and a tsquery is a query in a certain dictionary (e.g. english), and postgres also has these operations as functions (to_tsvector and to_tsquery).

other dictionaries do exist for other languages, and also others with different rules such as 'simple' that simply breaks the sentence into words.

we can index our tables to speed up the text search, but we need to specify the dictionary to use for both the index and the query. here we use a Generalized Inverted iNdex (GIN) that creates an inverted index of lexems.

#### Metaphones

are algorithms for creating a string representation of word sounds in a set number of characters. For example, the seven-character metaphone of the name Aaron Eckhart is ARNKHRT.

another example where we want to find all movies with the actor 'Broos Wils'.

```sql

SELECT title
FROM movies NATURAL JOIN movies_actors NATURAL JOIN actors
WHERE metaphone(name, 6) = metaphone('Broos Wils', 6);

```

## title

The Fifth Element
Twelve Monkeys
Armageddon
Die Hard
Pulp Fiction
The Sixth Sense

notice that a Natural Join is an INNER JOIN that
automatically joins ON matching column names (for example, movies.actor_id=movies_actors.actor_id).

other algorithms for metaphones (that also have functions in postgres are double metaphones, alternative double metaphones, and soundex, which is an older algorithm that represents sounds as letters and numbers)

```sql

SELECT name, dmetaphone(name), dmetaphone_alt(name),
metaphone(name, 8), soundex(name)
FROM actors;

```

name
| dmetaphone | dmetaphone_alt | metaphone | soundex
----------------+------------+----------------+-----------+--------
50 Cent | SNT | SNT | SNT | C530
Aaron Eckhart | ARNK | ARNK | ARNKHRT| A652
Agatha Hurle | AK0R | AKTR | AK0HRL | A236

### Combining String Matches

For example, we could use the trigram operator against metaphone() outputs and then order the results by the lowest Levenshtein distance. This means “Get me names that sound the most like Robin Williams, in order.”

```sql

SELECT * FROM actors
WHERE metaphone(name,8) % metaphone('Robin Williams',8)
ORDER BY levenshtein(lower('Robin Williams'), lower(name));

```

actor_id | name
----------+-----------------
4093 | Robin Williams
2442 | John Williams
4479 | Steven Williams
4090 | Robin Shou

but be warned as different combinations can return different results, even unwanted or non-similar ones.

### Genres as a Multidimensional Hypercube

the cube package allows us to represent data as multidimensional vectors and apply knn algorithms on them.

in our example, the genres column contains a 18-dimensional vector that represents the movie's genre, we can get the genres of a movie from its genre vector using the 'cube_ur_coord' function (we exclude the genres with a score of 0).

```sql

SELECT name,
cube_ur_coord('(0,7,0,0,0,0,0,0,0,7,0,0,0,0,10,0,0,0)', position) as score
FROM genres g
WHERE cube_ur_coord('(0,7,0,0,0,0,0,0,0,7,0,0,0,0,10,0,0,0)', position) > 0;

```

name | score
-----------+-------
Adventure | 7
Fantasy | 7
SciFi | 10

we can find simila movies by genre using a nearest neighbor match using the 'cube_distance' function.

```sql

SELECT *, cube_distance(genre, '(0,7,0,0,0,0,0,0,0,7,0,0,0,0,10,0,0,0)') dist
FROM movies
ORDER BY dist;

```

this searches the entire genre space (aka all the rows) even with an index, to make it more efficient we can create a boundary around the movie we want to query by and match only movies within this boundary. we can create a cube boundary using 'cube_enlarge'.

```sql

SELECT title,
cube_distance(genre, '(0,7,0,0,0,0,0,0,0,7,0,0,0,0,10,0,0,0)') dist
FROM movies
WHERE cube_enlarge('(0,7,0,0,0,0,0,0,0,7,0,0,0,0,10,0,0,0)'::cube, 5, 18)
@> genre
ORDER BY dist;

```

title|dist
------------------------------------------------+------------------
Star Wars | 0
Star Wars: Episode V - The Empire Strikes Back | 2
Avatar | 5
Explorers | 5.74456264653803
Krull | 6.48074069840786
E.T. The Extra-Terrestrial | 7.61577310586391

the '@>' operator means contains, the query abpve searches for movies similar to star wars within a 5 units 18-dimensional cube boundary,then sorts them by distance.

this allows for more advanced queries, such as using a movie name to get its genre to find similar movies.

```sql

SELECT m.movie_id, m.title
FROM movies m, (SELECT genre, title FROM movies WHERE title = 'Mad Max') s
WHERE cube_enlarge(s.genre, 5, 18) @> m.genre AND s.title <> m.title
ORDER BY cube_distance(m.genre, s.genre)
LIMIT 10

```

this uses a sub select to get the genre of the movie 'Mad Max' and renames the result to 's', then searches within a 5 units 18-dimensional cube boundary around it for similar movies (excluding 'Mad Max' itself)

### day 3 wrap-up

in day 3 we saw a few packages for postgres that allowed us to better perform full text search, there are other more extensions out there from geographic storage to cryptographic functions, custom datatypes, and language extensions

## Wrap-Up

Relational databases have been the focus of intense academic research and industrial improvements for more than 40 years, and PostgreSQL is one of the top open source relational databases to benefit from these advancements.

### PostgreSQL’s Strengths

this goes for relational dbs as a whole.

- years of research.
- flexible queryability.
- very consistent and durable data.
- Most programming languages have battle-tested driver support for Postgres.
- the flexiblity of JOINs, we needn't know how we will use the data before we use it (which is not the case for other databases).
- relational dbs are great for data that is homogeneous and conforms well to a structured schema.

postgres specific features:

- its customizability (language extensions, custom types, custom indexes, overwriting parsed queries, ...etc.)

> Postgres and JSON

although postgres is better suited for structured data, it has support for json type data, which is perfect for when we have a mixture of structured and unstructured data.

```sql

CREATE TABLE users (
username TEXT,
data
JSON
);
INSERT INTO users VALUES ('wadeboggs107', '{ "AVG": 0.328, "HR": 118, "H": 3010 }');
SELECT data->>'AVG' AS lifetime_batting_average FROM users;

```

## lifetime_batting_average

0.328

here we use the 'json' type which stores data as text and is optimized for input, we can also use 'jsonb' stores data in a decomposed binary format that is optimized for faster processing

### PostgreSQL’s Weaknesses

this also goes for relational dbs as a whole,another db may be a better fit if:

- we need to scale out (adding more clusters or machines) rather than scaling up (adding more resources to the machine).
- we needn't a whole db (maybe just a cache).
- we require very high-volume reads and writes as key values.
- we need to store only large BLOBs of data.

### Parting Thoughts

relational databases are great and very flexible, assume nothing about how we use the data, and with a normalized db, well-defined indexes, some engine tuning, and some packages it can handle everything (up to terabytes of data), all with very little resources and ACID compliance.

# Appendix-2 The CAP Theorem

a distributed db can be one or more of the following:

- consistent (writes are atomic and all subsequent requests retrieve the new value)

- available (the database will always return a value as long as a single server is running)

- partition tolerant (the system will still function even if server communication is temporarily lost—that is, a network partition)

the db can be at ost 2 of these things, and never all three.

a system that is not partition tolearant is simply not distributed.

## Eventual Consistency

the theory states that while a system is available it cannot achieve true consistency, but it can still reach eventual consistency. meaning the data is always available, but it may take some time to be consistent, as the modifications to the data are made in the background and can take time to propagate to other nodes in the system.

The Internet’s Domain Name Service (DNS) is a prime example of an eventually consistent system. You register a domain, and it may take a few days to propagate to all DNS servers across the Internet. But at no time is any particular DNS server unavailable

Redis, PostgreSQL, and Neo4J are consistent and available (CA) as they don’t distribute data. MongoDB and HBase are generally consistent and partition tolerant (CP). CouchDB is available and partition tolerant
(AP).

mongoDB can be have some nodes cover for other downed nodes, but strictly speaking, in the CAP theorem sense, they are unavailable, and couchDB can replicate data between multiple servers, but it doesn't guarantee consistency.

most of these dbs can be configured to change CAP type, but those are the default or the most common types.

## The Latency Trade-Off

some dbs can give up some of the CAP requirements to get lower latency.
