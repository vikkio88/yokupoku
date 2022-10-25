import axios from 'axios';
import { Footer, Header, Navbar, Title } from '../components/layout';
import { ReviewsList } from '../components/review';

import styles from '../styles/Home.module.css';
import stylesReviews from '../styles/Reviews.module.css';




export default function Reviews({ reviews }) {

    return (
        <div className={styles.container}>
            <Header current="Reviews" />

            <main className={styles.main}>
                <Title />
                <Navbar current='/reviews' />

                <div className={stylesReviews.content}>
                    <ReviewsList reviews={reviews} />
                </div>
            </main>


            <Footer className={styles.footer} />
        </div>
    );
};

export async function getStaticProps() {
    const response = await axios.get('http://localhost:3001/provider/reviews');

    return {
        props: {
            reviews: response.data
        }
    };
}