import CountUp from 'react-countup';
import styles from '../styles/Home.module.css';
import { Footer, Navbar, Header, Title } from '../components/layout';

import axios from 'axios';
import { Review } from '../components/home';

export default function Home({ reviews, total }) {

  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        <Title />
        <Navbar />
        <div className={styles.latest}>
          <div className={styles.reviewsCount}>
            <h2>Total Reviews: <CountUp end={total} /> ✍️</h2>
            <h3>Latest Reviews <span>👍👎</span></h3>
          </div>
          {reviews.map(r => <Review key={r.id} review={r} />)}
        </div>
      </main>

      <Footer className={styles.footer} />
    </div>
  );

}

export async function getStaticProps() {
  const response = await axios.get('http://localhost:3001/provider/reviews/latest');
  const total = await axios.get('http://localhost:3001/provider/reviews');

  return {
    props: {
      reviews: response.data,
      total: total.data.length
    }
  };
}
