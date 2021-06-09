import styles from './styles/Product.module.css';

const Product = ({ product }) => {
    const { name } = product;
    return (
        <div className={styles.wrapper}>
            <h1>{name}</h1>
        </div>
    );
};

export default Product;