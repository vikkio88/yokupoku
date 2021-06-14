import { Tooltip } from 'react-tippy';
import { Thumbool, Csl, RoundIndicator } from './common';
import styles from './styles/Review.module.css';


const Review = ({ review }) => {
    const { title, subtitle, content,
        pros, cons, tags, suggested, bsi, rating } = review;
    return (
        <div className={styles.wrapper}>
            <h1 className={styles.title}>
                {title}
            </h1>
            <h2 className={styles.subtitle}>
                {subtitle}
            </h2>
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
                    <RoundIndicator value={bsi} />
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
                        title="Whether I would suggest to buy this game"
                        position="top"
                        trigger="mouseenter"
                        arrow
                        inertia
                    >
                        <h2>Suggested: <Thumbool value={suggested} /></h2>
                    </Tooltip>
                </div>
            </div>
            <div className={styles.tags}>
                <h3>Tags</h3>
                <Csl value={tags} />
            </div>
            {/* Maybe can add Updated/Created */}
        </div>
    );
};

export default Review;