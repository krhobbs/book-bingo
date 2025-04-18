import NextAuth from 'next-auth';

declare module 'next-auth' {
  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  interface User {
    username?: string;
    friends: { id: string; username: string }[];
    provider: 'google' | 'reddit';
    identifier: string;
  }

  /**
   * Returned by `useSession`, `getServerSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: User;
  }

  interface Profile {
    email_verified?: boolean;
    verified?: boolean;
    id?: string;
  }

  interface JWT {
    provider: 'google' | 'reddit';
  }
}
