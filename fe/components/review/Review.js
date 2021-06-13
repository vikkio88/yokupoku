import { Thumbool, Csl } from './common';
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
                    <h2>Pros</h2>
                    {pros}
                </div>
                <div className={styles.pros}>
                    <h2>Cons</h2>
                    {cons}
                </div>
            </div>

            <div className={styles.row}>
                <div>
                    <h3>Boredom Speed Index</h3>
                    <h2>{bsi} / 100</h2>
                </div>
                <div>
                    <h3>Rate</h3>
                    <h2>{rating} / 100</h2>
                </div>
                <div>
                    <h2>Suggested: <Thumbool value={suggested} /></h2>
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