import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectDatabase, getDocumentByUsername } from '../../../utils/db-utils';

export default NextAuth({
  session: {
    strategy: "jwt",
    //maxAge: 3000
  },
  providers: [
    CredentialsProvider({
        name: 'credentials',
        credentials: {},
        authorize: async (credentials : { username: string, password: string }) => {
            const client = await connectDatabase();
            const user = await getDocumentByUsername(client, 'users', credentials.username);

            if (!user) {
                client.close();
                throw new Error('User not found.');
            }

            if (credentials.password !== user.password) {
                client.close();
                throw new Error('Incorrect password.');
            }

            client.close();

            const returnedUser = {
              name: user.username, // hopefully can be removed in future? module augmentation not working with current next-auth version
              username: user.username,
              card: user.card,
              friends: user.friends
            }

            // console.log('AUTHORIZE');
            // console.log(returnedUser);

            return Promise.resolve(returnedUser);
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
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token, user }) {
      // console.log('SESSION');
      // console.log(session);
      // console.log(token);
      // console.log(user);
      if (token) {
        session.user.username = token.name;
        const client = await connectDatabase();
        const userData = await getDocumentByUsername(client, 'users', token.name);
        session.user.card = userData.card;
        session.user.friends = userData.friends;
      }
      // Send properties to the client, like an access_token from a provider.
      return session
    }
  }
});
