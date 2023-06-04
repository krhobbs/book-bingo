# Running Book Bingo Locally

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Database

The app is set up to use a MongoDB Atlas DB. It requires you to set up a a free account and you can follow their documentation on [deploying a free cluster](https://www.mongodb.com/docs/atlas/tutorial/deploy-free-tier-cluster/). 

Once you have deployed your cluster, you will also want to follow their instructions for [adding your connection IP address to your IP access list](https://www.mongodb.com/docs/atlas/security/add-ip-address-to-list/).

You will also need to [create a database user for your cluster](https://www.mongodb.com/docs/atlas/tutorial/create-mongodb-user-for-cluster/) to get a username and password for the database connection string.

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

