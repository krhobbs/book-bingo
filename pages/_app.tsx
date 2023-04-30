import { ThemeProvider } from 'theme-ui';
import { SessionProvider } from 'next-auth/react';
import { theme } from '../theme';
import type { AppProps } from 'next/app'
import Layout from '../components/layout/Layout';

function MyApp({ Component, pageProps } : AppProps) {
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
