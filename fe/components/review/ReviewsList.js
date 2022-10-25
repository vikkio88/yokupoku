import Link from 'next/link';
import { T } from '../common';
import styles from './styles/ReviewsList.module.css';

const ReviewList = ({ reviews = [] }) => {
    return (
        <ul className={styles.ul}>
            {reviews.map(r => (
                <li key={r.id} className={styles.li}>
                    <span>
                        <Link
                            href={`/products/${r.product.slug}`}
                            title={`${r.product.name} - Details`}
                        >
                            {r.product.name}
                        </Link>
                    </span>
                    <span>
                        <T title={r.createdAt}>
                            {r.title}
                        </T>
                    </span>
                    <span className={styles.reviewsButtons}>

                        <T
                            title="Suggested?"
                        >
                            {r.suggested ? '👍' : '👎'}
                        </T>
                        <Link
                            className={styles.reviewLink}
                            href={`reviews/${r.slug}`}
                            title="Read More"
                        >
                            ➡️
                        </Link>
                    </span>
                </li>
            ))}
        </ul>
    );
};

export default ReviewList;