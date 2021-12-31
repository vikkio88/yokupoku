import { Container } from 'next/app';
import { DefaultSeo } from 'next-seo';

import seo from '../next-seo.config';

import '../styles/globals.css';
import 'react-tippy/dist/tippy.css';

function MyApp({ Component, pageProps }) {
  return (
    <Container>
      <DefaultSeo
        {...seo}
      />
      <Component {...pageProps} />
    </Container>
  );
}

export default MyApp;