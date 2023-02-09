## [Wrighterly - A Powerful Markdown Blogger & A Writing Companion ⚡](https://wrighterly.vercel.app/)

- wrighterly has a powerful WYSIWYM markdown editor and a renderer (batteries included ⚡)
- It is optional signup, so you can use wrighterly offline too! or you can fork this project and use wrighterly standalone
- wrighterly has a feature called [bites](https://wrighterly.vercel.app/bites), that allows you to gather & organize _bite_ sized ideas and later use them in your blogs
- ...and a lot more features that aims to make modern writing easier and productive!

## Setup

- To run wrighterly locally, you just need to clone the app
- ensure to install `prisma` and `tsnd` globally
- run `yarn` on root directory, it will install all the deps for both client and server
- create `.env.local` file in `wrighterly-client` with

```
API_BASE_URL="<INSERT BACKEND URL HERE>"
```

Example of configuration file:

```
API_BASE_URL="http://localhost:8080/api"
```

- create `.env` file in `wrighterly-server` with

```
DATABASE_URL="<INSERT DB URL HERE>"
SECRET_KEY="<SOME SECRET>"
COOKIE_SECRET="<COOKIE SECRET>"
```

Example of configuration file:

```
DATABASE_URL="mysql://wrighterly_user:secrete_wrighterly_pass@127.0.0.1:3306/wrighterly_db"
SECRET_KEY="SECRETkeyforwrighterlyapplication"
COOKIE_SECRET="SECRETCookieforwrighterlyapplication"
```

- from the root directory, run `yarn dev`, it would concurrently run both the server and client
- goto `localhost:3000` to see wrighterly ✨

## Contributing

- Contributions and feature ideas are welcome 🤗
