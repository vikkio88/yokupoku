import styles from './styles/Chip.module.css';

const SpoilerChip = ({ children }) => {
    return (
        <span className={styles.wrapper}>
            {children}
        </span>
    );
};


export default SpoilerChip;