import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { verifyPassword } from '../../../utils/auth-utils';
import { getUserByUsername } from '../../../utils/db-utils';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    //maxAge: 3000
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {},
      authorize: async (credentials: {
        username: string;
        password: string;
      }) => {
        const user = await getUserByUsername(credentials.username);

        if (!user) {
          throw new Error('User not found.');
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          throw new Error('Incorrect password.');
        }

        const returnedUser = {
          id: user.id,
          name: user.username, // hopefully can be removed in future? module augmentation not working with current next-auth version
          username: user.username,
          friends: user.friends,
        };

        // console.log('AUTHORIZE');
        // console.log(returnedUser);

        return Promise.resolve(returnedUser);
      },
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
        session.user.friends = userData.friends;
        session.user.id = userData.id;
      }
      // Send properties to the client, like an access_token from a provider.
      return session;
    },
  },
};

export default NextAuth(authOptions);
