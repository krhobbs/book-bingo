import { ThemeProvider } from 'theme-ui';
import { theme } from '../theme';

import Layout from '../components/layout/layout';


function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  )
  
}

export default MyApp
