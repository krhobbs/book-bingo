import '../styles/globals.css'
import { ThemeProvider } from 'theme-ui';
import { theme } from '../theme';

import TopNav from '../components/ui/TopNav';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <TopNav />
      <Component {...pageProps} />
    </ThemeProvider>
  )
  
}

export default MyApp
