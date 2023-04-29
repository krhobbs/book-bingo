import { ThemeProvider } from 'theme-ui';
import { SessionProvider } from 'next-auth/react';
import { theme } from '../theme';
import Layout from '../components/layout/Layout';

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session} refetchInterval={5 * 60} >
      <ThemeProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </SessionProvider>
  );
}

export default MyApp;
