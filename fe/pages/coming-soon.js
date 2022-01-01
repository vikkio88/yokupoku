import Head from 'next/head';
import Link from 'next/link';
import { Footer } from '../components/layout';

import styles from '../styles/Home.module.css';


export default function About() {

  return (
    <div className={styles.container}>
      <Head>
        <title>Yokupoku - Coming Soon - Reviews for people with short attention span</title>
        <meta lang="en" />
        <meta charSet="utf-8" />
        <meta name="description" content="Yokupoku - About - reviews for people with short attention spans" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </Head>

      <main className={styles.main}>
        <div className={styles.title}>
          <Link href="/">
            <h1 className={styles.homeLink}>Yokupoku</h1>
          </Link>
          <h2>
            Reviews for people with short attention span
                    </h2>
        </div>
        <nav className={styles.nav}>
          <Link href="/">
            <a>Reviews</a>
          </Link>
          <Link href="/coming-soon">
            <a>Products</a>
          </Link>
          <Link href="/about">About</Link>
          <Link href="/">
            <a className={styles.currentRoute}>🔎</a>
          </Link>
        </nav>

        <div className={styles.content}>
          <h2>Wait for it</h2>
          <p>
            This functionality will be coming soon.
          </p>

          <Link href="/">
            <h1 className={styles.homeLink}>
              🔙
            </h1>
          </Link>
        </div>
      </main>

      <Footer className={styles.footer} />
    </div>
  );
};