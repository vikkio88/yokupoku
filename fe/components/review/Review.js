import { useEffect, useState } from 'react';
import Md from 'react-markdown';
import * as timeago from 'timeago.js';
import { T, SpoilerChip, Csl, RoundIndicator } from '../common';
import styles from './styles/Review.module.css';


const Review = ({ review, additionalTags = [] }) => {
    const { title, subtitle, content,
        pros, cons, tags, suggested, image,
        bsi, rating, spoiler, updatedAt, createdAt
    } = review;

    const [updatedAtDateString, setUpdatedAtDateString] = useState(timeago.format(updatedAt));
    useEffect(() => {
        setUpdatedAtDateString(timeago.format(updatedAt));
    });

    return (
        <div className={styles.wrapper}>
            <div className={styles.imageWrapper} >
                <img
                    src={image}
                    alt={title}
                />
            </div>
            {spoiler && <SpoilerChip />}
            <h1 className={styles.title}>
                {title}
            </h1>
            <h2 className={styles.subtitle}>
                {subtitle}
            </h2>


            <T title={updatedAt} position="bottom">
                <h3 className={styles.date}>
                    {updatedAt !== createdAt ? 'updated:' : 'published:'} {updatedAtDateString}
                </h3>
            </T>

            <div className={styles.content}>
                <Md>
                    {content}
                </Md>
            </div>
            {/* This needs ot drop to col flex in mobile same with the next */}
            <div className={styles.row}>
                <div className={styles.pros}>
                    <h2>Pros 😍</h2>
                    <ul>
                        {pros.split(',').map((c, i) => <li key={`pro_${i}`}>{c}</li>)}
                    </ul>
                </div>
                <div className={styles.cons}>
                    <h2>Cons 🤮</h2>
                    <ul>
                        {cons.split(',').map((c, i) => <li key={`cons_${i}`}>{c}</li>)}
                    </ul>
                </div>
            </div>

            <div className={styles.row}>
                <T
                    title="Boredom Speed Index or how fast it gets boring (%)"
                >
                    <div className={styles.col}>
                        <h3>BSI 🥱</h3>
                        <RoundIndicator invertColour value={bsi} />
                    </div>
                </T>
                <T title="Rating out of 100">
                    <div className={styles.col}>
                        <h3>Rating 🧐</h3>
                        <RoundIndicator value={rating} />
                    </div>
                </T>
                <T title={`${suggested ? 'YES!' : 'NOPE!'}`}>
                    <div className={styles.col}>
                        <h3>Suggested</h3>
                        <RoundIndicator value={100} invertColour={!suggested} forceText={suggested ? '👍' : '👎'} />
                    </div>
                </T>
            </div>
            <div className={styles.tags}>
                <h2>Tags</h2>
                <Csl value={`${tags},${additionalTags}`} />
            </div>
        </div>
    );
};

export default Review;