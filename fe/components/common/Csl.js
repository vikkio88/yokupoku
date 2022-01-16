import styles from './styles/Csl.module.css';

const DefaultWrapper = ({ children }) => <div className={styles.item}>{children}</div>;

const Csl = ({ value, className, component = null, onClick = null }) => {
    const Wrapper = component || DefaultWrapper;
    const values = value.split(',');
    return (
        <div className={className || styles.wrapper} onClick={onClick}>
            {values.filter(v => v && v !== '').map((v, i) => <Wrapper key={`wr_${i}`}>{`#${v}`}</Wrapper>)}
        </div>
    );
};


export default Csl;