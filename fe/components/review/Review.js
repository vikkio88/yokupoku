import styles from './styles/Review.module.css';

const Review = ({ className, review }) => {
    const { title, subtitle, content,
        pros, cons, tags, suggested, bsi, rating } = review;
    return (
        <div className={className}>
            <h1>{title}</h1>
            <h2>{subtitle}</h2>
            <p className={styles.content}>
                {content}
            </p>
            <p>
                <h3>Pros</h3>
                {pros}
            </p>
            <p>
                <h3>Cons</h3>
                {cons}
            </p>

            <p>
                <h3>Tags</h3>
                {tags}
            </p>
            <p>Suggested: {suggested ? 'YES' : 'NO'}</p>
            <p>
                <h3>Boredom Speed Index</h3>
                <h2>{bsi}</h2>
            </p>
            <p>
                <h3>Rate</h3>
                <h2>{rating} / 100</h2>
            </p>
            {/* Maybe can add Updated/Created */}
        </div>
    );
};

export default Review;