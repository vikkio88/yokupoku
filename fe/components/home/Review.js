import Link from 'next/link';
import * as timeago from 'timeago.js';
import { ProductType } from '../common';
import styles from './styles/Review.module.css';


const Review = ({ review }) => {
    const { product, title, slug } = review;
    return (
        <div className={styles.reviewListItem}>
            <ProductType type={product.type} />
            <span className={styles.reviewDate} title={review.updatedAt}>
                {timeago.format(new Date(review.updatedAt))}
            </span>
            <strong className={styles.reviewProduct}>
                {product.name}
            </strong>
            {title}
            <Link
                className={styles.reviewLink}
                href={`reviews/${slug}`}
                title="Read More"
            >
                ➡️
            </Link>
        </div>
    );
};

export default Review;