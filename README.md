# Running Book Bingo Locally

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Database
This app using MongoDB with the [MongoDB Node Driver](https://www.mongodb.com/docs/drivers/node/current/).

### Self-hosting with Docker
1. Create a directory to persist the data on your machine. This is optional, but if you don't do it the data will only exist in the docker container.

2. Run `docker run -it -v <LOCAL-DATA-DIRECTORY>:/data/db -p 27017:27017 --name <DB NAME> -d mongo:latest`

3. Create a database called `books`, with collections `users`, `templates`, and `cards`.

4. [Get the connection string](https://www.mongodb.com/docs/manual/reference/connection-string/#find-your-self-hosted-deployment-s-connection-string). 
### MongoDB Atlas
1. Set up a a free account and follow the documentation on [deploying a free cluster](https://www.mongodb.com/docs/atlas/tutorial/deploy-free-tier-cluster/). 

2. follow their instructions for [adding your connection IP address to your IP access list](https://www.mongodb.com/docs/atlas/security/add-ip-address-to-list/).

3. [Create a database user for your cluster](https://www.mongodb.com/docs/atlas/tutorial/create-mongodb-user-for-cluster/) to get a username and password for the database connection string.

## Clone the Repository

```bash
git clone https://github.com/krhobbs/book-bingo.git
```

## Environment Variables

In the root directory of the repository create a file called `.env.local`. You must include the following variables for the app to work:

```
DB_HOST=
NEXTAUTH_URL=http://localhost:3000
```

`DB_HOST` will be the connection string that you get from from MongoDB.

`NEXTAUTH_URL` should be `http://localhost:3000` if you use the default port

## Install Packages

```bash
npm install
```

## Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploying to Production
From the projects root directory:

1. Build the container: `docker build -t bingo-docker .`

2. Run the container: `docker run -p 3000:3000 bingo-docker`