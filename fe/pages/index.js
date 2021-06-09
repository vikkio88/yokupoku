import Head from 'next/head';

import styles from '../styles/Home.module.css';
import { Footer } from '../components/layout';

import axios from 'axios';
import { Review } from '../components/home';

export default function Home({ reviews }) {

  return (
    <div className={styles.container}>
      <Head>
        <title>Yokupoku - Reviews for people with short attention span</title>
        <meta lang="en" />
        <meta charSet="utf-8" />
        <meta name="description" content="Yokupoku - reviews for people with short attention span" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Yokupoku
        </h1>
        <h2>
          Reviews for people with short attention span
        </h2>
        <h3>Latest Reviews</h3>
        <div className={styles.latest}>
          {reviews.map(r => <Review key={r.id} review={r} />)}
        </div>
      </main>

      <Footer className={styles.footer} />
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
