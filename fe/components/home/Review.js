import Link from 'next/link';

import styles from './styles/Review.module.css';

const Review = ({ review }) => {
    const { product, title, slug } = review;
    return (
        <div className={styles.reviewListItem}>
            <strong>{
                product.name}
            </strong>
            {title}
            <Link
                className={styles.reviewLink}
                href={`reviews/${slug}`}
            >
                READ
            </Link>
        </div>
    );
};

export default Review;