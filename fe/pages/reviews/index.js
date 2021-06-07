import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

import axios from 'axios';

export default function Home({ reviews }) {

  return (
    <div className={styles.container}>
      <Head>
        <title>Yokupoku - Reviews for people with short attention span</title>
        <meta lang="en" />
        <meta charSet="utf-8" />
        <meta name="description" content="Yokupoku - Mayoku - reviews for people with short attention span" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Yokupoku (Mayoku)
        </h1>
        <h2>
          Reviews for people with short attention span
        </h2>

        <p className={styles.description}>

        </p>

        <ul>
          {reviews.map(r => <li>{r.product.name}: {r.title} <Link href={`reviews/${r.slug}`}>READ</Link></li>)}
        </ul>
      </main>

      <footer className={styles.footer}>
        made with ♥ by <a
          href="//vikkio.me"
          target="_blank"
        >vikkio</a>
      </footer>
    </div>
  );

}

export async function getStaticProps() {
  const response = await axios.get('http://localhost:3001/provider/reviews');

  return {
    props: {
      reviews: response.data
    }
  };
}