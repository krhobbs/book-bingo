import NextAuth, { NextAuthOptions } from 'next-auth';
import RedditProvider from 'next-auth/providers/reddit';
import GoogleProvider from 'next-auth/providers/google';
import { insertUser, doesUserExist, getUser } from '../../../utils/db-utils';

export const authOptions: NextAuthOptions = {
  session: { strategy: 'jwt' },
  providers: [
    RedditProvider({
      clientId: process.env.REDDIT_CLIENT_ID,
      clientSecret: process.env.REDDIT_CLIENT_SECRET,
      authorization: { params: { duration: 'permanent' } },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      // console.log('\nSIGN IN\n');
      // console.log(account);
      // console.log(profile);
      if (account?.provider === 'reddit') {
        if (profile?.id && profile.verified) {
          const userExists = await doesUserExist(profile.id, account.provider);
          if (userExists) {
            return true;
          } else {
            await insertUser(profile.id, account.provider, profile.name);
            return true;
          }
        }
      }
      if (account?.provider === 'google') {
        if (profile?.sub && profile.email_verified) {
          const userExists = await doesUserExist(profile.sub, account.provider);
          if (userExists) {
            return true;
          } else {
            await insertUser(profile.sub, account.provider);
            return true;
          }
        }
      }
      return false;
    },
    async jwt({ token, account }) {
      // console.log('\nJWT\n');
      // console.log(token);
      // console.log(account);
      if (account) {
        token.accessToken = account.access_token;
        token.provider = account.provider;
      }
      return token;
    },
    async session({ session, token }) {
      // console.log('\nSESSION\n');
      // console.log(session);
      // console.log(token);
      if (
        token &&
        (token.provider === 'reddit' || token.provider === 'google') &&
        token.sub
      ) {
        // Add provider, identifier, username to the session
        const userData = await getUser(token.sub, token.provider);
        session.user.provider = token.provider;
        session.user.identifier = token.sub;
        session.user.username = userData.username;
        session.user.friends = userData.friends;
        session.user.id = userData.id;
      }
      // Send properties to the client, like an access_token from a provider.
      return session;
    },
  },
};

export default NextAuth(authOptions);
