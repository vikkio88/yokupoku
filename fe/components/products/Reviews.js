import { useEffect, useState } from 'react';
import Link from 'next/link';
import * as timeago from 'timeago.js';

import styles from './styles/Reviews.module.css';


const Review = ({ updatedAt, title, subtitle, slug }) => {
    const [updatedAtDateString, setUpdatedAtDateString] = useState(timeago.format(updatedAt));
    useEffect(() => {
        setUpdatedAtDateString(timeago.format(updatedAt));
    });
    return (
        <li className={styles.review}>

            <span className={styles.date}>
                {updatedAtDateString}
            </span>
            <strong>{title}</strong>
            {subtitle}
            <div
                className={styles.reviewLink}>
                <Link
                    href={`/reviews/${slug}`}
                    title="Read More"
                >
                    ➡️
                </Link>
            </div>
        </li>
    );
};

const Reviews = ({ reviews }) => {
    return (
        <div className={styles.wrapper}>
            <h2>Reviews</h2>
            <ul className={styles.reviews}>
                {reviews.map(r => <Review key={r.id} {...r} />)}
            </ul>
        </div>
    );
};


export default Reviews;