import { ThemeUIProvider } from 'theme-ui';
import { SessionProvider } from 'next-auth/react';
import { theme } from '../theme';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Layout from '../components/layout/Layout';

function MyApp({ Component, pageProps } : AppProps) {
  return (
    <>
      <Head>
        <meta name="apple-mobile-web-app-capable" content="yes" key="apple-webapp" />
        <meta name="mobile-web-app-capable" content="yes" key="android-webapp" />
        <link rel="apple-touch-icon" sizes="any" href="/apple-touch-icon.svg" />
      </Head>
      <SessionProvider session={pageProps.session} refetchInterval={5 * 60} >
        <ThemeUIProvider theme={theme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeUIProvider>
      </SessionProvider>
    </>
  );
}

export default MyApp;
