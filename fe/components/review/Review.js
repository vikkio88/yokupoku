import { useEffect, useState } from 'react';
import * as timeago from 'timeago.js';
import { Tooltip } from 'react-tippy';
import { Csl, RoundIndicator } from './common';
import styles from './styles/Review.module.css';


const Review = ({ review }) => {
    const { title, subtitle, content,
        pros, cons, tags, suggested,
        bsi, rating, updatedAt
    } = review;

    const [dateString, setDateString] = useState(timeago.format(updatedAt));
    useEffect(() => setDateString(timeago.format(updatedAt)));

    return (
        <div className={styles.wrapper}>
            <h1 className={styles.title}>
                {title}
            </h1>
            <h2 className={styles.subtitle}>
                {subtitle}
            </h2>

            <Tooltip
                title={updatedAt}
                position="bottom"
                trigger="mouseenter"
                arrow
                inertia
            >
                <h3 className={styles.date}>
                    last updated: {dateString}
                </h3>
            </Tooltip>

            <div className={styles.content}>
                {/* Need to make a md parser here */}
                {content}
            </div>

            <div className={styles.row}>
                <div className={styles.pros}>
                    <h2>Pros 😍</h2>
                    <ul>
                        {pros.split(',').map(c => <li>{c}</li>)}
                    </ul>
                </div>
                <div className={styles.cons}>
                    <h2>Cons 🤮</h2>
                    <ul>
                        {cons.split(',').map(c => <li>{c}</li>)}
                    </ul>
                </div>
            </div>

            <div className={styles.row}>
                <div className={styles.col}>
                    <Tooltip
                        title="Boredom Speed Index or how fast it gets boring (%)"
                        position="top"
                        trigger="mouseenter"
                        arrow
                        inertia
                    >
                        <h3>BSI 🥱</h3>
                    </Tooltip>
                    <RoundIndicator invertColour value={bsi} />
                </div>
                <div className={styles.col}>
                    <Tooltip
                        title="Rate out of 100"
                        position="top"
                        trigger="mouseenter"
                        arrow
                        inertia
                    >
                        <h3>Rate 🧐</h3>
                    </Tooltip>
                    <RoundIndicator value={rating} />
                </div>
                <div className={styles.col}>
                    <Tooltip
                        title={`${suggested ? 'YES!' : 'NOPE!'}`}
                        position="top"
                        trigger="mouseenter"
                        arrow
                        inertia
                    >
                        <h2>Suggested</h2>
                    </Tooltip>
                    <RoundIndicator value={100} invertColour={!suggested} forceText={suggested ? '👍' : '👎'} />
                </div>
            </div>
            <div className={styles.tags}>
                <h2>Tags</h2>
                <Csl value={tags} />
            </div>
        </div>
    );
};

export default Review;