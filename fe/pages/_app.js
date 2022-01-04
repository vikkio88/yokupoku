import { Container } from 'next/app';
import { DefaultSeo } from 'next-seo';
import { ThemeProvider } from 'next-themes';

import seo from '../next-seo.config';

import '../styles/globals.css';
import 'react-tippy/dist/tippy.css';

function MyApp({ Component, pageProps }) {
  return (
    <Container>
      <DefaultSeo
        {...seo}
      />
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </Container>
  );
}

export default MyApp;