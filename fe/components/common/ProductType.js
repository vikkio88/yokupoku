const map = {
    game: '🎮',
    movie: '🎥',
    book: '📚',
    tv: '📺',
    music: '🎶',
    other: '🤷',
};


const ProductType = ({ type }) => {
    if (!Object.keys(map).includes(type)) return null;

    return <span title={type}>{map[type]}</span>;
};


export default ProductType;