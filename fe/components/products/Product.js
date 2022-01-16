import { ProductType, Chip, T, Csl } from '../common';
import styles from './styles/Product.module.css';

const Product = ({ product }) => {
    const { name, genre, type, meta, links, tags } = product;
    return (
        <div className={styles.wrapper}>
            <h2>
                {meta?.device && <T title={`${meta.device}`}><ProductType type={type} /></T>}
                {!(meta?.device) && <ProductType type={type} />}

            </h2>
            <h1>{name}</h1>
            <T title="Genre" position="left">
                <h3><Chip>{genre}</Chip></h3>
            </T>
            {meta?.played && (
                <T title="Played Time" position="left">
                    <h3>⏲️ {meta?.played} hours</h3>
                </T>
            )}
            {meta?.store && (
                <T title="Store" position="left">
                    {/* Might want to move this link shit to a component */}
                    {links && <h3><a href={`${links.split(',')[0]}`} target="_blank">🛒 {meta?.store}</a></h3>}
                    {!links && <h3>🛒 {meta?.store}</h3>}
                </T>
            )}

            <T title="Tags" position="bottom">
                <div className={styles.tags}>
                    <Csl value={tags} />
                </div>
            </T>
        </div>
    );
};

export default Product;