---
bookName: "Seven Databases in Seven Weeks"
chapterTitle: "CH-1 introduction"
updatedAt: 2024-12-15
---

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
