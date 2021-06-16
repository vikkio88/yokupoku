import ProductType from '../common/ProductType';
import styles from './styles/Product.module.css';

const Product = ({ product }) => {
    const { name, type, meta, links } = product;
    return (
        <div className={styles.wrapper}>
            <h2><ProductType type={type} /></h2>
            <h1>{name}</h1>
            {meta?.store && <h3>🛒 {meta?.store}</h3>}
            {links?.map((l, i) => <h3>{l}</h3>)}
        </div>
    );
};

export default Product;