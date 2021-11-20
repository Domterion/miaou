# 🦴🤖 Miaou Bot

<br>

> Miaou Bot is a Discord bot written in Typescript. The name comes from [Google Translate](https://translate.google.com/?sl=en&tl=fr&text=meow&op=translate).

### Selfhosting

We dont support selfhosting and the tooling we provide isn't guaranteed to be updated. Please use our official instance if you'd like to use Miaou. Basic instructions are provided below but are not guaranteed to be up to date. 

Requirements:
- Podman

- Atleast two braincells

- Linux

To start the database server use:
```
$ podman run --name miaou_postgres -d -e POSTGRES_DB=miaou -e POSTGRES_PASSWORD=postgres -p 5432:5432 -v $(pwd)/postgresql_data:/var/lib/postgresql/data:z docker.io/postgres:13-alpine
```

To build Miaou main image use:
```
$ podman build -t miaou:latest .
```

To run Miaou use:
```
$ podman run --name miaou -d miaou:latest
```
