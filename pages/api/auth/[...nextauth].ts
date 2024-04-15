import NextAuth, { NextAuthOptions } from 'next-auth';
import RedditProvider from 'next-auth/providers/reddit';
import { 
  getUserByUsername, 
  insertUserByReddit,
  isUsernameTaken } from '../../../utils/db-utils';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    //maxAge: 3000
  },
  providers: [
    RedditProvider({
      clientId: process.env.REDDIT_CLIENT_ID,
      clientSecret: process.env.REDDIT_CLIENT_SECRET,
      authorization: {
        params: {
          duration: 'permanent'
        }
      }
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      // console.log('JWT');
      // console.log(token);
      // console.log(account);
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token, user }) {
      // console.log('SESSION');
      // console.log(session);
      // console.log(token);
      // console.log(user);
      if (token) {
        session.user.username = token.name;
        const userData = await getUserByUsername(token.name);
        if (userData) {
          session.user.friends = userData.friends;
          session.user.id = userData.id;
        }
      }
      // Send properties to the client, like an access_token from a provider.
      return session;
    },
    async signIn({account, profile}) {
      // console.log('SIGN IN');
      // console.log(account);
      // console.log(profile);
      if (account.provider === 'reddit') {
        if (profile.name && profile.verified) {
          const userExists = await isUsernameTaken(profile.name);
          if (userExists) {
            return true;
          } else {
            await insertUserByReddit(profile.name);
            return true;
          }
        }
      }
      return true;
    }
  },
};

export default NextAuth(authOptions);
