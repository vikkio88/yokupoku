import { ProductType, T } from '../common';
import styles from './styles/Product.module.css';

const Product = ({ product }) => {
    const { name, type, meta, links } = product;
    return (
        <div className={styles.wrapper}>
            <h2><ProductType type={type} /></h2>
            <h1>{name}</h1>
            {meta?.store && (
                <T title="Store" position="left">
                    <h3>🛒 {meta?.store}</h3>
                </T>
            )}
            {Array.isArray(links) && links?.map((l, i) => <h3>{l}</h3>)}
        </div>
    );
};

export default Product;