const Product = ({ className, product }) => {
    const { name } = product;
    return (
        <div className={className}>
            <h1>{name}</h1>
        </div>
    );
};

export default Product;