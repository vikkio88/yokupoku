import styles from '../styles/Home.module.css';
import { Footer, Navbar, Header, Title } from '../components/layout';

import axios from 'axios';
import { Review } from '../components/home';

export default function Home({ reviews }) {

  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        <Title />
        <Navbar />
        <div className={styles.latest}>
          <h3>Latest Reviews <span>👍👎</span></h3>
          {reviews.map(r => <Review key={r.id} review={r} />)}
        </div>
      </main>

      <Footer className={styles.footer} />
    </div>
  );

}

export async function getStaticProps() {
  const response = await axios.get('http://localhost:3001/provider/reviews/latest');

  return {
    props: {
      reviews: response.data
    }
  };
}
