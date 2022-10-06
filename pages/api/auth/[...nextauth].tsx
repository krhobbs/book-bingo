import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectDatabase, getDocumentByUsername } from '../../../utils/db-utils';

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
        name: 'credentials',
        credentials: {},
        authorize: async (credentials : {username: string, password: string}) => {
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

            return user;
        }
    }),
  ],
});
