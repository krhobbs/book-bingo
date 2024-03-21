# Running Book Bingo Locally

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

Requires: Node.js, Docker

## Database: Postgres

You have to run the database locally for the application to work. When there is no database you cannot login or view bingo cards. Run the following command to start a docker container with a postgres db running, exchange `<db-password>` for whatever you want the password to be.

```bash
docker run -it -d -p 5432:5432 --name book-bingo-db --volume postgres-data:/var/lib/postgresql/data -e POSTGRES_PASSWORD=<db-password> postgres:latest
```

Seeding the database, run the following SQL on the DB:

```sql
CREATE SCHEMA bingo;

CREATE TABLE bingo.books (
    id uuid NOT NULL,
    title character varying(63) NOT NULL,
    author character varying(63) NOT NULL,
    cover character varying(255),
    created_at timestamp without time zone
);

CREATE TABLE bingo.card_squares (
    id integer NOT NULL,
    card_id uuid NOT NULL,
    book jsonb,
    color character(7),
    completed_at timestamp without time zone
);

CREATE TABLE bingo.cards (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    template_id uuid NOT NULL,
    archived boolean,
    created_at timestamp without time zone
);

CREATE TABLE bingo.friends (
    user_id uuid NOT NULL,
    friend_id uuid NOT NULL,
    created_at timestamp without time zone
);

CREATE TABLE bingo.template_reqs (
    id integer NOT NULL,
    template_id uuid NOT NULL,
    req character varying(63) NOT NULL
);

CREATE TABLE bingo.templates (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    name character varying(63) NOT NULL,
    created_at timestamp without time zone
);

CREATE TABLE bingo.users (
    id uuid NOT NULL,
    username character varying(31) NOT NULL,
    password character varying(63) NOT NULL,
    created_at timestamp without time zone
);

ALTER TABLE ONLY bingo.books
    ADD CONSTRAINT books_pkey PRIMARY KEY (id);

ALTER TABLE ONLY bingo.card_squares
    ADD CONSTRAINT card_squares_pkey PRIMARY KEY (id, card_id);

ALTER TABLE ONLY bingo.cards
    ADD CONSTRAINT cards_pkey PRIMARY KEY (id);

ALTER TABLE ONLY bingo.friends
    ADD CONSTRAINT friends_pkey PRIMARY KEY (user_id, friend_id);

ALTER TABLE ONLY bingo.template_reqs
    ADD CONSTRAINT template_reqs_pkey PRIMARY KEY (id, template_id);

ALTER TABLE ONLY bingo.templates
    ADD CONSTRAINT templates_name_key UNIQUE (name);

ALTER TABLE ONLY bingo.templates
    ADD CONSTRAINT templates_pkey PRIMARY KEY (id);

ALTER TABLE ONLY bingo.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);

ALTER TABLE ONLY bingo.users
    ADD CONSTRAINT users_username_key UNIQUE (username);

ALTER TABLE ONLY bingo.card_squares
    ADD CONSTRAINT card_squares_card_id_fkey FOREIGN KEY (card_id) REFERENCES bingo.cards(id);

ALTER TABLE ONLY bingo.cards
    ADD CONSTRAINT cards_user_id_fkey FOREIGN KEY (user_id) REFERENCES bingo.users(id);

ALTER TABLE ONLY bingo.friends
    ADD CONSTRAINT friends_friend_id_fkey FOREIGN KEY (friend_id) REFERENCES bingo.users(id);

ALTER TABLE ONLY bingo.friends
    ADD CONSTRAINT friends_user_id_fkey FOREIGN KEY (user_id) REFERENCES bingo.users(id);

ALTER TABLE ONLY bingo.template_reqs
    ADD CONSTRAINT template_reqs_template_id_fkey FOREIGN KEY (template_id) REFERENCES bingo.templates(id);

ALTER TABLE ONLY bingo.templates
    ADD CONSTRAINT templates_user_id_fkey FOREIGN KEY (user_id) REFERENCES bingo.users(id);
```

## Clone the Repository

```bash
git clone https://github.com/krhobbs/book-bingo.git
```

## Environment Variables

In the root directory of the repository create a file called `.env.local`. You must include the following variables for the app to work:

```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=
PGHOST="0.0.0.0"
PGPORT="5432"
PGDATABASE=bingo
PGUSER=postgres
PGPASSWORD=<db-password>
```

`PGPASSWORD` should be what you set the password to earlier when staring the postgres docker container.

## Install Packages

```bash
npm install
```

## Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.