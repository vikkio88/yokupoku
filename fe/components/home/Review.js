import { useState, useEffect } from 'react';
import { Tooltip } from 'react-tippy';
import Link from 'next/link';
import * as timeago from 'timeago.js';
import { ProductType } from '../common';
import styles from './styles/Review.module.css';


const Review = ({ review }) => {
    const { product, title, slug, updatedAt } = review;
    const [dateString, setDateString] = useState(timeago.format(updatedAt));
    useEffect(() => setDateString(timeago.format(updatedAt)));
    return (
        <div className={styles.reviewListItem}>
            <ProductType type={product.type} />
            <Tooltip
                title={updatedAt}
                position="bottom"
                trigger="mouseenter"
                arrow
                inertia
            >
                <span className={styles.reviewDate}>
                    {dateString}
                </span>
            </Tooltip>
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