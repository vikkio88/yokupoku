import Link from 'next/link';
import styles from './styles/Title.module.css';

const Title = () => (
    <div className={styles.title}>
        <Link href="/">
            <h1 className={styles.homeLink}>
                Yokupoku
            </h1>
        </Link>
        <h2>
            Reviews for people with short attention spans
        </h2>
    </div>
);

export default Title;