import { useState, useEffect } from 'react';
import Link from 'next/link';
import * as timeago from 'timeago.js';
import { ProductType, T } from '../common';
import styles from './styles/Review.module.css';


const Review = ({ review }) => {
    const { product, title, slug, updatedAt } = review;
    const [dateString, setDateString] = useState(timeago.format(updatedAt));
    useEffect(() => setDateString(timeago.format(updatedAt)));
    return (
        <div className={styles.reviewListItem}>
            <ProductType type={product.type} />
            <T title={updatedAt}>
                <span className={styles.reviewDate}>
                    {dateString}
                </span>
            </T>
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